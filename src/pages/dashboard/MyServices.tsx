import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: string;
  description?: string;
  price: number;
}

interface Order {
  id: string;
  status: string;
  created_at: string;
  total_amount: number;
  service_id?: string;
  services?: Service;
}

const MyServices = () => {
  const { user, loading } = useAuth();

  // Fetch user's service orders
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['user-service-orders', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          services(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Order[];
    },
    enabled: !!user?.id,
  });

  // Fetch available services
  const { data: availableServices = [] } = useQuery({
    queryKey: ['available-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Loading your services...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Services</h1>
          <p className="text-muted-foreground">
            Track your active services and view order history
          </p>
        </div>
        <Button onClick={() => window.location.href = '/services'}>
          Browse Services
        </Button>
      </div>

      {/* Active Services */}
      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">Active Services</h2>
        {orders.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Services Yet</h3>
              <p className="text-muted-foreground mb-4">
                You haven't ordered any services yet. Browse our available services to get started.
              </p>
              <Button onClick={() => window.location.href = '/services'}>
                Browse Services
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {order.services?.name || `Order #${order.id.slice(-8)}`}
                    </CardTitle>
                    <Badge className={getStatusColor(order.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {order.services?.description && (
                      <p className="text-sm text-muted-foreground">
                        {order.services.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Ordered: {new Date(order.created_at).toLocaleDateString()}
                      </div>
                      <div className="font-medium">
                        R{order.total_amount?.toFixed(2) || '0.00'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Available Services */}
      {availableServices.length > 0 && (
        <div className="grid gap-4">
          <h2 className="text-xl font-semibold">Available Services</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableServices.slice(0, 6).map((service) => (
              <Card key={service.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {service.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {service.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        {service.category}
                      </span>
                      <span className="font-bold text-primary">
                        R{service.price?.toFixed(2)}
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => window.location.href = `/services/${service.category}/${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {availableServices.length > 6 && (
            <div className="text-center">
              <Button variant="outline" onClick={() => window.location.href = '/services'}>
                View All Services
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyServices;