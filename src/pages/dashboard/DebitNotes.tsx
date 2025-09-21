import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDebitNotes } from '@/hooks/usePurchaseData';
import { CreateDebitNoteModal } from '@/components/modals/CreateDebitNoteModal';

export default function DebitNotes() {
  const { debitNotes, isLoading } = useDebitNotes();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredDebitNotes = debitNotes.filter(note =>
    note.debit_note_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.suppliers?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.reason?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading debit notes...</div>
        </div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Debit Notes</h1>
            <p className="text-muted-foreground">
              Manage supplier debit notes for returns and adjustments
            </p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Debit Note
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Debit Notes Overview</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search debit notes..." 
                    className="pl-8 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
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
                  <TableHead>Debit Note #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDebitNotes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      {searchTerm ? 'No debit notes found matching your search.' : 'No debit notes found. Create your first debit note to get started.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDebitNotes.map((note) => (
                    <TableRow key={note.id}>
                      <TableCell className="font-medium">{note.debit_note_number}</TableCell>
                      <TableCell>{new Date(note.issue_date).toLocaleDateString()}</TableCell>
                      <TableCell>{note.suppliers?.name || 'N/A'}</TableCell>
                      <TableCell>{formatCurrency(note.total_amount)}</TableCell>
                      <TableCell className="max-w-xs truncate">{note.reason || 'No reason provided'}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(note.status)}>
                          {note.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <CreateDebitNoteModal
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
        />
      </div>
    </DashboardLayout>
  );
}