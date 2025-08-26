
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface DocumentUploadFormProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  onSuccess?: () => void;
}

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

const DocumentUploadForm = ({ isOpen, onClose, category: initialCategory, onSuccess }: DocumentUploadFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedUserId, setSelectedUserId] = useState(user?.id || '');

  // Check if user is admin by fetching role from database
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

  // Fetch all users for admin selection
  const { data: users } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, full_name, email')
        .order('full_name');
      
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const targetUserId = isAdmin ? selectedUserId : user!.id;
      const fileName = `${targetUserId}/${selectedCategory}/${Date.now()}-${file.name}`;
      
      // Upload to storage
      const { data: storageData, error: storageError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (storageError) throw storageError;

      // Save metadata to database
      const { data, error } = await supabase
        .from('documents')
        .insert({
          user_id: targetUserId,
          file_name: file.name,
          file_path: storageData.path,
          file_size: file.size,
          mime_type: file.type,
          document_type: 'document',
          category: selectedCategory,
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
      queryClient.invalidateQueries({ queryKey: ['correspondence-documents'] });
      queryClient.invalidateQueries({ queryKey: ['user-documents'] });
      queryClient.invalidateQueries({ queryKey: ['shareholders-documents'] });
      onClose();
      setUploadFile(null);
      if (onSuccess) onSuccess();
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

    if (!selectedCategory) {
      toast({
        title: "Error",
        description: "Please select a category",
        variant: "destructive",
      });
      return;
    }

    if (isAdmin && !selectedUserId) {
      toast({
        title: "Error",
        description: "Please select a user",
        variant: "destructive",
      });
      return;
    }

    uploadMutation.mutate(uploadFile);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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

          {isAdmin && (
            <div>
              <label className="block text-sm font-medium mb-2">Select User / Client</label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Choose a user...</option>
                {users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.full_name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
          )}

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
            disabled={!uploadFile || !selectedCategory || (isAdmin && !selectedUserId) || uploadMutation.isPending}
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
  );
};

export default DocumentUploadForm;
