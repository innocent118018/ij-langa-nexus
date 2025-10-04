import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function InventoryWriteoffs() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Inventory Write-offs</h1>
            <p className="text-muted-foreground">
              Record inventory losses due to damage, theft, or obsolescence
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Write-off
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Write-offs Overview</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search write-offs..." className="pl-8 w-64" />
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
                  <TableHead>Write-off #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Cost</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">WO-001</TableCell>
                  <TableCell>2024-01-15</TableCell>
                  <TableCell>Laptop Computer</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>R8,500.00</TableCell>
                  <TableCell>R8,500.00</TableCell>
                  <TableCell>Damaged</TableCell>
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