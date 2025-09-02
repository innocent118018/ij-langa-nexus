
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, ShoppingCart, Plus, Check, Clock, Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PaymentButton } from '@/components/payments/PaymentButton';
import { ServicePackages } from '@/components/services/ServicePackages';

const Services = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user's orders to show current services
  const { data: userOrders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ['user-orders', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          services(name, description)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      if (!user) throw new Error('User not authenticated');

      // Create order in Supabase
      const { data, error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          service_id: orderData.serviceId,
          total_amount: orderData.totalAmount,
          vat_amount: orderData.totalAmount * 0.15,
          notes: orderData.description,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (order) => {
      toast({
        title: "Order Created",
        description: "Your service order has been created. Please complete payment to proceed.",
      });
      queryClient.invalidateQueries({ queryKey: ['user-orders'] });
      
      // Here you would redirect to payment or show payment modal
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      });
    }
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

  const handleOrderService = async (service: any) => {
    await createOrderMutation.mutateAsync({
      serviceId: service.id || null,
      totalAmount: service.totalAmount || service.price,
      description: service.description || service.name
    });
  };

  const pendingOrders = userOrders.filter(order => 
    order.status === 'pending' || order.status === 'in_progress'
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Services</h1>
        <p className="text-muted-foreground">
          Manage your services and order new ones
        </p>
      </div>

      {/* Current Orders */}
      {ordersLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : pendingOrders.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Current Services</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {order.services?.name || 'Service'}
                    <Badge variant={order.status === 'pending' ? 'default' : 'secondary'}>
                      {order.status === 'pending' ? 'Pending Payment' : 'In Progress'}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{order.services?.description || order.notes}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="font-medium">R{order.total_amount?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="capitalize">{order.status.replace('_', ' ')}</span>
                    </div>
                    {order.status === 'pending' && (
                      <PaymentButton
                        invoiceId={order.id}
                        amount={order.total_amount || 0}
                        description={`Payment for ${order.services?.name || 'Service'}`}
                        className="w-full mt-4"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Services</h3>
            <p className="text-gray-500 mb-4">You don't have any pending or active services at the moment.</p>
          </CardContent>
        </Card>
      )}

      {/* Available Services */}
      <ServicePackages onOrderService={handleOrderService} />
    </div>
  );
};

export default Services;
