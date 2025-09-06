import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QuoteRequestModal } from '@/components/ui/quote-request-modal';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { allServices, serviceCategories, ServiceData } from '@/data/services';
import { 
  Search, Share2, ShoppingCart, Calculator, FileText, Users, Building,
  MessageCircle, AlertCircle, Edit, Scale, Receipt, Briefcase, Upload,
  BarChart, Map, Home, TrendingUp, Settings, UserX, Pause, Building2,
  Factory, Clock, Calendar, Plus, Shield, ShieldOff, Coins, FilePlus,
  Award, CreditCard, Globe, UserPlus, UserMinus, FileCheck, Percent,
  DollarSign, Tag, XCircle, RotateCcw, Book, BookOpen, Award as Certificate,
  FileSignature, Trash2, Zap, CheckCircle, User
} from 'lucide-react';

const iconMap: Record<string, any> = {
  MessageCircle, Calculator, Users, Building, AlertCircle, Edit, Scale, 
  FileText, Receipt, Briefcase, Upload, BarChart, Map, Home, TrendingUp,
  Settings, UserX, Pause, Building2, Factory, Clock, Calendar, Plus,
  Shield, ShieldOff, Coins, FilePlus, Award, CreditCard, Globe, UserPlus,
  UserMinus, FileCheck, Percent, DollarSign, Tag, XCircle, RotateCcw,
  Book, BookOpen, Certificate, FileSignature, Trash2, Zap, CheckCircle, User
};

const Pricing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const ITEMS_PER_PAGE = 30; // 10 rows × 3 columns

  const filteredServices = allServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentServices = filteredServices.slice(startIndex, endIndex);

  const groupedServices = currentServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, ServiceData[]>);

  const categories = serviceCategories;

  const formatCategoryName = (categoryId: string) => {
    const category = serviceCategories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getCategoryStats = () => {
    const total = filteredServices.length;
    const priced = filteredServices.filter(s => s.price !== undefined).length;
    const quotes = filteredServices.filter(s => s.price === undefined).length;
    
    return { total, priced, quotes };
  };

  const stats = getCategoryStats();

  const getServiceIcon = (iconName?: string) => {
    if (!iconName || !iconMap[iconName]) return FileText;
    return iconMap[iconName];
  };

  const handleAddToCart = async (service: ServiceData) => {
    if (!service.price) return;
    
    try {
      // Create cart item from service
      const cartItem = {
        type: 'service' as const,
        service: {
          id: service.code,
          name: service.name,
          price: service.price,
          category: service.category,
          description: service.description,
        },
        quantity: 1
      };

      await addToCart(cartItem);

      toast({
        title: "Added to Cart",
        description: `${service.name} has been added to your cart`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add service to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async (service: ServiceData) => {
    const url = `${window.location.origin}/pricing?service=${service.code}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: service.name,
          text: service.description,
          url: url,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(url);
        toast({
          title: "Link Copied",
          description: "Service link copied to clipboard",
        });
      }
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied",
        description: "Service link copied to clipboard",
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Service Pricing</h1>
          <p className="text-lg text-gray-600 mb-4">
            Transparent pricing for all your business, legal, and taxation needs
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>{stats.total} services available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>{stats.priced} fixed price</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span>{stats.quotes} quote required</span>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedCategory} onValueChange={(value) => {
                setSelectedCategory(value);
                setCurrentPage(1);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id} className="capitalize">
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Services Grid - 3 per row, 10 rows */}
        {Object.keys(groupedServices).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No services found matching your criteria.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedServices).map(([category, categoryServices]) => (
              <section key={category} className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {formatCategoryName(category)}
                  </h2>
                  <p className="text-gray-600">
                    {categoryServices.length} service{categoryServices.length !== 1 ? 's' : ''} available
                  </p>
                </div>
                
                {/* Grid with 3 columns, designed for 10 rows */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryServices.map((service) => {
                    const IconComponent = getServiceIcon(service.icon);
                    
                    return (
                      <Card key={service.code} className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <IconComponent className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-sm font-semibold leading-tight">
                                  {service.name}
                                </CardTitle>
                                <p className="text-xs text-gray-500 mt-1">
                                  Code: {service.code}
                                </p>
                              </div>
                            </div>
                            {service.popular && (
                              <Badge variant="secondary" className="text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0 space-y-4">
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {service.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            {service.price ? (
                              <div className="text-lg font-bold text-green-600">
                                R{service.price.toLocaleString()}
                                {service.unit && (
                                  <span className="text-xs text-gray-500 ml-1">
                                    /{service.unit}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <div className="text-sm text-amber-600 font-medium">
                                Quote Required
                              </div>
                            )}
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleShare(service)}
                              className="p-2"
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex gap-2">
                            {service.price ? (
                              <Button 
                                onClick={() => handleAddToCart(service)}
                                className="flex-1 bg-blue-600 hover:bg-blue-700"
                                size="sm"
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Buy Now
                              </Button>
                            ) : (
                              <QuoteRequestModal 
                                serviceName={service.name}
                                serviceCode={service.code}
                              >
                                <Button 
                                  variant="outline"
                                  className="flex-1"
                                  size="sm"
                                >
                                  Get Quote
                                </Button>
                              </QuoteRequestModal>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                >
                  {pageNum}
                </Button>
              );
            })}
            
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
        )}

        {/* Page info */}
        <div className="text-center text-gray-500 text-sm mt-4">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredServices.length)} of {filteredServices.length} services
          {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
        </div>
      </div>
    </div>
  );
};

export default Pricing;