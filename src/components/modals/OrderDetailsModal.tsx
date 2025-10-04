import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
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
          <DialogDescription>
            View complete order information including customer details, billing summary, and transaction history.
          </DialogDescription>
        </DialogHeader>

        {/* Enhanced order details modal with comprehensive information */}
        <div className="space-y-6">
          {/* Order Information */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">Order Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-mono text-sm">{order.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Date Placed:</span>
                  <span>{formatDate(order.created_at)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span>{formatDate(order.updated_at || order.created_at)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status === 'completed' ? 'Paid' : order.status === 'pending' ? 'Pending Payment' : order.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span>Online Payment Gateway</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Customer Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Name:</span>
                  <span>{order.customer_name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="break-all">{order.customer_email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Phone:</span>
                  <span>{order.customer_phone || 'Not provided'}</span>
                </div>
                {order.customer_address && (
                  <div>
                    <span className="text-muted-foreground block mb-1">Address:</span>
                    <div className="bg-muted p-2 rounded text-sm">
                      {order.customer_address}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Service/Order Details */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Service Details</h3>
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium">Professional Service</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {order.service_type || 'Business consultation and professional services'}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="font-medium">{formatCurrency(order.subtotal || 0)}</div>
                    <div className="text-sm text-muted-foreground">Excl. VAT</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Billing Summary */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Billing Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal (Excl. VAT):</span>
                <span>{formatCurrency(order.subtotal || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">VAT (15%):</span>
                <span>{formatCurrency(order.vat_amount || (order.subtotal || 0) * 0.15)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount:</span>
                <span className="text-primary">{formatCurrency(order.total_amount)}</span>
              </div>
            </div>
          </div>

          {/* Admin Notes */}
          {order.admin_notes && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-3">Admin Notes</h3>
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md">
                  <p className="text-sm">{order.admin_notes}</p>
                </div>
              </div>
            </>
          )}

          {/* Transaction Details */}
          <Separator />
          <div>
            <h3 className="font-semibold text-lg mb-3">Transaction Details</h3>
            <div className="bg-muted/20 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-mono">{order.id.substring(0, 16)}...</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment Gateway:</span>
                <span>Secure Online Payment</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Processing Time:</span>
                <span>Instant</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};