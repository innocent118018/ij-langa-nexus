import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, DollarSign, FileText, User } from 'lucide-react';

interface Order {
  id: string;
  status: string;
  created_at: string;
  total_amount: number;
  vat_amount: number;
  subtotal: number;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  notes?: string;
  admin_notes?: string;
  services?: {
    name: string;
    description: string;
    price: number;
  };
  order_items?: Array<{
    quantity: number;
    price: number;
    total: number;
  }>;
}

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailsModal = ({ order, isOpen, onClose }: OrderDetailsModalProps) => {
  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'default';
      case 'processing':
        return 'secondary';
      case 'completed':
        return 'default';
      case 'cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order Details</span>
            <Badge variant={getStatusColor(order.status)}>
              {order.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Order Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Order Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Order ID</p>
                  <p className="font-mono">#{order.id.slice(-8).toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Order Date</p>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p>{formatDate(order.created_at)}</p>
                  </div>
                </div>
              </div>
              
              {order.services && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Service</p>
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <h4 className="font-medium">{order.services.name}</h4>
                    {order.services.description && (
                      <p className="text-sm text-muted-foreground mt-1">{order.services.description}</p>
                    )}
                  </div>
                </div>
              )}

              {order.notes && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Order Notes</p>
                  <p className="text-sm p-3 bg-muted/20 rounded-lg">{order.notes}</p>
                </div>
              )}

              {order.admin_notes && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Admin Notes</p>
                  <p className="text-sm p-3 bg-blue-50 rounded-lg border border-blue-200">{order.admin_notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {order.customer_name && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p>{order.customer_name}</p>
                </div>
              )}
              {order.customer_email && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{order.customer_email}</p>
                </div>
              )}
              {order.customer_phone && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p>{order.customer_phone}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pricing Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pricing Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>R{(order.subtotal || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">VAT (15%):</span>
                <span>R{(order.vat_amount || 0).toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>R{(order.total_amount || 0).toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};