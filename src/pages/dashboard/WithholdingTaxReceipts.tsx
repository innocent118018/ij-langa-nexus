import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function WithholdingTaxReceipts() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Withholding Tax Receipts</h1>
            <p className="text-muted-foreground">
              Track tax amounts withheld by customers and tax credits receivable
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Withholding Tax Receipt
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Withholding Tax Overview</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search receipts..." className="pl-8 w-64" />
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
                  <TableHead>Receipt #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Tax Withheld</TableHead>
                  <TableHead>Tax Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">WTR-001</TableCell>
                  <TableCell>2024-01-15</TableCell>
                  <TableCell>Acme Corp</TableCell>
                  <TableCell>INV-001</TableCell>
                  <TableCell>R1,575.00</TableCell>
                  <TableCell>10%</TableCell>
                  <TableCell>
                    <Badge variant="default">Received</Badge>
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