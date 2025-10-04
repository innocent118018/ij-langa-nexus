import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function IntangibleAssets() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Intangible Assets</h1>
            <p className="text-muted-foreground">
              Manage intellectual property and intangible assets
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Intangible Asset
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Intangible Assets Overview</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search assets..." className="pl-8 w-64" />
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
                  <TableHead>Asset #</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Acquisition Date</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Accumulated Amortization</TableHead>
                  <TableHead>Book Value</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">IA-001</TableCell>
                  <TableCell>Software License</TableCell>
                  <TableCell>License</TableCell>
                  <TableCell>2023-01-15</TableCell>
                  <TableCell>R50,000.00</TableCell>
                  <TableCell>R10,000.00</TableCell>
                  <TableCell>R40,000.00</TableCell>
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