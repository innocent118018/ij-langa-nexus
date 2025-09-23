import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

interface OrderDetailsModalProps {
  order: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  open,
  onOpenChange,
}) => {
  if (!order) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount).replace('ZAR', 'R');
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-500',
      'processing': 'bg-blue-500',
      'completed': 'bg-green-500',
      'cancelled': 'bg-red-500',
      'failed': 'bg-red-500'
    };
    return colors[status.toLowerCase() as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order Details</span>
            <Badge className={`${getStatusColor(order.status)} text-white`}>
              {order.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-3">Order Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-mono">{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date Placed:</span>
                  <span>{formatDate(order.created_at)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span>{formatDate(order.updated_at)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                    {order.status === 'completed' ? 'Paid' : 'Pending'}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Customer Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span>{order.customer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span>{order.customer_email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span>{order.customer_phone || 'Not provided'}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Billing Address */}
          {order.customer_address && (
            <>
              <div>
                <h3 className="font-semibold text-lg mb-3">Billing Address</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="whitespace-pre-line">{order.customer_address}</p>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Order Items */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Order Items</h3>
            <div className="space-y-3">
              {/* Mock order items - in real app, fetch from order_items table */}
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <div className="font-medium">Service Item</div>
                  <div className="text-sm text-muted-foreground">Professional service consultation</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{formatCurrency(order.subtotal)}</div>
                  <div className="text-sm text-muted-foreground">Qty: 1</div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">VAT (15%):</span>
                <span>{formatCurrency(order.vat_amount)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>{formatCurrency(order.total_amount)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Payment Method</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <p>Online Payment</p>
              <p className="text-sm text-muted-foreground">
                Payment processed through secure payment gateway
              </p>
            </div>
          </div>

          {/* Admin Notes */}
          {order.admin_notes && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Admin Notes</h3>
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md">
                <p>{order.admin_notes}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};