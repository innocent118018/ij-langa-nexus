import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

interface CreditPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  credits: number;
  pricePerPage: number;
  popular?: boolean;
}

const ClerkIQPricing = () => {
  const [packages, setPackages] = useState<CreditPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('category', 'clerkiq-credits')
          .eq('is_active', true)
          .order('price', { ascending: true });

        if (error) throw error;

        const creditPackages: CreditPackage[] = data.map((service, index) => {
          let credits = 50;
          let pricePerPage = 3.50;
          
          if (service.name.includes('Medium')) {
            credits = 100;
            pricePerPage = 3.00;
          } else if (service.name.includes('Large')) {
            credits = 500;
            pricePerPage = 2.50;
          } else if (service.name.includes('Enterprise')) {
            credits = 1000;
            pricePerPage = 1.75;
          }

          return {
            id: service.id,
            name: service.name.replace('ClerkIQ ', ''),
            description: service.description,
            price: service.price,
            credits,
            pricePerPage,
            popular: index === 1 // Make Medium package popular
          };
        });

        setPackages(creditPackages);
      } catch (error) {
        console.error('Error fetching credit packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleAddToCart = async (pkg: CreditPackage) => {
    try {
      const priceWithVAT = Math.round(pkg.price * 1.15);
      
      await addToCart({
        type: 'service',
        service: {
          id: pkg.id,
          name: `ClerkIQ ${pkg.name}`,
          price: priceWithVAT,
          category: 'clerkiq-credits',
          description: `${pkg.credits} page processing credits`,
        },
        quantity: 1,
      });

      toast({
        title: 'Added to Cart',
        description: `${pkg.name} package has been added to your cart (including 15% VAT)`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to add package to cart.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading pricing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Simple Credit-Based Pricing</h1>
          <p className="text-xl text-muted-foreground mb-2">Pay Only For What You Process</p>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            No subscriptions, no monthly fees. Get 30 trial credits when you create your team, then purchase more credits as needed. All features included with every purchase.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">99%</div>
              <div className="text-sm text-muted-foreground">AI Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">
                <CheckCircle className="h-8 w-8 mx-auto" />
              </div>
              <div className="text-sm text-muted-foreground">Side-by-Side Verification</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">CSV</div>
              <div className="text-sm text-muted-foreground">Email-to-CSV Processing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">12</div>
              <div className="text-sm text-muted-foreground">Month Statement History</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">
                <Star className="h-8 w-8 mx-auto" />
              </div>
              <div className="text-sm text-muted-foreground">All Advanced Features</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <Card key={pkg.id} className={`relative ${pkg.popular ? 'border-primary shadow-lg' : ''} h-full`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Best Value
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">Perfect for teams of all sizes</p>
                  <div className="text-3xl font-bold text-primary">
                    R{pkg.price.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    for {pkg.credits} page credits
                  </p>
                  <p className="text-sm font-medium">
                    R{pkg.pricePerPage.toFixed(2)} per page
                  </p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{pkg.credits} page processing credits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Credits never expire</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">All premium features included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Instant credit top-up</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleAddToCart(pkg)}
                    className="w-full"
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose ClerkiQ Credits?</h2>
            <p className="text-xl text-muted-foreground">
              Transparent pricing with no hidden costs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  No Monthly Fees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Pay only for what you use. No recurring subscriptions or hidden charges.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Credits Never Expire
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your purchased credits remain in your account until you use them - no time limits.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  All Features Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every credit package includes access to all ClerkiQ features and capabilities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Trial */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Free Trial</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                To help you get started and experience the full power of ClerkiQ, every new account automatically receives:
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>30 Free Trial Credits</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>No Time Limit on Trial</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>No Credit Card Required</span>
                </div>
              </div>
              <Button size="lg" asChild>
                <a href="/auth">
                  Start Your Free Trial
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ClerkIQPricing;