import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PaymentButton } from '@/components/payments/PaymentButton';

const CompliancePackages = () => {
  const navigate = useNavigate();

  const packages = [
    {
      id: 'beginner',
      name: 'Beginner',
      price: 4876,
      period: 'Month',
      description: 'Perfect for small companies starting their compliance journey',
      popular: false,
      features: [
        'Bookkeeping - Once A Month',
        'Dedicated Account Manager',
        'Full Payroll Service (up to 10 employees)',
        'Sage Accounting Online Subscription',
        'Up to 100 Transactions P/M',
        'VAT Returns',
        'All Tax Returns',
        'CIPC Services',
        'Financial Statements'
      ]
    },
    {
      id: 'enhanced',
      name: 'Enhanced',
      price: 7854,
      period: 'Month',
      description: 'Most popular choice for growing businesses',
      popular: true,
      features: [
        'Bookkeeping - Once A Week',
        'Dedicated Account Manager',
        'Full Payroll Service (up to 20 employees)',
        'Sage Accounting Online Subscription',
        'Up to 200 Transactions P/M',
        'Supplier Invoice Capturing',
        'VAT Returns',
        '1 Performance Meeting Per Year'
      ]
    },
    {
      id: 'ultimate',
      name: 'Ultimate',
      price: 10379,
      period: 'Month',
      description: 'Comprehensive solution for established businesses',
      popular: false,
      features: [
        'Bookkeeping - Once a Week',
        'Dedicated Account Manager',
        'Full Payroll Service (up to 30 employees)',
        'Sage Accounting Online Subscription',
        'Up to 300 Transactions P/M',
        'Supplier Invoice Capturing',
        '2 Performance Meetings Per Year'
      ]
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Monthly Compliance Packages
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Pay one amount per month and know that all basic required returns are taken care of when they come due during the year.
            </p>
            <Badge variant="secondary" className="mt-4">
              For All Companies (2026 Financial Year)
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg) => (
              <Card key={pkg.id} className={`relative ${pkg.popular ? 'ring-2 ring-primary shadow-xl scale-105' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                  <CardDescription className="text-sm">{pkg.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-primary">
                      {formatCurrency(pkg.price)}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">/{pkg.period}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <PaymentButton
                    invoiceId={`compliance-${pkg.id}`}
                    amount={pkg.price}
                    description={`${pkg.name} Compliance Package - Monthly Subscription`}
                    className="w-full"
                  />
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Our Compliance Packages?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Complete Compliance</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All required returns and filings handled professionally
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Expert Support</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Dedicated account managers and qualified professionals
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Peace of Mind</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Never miss a deadline or compliance requirement again
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompliancePackages;