import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Building, Calculator, Award, Globe, Shield, Users, CreditCard, Calendar } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PaymentButton } from '@/components/payments/PaymentButton';

const OneTimeServices = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const services = [
    {
      id: 'annual-returns',
      name: 'Annual Returns',
      price: 218,
      category: 'other',
      description: 'File annual returns with CIPC',
      icon: <FileText className="h-6 w-6" />,
      features: ['CIPC AR filing', 'Compliance certificate', 'Status update']
    },
    {
      id: 'company-name-only',
      name: 'Company Name Only',
      price: 288,
      category: 'register',
      description: 'Reserve company name only',
      icon: <Building className="h-6 w-6" />,
      features: ['Name search', 'Name reservation', '6-month validity']
    },
    {
      id: 'vat-return',
      name: 'VAT Return',
      price: 332,
      category: 'tax',
      description: 'VAT201 Return submission',
      icon: <Calculator className="h-6 w-6" />,
      features: ['VAT201 preparation', 'SARS submission', 'Compliance check']
    },
    {
      id: 'paye-return',
      name: 'PAYE Return',
      price: 332,
      category: 'tax',
      description: 'EMP201 PAYE Return',
      icon: <Users className="h-6 w-6" />,
      features: ['EMP201 preparation', 'Employee reconciliation', 'SARS submission']
    },
    {
      id: 'starts-business-plan',
      name: 'STARTS Business Plan',
      price: 339,
      category: 'business-growth',
      description: 'Ideal for companies not actively trading month to month with turnover less than R350,000 per year.',
      icon: <Building className="h-6 w-6" />,
      features: ['CIPC services', 'Basic tax compliance', 'BBBEE templates']
    },
    {
      id: 'financial-year-end-change',
      name: 'Financial Year End Change',
      price: 448,
      category: 'change',
      description: 'Change company financial year end',
      icon: <Calendar className="h-6 w-6" />,
      features: ['CIPC notification', 'Tax year adjustment', 'Documentation update']
    },
    {
      id: 'close-corporation-changes',
      name: 'Close Corporation Changes',
      price: 448,
      category: 'change',
      description: 'CC amendments and changes',
      icon: <Building className="h-6 w-6" />,
      features: ['CC amendments', 'Member changes', 'CIPC filing']
    },
    {
      id: 'registered-address-change',
      name: 'Registered Address Change',
      price: 448,
      category: 'change',
      description: 'Change company registered address',
      icon: <Building className="h-6 w-6" />,
      features: ['Address update', 'CIPC notification', 'Document amendments']
    },
    {
      id: 'bee-affidavit',
      name: 'BEE Affidavit',
      price: 448,
      category: 'other',
      description: 'Broad-Based Black Economic Empowerment certificate',
      icon: <Award className="h-6 w-6" />,
      features: ['BBBEE assessment', 'Affidavit preparation', 'Certificate issuance']
    },
    {
      id: 'csd-registration',
      name: 'CSD Registration',
      price: 448,
      category: 'other',
      description: 'Central Supplier Database registration',
      icon: <Globe className="h-6 w-6" />,
      features: ['CSD application', 'Document verification', 'Registration certificate']
    },
    {
      id: 'tax-clearance',
      name: 'Tax Clearance',
      price: 564,
      category: 'sars',
      description: 'Obtain SARS tax clearance certificate',
      icon: <Shield className="h-6 w-6" />,
      features: ['Tax status verification', 'SARS application', 'Clearance certificate']
    },
    {
      id: 'sdl-registration',
      name: 'SDL Registration',
      price: 564,
      category: 'sars',
      description: 'Skills Development Levy registration',
      icon: <Users className="h-6 w-6" />,
      features: ['SDL registration', 'SETA allocation', 'Compliance setup']
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'other', label: 'Other Services' },
    { value: 'register', label: 'Registration' },
    { value: 'tax', label: 'Tax Services' },
    { value: 'change', label: 'Company Changes' },
    { value: 'sars', label: 'SARS Services' },
    { value: 'business-growth', label: 'Business Growth' }
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              One-Time Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional services for specific business needs. Pay only for what you need, when you need it.
            </p>
            <Badge variant="secondary" className="mt-4">
              63 Services Available
            </Badge>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredServices.map((service) => (
              <Card key={service.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-primary">
                    {service.icon}
                  </div>
                  <CardTitle className="text-lg font-bold">{service.name}</CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                  <div className="mt-3">
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(service.price)}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">incl. 15% VAT</p>
                  </div>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {categories.find(cat => cat.value === service.category)?.label || service.category}
                  </Badge>
                </CardHeader>

                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-4">
                  <PaymentButton
                    invoiceId={`one-time-${service.id}`}
                    amount={service.price}
                    description={`${service.name} - One-time Service`}
                    className="w-full"
                  />
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No services found matching your criteria.</p>
            </div>
          )}

          {/* Service Categories Overview */}
          <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Service Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Calculator className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Tax & Compliance</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  VAT returns, PAYE submissions, tax clearances, and compliance services
                </p>
              </div>
              <div className="text-center">
                <Building className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Company Services</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Company registrations, changes, annual returns, and CIPC services
                </p>
              </div>
              <div className="text-center">
                <Award className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Certificates & Registration</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  BBBEE certificates, CSD registration, and various business certifications
                </p>
              </div>
            </div>
          </div>

          {/* Contact for Custom Services */}
          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Need a Custom Service?</CardTitle>
                <CardDescription>
                  Don't see what you're looking for? We offer custom solutions for unique business requirements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Our expert consultants can provide specialized services tailored to your specific needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:0130040620" className="text-primary font-semibold">
                    📞 013 004 0620
                  </a>
                  <a href="mailto:info@ijlanga.co.za" className="text-primary font-semibold">
                    ✉️ info@ijlanga.co.za
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OneTimeServices;