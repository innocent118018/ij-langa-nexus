import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FolderOpen, Search, Upload, Download, Trash2, Loader2, File, FileText, Image } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

const AdminDocuments = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [usersList, setUsersList] = useState<any[]>([]);

  useEffect(() => {
    fetchDocuments();
    fetchUsers();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('id, full_name').order('full_name');
      if (error) throw error;
      setUsersList(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUploadForUser = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedUserId) {
      toast.error('Please select a user first');
      return;
    }

    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const path = `${selectedUserId}/${Date.now()}-${file.name}`;
      
      const { error: uploadError } = await supabase.storage.from('user-files').upload(path, file);
      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase.from('documents').insert({
        user_id: selectedUserId,
        file_name: file.name,
        document_type: 'admin_upload',
        file_path: path,
        file_size: file.size,
        mime_type: file.type,
        uploaded_by: user?.id,
      });

      if (dbError) throw dbError;
      toast.success('Document uploaded successfully');
      fetchDocuments();
      setSelectedUserId('');
    } catch (error) {
      console.error('Error uploading document:', error);
      toast.error('Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const downloadDocument = async (doc: any) => {
    try {
      const { data, error } = await supabase.storage.from('user-files').createSignedUrl(doc.file_path, 60);
      if (error) throw error;
      window.open(data.signedUrl, '_blank');
    } catch (error) {
      console.error('Error downloading document:', error);
      toast.error('Failed to download document');
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType?.includes('image')) return <Image className="h-5 w-5 text-blue-500" />;
    if (mimeType?.includes('pdf')) return <FileText className="h-5 w-5 text-red-500" />;
    return <File className="h-5 w-5 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return '-';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const filteredDocuments = documents.filter(doc =>
    doc.file_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Document Browser</h1>
          <p className="text-muted-foreground">Manage all user documents</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Upload className="h-4 w-4 mr-2" />Upload for User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Document for User</DialogTitle>
              <DialogDescription>Select a user and upload a document to their account</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Select User</Label>
                <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                  <SelectTrigger><SelectValue placeholder="Select user" /></SelectTrigger>
                  <SelectContent>
                    {usersList.map(user => (
                      <SelectItem key={user.id} value={user.id}>{user.full_name || 'Unnamed User'}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Select File</Label>
                <input type="file" id="admin-file-upload" className="hidden" onChange={handleUploadForUser} disabled={uploading || !selectedUserId} />
                <Button asChild variant="outline" className="w-full" disabled={uploading || !selectedUserId}>
                  <label htmlFor="admin-file-upload" className="cursor-pointer">
                    {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                    Choose File
                  </label>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search documents..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Documents</CardTitle>
          <CardDescription>{filteredDocuments.length} documents found</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : filteredDocuments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No documents found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {getFileIcon(doc.mime_type)}
                        <span className="font-medium">{doc.file_name}</span>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline">{doc.document_type || 'General'}</Badge></TableCell>
                    <TableCell>{formatFileSize(doc.file_size)}</TableCell>
                    <TableCell>{format(new Date(doc.created_at), 'dd MMM yyyy')}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => downloadDocument(doc)}><Download className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDocuments;
