import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { allServices, serviceCategories, ServiceData } from '@/data/services';
import { ShoppingCart } from 'lucide-react';

const featuredPackages = [
  {
    code: 'UNLEASH-PKG',
    name: 'Unleash',
    price: 6700,
    unit: 'per month',
    category: 'Featured',
    description: 'Complete business solution package',
    features: [
      'Annual Financial Statements', 'Income Tax Returns', 'Provisional Tax Returns',
      'Bi-annual IRP5 reconciliation', 'Monthly EMP201s', 'Monthly UIF submission',
      'COIDA Return', 'VAT Returns', 'Monthly Pulse Report',
      'Monthly Pulse meeting with business advisor', 'Quarterly HeadsUp Report',
      'Tax Forecasting', 'Dynamic Cashflow', 'Budget Monitor',
      'Benchmark Analysis', 'Annual Valuation', 'Annual Financial Plan'
    ]
  },
  {
    code: 'PULSE-PKG',
    name: 'Pulse',
    price: 4500,
    unit: 'per month',
    category: 'Featured',
    description: 'Business monitoring and reporting package',
    features: [
      'Annual Financial Statements', 'Income Tax Returns', 'Provisional Tax Returns',
      'Bi-annual IRP5 reconciliation', 'Monthly EMP201s', 'Monthly UIF submission',
      'COIDA Return', 'VAT Returns', 'Monthly Pulse Report',
      'Monthly Pulse meeting with business advisor', 'Quarterly HeadsUp Report',
      'Tax Forecasting', 'Dynamic Cashflow', 'Budget Monitor',
      'Benchmark Analysis', 'Annual Valuation', 'Annual Financial Plan'
    ]
  },
  {
    code: 'NURTURE-PKG',
    name: 'Nurture',
    price: 3000,
    unit: 'per month',
    category: 'Featured',
    description: 'Essential business services package',
    features: [
      'Annual Financial Statements', 'Income Tax Returns', 'Provisional Tax Returns',
      'Bi-annual IRP5 reconciliation', 'Monthly EMP201s', 'Monthly UIF submission',
      'COIDA Return', 'VAT Returns', 'Monthly Pulse Report',
      'Monthly Pulse meeting with business advisor', 'Quarterly HeadsUp Report',
      'Tax Forecasting', 'Dynamic Cashflow', 'Budget Monitor',
      'Benchmark Analysis', 'Annual Valuation', 'Annual Financial Plan'
    ]
  }
];

const Pricing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const ITEMS_PER_PAGE = 30;

  const filteredServices = allServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  const handleAddToCart = async (service: any) => {
    try {
      const basePrice = service.price || 0;
      const priceWithVAT = Math.round(basePrice * 1.15);

      const cartItem = {
        type: 'service' as const,
        service: {
          id: service.code || service.name,
          name: service.name,
          price: priceWithVAT,
          category: service.category || 'Featured',
          description: service.description || 'Custom Package',
        },
        quantity: 1
      };

      await addToCart(cartItem);

      toast({
        title: 'Added to Cart',
        description: `${service.name} has been added to your cart (including 15% VAT)`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: 'Error',
        description: 'Failed to add service to cart. Please try again.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredPackages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Service Pricing</h1>
          <p className="text-lg text-gray-600 mb-4">
            Transparent pricing for all your business, legal, and taxation needs
          </p>
        </div>

        {/* Featured Packages Carousel */}
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
                      R{Math.round(pkg.price * 1.15).toLocaleString()} <span className="text-sm text-gray-500">/{pkg.unit} (incl. 15% VAT)</span>
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 max-h-64 overflow-y-auto">
                      {pkg.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => handleAddToCart(pkg)}
                      className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Buy Now / Switch to Ij Langa Consulting
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredPackages.length) % featuredPackages.length)}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredPackages.length)}
            >
              Next
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Select value={selectedCategory} onValueChange={(value) => {
              setSelectedCategory(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {serviceCategories.map(category => (
                  <SelectItem key={category.id} value={category.id} className="capitalize">
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Services Grid */}
        {Object.entries(groupedServices).map(([category, services]) => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <Card key={service.code}>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">{service.name}</CardTitle>
                    <p className="text-sm text-gray-500">Code: {service.code}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                    <div className="flex justify-between items-center">
                      {service.price ? (
                        <div>
                          <span className="text-lg font-bold text-green-600">
                            R{Math.round(service.price * 1.15).toLocaleString()}
                          </span>
                          <p className="text-xs text-gray-500">incl. 15% VAT</p>
                        </div>
                      ) : (
                        <span className="text-amber-600 font-medium">Quote Required</span>
                      )}
                      {service.price && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => handleAddToCart(service)}>
                          <ShoppingCart className="h-4 w-4 mr-2" /> Buy Now
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}

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

        <div className="text-center text-gray-500 text-sm mt-4">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredServices.length)} of {filteredServices.length} services
          {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
