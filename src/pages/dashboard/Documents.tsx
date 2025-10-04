
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { DashboardWrapper } from '@/components/dashboard/DashboardWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, FileText, Download, Upload, FolderOpen, Users, Receipt, FileSearch, CreditCard, Building, Mail } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const documentCategories = [
  { id: 'shareholders', label: 'Shareholders', icon: Users, description: 'Shareholder certificates and documents' },
  { id: 'invoices', label: 'My Invoices', icon: Receipt, description: 'Invoice documents and receipts' },
  { id: 'quotes', label: 'My Quotes', icon: FileSearch, description: 'Quote documents and estimates' },
  { id: 'statements', label: 'My Statement', icon: CreditCard, description: 'Account statements and financial records' },
  { id: 'tax_clearance', label: 'Tax Clearance', icon: FileText, description: 'Tax clearance certificates' },
  { id: 'cipc', label: 'CIPC', icon: Building, description: 'CIPC registration documents' },
  { id: 'csd', label: 'CSD', icon: Building, description: 'CSD supplier documents' },
  { id: 'correspondence', label: 'Correspondence', icon: Mail, description: 'General correspondence and communication' },
];

interface Document {
  id: string;
  user_id: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  document_type: string;
  category: string;
  created_at: string;
  description: string | null;
  is_public: boolean;
  order_id: string | null;
  uploaded_by: string | null;
}

const Documents = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Fetch user's documents grouped by category
  const { data: documents, isLoading } = useQuery({
    queryKey: ['user-documents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Document[];
    },
    enabled: !!user,
  });

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async ({ file, category }: { file: File; category: string }) => {
      const fileName = `${user!.id}/${category}/${Date.now()}-${file.name}`;
      
      // Upload to storage
      const { data: storageData, error: storageError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (storageError) throw storageError;

      // Save metadata to database
      const { data, error } = await supabase
        .from('documents')
        .insert({
          user_id: user!.id,
          file_name: file.name,
          file_path: storageData.path,
          file_size: file.size,
          mime_type: file.type,
          document_type: 'document',
          category: category,
          uploaded_by: user!.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['user-documents'] });
      setIsUploadModalOpen(false);
      setUploadFile(null);
      setSelectedCategory('');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to upload document",
        variant: "destructive",
      });
    },
  });

  const handleUpload = () => {
    if (!uploadFile || !selectedCategory) {
      toast({
        title: "Error",
        description: "Please select a file and category",
        variant: "destructive",
      });
      return;
    }

    uploadMutation.mutate({ file: uploadFile, category: selectedCategory });
  };

  const downloadDocument = async (document: Document) => {
    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .download(document.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = document.file_name;
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to download document",
        variant: "destructive",
      });
    }
  };

  // Group documents by category
  const documentsByCategory = documents?.reduce((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = [];
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, Document[]>) || {};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <DashboardWrapper>
      <div className="space-y-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen -m-8 p-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Documents</h1>
            <p className="text-muted-foreground">
              View and manage your uploaded documents by category
            </p>
          </div>
          <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Choose a category...</option>
                    {documentCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Select File</label>
                  <input
                    type="file"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    className="w-full p-2 border rounded-md"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.xls"
                  />
                </div>
                <Button 
                  onClick={handleUpload} 
                  disabled={!uploadFile || !selectedCategory || uploadMutation.isPending}
                  className="w-full"
                >
                  {uploadMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4 mr-2" />
                  )}
                  Upload Document
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Document Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {documentCategories.map((category) => {
            const categoryDocs = documentsByCategory[category.id] || [];
            const Icon = category.icon;
            
            return (
              <Link key={category.id} to={`/dashboard/documents/${category.id}`}>
                <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{category.label}</CardTitle>
                        <CardDescription className="text-sm font-medium text-blue-600">
                          {categoryDocs.length} documents
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    {categoryDocs.length > 0 && (
                      <div className="space-y-2">
                        {categoryDocs.slice(0, 2).map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-2 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-100 text-sm shadow-sm">
                            <span className="truncate flex-1 font-medium text-gray-700">{doc.file_name}</span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                downloadDocument(doc);
                              }}
                              className="hover:bg-blue-100 transition-colors"
                            >
                              <Download className="h-3 w-3 text-blue-600" />
                            </Button>
                          </div>
                        ))}
                        {categoryDocs.length > 2 && (
                          <p className="text-xs text-blue-600 font-medium bg-blue-50 p-2 rounded text-center">
                            +{categoryDocs.length - 2} more documents
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* All Documents List */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : documents && documents.length > 0 ? (
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-xl">All Documents</CardTitle>
              <CardDescription className="text-blue-100">Complete list of all your uploaded documents</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {documents.map((document) => (
                  <div key={document.id} className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition-all duration-200 bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{document.file_name}</p>
                        <p className="text-sm text-gray-600">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium mr-2">
                            {documentCategories.find(cat => cat.id === document.category)?.label}
                          </span>
                          Uploaded {formatDistanceToNow(new Date(document.created_at), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => downloadDocument(document)}
                      className="hover:bg-blue-50 border-blue-200 text-blue-700 hover:text-blue-800"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-xl border-0 bg-white/90">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
                <FileText className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">No documents yet</h3>
              <p className="text-gray-600 text-center mb-6 max-w-md leading-relaxed">
                Upload your first document to get started with our secure document management system
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardWrapper>
  );
};

export default Documents;
