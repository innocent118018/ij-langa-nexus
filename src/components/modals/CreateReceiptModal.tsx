import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateReceipt, useGetNextReceiptNumber } from '@/hooks/useReceipts';
import { useCustomers } from '@/hooks/useCustomers';
import { useAuth } from '@/hooks/useAuth';

interface CreateReceiptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateReceiptModal = ({ open, onOpenChange }: CreateReceiptModalProps) => {
  const { user } = useAuth();
  const { data: customers } = useCustomers();
  const { data: nextReceiptNumber } = useGetNextReceiptNumber();
  const createReceiptMutation = useCreateReceipt();

  const [formData, setFormData] = useState({
    receipt_number: '',
    reference: '',
    receipt_date: new Date().toISOString().split('T')[0],
    amount: '',
    payment_method: 'Bank Transfer',
    description: '',
    status: 'Cleared',
    customer_id: '',
    account_id: '',
  });

  useEffect(() => {
    if (nextReceiptNumber) {
      setFormData(prev => ({ ...prev, receipt_number: nextReceiptNumber }));
    }
  }, [nextReceiptNumber]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) return;

    try {
      await createReceiptMutation.mutateAsync({
        ...formData,
        amount: parseFloat(formData.amount),
        user_id: user.id,
        customer_id: formData.customer_id || undefined,
        account_id: formData.account_id || user.id, // Default to user ID if no account specified
      });
      
      onOpenChange(false);
      setFormData({
        receipt_number: '',
        reference: '',
        receipt_date: new Date().toISOString().split('T')[0],
        amount: '',
        payment_method: 'Bank Transfer',
        description: '',
        status: 'Cleared',
        customer_id: '',
        account_id: '',
      });
    } catch (error) {
      console.error('Error creating receipt:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Receipt</DialogTitle>
          <DialogDescription>
            Add a new customer payment receipt to the system.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="receipt_number">Receipt Number</Label>
              <Input
                id="receipt_number"
                value={formData.receipt_number}
                onChange={(e) => setFormData(prev => ({ ...prev, receipt_number: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="reference">Reference</Label>
              <Input
                id="reference"
                value={formData.reference}
                onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="receipt_date">Receipt Date</Label>
              <Input
                id="receipt_date"
                type="date"
                value={formData.receipt_date}
                onChange={(e) => setFormData(prev => ({ ...prev, receipt_date: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount (ZAR)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="payment_method">Payment Method</Label>
              <Select
                value={formData.payment_method}
                onValueChange={(value) => setFormData(prev => ({ ...prev, payment_method: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Cheque">Cheque</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="EFT">EFT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cleared">Cleared</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="customer_id">Customer Account (Optional)</Label>
            <Select
              value={formData.customer_id}
              onValueChange={(value) => setFormData(prev => ({ ...prev, customer_id: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select customer account" />
              </SelectTrigger>
              <SelectContent>
                {customers?.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.customer_name} ({customer.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createReceiptMutation.isPending}>
              {createReceiptMutation.isPending ? 'Creating...' : 'Create Receipt'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};