import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Folder, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Folders() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Folders</h1>
            <p className="text-muted-foreground">
              Organize and manage business documents and files
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Document Organization</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search folders..." className="pl-8 w-64" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Access</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="flex items-center">
                    <Folder className="mr-2 h-4 w-4 text-blue-500" />
                    <span className="font-medium">Financial Reports</span>
                  </TableCell>
                  <TableCell>Folder</TableCell>
                  <TableCell>25</TableCell>
                  <TableCell>12.5 MB</TableCell>
                  <TableCell>2024-01-15</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Private</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Open</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-green-500" />
                    <span className="font-medium">Annual Budget.xlsx</span>
                  </TableCell>
                  <TableCell>File</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>2.1 MB</TableCell>
                  <TableCell>2024-01-10</TableCell>
                  <TableCell>
                    <Badge variant="default">Shared</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}