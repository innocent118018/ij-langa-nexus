import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileText, CheckCircle, AlertCircle, Download, Eye } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BankStatement {
  id: string;
  filename: string;
  pages_processed: number;
  credits_used: number;
  status: string;
  processing_started_at?: string;
  processing_completed_at?: string;
  extracted_data?: any;
  verification_results?: any;
  created_at: string;
  user_id: string;
  file_path?: string;
  updated_at: string;
}

interface CreditBalance {
  credits_remaining: number;
  credits_purchased: number;
  credits_used: number;
}

const BankStatements = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [statements, setStatements] = useState<BankStatement[]>([]);
  const [creditBalance, setCreditBalance] = useState<CreditBalance | null>(null);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (user) {
      fetchStatements();
      fetchCreditBalance();
    }
  }, [user]);

  const fetchStatements = async () => {
    try {
      const { data, error } = await supabase
        .from('bank_statements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStatements(data as BankStatement[] || []);
    } catch (error) {
      console.error('Error fetching statements:', error);
    }
  };

  const fetchCreditBalance = async () => {
    try {
      const { data, error } = await supabase
        .from('clerkiq_credits')
        .select('credits_remaining, credits_purchased, credits_used')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setCreditBalance(data || { credits_remaining: 30, credits_purchased: 30, credits_used: 0 }); // Default free trial
    } catch (error) {
      console.error('Error fetching credit balance:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.type !== 'application/pdf') {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload a PDF file.',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Create statement record
      const { data: statement, error } = await supabase
        .from('bank_statements')
        .insert({
          filename: file.name,
          pages_processed: 0,
          credits_used: 0,
          status: 'pending',
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Add to statements list
      setStatements(prev => [statement as BankStatement, ...prev]);

      toast({
        title: 'Upload Successful',
        description: 'Your bank statement has been uploaded and queued for processing.',
      });

      // Start processing
      setTimeout(() => processStatement(statement as BankStatement), 1000);

    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Upload Failed',
        description: 'Failed to upload your bank statement. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const processStatement = async (statement: BankStatement) => {
    setProcessing(true);
    
    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const pagesProcessed = Math.floor(Math.random() * 10) + 1;
      const creditsUsed = pagesProcessed;

      // Update statement with processing results
      const { error } = await supabase
        .from('bank_statements')
        .update({
          status: 'completed',
          pages_processed: pagesProcessed,
          credits_used: creditsUsed,
          processing_completed_at: new Date().toISOString(),
          extracted_data: {
            transactions: Array.from({ length: pagesProcessed * 20 }, (_, i) => ({
              date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
              description: `Transaction ${i + 1}`,
              amount: (Math.random() * 1000).toFixed(2),
              balance: (10000 + Math.random() * 5000).toFixed(2)
            }))
          },
          verification_results: {
            verified_transactions: pagesProcessed * 18,
            flagged_transactions: pagesProcessed * 2,
            accuracy_score: 0.99
          }
        })
        .eq('id', statement.id);

      if (error) throw error;

      // Update credit balance
      if (creditBalance) {
        const newBalance = creditBalance.credits_remaining - creditsUsed;
        setCreditBalance({
          ...creditBalance,
          credits_remaining: newBalance,
          credits_used: creditBalance.credits_used + creditsUsed
        });
      }

      // Refresh statements
      fetchStatements();

      toast({
        title: 'Processing Complete',
        description: `Successfully processed ${pagesProcessed} pages using ${creditsUsed} credits.`,
      });

    } catch (error) {
      console.error('Error processing statement:', error);
      toast({
        title: 'Processing Failed',
        description: 'Failed to process your bank statement. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'processing': return 'text-blue-500';
      case 'failed': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bank Statement Processing</h1>
          <p className="text-muted-foreground">
            Automatically extract and reconcile transactions from your bank statements with AI-powered accuracy.
          </p>
        </div>

        {/* Credit Balance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Credit Balance</span>
              <Badge variant="outline">
                {creditBalance?.credits_remaining || 0} credits remaining
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {creditBalance?.credits_purchased || 0}
                </div>
                <div className="text-sm text-muted-foreground">Credits Purchased</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">
                  {creditBalance?.credits_used || 0}
                </div>
                <div className="text-sm text-muted-foreground">Credits Used</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {creditBalance?.credits_remaining || 0}
                </div>
                <div className="text-sm text-muted-foreground">Credits Remaining</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upload">Upload Statement</TabsTrigger>
            <TabsTrigger value="history">Processing History</TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Bank Statement</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Upload your PDF bank statement for automated processing. Each page costs 1 credit.
                </p>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  {uploading ? (
                    <div className="space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                      <p className="text-muted-foreground">Uploading statement...</p>
                      <Progress value={uploadProgress} className="w-64 mx-auto" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-lg font-medium mb-2">Drop your PDF here or click to browse</p>
                        <p className="text-sm text-muted-foreground">
                          Supports PDF files up to 50MB. Each page uses 1 credit.
                        </p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        disabled={uploading || processing}
                      />
                      <Button asChild disabled={uploading || processing}>
                        <label htmlFor="file-upload" className="cursor-pointer">
                          Select PDF File
                        </label>
                      </Button>
                    </div>
                  )}
                </div>

                {processing && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                      <span className="font-medium">Processing statement...</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Our AI is extracting transactions and verifying data accuracy. This may take a few moments.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            {/* Processing History */}
            <Card>
              <CardHeader>
                <CardTitle>Processing History</CardTitle>
                <p className="text-sm text-muted-foreground">
                  View all your processed bank statements and their results.
                </p>
              </CardHeader>
              <CardContent>
                {statements.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No bank statements processed yet.</p>
                    <p className="text-sm text-muted-foreground">Upload your first statement to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {statements.map((statement) => (
                      <div key={statement.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`${getStatusColor(statement.status)}`}>
                            {getStatusIcon(statement.status)}
                          </div>
                          <div>
                            <p className="font-medium">{statement.filename}</p>
                            <p className="text-sm text-muted-foreground">
                              {statement.pages_processed} pages • {statement.credits_used} credits used
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={statement.status === 'completed' ? 'default' : 'secondary'}>
                            {statement.status}
                          </Badge>
                          {statement.status === 'completed' && (
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 mr-1" />
                                Export
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* How It Works */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">1. Upload</h3>
                <p className="text-sm text-muted-foreground">
                  Upload your PDF bank statement to ClerkiQ
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">2. Process</h3>
                <p className="text-sm text-muted-foreground">
                  AI analyzes and extracts transaction data
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">3. Verify</h3>
                <p className="text-sm text-muted-foreground">
                  Multiple validation checks ensure accuracy
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">4. Export</h3>
                <p className="text-sm text-muted-foreground">
                  Download structured data in CSV format
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BankStatements;