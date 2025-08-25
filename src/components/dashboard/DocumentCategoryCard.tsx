
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DocumentCategoryCardProps {
  category: {
    id: string;
    label: string;
    icon: LucideIcon;
    description: string;
  };
  documents: any[];
  onDownload: (doc: any) => void;
}

export const DocumentCategoryCard = ({ category, documents, onDownload }: DocumentCategoryCardProps) => {
  const Icon = category.icon;
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Icon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{category.label}</CardTitle>
              <CardDescription className="text-sm">
                {documents.length} documents
              </CardDescription>
            </div>
          </div>
          <Link to={`/dashboard/documents/${category.id}`}>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">
          {category.description}
        </p>
        {documents.length > 0 && (
          <div className="space-y-2">
            {documents.slice(0, 2).map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                <span className="truncate flex-1" title={doc.file_name}>
                  {doc.file_name}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onDownload(doc)}
                  className="ml-2"
                >
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            ))}
            {documents.length > 2 && (
              <p className="text-xs text-muted-foreground">
                +{documents.length - 2} more documents
              </p>
            )}
          </div>
        )}
        {documents.length === 0 && (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-2">No documents yet</p>
            <Link to={`/dashboard/documents/${category.id}`}>
              <Button variant="outline" size="sm">
                Upload First Document
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
