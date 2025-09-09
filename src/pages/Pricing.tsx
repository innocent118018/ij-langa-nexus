import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Package, Wrench } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

const ITEMS_PER_PAGE = 12;

interface ServiceData {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  is_active: boolean;
  processing_time?: string;
  requirements?: string;
}

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  is_active: boolean;
  image_url?: string;
  stock_quantity: number;
}

const Pricing = () => {
  const [monthlyServices, setMonthlyServices] = useState<ServiceData[]>([]);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('services');

  const { addToCart } = useCart();
  const { toast } = useToast();

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all services
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('price', { ascending: true });

        if (servicesError) {
          console.error('Error fetching services:', servicesError);
        } else {
          setServices(servicesData || []);
          // Create mock monthly services for display
          const mockMonthly = servicesData?.slice(0, 3).map(service => ({
            ...service,
            description: `${service.description}\n\nMonthly subscription service`,
            price: Math.round(service.price * 0.3) // 30% of one-time price for monthly
          })) || [];
          setMonthlyServices(mockMonthly);
        }

        // Fetch all products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('price', { ascending: true });

        if (productsError) {
          console.error('Error fetching products:', productsError);
        } else {
          setProducts(productsData || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Get current data based on active tab
  const getCurrentData = () => {
    if (activeTab === 'monthly') return monthlyServices;
    if (activeTab === 'services') return services;
    return products;
  };

  // Filter current data
  const filteredData = getCurrentData().filter(item => {
    const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Get unique categories
  const categories = [...new Set(getCurrentData().map(item => item.category))];

  // Reset page when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
    setSelectedCategory('all');
    setSearchTerm('');
  };

  // Add to cart handler
  const handleAddToCart = async (item: any) => {
    try {
      const priceWithVAT = Math.round((item.price || 0) * 1.15);
      
      if (activeTab === 'products') {
        await addToCart({
          type: 'product',
          product: {
            id: item.id,
            name: item.name,
            price: priceWithVAT,
            category: item.category,
            image_url: item.image_url,
          },
          quantity: 1,
        });
      } else {
        await addToCart({
          type: 'service',
          service: {
            id: item.id,
            name: item.name,
            price: priceWithVAT,
            category: item.category,
            description: item.description,
          },
          quantity: 1,
        });
      }

      toast({
        title: 'Added to Cart',
        description: `${item.name} has been added to your cart (including 15% VAT)`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to add item to cart.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Professional Service Pricing</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Transparent pricing for all your business, legal, and taxation needs
          </p>
        </div>

        {/* Monthly Services Featured Section */}
        {monthlyServices.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Monthly Service Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {monthlyServices.map((service, index) => (
                <Card key={service.id} className="relative border-2 border-primary/20 shadow-lg">
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl font-bold">{service.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary">
                      R{Math.round(service.price * 1.15).toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground">/month</span>
                    </div>
                    <p className="text-xs text-muted-foreground">incl. 15% VAT</p>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground mb-6 whitespace-pre-line">
                      {service.description}
                    </p>
                    <Button
                      onClick={() => handleAddToCart(service)}
                      className="w-full"
                      size="lg"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Subscribe Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tabs for Services and Products */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="monthly" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Monthly Plans
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              One-time Services
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
          </TabsList>

          {/* Search and Filter */}
          <div className="bg-card rounded-lg shadow p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
              <Select value={selectedCategory} onValueChange={(value) => { setSelectedCategory(value); setCurrentPage(1); }}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category} className="capitalize">
                      {category.replace(/-/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="monthly">
            <div className="text-center text-muted-foreground">
              Monthly services are displayed in the featured section above.
            </div>
          </TabsContent>

          <TabsContent value="services">
            {currentItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentItems.map((service) => (
                  <Card key={service.id} className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold line-clamp-2">{service.name}</CardTitle>
                      <p className="text-sm text-muted-foreground capitalize">{service.category.replace(/-/g, ' ')}</p>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                        {service.description}
                      </p>
                      <div className="flex justify-between items-center mt-auto">
                        {service.price ? (
                          <div>
                            <span className="text-lg font-bold text-primary">
                              R{Math.round(service.price * 1.15).toLocaleString()}
                            </span>
                            <p className="text-xs text-muted-foreground">incl. 15% VAT</p>
                          </div>
                        ) : (
                          <span className="text-amber-600 font-medium">Quote Required</span>
                        )}
                        {service.price && (
                          <Button size="sm" onClick={() => handleAddToCart(service)}>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                No services found matching your criteria.
              </div>
            )}
          </TabsContent>

          <TabsContent value="products">
            {currentItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentItems.map((item) => {
                  const product = item as ProductData;
                  return (
                    <Card key={product.id} className="h-full flex flex-col">
                      <CardHeader>
                        {product.image_url && (
                          <div className="w-full h-32 bg-muted rounded-md mb-4 flex items-center justify-center">
                            <Package className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                        <CardTitle className="text-lg font-semibold line-clamp-2">{product.name}</CardTitle>
                        <p className="text-sm text-muted-foreground capitalize">{product.category.replace(/-/g, ' ')}</p>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center mt-auto">
                          {product.price ? (
                            <div>
                              <span className="text-lg font-bold text-primary">
                                R{Math.round(product.price * 1.15).toLocaleString()}
                              </span>
                              <p className="text-xs text-muted-foreground">incl. 15% VAT</p>
                            </div>
                          ) : (
                            <span className="text-amber-600 font-medium">Quote Required</span>
                          )}
                          {product.price && (
                            <Button size="sm" onClick={() => handleAddToCart(product)}>
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                No products found matching your criteria.
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <Button 
              onClick={() => setCurrentPage(currentPage - 1)} 
              disabled={currentPage === 1} 
              variant="outline" 
              size="sm"
            >
              Previous
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) pageNum = i + 1;
              else if (currentPage <= 3) pageNum = i + 1;
              else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
              else pageNum = currentPage - 2 + i;

              return (
                <Button 
                  key={pageNum} 
                  onClick={() => setCurrentPage(pageNum)} 
                  variant={currentPage === pageNum ? "default" : "outline"} 
                  size="sm"
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button 
              onClick={() => setCurrentPage(currentPage + 1)} 
              disabled={currentPage === totalPages} 
              variant="outline" 
              size="sm"
            >
              Next
            </Button>
          </div>
        )}

        {filteredData.length > 0 && (
          <div className="text-center text-muted-foreground text-sm mt-4">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length} {activeTab}
            {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;
