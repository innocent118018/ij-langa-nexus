
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, ShoppingCart } from 'lucide-react';

const Services = () => {
  const { user, loading } = useAuth();

  // Fetch active services that all users can view
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true });

      if (error) throw error;
      return data;
    },
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

  const groupedServices = services?.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof services>);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Available Services</h1>
          <p className="text-muted-foreground">
            Browse and order our professional business services
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="space-y-8">
            {groupedServices && Object.entries(groupedServices).map(([category, categoryServices]) => (
              <div key={category} className="space-y-4">
                <h2 className="text-2xl font-semibold capitalize">{category}</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service) => (
                    <Card key={service.id} className="relative">
                      {service.is_popular && (
                        <Badge className="absolute -top-2 -right-2 bg-orange-500">
                          Popular
                        </Badge>
                      )}
                      <CardHeader>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-2xl font-bold text-primary">
                          R{service.price.toLocaleString()}
                        </div>
                        {service.processing_time && (
                          <p className="text-sm text-muted-foreground">
                            Processing time: {service.processing_time}
                          </p>
                        )}
                        <Button className="w-full">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Order Service
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Services;
