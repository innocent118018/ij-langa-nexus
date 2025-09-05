
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

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
  const { addToCart } = useCart();
  const { toast } = useToast();
  
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

  const { data: services } = useQuery({
    queryKey: ['pricing-services'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true })
        .order('price', { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const handleAddToCart = async (item: any, type: 'product' | 'service') => {
    try {
      await addToCart({
        type,
        [type]: item,
        quantity: 1
      });

      toast({
        title: "Added to Cart",
        description: `${item.name} has been added to your cart`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const allItems = [
    ...(products || []).map(p => ({ ...p, type: 'product' as const })),
    ...(services || []).map(s => ({ ...s, type: 'service' as const }))
  ];

  const groupedItems = allItems?.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  const formatCategoryName = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Transparent Pricing & Packages
          </h1>
          <p className="text-lg sm:text-xl text-blue-200 mb-8 max-w-4xl mx-auto leading-relaxed">
            Professional business services with no hidden costs. Choose from our comprehensive range of services.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
            <Badge className="bg-amber-500 text-black font-semibold px-3 py-1">
              <Award className="w-4 h-4 mr-1" />
              22+ Years Experience
            </Badge>
            <Badge className="bg-green-500 text-white font-semibold px-3 py-1">
              <Star className="w-4 h-4 mr-1" />
              Bank Approved
            </Badge>
            <Badge className="bg-purple-500 text-white font-semibold px-3 py-1">
              <CheckCircle className="w-4 h-4 mr-1" />
              SARS Registered
            </Badge>
          </div>
          <p className="text-sm text-blue-300">All prices exclude VAT unless stated otherwise</p>
        </div>
      </section>

      {/* Services by Category */}
      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-6">
          {groupedItems && Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category} className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">
                  {formatCategoryName(category)}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Professional {formatCategoryName(category).toLowerCase()} services
                </p>
              </div>

              {/* Responsive Grid with Auto-sliding Effect */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {(categoryItems as any[]).slice(0, 8).map((item, itemIndex) => (
                  <Card key={`${item.id}-${itemIndex}`} className="relative bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {item.is_popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-amber-500 text-black font-semibold px-3 py-1">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 min-h-[3.5rem]">
                        {item.name}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="pt-0 flex flex-col h-full">
                      <div className="mb-4">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-blue-700">
                            R{(item.price || 0).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                          </span>
                          {item.processing_time && (
                            <span className="text-sm text-gray-500">/{item.processing_time}</span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                        {item.description || `Professional ${item.name.toLowerCase()} service`}
                      </p>
                      
                      <Button
                        onClick={() => handleAddToCart(item, item.type)}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold transition-colors"
                      >
                        Add to Cart
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {(categoryItems as any[]).length > 8 && (
                <div className="text-center mt-8">
                  <Link to="/products">
                    <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                      View All {formatCategoryName(category)} Services
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-16 bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Why Choose IJ Langa Consulting?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-blue-800 rounded-2xl p-6 hover:bg-blue-700 transition-colors">
              <Award className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Experience</h3>
              <p className="text-blue-200">Over 22 years of trusted business services</p>
            </div>
            <div className="bg-blue-800 rounded-2xl p-6 hover:bg-blue-700 transition-colors">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
              <p className="text-blue-200">Clear, upfront pricing with no hidden fees</p>
            </div>
            <div className="bg-blue-800 rounded-2xl p-6 hover:bg-blue-700 transition-colors">
              <Star className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Fast Turnaround</h3>
              <p className="text-blue-200">Most services completed within 48 hours</p>
            </div>
            <div className="bg-blue-800 rounded-2xl p-6 hover:bg-blue-700 transition-colors">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Expert Service</h3>
              <p className="text-blue-200">Professional consultants and qualified accountants</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Browse our services, add them to your cart, or contact us for custom requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                Browse All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
