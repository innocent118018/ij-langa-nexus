import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Package, Wrench, CheckCircle } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import PurchaseForm from '@/components/forms/PurchaseForm';
import { ServiceContractModal } from '@/components/contracts';

const ITEMS_PER_PAGE = 12;

interface ServiceData {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  is_active: boolean;
  is_popular: boolean;
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

interface MonthlyPackage {
  id: string;
  package_name: string;
  package_tier: string;
  price: number;
  description: string;
  features: string[];
  is_active: boolean;
}

const Pricing = () => {
  const [monthlyPackages, setMonthlyPackages] = useState<MonthlyPackage[]>([]);
  const [monthlyServices, setMonthlyServices] = useState<ServiceData[]>([]);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('services');
  const [contractModalOpen, setContractModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<MonthlyPackage | null>(null);

  const { addToCart } = useCart();
  const { toast } = useToast();

  // Helper function to extract features from service
  const extractFeaturesFromService = (service: ServiceData): string[] => {
    if (service.name.includes('Starter')) {
      return [
        'Bookkeeping - Once a Month',
        'Up to 100 Transactions P/M',
        'Supplier Invoice Capturing',
        'VAT Returns',
        '1 Performance Meeting Per Year'
      ];
    } else if (service.name.includes('Ultimate')) {
      return [
        'Bookkeeping - Once a Week',
        'Dedicated Account Manager',
        'Full Payroll Service (up to 30 employees)',
        'Sage Accounting Online Subscription',
        'Up to 300 Transactions P/M',
        'Supplier Invoice Capturing',
        '2 Performance Meetings Per Year'
      ];
    } else {
      // Default features based on description or generic features
      return [
        service.name,
        service.description || 'Professional service delivery',
        'Expert consultation included',
        'Monthly recurring service'
      ];
    }
  };

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch monthly compliance packages
        const { data: packagesData, error: packagesError } = await supabase
          .from('monthly_compliance_packages')
          .select('*')
          .eq('is_active', true)
          .order('price', { ascending: true });

        if (packagesError) {
          console.error('Error fetching packages:', packagesError);
        } else {
          const packages = (packagesData || []).map(pkg => ({
            ...pkg,
            features: Array.isArray(pkg.features) ? pkg.features as string[] : []
          }));
          setMonthlyPackages(packages);
        }

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

        {/* Monthly Compliance Packages */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Monthly Compliance Packages</h2>
          <p className="text-center text-muted-foreground mb-8">
            Pay one amount per month and know that all basic required returns are taken care of when they come due during the year.
          </p>

          {/* New Monthly Service Packages */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">Business Support Packages</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {monthlyPackages.filter(pkg => ['base', 'core', 'premium'].includes(pkg.package_tier)).map((pkg, index) => (
                <Card key={pkg.id} className={`relative border-2 shadow-lg h-full ${index === 1 ? 'border-primary bg-primary/5' : 'border-primary/20'}`}>
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl font-bold">{pkg.package_name}</CardTitle>
                    <div className="text-3xl font-bold text-primary">
                      From R{Math.round(pkg.price * 1.15).toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground"> + VAT/Month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                    <div className="space-y-2 mb-6 flex-1">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() => {
                        setSelectedPackage(pkg);
                        setContractModalOpen(true);
                      }}
                      className="w-full mt-auto"
                    >
                      Subscribe Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Transaction-Based Packages */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">Transaction-Based Packages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              {monthlyPackages.filter(pkg => ['basic', 'lite', 'focus', 'active', 'bold'].includes(pkg.package_tier)).map((pkg) => (
                <Card key={pkg.id} className="border-2 border-primary/20 shadow-lg h-full">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg font-bold">{pkg.package_name}</CardTitle>
                    <div className="text-2xl font-bold text-primary">
                      R{Math.round(pkg.price * 1.15).toLocaleString()}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="space-y-2 mb-6 flex-1">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() => {
                        setSelectedPackage(pkg);
                        setContractModalOpen(true);
                      }}
                      className="w-full mt-auto"
                      size="sm"
                    >
                      Subscribe Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Advisory & Strategic Packages */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">Advisory & Strategic Packages</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {monthlyPackages.filter(pkg => ['nurture', 'pulse', 'unleash'].includes(pkg.package_tier)).map((pkg, index) => (
                <Card key={pkg.id} className={`relative border-2 shadow-lg h-full ${index === 2 ? 'border-primary bg-primary/5' : 'border-primary/20'}`}>
                  {index === 2 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                        Premium
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl font-bold">{pkg.package_name}</CardTitle>
                    <div className="text-3xl font-bold text-primary">
                      R{Math.round(pkg.price * 1.15).toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground">/Month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="space-y-2 mb-6 flex-1">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() => {
                        setSelectedPackage(pkg);
                        setContractModalOpen(true);
                      }}
                      className="w-full mt-auto"
                    >
                      Subscribe Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Company Registration Popular Packages */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Company Registration Popular Packages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {services.filter(service => service.category === 'company-registration-packages').map((service, index) => (
                <Card key={service.id} className={`relative border-2 shadow-lg h-full ${service.is_popular ? 'border-primary bg-primary/5' : 'border-primary/20'}`}>
                  {service.is_popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg font-bold">{service.name.replace('Company Registration Package - ', '')}</CardTitle>
                    <div className="text-2xl font-bold text-primary">
                      {service.price > 0 ? `R${Math.round(service.price * 1.15).toLocaleString()}` : 'Custom Quote'}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                      {service.processing_time && (
                        <p className="text-xs text-muted-foreground mb-2">Processing: {service.processing_time}</p>
                      )}
                    </div>
                    {service.price > 0 ? (
                      <Button
                        onClick={() => handleAddToCart(service)}
                        className="w-full mt-auto"
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Order Now
                      </Button>
                    ) : (
                      <PurchaseForm service={service} isQuote={true}>
                        <Button className="w-full mt-auto" size="sm">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Quote
                        </Button>
                      </PurchaseForm>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Industry Packages */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Industry Specific Packages</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {services.filter(service => service.category === 'industry-packages').map((service) => (
                <Card key={service.id} className="border-2 border-primary/20 shadow-lg">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg font-bold">{service.name.replace('Company Registration Package - ', '')}</CardTitle>
                    <div className="text-2xl font-bold text-primary">
                      R{Math.round(service.price * 1.15).toLocaleString()}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    {service.processing_time && (
                      <p className="text-xs text-muted-foreground mb-4">Processing: {service.processing_time}</p>
                    )}
                    <PurchaseForm service={service} isQuote={false}>
                      <Button
                        className="w-full"
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Order Now
                      </Button>
                    </PurchaseForm>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Company Registrations */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Company Registrations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {services.filter(service => service.category === 'company-registrations').map((service) => (
                <Card key={service.id} className="border-2 border-primary/20 shadow-lg">
                  <CardHeader className="text-center">
                    <CardTitle className="text-md font-bold">{service.name}</CardTitle>
                    <div className="text-xl font-bold text-primary">
                      From R{Math.round(service.price * 1.15).toLocaleString()}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-3">{service.processing_time}</p>
                    <PurchaseForm service={service} isQuote={false}>
                      <Button
                        className="w-full"
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Order Now
                      </Button>
                    </PurchaseForm>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Compliance Packages */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">For All Companies (2026 Financial Year)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {services.filter(service => service.category === 'monthly-compliance').slice(0, 3).map((service, index) => (
                <Card key={service.id} className="relative border-2 border-primary/20 shadow-lg h-full">
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl font-bold">
                      {service.name.replace(' Compliance Package', '')}
                    </CardTitle>
                    <div className="text-3xl font-bold text-primary">
                      From R{Math.round(service.price * 1.15).toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground">/Month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-3 mb-6">
                      {service.name.includes('Beginner') && (
                        <>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Bookkeeping - Once A Month</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Dedicated Account Manager</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Full Payroll Service (up to 10 employees)</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Sage Accounting Online Subscription</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Up to 100 Transactions P/M</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> VAT Returns</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> All Tax Returns</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> CIPC Services</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Financial Statements</div>
                        </>
                      )}
                      {service.name.includes('Enhanced') && (
                        <>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Bookkeeping - Once A Week</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Dedicated Account Manager</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Full Payroll Service (up to 20 employees)</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Sage Accounting Online Subscription</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Up to 200 Transactions P/M</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Supplier Invoice Capturing</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> VAT Returns</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> 1 Performance Meeting Per Year</div>
                        </>
                      )}
                      {service.name.includes('Ultimate') && (
                        <>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Bookkeeping - Once a Week</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Dedicated Account Manager</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Full Payroll Service (up to 30 employees)</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Sage Accounting Online Subscription</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Up to 300 Transactions P/M</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Supplier Invoice Capturing</div>
                          <div className="flex items-center gap-2"><span className="text-green-500">✓</span> 2 Performance Meetings Per Year</div>
                        </>
                      )}
                    </div>
                    <Button
                      onClick={() => {
                        // Map service to package format with features
                        const packageData = {
                          id: service.id,
                          name: service.name,
                          price: service.price,
                          description: service.description,
                          features: extractFeaturesFromService(service)
                        };
                        setSelectedPackage(packageData as any);
                        setContractModalOpen(true);
                      }}
                      className="w-full"
                      size="lg"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Join Now - Monthly Subscription
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Individual Tax Returns */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Individual Tax Returns</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {services.filter(service => service.category === 'individual-tax-returns').map((service) => (
                <Card key={service.id} className="border-2 border-primary/20 shadow-lg">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl font-bold">{service.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary">
                      R{Math.round(service.price * 1.15).toLocaleString()}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <Button
                      onClick={() => {
                        // Map service to package format with features
                        const packageData = {
                          id: service.id,
                          name: service.name,
                          price: service.price,
                          description: service.description,
                          features: extractFeaturesFromService(service)
                        };
                        setSelectedPackage(packageData as any);
                        setContractModalOpen(true);
                      }}
                      className="w-full"
                      size="lg"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Join Now - Monthly Billing
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Company Amendments */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Company Amendments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.filter(service => service.category === 'company-amendments').slice(0, 6).map((service) => (
                <Card key={service.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-sm">{service.name}</h4>
                      <span className="text-sm font-bold text-primary">R{Math.round(service.price * 1.15)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{service.processing_time}</p>
                    <Button
                      onClick={() => handleAddToCart(service)}
                      className="w-full"
                      size="sm"
                      variant="outline"
                    >
                      Order
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* SARS Registrations */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">SARS Registrations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.filter(service => service.category === 'sars-registrations').map((service) => (
                <Card key={service.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-sm">{service.name}</h4>
                      <span className="text-sm font-bold text-primary">R{Math.round(service.price * 1.15)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{service.processing_time}</p>
                    <Button
                      onClick={() => handleAddToCart(service)}
                      className="w-full"
                      size="sm"
                      variant="outline"
                    >
                      Order
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Professional Rates */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Professional Hourly Rates</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {services.filter(service => service.category === 'professional-rates').map((service) => (
                <Card key={service.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-sm">{service.name}</h4>
                      <span className="text-sm font-bold text-primary">R{Math.round(service.price * 1.15)}/hr</span>
                    </div>
                    <Button
                      onClick={() => handleAddToCart(service)}
                      className="w-full"
                      size="sm"
                      variant="outline"
                    >
                      Book Consultation
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs for browsing all services */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
          <div className="flex justify-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="monthly" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Monthly Plans
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                All Services
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Products
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search services or products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="md:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tab Content */}
          <TabsContent value="monthly">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((item: any, index) => (
                <Card key={item.id} className="border shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <div className="text-2xl font-bold text-primary">
                      R{Math.round((item.price || 0) * 1.15).toLocaleString()}/month
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description?.substring(0, 100)}...
                    </p>
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="w-full"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Subscribe Monthly
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((item: any) => (
                <Card key={item.id} className="border shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <div className="text-2xl font-bold text-primary">
                      R{Math.round((item.price || 0) * 1.15).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Category: {item.category?.replace('-', ' ')}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description?.substring(0, 100)}...
                    </p>
                    {item.processing_time && (
                      <p className="text-xs text-muted-foreground mb-4">
                        Processing Time: {item.processing_time}
                      </p>
                    )}
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="w-full"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="products">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((item: any) => (
                <Card key={item.id} className="border shadow-lg">
                  <CardHeader>
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                    )}
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <div className="text-2xl font-bold text-primary">
                      R{Math.round((item.price || 0) * 1.15).toLocaleString()}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description?.substring(0, 100)}...
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Stock: {item.stock_quantity || 0}
                    </p>
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="w-full"
                      disabled={!item.stock_quantity}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="mx-4">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </Tabs>

        {/* Service Contract Modal */}
        {selectedPackage && (
          <ServiceContractModal
            open={contractModalOpen}
            onOpenChange={setContractModalOpen}
            packageData={{
              id: selectedPackage.id,
              name: selectedPackage.package_name,
              price: selectedPackage.price,
              features: selectedPackage.features,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Pricing;