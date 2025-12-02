import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, Trash2, File, Image, FileSpreadsheet } from 'lucide-react';
import DocumentUploader from '@/components/documents/DocumentUploader';

interface Document {
  id: string;
  filename: string | null;
  mime_type: string | null;
  size: number | null;
  storage_path: string;
  created_at: string;
}

export default function UserDocuments() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDocuments();
    }
  }, [user]);

  async function fetchDocuments() {
    setLoading(true);
    const { data, error } = await supabase
      .from('company_documents')
      .select('*')
      .eq('uploaded_by', user?.id)
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setDocuments(data);
    }
    setLoading(false);
  }

  const getFileIcon = (mimeType: string | null) => {
    if (mimeType?.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (mimeType?.includes('spreadsheet') || mimeType?.includes('excel')) return <FileSpreadsheet className="h-4 w-4" />;
    if (mimeType?.includes('pdf')) return <FileText className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return '-';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  async function downloadDocument(doc: Document) {
    const { data, error } = await supabase.storage
      .from('user-files')
      .createSignedUrl(doc.storage_path, 60);
    
    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank');
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Documents</h1>
        <p className="text-muted-foreground">Upload and manage your documents</p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload New Document</CardTitle>
        </CardHeader>
        <CardContent>
          <DocumentUploader onUploadComplete={fetchDocuments} />
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading documents...</div>
          ) : documents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No documents uploaded yet
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getFileIcon(doc.mime_type)}
                        {doc.filename || 'Unnamed'}
                      </div>
                    </TableCell>
                    <TableCell>{doc.mime_type || '-'}</TableCell>
                    <TableCell>{formatFileSize(doc.size)}</TableCell>
                    <TableCell>
                      {new Date(doc.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadDocument(doc)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
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
}
