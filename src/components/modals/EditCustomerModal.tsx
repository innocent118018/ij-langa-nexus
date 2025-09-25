import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Customer } from '@/hooks/useCustomers';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface EditCustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
}

export const EditCustomerModal = ({ open, onOpenChange, customer }: EditCustomerModalProps) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    billing_address: '',
    delivery_address: '',
    credit_limit: 0,
    default_due_date_days: 7,
    default_hourly_rate: '',
    is_active: true,
    customer_code: '',
    id_number: '',
    company_name: '',
    username: '',
    cell_numbers: '',
    password: '',
    image_url: '',
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        customer_name: customer.customer_name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        billing_address: customer.billing_address || '',
        delivery_address: customer.delivery_address || '',
        credit_limit: customer.credit_limit || 0,
        default_due_date_days: 7, // Default value
        default_hourly_rate: '', // Default empty
        is_active: customer.account_status === 'active',
        customer_code: customer.id?.substring(0, 8) || '',
        id_number: '',
        company_name: customer.customer_name || '',
        username: customer.email?.split('@')[0] || '',
        cell_numbers: customer.phone || '',
        password: '',
        image_url: '',
      });
    }
  }, [customer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('customer_accounts')
        .update({
          customer_name: formData.customer_name,
          email: formData.email,
          phone: formData.phone,
          billing_address: formData.billing_address,
          delivery_address: formData.delivery_address,
          credit_limit: formData.credit_limit,
          default_due_date_days: formData.default_due_date_days,
          default_hourly_rate: formData.default_hourly_rate ? parseFloat(formData.default_hourly_rate) : null,
          has_default_hourly_rate: Boolean(formData.default_hourly_rate),
          account_status: formData.is_active ? 'active' : 'inactive',
          updated_at: new Date().toISOString(),
        })
        .eq('id', customer.id);

      if (error) throw error;

      toast.success('Customer updated successfully');
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating customer:', error);
      toast.error('Failed to update customer');
    } finally {
      setLoading(false);
    }
  };

  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Customer Details</DialogTitle>
          <DialogDescription>
            Update customer information and account settings.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer_name">Name</Label>
              <Input
                id="customer_name"
                value={formData.customer_name}
                onChange={(e) => setFormData(prev => ({ ...prev, customer_name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="customer_code">Code</Label>
              <Input
                id="customer_code"
                value={formData.customer_code}
                onChange={(e) => setFormData(prev => ({ ...prev, customer_code: e.target.value }))}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Cell Numbers</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="id_number">ID Number</Label>
              <Input
                id="id_number"
                value={formData.id_number}
                onChange={(e) => setFormData(prev => ({ ...prev, id_number: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="username">User Name</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Leave empty to keep current password"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="billing_address">Billing Address</Label>
            <Textarea
              id="billing_address"
              value={formData.billing_address}
              onChange={(e) => setFormData(prev => ({ ...prev, billing_address: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="delivery_address">Delivery Address</Label>
            <Textarea
              id="delivery_address"
              value={formData.delivery_address}
              onChange={(e) => setFormData(prev => ({ ...prev, delivery_address: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="credit_limit">Credit Limit</Label>
              <Input
                id="credit_limit"
                type="number"
                step="0.01"
                value={formData.credit_limit}
                onChange={(e) => setFormData(prev => ({ ...prev, credit_limit: parseFloat(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <Label htmlFor="default_hourly_rate">Default Hourly Rate</Label>
              <Input
                id="default_hourly_rate"
                type="number"
                step="0.01"
                value={formData.default_hourly_rate}
                onChange={(e) => setFormData(prev => ({ ...prev, default_hourly_rate: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="autofill_due_date"
              checked={Boolean(formData.default_due_date_days)}
              onCheckedChange={(checked) => setFormData(prev => ({ 
                ...prev, 
                default_due_date_days: checked ? 7 : 0 
              }))}
            />
            <div className="flex items-center gap-2">
              <Label htmlFor="autofill_due_date">Autofill — Sales Invoice — Due date</Label>
              <Input
                type="number"
                value={formData.default_due_date_days}
                onChange={(e) => setFormData(prev => ({ ...prev, default_due_date_days: parseInt(e.target.value) || 0 }))}
                className="w-20"
                disabled={!formData.default_due_date_days}
              />
              <span className="text-sm text-muted-foreground">days</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
            />
            <Label htmlFor="is_active">Active Account</Label>
          </div>

          <div>
            <Label htmlFor="image_url">Profile Image URL</Label>
            <Input
              id="image_url"
              value={formData.image_url}
              onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Customer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};