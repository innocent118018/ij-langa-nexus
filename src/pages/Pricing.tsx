
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number | null;
  image_url: string;
  category: string;
  stock_quantity: number;
}

const Pricing = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['pricing-products'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true })
        .order('price', { ascending: true, nullsLast: true });

      if (error) throw error;
      return data as Product[];
    },
  });

  const groupedProducts = products?.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const formatCategoryName = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading services...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Pricing</h1>
          <p className="text-xl text-gray-600">Professional business services at competitive prices</p>
          <p className="text-sm text-gray-500 mt-2">All prices exclude VAT unless stated otherwise</p>
        </div>

        {/* Browse All Products */}
        <section className="mb-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Complete Service Catalog</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">Browse our full range of business services and add them to your cart</p>
              <Link to="/products">
                <Button variant="secondary" size="lg">
                  Browse All Services
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* Featured Categories */}
        {groupedProducts && Object.entries(groupedProducts).slice(0, 4).map(([category, categoryProducts]) => (
          <section key={category} className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">
              {formatCategoryName(category)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {categoryProducts.length > 6 && (
              <div className="text-center mt-6">
                <Link to="/products">
                  <Button variant="outline">
                    View All {formatCategoryName(category)} Services
                  </Button>
                </Link>
              </div>
            )}
          </section>
        ))}

        {/* Features Section */}
        <section className="mb-16 bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">Clear, upfront pricing for most services with no hidden fees</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Expert Service</h3>
              <p className="text-gray-600">Professional consultants and qualified accountants</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Fast Turnaround</h3>
              <p className="text-gray-600">Efficient processing for all standard services</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">Browse our services, add them to your cart, or request a quote for custom requirements</p>
              <div className="flex gap-4 justify-center">
                <Link to="/products">
                  <Button variant="secondary" size="lg">
                    View Services
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                    Create Account
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Pricing;
