import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  Download, 
  Upload, 
  Search, 
  Filter, 
  Calendar,
  User,
  Mail,
  Share,
  Eye,
  Trash2
} from 'lucide-react';
import DocumentUploadForm from './DocumentUploadForm';

interface DocumentFile {
  id: string;
  file_name: string;
  file_path: string;
  category: string;
  document_type: string;
  file_size?: number;
  created_at: string;
  user_id: string;
  uploaded_by?: string;
  users?: {
    full_name: string;
    email: string;
  };
  uploaders?: {
    full_name: string;
    email: string;
  };
}

interface DocumentManagementProps {
  userFilter?: string;
  categoryFilter?: string;
  showUserSelection?: boolean;
}

const DocumentManagement = ({ 
  userFilter, 
  categoryFilter, 
  showUserSelection = false 
}: DocumentManagementProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || 'all');
  const [selectedUser, setSelectedUser] = useState(userFilter || '');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<DocumentFile | null>(null);

  // Check if user is admin
  const { data: userRole } = useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();
      if (error) throw error;
      return data.role;
    },
    enabled: !!user?.id,
  });

  const isAdmin = userRole && ['admin', 'super_admin', 'accountant', 'consultant'].includes(userRole);

  // Fetch documents
  const { data: documents = [], isLoading } = useQuery({
    queryKey: ['documents', user?.id, selectedUser, selectedCategory, isAdmin],
    queryFn: async () => {
      if (!user?.id) return [];
      
      let query = supabase
        .from('documents')
        .select(`
          *,
          users:user_id(full_name, email),
          uploaders:uploaded_by(full_name, email)
        `);

      // Apply filters based on user role and selections
      if (!isAdmin) {
        query = query.eq('user_id', user.id);
      } else if (selectedUser && selectedUser !== 'all') {
        query = query.eq('user_id', selectedUser);
      }

      if (selectedCategory && selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as any[];
    },
    enabled: !!user?.id,
  });

  // Fetch users for admin filter
  const { data: users = [] } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, full_name, email')
        .order('full_name');
      
      if (error) throw error;
      return data;
    },
    enabled: isAdmin && showUserSelection,
  });

  // Delete document mutation
  const deleteDocumentMutation = useMutation({
    mutationFn: async (documentId: string) => {
      // First get the document to delete from storage
      const document = documents.find(d => d.id === documentId);
      if (document) {
        const { error: storageError } = await supabase.storage
          .from('documents')
          .remove([document.file_path]);
        
        if (storageError) {
          console.warn('Storage deletion error:', storageError);
        }
      }

      // Delete from database
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', documentId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Document deleted",
        description: "Document has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete document",
        variant: "destructive",
      });
    },
  });

  // Download document function
  const downloadDocument = async (document: DocumentFile) => {
    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .download(document.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = globalThis.document.createElement('a');
      a.href = url;
      a.download = document.file_name;
      globalThis.document.body.appendChild(a);
      a.click();
      globalThis.document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Download started",
        description: `Downloading ${document.file_name}`,
      });
    } catch (error: any) {
      toast({
        title: "Download failed",
        description: error.message || "Failed to download document",
        variant: "destructive",
      });
    }
  };

  // Share document via email (mock function)
  const shareDocument = (document: DocumentFile) => {
    if (!shareEmail) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, this would send an email with a secure link
    toast({
      title: "Document shared",
      description: `Document ${document.file_name} shared with ${shareEmail}`,
    });
    setShareEmail('');
    setSelectedDocument(null);
  };

  // Filter documents based on search term
  const filteredDocuments = documents.filter(doc =>
    doc.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
  };

  const documentCategories = [
    { id: 'shareholders', label: 'Shareholders' },
    { id: 'invoices', label: 'My Invoices' },
    { id: 'quotes', label: 'My Quotes' },
    { id: 'statements', label: 'My Statement' },
    { id: 'tax_clearance', label: 'Tax Clearance' },
    { id: 'cipc', label: 'CIPC' },
    { id: 'csd', label: 'CSD' },
    { id: 'correspondence', label: 'Correspondence' },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Upload Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Document Management</h2>
          <p className="text-muted-foreground">
            Manage and organize documents
          </p>
        </div>
        <Button onClick={() => setIsUploadModalOpen(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {documentCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {isAdmin && showUserSelection && (
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.full_name} ({user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedUser('');
            }}>
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div className="space-y-4">
        {isLoading ? (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading documents...</p>
            </CardContent>
          </Card>
        ) : filteredDocuments.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Documents Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedCategory !== 'all' || selectedUser !== '' 
                  ? 'Try adjusting your search criteria or filters.'
                  : 'Upload your first document to get started.'
                }
              </p>
              <Button onClick={() => setIsUploadModalOpen(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredDocuments.map((document) => (
            <Card key={document.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div className="flex-1">
                      <h4 className="font-medium">{document.file_name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <Badge variant="outline">{document.category}</Badge>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(document.created_at).toLocaleDateString()}
                        </div>
                        <span>{formatFileSize(document.file_size)}</span>
                        {isAdmin && document.users && (
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {document.users.full_name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadDocument(document)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>

                    {isAdmin && (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedDocument(document)}
                            >
                              <Share className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Share Document</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p className="text-sm text-muted-foreground">
                                Share "{document.file_name}" via email
                              </p>
                              <div className="flex gap-2">
                                <Input
                                  placeholder="Enter email address..."
                                  value={shareEmail}
                                  onChange={(e) => setShareEmail(e.target.value)}
                                  type="email"
                                />
                                <Button onClick={() => shareDocument(document)}>
                                  <Mail className="h-4 w-4 mr-1" />
                                  Share
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteDocumentMutation.mutate(document.id)}
                          disabled={deleteDocumentMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Upload Modal */}
      <DocumentUploadForm
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        category={selectedCategory === 'all' ? '' : selectedCategory}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ['documents'] });
          setIsUploadModalOpen(false);
        }}
      />
    </div>
  );
};

export default DocumentManagement;