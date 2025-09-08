import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { allServices, serviceCategories, ServiceData } from '@/data/services';

const supabaseUrl = 'https://nnotjvqgejcmutukcwvt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ub3RqdnFnZWpjbXV0dWtjd3Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1ODU5NzYsImV4cCI6MjA3MDE2MTk3Nn0.0LtKdRvV54V17N5PYlWaY4Tn8i7fASEvLmMM0kGgoXE0';
const supabase = createClient(supabaseUrl, supabaseKey);

const Pricing = () => {
  const [featuredPackages, setFeaturedPackages] = useState<ServiceData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Fetch only monthly-charged services
  useEffect(() => {
    const fetchMonthlyServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .ilike('description', '%/Month%'); // filter by description containing /Month

      if (error) {
        console.error('Error fetching services:', error);
      } else {
        setFeaturedPackages(data || []);
      }
    };

    fetchMonthlyServices();
  }, []);

  // Carousel auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredPackages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredPackages]);

  const handleAddToCart = async (service: any) => {
    try {
      const basePrice = service.price || 0;
      const priceWithVAT = Math.round(basePrice * 1.15);

      await addToCart({
        type: 'service',
        service: {
          id: service.code || service.name,
          name: service.name,
          price: priceWithVAT,
          category: service.category || 'Featured',
          description: service.description,
        },
        quantity: 1,
      });

      toast({
        title: 'Added to Cart',
        description: `${service.name} has been added to your cart (including 15% VAT)`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to add service to cart.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Carousel */}
        <div className="relative w-full overflow-hidden mb-12">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              width: `${featuredPackages.length * 100}%`
            }}
          >
            {featuredPackages.map((pkg, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 px-4"
                style={{ minWidth: '100%' }}
              >
                <Card className="h-full shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                    <p className="text-xl text-green-600 font-semibold">
                      R{Math.round(pkg.price * 1.15).toLocaleString()} <span className="text-sm text-gray-500">/Month (incl. 15% VAT)</span>
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 whitespace-pre-line">{pkg.description}</p>
                    <Button
                      onClick={() => handleAddToCart(pkg)}
                      className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Carousel controls */}
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredPackages.length) % featuredPackages.length)}
            >Prev</Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredPackages.length)}
            >Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
