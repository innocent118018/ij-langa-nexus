import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Share2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Pricing = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const addToCart = async (serviceName: string, price: number, category: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to add items to your cart",
        variant: "destructive",
      });
      return;
    }

    try {
      // First, find or create the service
      let { data: service, error: serviceError } = await supabase
        .from('services')
        .select('id')
        .eq('name', serviceName)
        .single();

      if (serviceError || !service) {
        // Create service if it doesn't exist
        const { data: newService, error: createError } = await supabase
          .from('services')
          .insert({
            name: serviceName,
            price: price,
            category: category,
            description: serviceName,
            processing_time: 'TBD',
            is_active: true,
            is_popular: false
          })
          .select('id')
          .single();

        if (createError) throw createError;
        service = newService;
      }

      // Check if item already exists in cart
      const { data: existingItem, error: checkError } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('user_id', user.id)
        .eq('service_id', service.id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingItem) {
        // Update quantity
        const { error: updateError } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);

        if (updateError) throw updateError;
      } else {
        // Add new item
        const { error: insertError } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            service_id: service.id,
            quantity: 1
          });

        if (insertError) throw insertError;
      }

      toast({
        title: "Success",
        description: `${serviceName} added to cart`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  const shareService = (serviceName: string, price: string) => {
    if (navigator.share) {
      navigator.share({
        title: serviceName,
        text: `Check out this service: ${serviceName} - ${price}`,
        url: window.location.href
      });
    } else {
      // Fallback to copying to clipboard
      const shareText = `Check out this service: ${serviceName} - ${price} - ${window.location.href}`;
      navigator.clipboard.writeText(shareText).then(() => {
        toast({
          title: "Shared",
          description: "Link copied to clipboard",
        });
      });
    }
  };

  const popularServices = [
    { name: 'Company Registration', price: 'R590', rawPrice: 590, duration: '3-5 Days', category: 'Register' },
    { name: 'Beneficial Ownership', price: 'R590', rawPrice: 590, duration: '1-7 Days', category: 'Other' },
    { name: 'Annual Returns', price: 'R190 + CIPC Fee', rawPrice: 190, duration: '2 days', category: 'Other' },
    { name: 'Public Officer Appointment', price: 'R590', rawPrice: 590, duration: '6-8 weeks', category: 'SARS' },
    { name: 'Tax Clearance', price: 'R490', rawPrice: 490, duration: '1-7 Days', category: 'SARS' },
    { name: 'Director/Shareholder Changes', price: 'R850', rawPrice: 850, duration: '1-7 Days', category: 'Change' }
  ];

  const packages = [
    {
      name: 'Starter Package',
      price: 'R1,670',
      rawPrice: 1670,
      category: 'Packages',
      features: ['New Company', 'Bank Ready', 'Share Certificates', 'Public Officer Appointment', 'Tax Clearance Certificate']
    },
    {
      name: 'Tender Package', 
      price: 'R3,040',
      rawPrice: 3040,
      category: 'Packages',
      features: ['New Company', 'Bank Ready', 'Share Certificates', 'Beneficial Ownership', 'Public Officer Appointment', 'Tax Clearance Certificate', 'BEE Affidavit', 'CSD Registration']
    },
    {
      name: 'Premium Package',
      price: 'R6,155',
      rawPrice: 6155,
      category: 'Packages',
      features: ['New Company', 'Bank Ready', 'Share Certificates', 'Beneficial Ownership', 'Public Officer Appointment', 'Tax Clearance Certificate', 'BEE Affidavit', 'CSD Registration', 'Standard Website', 'Google Map', 'SEO', 'Social Media Links', 'User Access Control', '500 Business Cards']
    }
  ];

  const industryPackages = [
    {
      name: 'Transport Package',
      price: 'R3,040',
      rawPrice: 3040,
      category: 'Packages',
      features: ['New Company', 'Bank Ready', 'Share Certificates', 'Beneficial Ownership', 'Public Officer Appointment', 'Tax Clearance Certificate', 'BEE Affidavit', 'CSD Registration']
    },
    {
      name: 'Construction Package',
      price: 'R4,290',
      rawPrice: 4290,
      category: 'Packages',
      features: ['New Company', 'Bank Ready', 'Share Certificates', 'Beneficial Ownership', 'Public Officer Appointment', 'Tax Clearance Certificate', 'BEE Affidavit', 'CSD Registration', 'CIBD (1 Class Included)']
    },
    {
      name: 'Security (PSIRA) Package',
      price: 'R5,620',
      rawPrice: 5620,
      category: 'Packages',
      features: ['New Company', 'Bank Ready', 'Share Certificates', 'Public Officer Appointment', 'Tax Clearance Certificate', 'Mandatory Design Elements', 'Authorisation Resolution', 'Operational Readiness Resolution', 'Security Business Plan']
    }
  ];

  const registrations = [
    { name: 'Pty Registration', price: 'From R590', rawPrice: 590, duration: '3-5 Days', category: 'Register' },
    { name: 'Non-Profit Company Registration', price: 'From R1,500', rawPrice: 1500, duration: '3-7 Days', category: 'Register' },
    { name: 'Incorporation Company Registration', price: 'R1,500', rawPrice: 1500, duration: '21 Days', category: 'Register' },
    { name: 'Company Name Only', price: 'R250', rawPrice: 250, duration: '1 Day', category: 'Register' }
  ];

  const amendments = [
    { name: 'Company Name Change', price: 'R650', rawPrice: 650, duration: '1-2 Days', category: 'Change' },
    { name: 'Director/Shareholder Changes', price: 'R850', rawPrice: 850, duration: '1-7 Days', category: 'Change' },
    { name: 'CC Changes', price: 'From R390', rawPrice: 390, duration: 'Various', category: 'Change' },
    { name: 'Registered Address Change', price: 'R390', rawPrice: 390, duration: '15 Days', category: 'Change' },
    { name: 'Share Certificate Printing', price: 'R390', rawPrice: 390, duration: 'Immediate', category: 'Change' },
    { name: 'Shareholders Agreement', price: 'R990', rawPrice: 990, duration: '1 Day', category: 'Change' },
    { name: 'MOI Changes', price: 'From R990', rawPrice: 990, duration: '21 Days', category: 'Change' },
    { name: 'Financial Year End Change', price: 'From R390', rawPrice: 390, duration: '1 Day', category: 'Change' }
  ];

  const taxServices = [
    { name: 'Individual Tax Return (IRP5)', price: 'R1,665.20', rawPrice: 1665.20, description: 'IT12 – Individual with IRP5', category: 'Tax' },
    { name: 'Individual Tax Return (IRP5 + Rental)', price: 'R2,248.20', rawPrice: 2248.20, description: 'Individual with IRP5 & Rental Income', category: 'Tax' },
    { name: 'Individual Tax Return (Sole Proprietor)', price: 'R2,831.20', rawPrice: 2831.20, description: 'IT12 – Sole Proprietor', category: 'Tax' },
    { name: 'Company Tax Return', price: 'R1,915.40', rawPrice: 1915.40, description: 'IT14 – Company or Close Corporation', category: 'Tax' },
    { name: 'VAT Return', price: 'R288.40', rawPrice: 288.40, description: 'VAT201', category: 'Tax' },
    { name: 'PAYE Return', price: 'R288.40', rawPrice: 288.40, description: 'EMP201', category: 'Tax' }
  ];

  const otherServices = [
    { name: 'Annual Returns', price: 'R190 + CIPC Fee', rawPrice: 190, duration: '2 days', category: 'Other' },
    { name: 'BEE Affidavit', price: 'R390', rawPrice: 390, duration: '1 Day', category: 'Other' },
    { name: 'CSD Registration', price: 'R390', rawPrice: 390, duration: '1 Day', category: 'Other' },
    { name: 'Beneficial Ownership', price: 'R590', rawPrice: 590, duration: '1-7 Days', category: 'Other' },
    { name: 'PSIRA Assistance', price: 'R5,620', rawPrice: 5620, duration: 'Various', category: 'Other' },
    { name: 'Trademarks', price: 'R2,200', rawPrice: 2200, duration: '10 Days to Receipt', category: 'Other' },
    { name: 'Company Restoration', price: 'R2,580', rawPrice: 2580, duration: '21 Days', category: 'Other' },
    { name: 'CIDB Registration', price: 'R1,250', rawPrice: 1250, duration: 'Various', category: 'Other' },
    { name: 'NHBRC Registration', price: 'R1,990', rawPrice: 1990, duration: 'Suspended Service', category: 'Other' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Pricing</h1>
          <p className="text-xl text-gray-600">Transparent pricing for all your business needs</p>
          <p className="text-sm text-gray-500 mt-2">All prices exclude VAT unless stated otherwise</p>
        </div>

        {/* Popular Services */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Popular Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                    <Badge variant="outline">{service.duration}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareService(service.name, service.price)}
                      className="flex-1"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button 
                      className="flex-2"
                      onClick={() => addToCart(service.name, service.rawPrice, service.category)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Popular Packages */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Popular Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow relative">
                {index === 1 && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">{pkg.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareService(pkg.name, pkg.price)}
                      className="flex-1"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button 
                      className="flex-2"
                      onClick={() => addToCart(pkg.name, pkg.rawPrice, pkg.category)}
                    >
                      Select Package
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Industry Packages */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Industry Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industryPackages.map((pkg, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">{pkg.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareService(pkg.name, pkg.price)}
                      className="flex-1"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button 
                      className="flex-2"
                      onClick={() => addToCart(pkg.name, pkg.rawPrice, pkg.category)}
                    >
                      Select Package
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Service Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Registrations */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Company Registrations</h2>
            <div className="space-y-4">
              {registrations.map((service, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.duration}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">{service.price}</div>
                    <div className="flex gap-1 mt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => shareService(service.name, service.price)}
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => addToCart(service.name, service.rawPrice, service.category)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Amendments */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Company Amendments</h2>
            <div className="space-y-4">
              {amendments.map((service, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.duration}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">{service.price}</div>
                    <div className="flex gap-1 mt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => shareService(service.name, service.price)}
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => addToCart(service.name, service.rawPrice, service.category)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tax Services */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Tax and SARS Services</h2>
            <div className="space-y-4">
              {taxServices.map((service, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">{service.price}</div>
                    <div className="flex gap-1 mt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => shareService(service.name, service.price)}
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => addToCart(service.name, service.rawPrice, service.category)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Other Services */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Other Services</h2>
            <div className="space-y-4">
              {otherServices.map((service, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.duration}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">{service.price}</div>
                    <div className="flex gap-1 mt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => shareService(service.name, service.price)}
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => addToCart(service.name, service.rawPrice, service.category)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Build Your Own Package */}
        <section className="mt-16">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Build Your Own Package</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6">Customize your package with the services you need</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6">
                <span>New Company</span>
                <span>Beneficial Ownership</span>
                <span>BEE Affidavit</span>
                <span>VAT Registration</span>
                <span>Share Certificates</span>
                <span>Tax Clearance</span>
                <span>Website</span>
                <span>Logo Design</span>
                <span>Trademarks</span>
                <span>Import/Export</span>
                <span>Business Plans</span>
                <span>And More...</span>
              </div>
              <Button variant="secondary" size="lg">
                Start Building
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Pricing;
