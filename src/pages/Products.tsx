
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProductCard } from '@/components/products/ProductCard';
import { Cart } from '@/components/cart/Cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number | null;
  image_url: string;
  category: string;
  stock_quantity: number;
  is_active: boolean;
}

const Products = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;
      return data as Product[];
    },
  });

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const categories = [...new Set(products?.map(p => p.category) || [])];

  const formatCategoryName = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getCategoryStats = () => {
    if (!products) return { total: 0, priced: 0, quotes: 0 };
    
    const total = filteredProducts.length;
    const priced = filteredProducts.filter(p => p.price !== null).length;
    const quotes = filteredProducts.filter(p => p.price === null).length;
    
    return { total, priced, quotes };
  };

  const stats = getCategoryStats();

  const handleCartUpdate = () => {
    toast({
      title: "Cart Updated",
      description: "Item added to cart successfully",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Professional Services</h1>
            <p className="text-gray-600 mt-2">
              Complete range of business, legal, and taxation services
            </p>
            <div className="flex gap-4 text-sm text-gray-500 mt-2">
              <span>{stats.total} services</span>
              <span>•</span>
              <span>{stats.priced} fixed price</span>
              <span>•</span>
              <span>{stats.quotes} quote required</span>
            </div>
          </div>
          <Button
            onClick={() => setIsCartOpen(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category} className="capitalize">
                      {formatCategoryName(category)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products by Category */}
        {Object.keys(groupedProducts).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No services found matching your criteria.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
              <section key={category} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {formatCategoryName(category)}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      {categoryProducts.length} service{categoryProducts.length !== 1 ? 's' : ''} available
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onCartUpdate={handleCartUpdate}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Products;
