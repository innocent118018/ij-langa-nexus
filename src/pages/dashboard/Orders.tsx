import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Package, Eye, Download, Mail } from 'lucide-react';
import { PaymentButton } from '@/components/payments/PaymentButton';
import { DashboardWrapper } from '@/components/dashboard/DashboardWrapper';
import { OrderDetailsModal } from '@/components/orders/OrderDetailsModal';
import { ContactSupportModal } from '@/components/orders/ContactSupportModal';
import { CancelOrderModal } from '@/components/orders/CancelOrderModal';
import { CancelOrderModal } from '@/components/orders/CancelOrderModal';
import { useCoupons } from '@/hooks/useCoupons';

const Orders = () => {
  const { user, loading } = useAuth();
  const { availableCoupon, createCouponForNextOrder } = useCoupons();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showContactSupport, setShowContactSupport] = useState(false);
  const [supportOrder, setSupportOrder] = useState<any>(null);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['user-orders', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          services(name, description, price),
          order_items(quantity, price, total)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'default';
      case 'in_progress':
        return 'secondary';
      case 'completed':
        return 'default'; // Changed from 'success' to fix TypeScript error
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
      day: 'numeric'
    });
  };

  // Generate coupon for completed orders
  React.useEffect(() => {
    if (orders.length > 0) {
      const hasCompletedOrder = orders.some(order => order.status === 'completed');
      if (hasCompletedOrder && !availableCoupon) {
        // Only create if user doesn't already have a coupon
        createCouponForNextOrder();
      }
    }
  }, [orders, availableCoupon, createCouponForNextOrder]);

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleContactSupport = (order: any) => {
    setSupportOrder(order);
    setShowContactSupport(true);
  };

  return (
    <DashboardWrapper>
      {availableCoupon && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎉</span>
            <div>
              <h3 className="font-semibold text-green-800">You have a 5% discount coupon!</h3>
              <p className="text-sm text-green-600">
                Code: <strong>{availableCoupon.code}</strong> - Will be automatically applied to your next order
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-8 max-w-7xl mx-auto px-6 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
        <p className="text-muted-foreground">
          View and manage your service orders
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      Order #{order.id.slice(-8).toUpperCase()}
                    </CardTitle>
                    <CardDescription>
                      Placed on {formatDate(order.created_at)}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusColor(order.status)}>
                    {order.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h4 className="font-medium">{order.services?.name || 'Service'}</h4>
                      <p className="text-sm text-muted-foreground">
                        {order.services?.description || order.notes}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">R{order.total_amount?.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">
                        (incl. VAT R{order.vat_amount?.toLocaleString()})
                      </p>
                    </div>
                  </div>

                  {order.admin_notes && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm">
                        <strong>Admin Notes:</strong> {order.admin_notes}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-4">
                    {order.status === 'pending' && (
                      <PaymentButton
                        invoiceId={order.id}
                        amount={order.total_amount || 0}
                        description={`Payment for ${order.services?.name || 'Service'}`}
                      />
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewOrder(order)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleContactSupport(order)}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Support
                    </Button>
                    {order.status === 'pending' && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsCancelModalOpen(true);
                        }}
                      >
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
            <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
            <Button>
              Browse Services
            </Button>
          </CardContent>
        </Card>
      )}
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={showOrderDetails}
        onClose={() => setShowOrderDetails(false)}
      />

      {/* Contact Support Modal */}
      <ContactSupportModal
        order={supportOrder}
        isOpen={showContactSupport}
        onClose={() => setShowContactSupport(false)}
      />

      {/* Cancel Order Modal */}
      <CancelOrderModal
        isOpen={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
          setSelectedOrder(null);
        }}
        orderId={selectedOrder?.id || ''}
        orderNumber={selectedOrder?.id}
        onOrderCancelled={() => {
          window.location.reload();
        }}
      />
    </DashboardWrapper>
  );
};

export default Orders;
