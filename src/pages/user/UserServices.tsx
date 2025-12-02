import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  category: string | null;
  features: any;
}

export default function UserServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setLoading(true);
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('category', { ascending: true });
    
    if (!error && data) {
      setServices(data);
    }
    setLoading(false);
  }

  const categories = [...new Set(services.map(s => s.category))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Available Services</h1>
        <p className="text-muted-foreground">Browse our professional consulting services</p>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading services...</div>
      ) : (
        categories.map(category => (
          <div key={category} className="space-y-4">
            <h2 className="text-lg font-semibold capitalize">{category || 'Other Services'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services
                .filter(s => s.category === category)
                .map(service => (
                  <Card key={service.id} className="flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          <CardDescription className="mt-1">
                            {service.description?.slice(0, 100)}
                            {(service.description?.length || 0) > 100 && '...'}
                          </CardDescription>
                        </div>
                        {service.category && (
                          <Badge variant="secondary" className="capitalize">
                            {service.category}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      {/* Features */}
                      {service.features && Array.isArray(service.features) && (
                        <ul className="space-y-2 mb-4 flex-1">
                          {service.features.slice(0, 4).map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Price & CTA */}
                      <div className="mt-auto pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold">
                              R{service.price?.toFixed(2) || '0.00'}
                            </span>
                          </div>
                          <Link to={`/services/${service.id}`}>
                            <Button size="sm">
                              Learn More
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))
      )}

      {!loading && services.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No services available at the moment
          </CardContent>
        </Card>
      )}
    </div>
  );
}
