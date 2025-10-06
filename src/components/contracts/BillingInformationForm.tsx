import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, X, FileText } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Director {
  surname: string;
  firstName: string;
  idNumber: string;
  email: string;
  physicalAddress: string;
  idIssueDate: string;
  idCopyFile: File | null;
}

interface BillingInformationFormProps {
  contractId: string;
  clientId: string;
  onComplete: () => void;
  onBack: () => void;
}

export const BillingInformationForm = ({
  contractId,
  clientId,
  onComplete,
  onBack
}: BillingInformationFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    companyRegistrationNumber: '',
    numberOfDirectors: '1',
    hasVatNumber: 'no',
    vatNumber: '',
    hasTaxRepresentative: 'no',
    taxRepresentativeName: '',
    efilingUsername: '',
    efilingPassword: '',
    hasIncomeInvoice: 'no'
  });

  const [directors, setDirectors] = useState<Director[]>([
    {
      surname: '',
      firstName: '',
      idNumber: '',
      email: '',
      physicalAddress: '',
      idIssueDate: '',
      idCopyFile: null
    }
  ]);

  const [incomeInvoices, setIncomeInvoices] = useState<File[]>([]);
  const [bankStatements, setBankStatements] = useState<File[]>([]);

  const handleNumberOfDirectorsChange = (value: string) => {
    const num = parseInt(value);
    setFormData({ ...formData, numberOfDirectors: value });
    
    const newDirectors = Array(num).fill(null).map((_, i) => 
      directors[i] || {
        surname: '',
        firstName: '',
        idNumber: '',
        email: '',
        physicalAddress: '',
        idIssueDate: '',
        idCopyFile: null
      }
    );
    setDirectors(newDirectors);
  };

  const handleDirectorChange = (index: number, field: keyof Director, value: string | File) => {
    const newDirectors = [...directors];
    if (field === 'idCopyFile') {
      newDirectors[index] = { ...newDirectors[index], idCopyFile: value as File };
    } else {
      newDirectors[index] = { ...newDirectors[index], [field]: value as string };
    }
    setDirectors(newDirectors);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'invoice' | 'statement') => {
    const files = Array.from(e.target.files || []);
    if (type === 'invoice') {
      if (incomeInvoices.length + files.length > 50) {
        toast({
          title: 'Too many files',
          description: 'Maximum 50 invoice files allowed',
          variant: 'destructive'
        });
        return;
      }
      setIncomeInvoices([...incomeInvoices, ...files]);
    } else {
      setBankStatements([...bankStatements, ...files]);
    }
  };

  const removeFile = (index: number, type: 'invoice' | 'statement') => {
    if (type === 'invoice') {
      setIncomeInvoices(incomeInvoices.filter((_, i) => i !== index));
    } else {
      setBankStatements(bankStatements.filter((_, i) => i !== index));
    }
  };

  const uploadFile = async (file: File, path: string): Promise<string> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const fullPath = `${path}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('contract-documents')
      .upload(fullPath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    return fullPath;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Validate directors
      for (let i = 0; i < directors.length; i++) {
        const dir = directors[i];
        if (!dir.surname || !dir.firstName || !dir.idNumber || !dir.email || !dir.physicalAddress || !dir.idIssueDate) {
          throw new Error(`Please complete all fields for Director ${i + 1}`);
        }
        if (!dir.idCopyFile) {
          throw new Error(`Please upload ID copy for Director ${i + 1}`);
        }
      }

      // Validate bank statements
      if (bankStatements.length === 0) {
        throw new Error('Please upload at least one bank statement');
      }

      // Update client billing info
      const { error: clientError } = await supabase
        .from('contract_clients' as any)
        .update({
          company_name: formData.companyName,
          company_registration_number: formData.companyRegistrationNumber,
          has_vat_number: formData.hasVatNumber === 'yes',
          vat_number: formData.hasVatNumber === 'yes' ? formData.vatNumber : null,
          has_tax_representative: formData.hasTaxRepresentative === 'yes',
          tax_representative_name: formData.hasTaxRepresentative === 'yes' ? formData.taxRepresentativeName : null,
          efiling_username: formData.efilingUsername,
          efiling_password_encrypted: formData.efilingPassword, // Should be encrypted in production
          has_income_invoice: formData.hasIncomeInvoice === 'yes',
          billing_complete: true
        })
        .eq('id', clientId);

      if (clientError) throw clientError;

      // Upload director IDs and insert director records
      for (let i = 0; i < directors.length; i++) {
        const dir = directors[i];
        const idCopyPath = await uploadFile(dir.idCopyFile!, 'director_ids');

        const { error: dirError } = await supabase
          .from('company_directors_contract' as any)
          .insert({
            contract_id: contractId,
            client_id: clientId,
            director_number: i + 1,
            surname: dir.surname,
            first_name: dir.firstName,
            id_number: dir.idNumber,
            email: dir.email,
            physical_address: dir.physicalAddress,
            id_issue_date: dir.idIssueDate,
            id_copy_path: idCopyPath
          });

        if (dirError) throw dirError;

        // Track document upload
        await supabase.from('contract_document_uploads' as any).insert({
          contract_id: contractId,
          client_id: clientId,
          document_type: 'director_id_copy',
          file_name: dir.idCopyFile!.name,
          file_path: idCopyPath,
          file_size_bytes: dir.idCopyFile!.size,
          mime_type: dir.idCopyFile!.type,
          uploaded_by: user.id,
          metadata: { director_number: i + 1, director_name: `${dir.firstName} ${dir.surname}` }
        });
      }

      // Upload income invoices if provided
      if (formData.hasIncomeInvoice === 'yes') {
        for (const file of incomeInvoices) {
          const path = await uploadFile(file, 'income_invoices');
          await supabase.from('contract_document_uploads' as any).insert({
            contract_id: contractId,
            client_id: clientId,
            document_type: 'income_invoice',
            file_name: file.name,
            file_path: path,
            file_size_bytes: file.size,
            mime_type: file.type,
            uploaded_by: user.id
          });
        }
      }

      // Upload bank statements
      for (const file of bankStatements) {
        const path = await uploadFile(file, 'bank_statements');
        await supabase.from('contract_document_uploads' as any).insert({
          contract_id: contractId,
          client_id: clientId,
          document_type: 'bank_statement',
          file_name: file.name,
          file_path: path,
          file_size_bytes: file.size,
          mime_type: file.type,
          uploaded_by: user.id
        });
      }

      // Send email notification
      await supabase.functions.invoke('send-form-email', {
        body: {
          formType: 'contract_billing_information',
          contractId,
          clientId,
          data: {
            ...formData,
            directors: directors.map(d => ({
              surname: d.surname,
              firstName: d.firstName,
              idNumber: d.idNumber,
              email: d.email,
              physicalAddress: d.physicalAddress,
              idIssueDate: d.idIssueDate
            })),
            filesCounts: {
              directorIds: directors.length,
              incomeInvoices: incomeInvoices.length,
              bankStatements: bankStatements.length
            }
          },
          recipientEmail: 'orders@ijlanga.co.za'
        }
      });

      toast({
        title: 'Billing Information Submitted',
        description: 'Your documents have been uploaded and sent for processing.'
      });

      onComplete();
    } catch (error: any) {
      console.error('Error submitting billing info:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit billing information',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col">
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-6">
          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="companyReg">Company Registration Number *</Label>
                <Input
                  id="companyReg"
                  required
                  value={formData.companyRegistrationNumber}
                  onChange={(e) => setFormData({ ...formData, companyRegistrationNumber: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Directors */}
          <Card>
            <CardHeader>
              <CardTitle>Directors Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="numDirectors">Number of Directors *</Label>
                <Select value={formData.numberOfDirectors} onValueChange={handleNumberOfDirectorsChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                      <SelectItem key={num} value={String(num)}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {directors.map((director, index) => (
                <Card key={index} className="p-4">
                  <h4 className="font-semibold mb-4">Director {index + 1}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Surname *</Label>
                      <Input
                        required
                        value={director.surname}
                        onChange={(e) => handleDirectorChange(index, 'surname', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>First Name *</Label>
                      <Input
                        required
                        value={director.firstName}
                        onChange={(e) => handleDirectorChange(index, 'firstName', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>ID Number *</Label>
                      <Input
                        required
                        value={director.idNumber}
                        onChange={(e) => handleDirectorChange(index, 'idNumber', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        required
                        value={director.email}
                        onChange={(e) => handleDirectorChange(index, 'email', e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>Physical Address *</Label>
                      <Input
                        required
                        value={director.physicalAddress}
                        onChange={(e) => handleDirectorChange(index, 'physicalAddress', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>ID Date of Issue (e.g. 14/Dec/2025) *</Label>
                      <Input
                        required
                        placeholder="DD/MMM/YYYY"
                        value={director.idIssueDate}
                        onChange={(e) => handleDirectorChange(index, 'idIssueDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>ID Copy *</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleDirectorChange(index, 'idCopyFile', file);
                          }}
                          className="hidden"
                          id={`id-upload-${index}`}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById(`id-upload-${index}`)?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {director.idCopyFile ? director.idCopyFile.name : 'Upload ID'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Tax Information */}
          <Card>
            <CardHeader>
              <CardTitle>Tax Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Does The Company Have VAT Number? *</Label>
                <Select value={formData.hasVatNumber} onValueChange={(v) => setFormData({ ...formData, hasVatNumber: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.hasVatNumber === 'yes' && (
                <div>
                  <Label>VAT Number</Label>
                  <Input
                    value={formData.vatNumber}
                    onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                  />
                </div>
              )}

              <div>
                <Label>Does the Company Have Registered Tax Representative? *</Label>
                <Input
                  value={formData.taxRepresentativeName}
                  onChange={(e) => setFormData({ ...formData, taxRepresentativeName: e.target.value })}
                  placeholder="Enter name or 'No'"
                />
              </div>

              <div>
                <Label>eFiling Username *</Label>
                <Input
                  required
                  value={formData.efilingUsername}
                  onChange={(e) => setFormData({ ...formData, efilingUsername: e.target.value })}
                />
              </div>

              <div>
                <Label>eFiling Password *</Label>
                <Input
                  type="password"
                  required
                  value={formData.efilingPassword}
                  onChange={(e) => setFormData({ ...formData, efilingPassword: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Income Invoices */}
          <Card>
            <CardHeader>
              <CardTitle>Income Invoices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Do you have Income Invoices? *</Label>
                <Select value={formData.hasIncomeInvoice} onValueChange={(v) => setFormData({ ...formData, hasIncomeInvoice: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.hasIncomeInvoice === 'yes' && (
                <div>
                  <Label>Upload Income Invoices (Max 50 files, 20MB each)</Label>
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'invoice')}
                    className="mb-2"
                  />
                  <div className="space-y-2">
                    {incomeInvoices.map((file, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="text-sm flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          {file.name}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(i, 'invoice')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bank Statements */}
          <Card>
            <CardHeader>
              <CardTitle>Bank Statements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Upload 12 Months Bank Statements (PDF only) *</Label>
                <Input
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, 'statement')}
                  className="mb-2"
                />
                <div className="space-y-2">
                  {bankStatements.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        {file.name}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(i, 'statement')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Submitting...' : 'Submit Billing Information'}
        </Button>
      </div>
    </form>
  );
};