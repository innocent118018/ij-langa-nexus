
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Search, 
  Plus,
  Edit,
  Eye,
  Globe,
  Image,
  Video,
  File,
  Calendar
} from 'lucide-react';

const ContentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock content data
  const contentItems = [
    {
      id: 'CNT001',
      title: 'Company Registration Services',
      type: 'Service Page',
      status: 'Published',
      lastModified: '2025-01-15',
      author: 'Admin',
      views: 1250
    },
    {
      id: 'CNT002',
      title: 'Tax Compliance Guide',
      type: 'Blog Post',
      status: 'Draft',
      lastModified: '2025-01-12',
      author: 'IJ Langa',
      views: 0
    },
    {
      id: 'CNT003',
      title: 'About IJ Langa Consulting',
      type: 'About Page',
      status: 'Published',
      lastModified: '2025-01-10',
      author: 'Admin',
      views: 850
    },
    {
      id: 'CNT004',
      title: 'Privacy Policy',
      type: 'Policy Page',
      status: 'Published',
      lastModified: '2025-01-08',
      author: 'Legal Team',
      views: 320
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Published':
        return <Badge className="bg-green-100 text-green-800"><Globe className="h-3 w-3 mr-1" />Published</Badge>;
      case 'Draft':
        return <Badge className="bg-gray-100 text-gray-800"><Edit className="h-3 w-3 mr-1" />Draft</Badge>;
      case 'Review':
        return <Badge className="bg-yellow-100 text-yellow-800"><Eye className="h-3 w-3 mr-1" />Under Review</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Service Page':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'Blog Post':
        return <File className="h-4 w-4 text-green-600" />;
      case 'About Page':
        return <Globe className="h-4 w-4 text-purple-600" />;
      case 'Policy Page':
        return <FileText className="h-4 w-4 text-red-600" />;
      default:
        return <File className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Content Management</h1>
          <p className="text-slate-600">Manage website content, pages, and media</p>
        </div>
        <Button className="bg-slate-900 hover:bg-slate-800">
          <Plus className="h-4 w-4 mr-2" />
          Create Content
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search content by title or type..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pages</p>
                <p className="text-2xl font-bold text-slate-900">
                  {contentItems.filter(item => item.type.includes('Page')).length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Blog Posts</p>
                <p className="text-2xl font-bold text-green-900">
                  {contentItems.filter(item => item.type === 'Blog Post').length}
                </p>
              </div>
              <File className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-blue-900">
                  {contentItems.filter(item => item.status === 'Published').length}
                </p>
              </div>
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-purple-900">
                  {contentItems.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
                </p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Create New Page</h3>
            <p className="text-sm text-gray-600 mb-4">Add a new service or information page</p>
            <Button variant="outline" size="sm">Create Page</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Image className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Media Library</h3>
            <p className="text-sm text-gray-600 mb-4">Manage images and documents</p>
            <Button variant="outline" size="sm">Browse Media</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Video className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">SEO Settings</h3>
            <p className="text-sm text-gray-600 mb-4">Optimize for search engines</p>
            <Button variant="outline" size="sm">Manage SEO</Button>
          </CardContent>
        </Card>
      </div>

      {/* Content Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Content Items</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Title</th>
                  <th className="text-left p-4 font-medium text-gray-900">Type</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Author</th>
                  <th className="text-left p-4 font-medium text-gray-900">Last Modified</th>
                  <th className="text-left p-4 font-medium text-gray-900">Views</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contentItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(item.type)}
                        <span className="font-medium text-slate-900">{item.title}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-600">{item.type}</span>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-600">{item.author}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-sm text-gray-600">{item.lastModified}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium">{item.views.toLocaleString()}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;
