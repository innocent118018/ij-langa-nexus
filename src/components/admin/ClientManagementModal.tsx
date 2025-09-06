import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  UserPlus,
  Mail,
  Upload,
  FileText,
  DollarSign,
  Send,
  Loader2,
  Key,
  Shield
} from 'lucide-react';

interface ClientManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientId?: string;
  clientData?: any;
}

export const ClientManagementModal = ({ isOpen, onClose, clientId, clientData }: ClientManagementModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('create');

  // Create Client Form
  const [createForm, setCreateForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: ''
  });

  // Document Upload Form
  const [documentForm, setDocumentForm] = useState({
    file: null as File | null,
    documentType: '',
    description: ''
  });

  // Invoice Form
  const [invoiceForm, setInvoiceForm] = useState({
    reference: '',
    amount: '',
    balanceDue: '',
    issueDate: new Date().toISOString().split('T')[0],
    status: 'Unpaid'
  });

  const performAdminAction = async (action: string, data: any) => {
    const { data: result, error } = await supabase.functions.invoke('admin-actions', {
      body: { action, data }
    });

    if (error) throw error;
    return result;
  };

  const handleCreateClient = async () => {
    if (!createForm.fullName || !createForm.email) {
      toast({
        title: "Validation Error",
        description: "Name and email are required",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await performAdminAction('create-client', createForm);
      
      toast({
        title: "Client Created Successfully",
        description: `${createForm.fullName} has been added and will receive a welcome email.`
      });

      setCreateForm({ fullName: '', email: '', phone: '', companyName: '' });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error Creating Client",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendPasswordReset = async () => {
    if (!clientData?.email) {
      toast({
        title: "Error",
        description: "Client email not found",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await performAdminAction('send-password-reset', {
        email: clientData.email,
        clientName: clientData.full_name || clientData.name
      });
      
      toast({
        title: "Password Reset Sent",
        description: `Password reset link sent to ${clientData.email}`
      });
    } catch (error: any) {
      toast({
        title: "Error Sending Reset",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentUpload = async () => {
    if (!documentForm.file || !clientId) {
      toast({
        title: "Validation Error",
        description: "File and document type are required",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Upload file to Supabase Storage first
      const fileName = `${Date.now()}_${documentForm.file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(`clients/${clientId}/${fileName}`, documentForm.file);

      if (uploadError) throw uploadError;

      await performAdminAction('upload-client-document', {
        clientId,
        fileName: documentForm.file.name,
        fileData: {
          path: uploadData.path,
          mimeType: documentForm.file.type,
          size: documentForm.file.size
        },
        documentType: documentForm.documentType,
        description: documentForm.description
      });
      
      toast({
        title: "Document Uploaded",
        description: "Document has been uploaded and client notified."
      });

      setDocumentForm({ file: null, documentType: '', description: '' });
    } catch (error: any) {
      toast({
        title: "Error Uploading Document",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInvoice = async () => {
    if (!invoiceForm.reference || !invoiceForm.amount || !clientData?.id) {
      toast({
        title: "Validation Error",
        description: "Reference and amount are required",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await performAdminAction('create-client-invoice', {
        customerId: clientData.id,
        invoiceData: {
          ...invoiceForm,
          amount: parseFloat(invoiceForm.amount),
          balanceDue: parseFloat(invoiceForm.balanceDue || invoiceForm.amount)
        }
      });
      
      toast({
        title: "Invoice Created",
        description: `Invoice ${invoiceForm.reference} has been created.`
      });

      setInvoiceForm({
        reference: '',
        amount: '',
        balanceDue: '',
        issueDate: new Date().toISOString().split('T')[0],
        status: 'Unpaid'
      });
    } catch (error: any) {
      toast({
        title: "Error Creating Invoice",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {clientId ? `Manage Client: ${clientData?.name || clientData?.full_name}` : 'Client Management'}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="create" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Create Client
            </TabsTrigger>
            {clientId && (
              <>
                <TabsTrigger value="password" className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Password Reset
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Document
                </TabsTrigger>
                <TabsTrigger value="invoice" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Create Invoice
                </TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create New Client</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={createForm.fullName}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Client's full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={createForm.email}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="client@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={createForm.phone}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+27 12 345 6789"
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={createForm.companyName}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, companyName: e.target.value }))}
                      placeholder="Company name"
                    />
                  </div>
                </div>
                <Button onClick={handleCreateClient} disabled={loading} className="w-full">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
                  Create Client & Send Welcome Email
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {clientId && (
            <>
              <TabsContent value="password" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Send Password Reset</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <Mail className="h-8 w-8 text-blue-500" />
                      <div className="flex-1">
                        <h3 className="font-medium">{clientData?.name || clientData?.full_name}</h3>
                        <p className="text-sm text-muted-foreground">{clientData?.email}</p>
                      </div>
                      <Badge variant="outline">Client</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This will send a secure password reset link to the client's email address.
                    </p>
                    <Button onClick={handleSendPasswordReset} disabled={loading} className="w-full">
                      {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                      Send Password Reset Link
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Document for Client</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="document">Select Document</Label>
                      <Input
                        id="document"
                        type="file"
                        onChange={(e) => setDocumentForm(prev => ({ 
                          ...prev, 
                          file: e.target.files?.[0] || null 
                        }))}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                    </div>
                    <div>
                      <Label htmlFor="documentType">Document Type</Label>
                      <Select
                        value={documentForm.documentType}
                        onValueChange={(value) => setDocumentForm(prev => ({ ...prev, documentType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="invoice">Invoice</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="correspondence">Correspondence</SelectItem>
                          <SelectItem value="certificate">Certificate</SelectItem>
                          <SelectItem value="compliance">Compliance Document</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={documentForm.description}
                        onChange={(e) => setDocumentForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Brief description of the document..."
                      />
                    </div>
                    <Button onClick={handleDocumentUpload} disabled={loading} className="w-full">
                      {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                      Upload Document
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="invoice" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Invoice for Client</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="reference">Invoice Reference *</Label>
                        <Input
                          id="reference"
                          value={invoiceForm.reference}
                          onChange={(e) => setInvoiceForm(prev => ({ ...prev, reference: e.target.value }))}
                          placeholder="INV-2025-001"
                        />
                      </div>
                      <div>
                        <Label htmlFor="issueDate">Issue Date</Label>
                        <Input
                          id="issueDate"
                          type="date"
                          value={invoiceForm.issueDate}
                          onChange={(e) => setInvoiceForm(prev => ({ ...prev, issueDate: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="amount">Invoice Amount (ZAR) *</Label>
                        <Input
                          id="amount"
                          type="number"
                          step="0.01"
                          value={invoiceForm.amount}
                          onChange={(e) => setInvoiceForm(prev => ({ ...prev, amount: e.target.value }))}
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="balanceDue">Balance Due (ZAR)</Label>
                        <Input
                          id="balanceDue"
                          type="number"
                          step="0.01"
                          value={invoiceForm.balanceDue}
                          onChange={(e) => setInvoiceForm(prev => ({ ...prev, balanceDue: e.target.value }))}
                          placeholder="Same as amount"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={invoiceForm.status}
                        onValueChange={(value) => setInvoiceForm(prev => ({ ...prev, status: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Unpaid">Unpaid</SelectItem>
                          <SelectItem value="Paid">Paid</SelectItem>
                          <SelectItem value="Overdue">Overdue</SelectItem>
                          <SelectItem value="Draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleCreateInvoice} disabled={loading} className="w-full">
                      {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <FileText className="h-4 w-4 mr-2" />}
                      Create Invoice
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};