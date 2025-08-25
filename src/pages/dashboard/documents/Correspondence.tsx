
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, FileText, Download, Upload, Mail, ArrowLeft, User, Shield } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

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
  users?: {
    full_name: string | null;
    email: string;
  };
}

const Correspondence = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Check if user is admin
  const { data: userRole } = useQuery({
    queryKey: ['user-role'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user?.id)
        .single();
      
      if (error) throw error;
      return data.role;
    },
    enabled: !!user,
  });

  const isAdmin = userRole === 'admin' || userRole === 'super_admin' || userRole === 'accountant' || userRole === 'consultant';

  // Fetch correspondence documents (admins see all, users see only their own)
  const { data: documents, isLoading } = useQuery({
    queryKey: ['correspondence-documents'],
    queryFn: async () => {
      let query = supabase
        .from('documents')
        .select(`
          *,
          users!documents_user_id_fkey(full_name, email)
        `)
        .eq('category', 'correspondence')
        .order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      return data as Document[];
    },
    enabled: !!user,
  });

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const fileName = `${user!.id}/correspondence/${Date.now()}-${file.name}`;
      
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
          category: 'correspondence',
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
        description: "Correspondence document uploaded successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['correspondence-documents'] });
      setIsUploadModalOpen(false);
      setUploadFile(null);
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
    if (!uploadFile) {
      toast({
        title: "Error",
        description: "Please select a file",
        variant: "destructive",
      });
      return;
    }

    uploadMutation.mutate(uploadFile);
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
    } catch (error: any) => {
      toast({
        title: "Error",
        description: "Failed to download document",
        variant: "destructive",
      });
    }
  };

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
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard/documents">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Documents
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Correspondence {isAdmin && '(All Users)'}
                </h1>
                <p className="text-muted-foreground">
                  {isAdmin 
                    ? 'View and manage correspondence from all users'
                    : 'Upload and manage your correspondence documents'
                  }
                </p>
              </div>
            </div>
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
                <DialogTitle>Upload Correspondence Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select File</label>
                  <input
                    type="file"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    className="w-full p-2 border rounded-md"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.xls"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Accepted formats: PDF, DOC, DOCX, JPG, PNG, XLS, XLSX
                  </p>
                </div>
                <Button 
                  onClick={handleUpload} 
                  disabled={!uploadFile || uploadMutation.isPending}
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

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : documents && documents.length > 0 ? (
          <div className="grid gap-4">
            {documents.map((document) => (
              <Card key={document.id}>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <FileText className="h-5 w-5 text-muted-foreground mr-3" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{document.file_name}</CardTitle>
                      {isAdmin && (
                        <div className="flex items-center space-x-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          <User className="h-3 w-3" />
                          <span>{document.users?.full_name || document.users?.email}</span>
                        </div>
                      )}
                    </div>
                    <CardDescription>
                      Uploaded {formatDistanceToNow(new Date(document.created_at), { addSuffix: true })}
                      {document.file_size && ` • ${(document.file_size / 1024 / 1024).toFixed(2)} MB`}
                      {isAdmin && (
                        <span className="flex items-center space-x-1 mt-1">
                          <Shield className="h-3 w-3" />
                          <span className="text-xs">Admin View</span>
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => downloadDocument(document)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardHeader>
                {document.description && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{document.description}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Mail className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No correspondence documents yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Upload your first correspondence document to get started
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Correspondence;
