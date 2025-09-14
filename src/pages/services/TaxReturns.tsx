import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, FileText, Calculator, Users } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PaymentButton } from '@/components/payments/PaymentButton';

const TaxReturns = () => {
  const taxServices = [
    {
      id: 'basic-income-tax',
      name: 'Basic Income Tax Return',
      price: 702,
      description: 'Individual tax return for IRP5s, medical aid expenses, retirement contributions, interest income, and share sales.',
      icon: <FileText className="h-8 w-8" />,
      features: [
        'IRP5 processing',
        'Medical aid expenses',
        'Retirement contributions',
        'Interest income',
        'Share sales',
        'Standard deductions',
        'Electronic submission'
      ],
      suitableFor: 'Employed individuals with basic tax affairs'
    },
    {
      id: 'advanced-income-tax',
      name: 'Advanced Income Tax Return',
      price: 1173,
      description: 'Advanced individual tax return including rental income, company car allowances, property sales, cryptocurrencies, and home office expenses.',
      icon: <Calculator className="h-8 w-8" />,
      features: [
        'All basic income tax features',
        'Rental income calculations',
        'Company car allowances',
        'Property sales (CGT)',
        'Cryptocurrency transactions',
        'Home office expenses',
        'Travel allowances',
        'Complex deductions'
      ],
      suitableFor: 'Individuals with complex tax affairs'
    },
    {
      id: 'trade-income-tax',
      name: 'Trade Income Tax Return',
      price: 1564,
      description: 'Comprehensive individual tax return for sole proprietors, partnerships, and commission income earners.',
      icon: <Users className="h-8 w-8" />,
      features: [
        'All advanced income tax features',
        'Business income and expenses',
        'Partnership income',
        'Commission calculations',
        'Asset depreciation',
        'Stock valuations',
        'VAT implications',
        'Provisional tax calculations'
      ],
      suitableFor: 'Business owners, sole proprietors, and commission earners'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Individual Tax Returns
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional tax return preparation for individuals, ensuring maximum refunds and complete compliance with SARS requirements.
            </p>
            <Badge variant="secondary" className="mt-4">
              Expert Tax Professionals
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {taxServices.map((service) => (
              <Card key={service.id} className="h-full flex flex-col">
                <CardHeader className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-primary">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold">{service.name}</CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-primary">
                      {formatCurrency(service.price)}
                    </span>
                  </div>
                  <Badge variant="outline" className="mt-2">
                    {service.suitableFor}
                  </Badge>
                </CardHeader>

                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <PaymentButton
                    invoiceId={`tax-return-${service.id}`}
                    amount={service.price}
                    description={`${service.name} - Professional Tax Return Preparation`}
                    className="w-full"
                  />
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              What's Included in All Tax Returns
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <FileText className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Document Review</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Thorough review of all tax documents
                </p>
              </div>
              <div className="text-center">
                <Calculator className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Accurate Calculations</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Precise calculations to maximize refunds
                </p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">SARS Submission</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Electronic filing with SARS eFiling
                </p>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Expert Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ongoing support and query resolution
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Need Help Choosing?</CardTitle>
                <CardDescription>
                  Not sure which tax return service is right for you? Our tax experts can help you determine the best option.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Contact us for a free consultation to discuss your tax needs and ensure you're getting the maximum benefit from your tax return.
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

export default TaxReturns;