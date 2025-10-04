import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X, Building, TrendingUp, Rocket } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PaymentButton } from '@/components/payments/PaymentButton';

const BusinessPlans = () => {
  const plans = [
    {
      id: 'starts',
      name: 'STARTS',
      price: 339,
      period: 'month',
      description: 'Ideal for companies not actively trading month to month with turnover less than R350,000 per year.',
      icon: <Building className="h-8 w-8" />,
      features: {
        cipc: ['CIPC Annual Return reminders', 'CIPC Beneficial Ownership register'],
        tax: ['Submit Company Income Tax Return (ITR14)'],
        accounting: [],
        payroll: [],
        funding: ['Pre-approved purchase order facility']
      },
      excluded: [
        'Company Changes/Updates',
        'VAT return (VAT201)',
        'PAYE return (EMP201)',
        'Xero Accounting Software',
        'Monthly bookkeeping',
        'SimplePay payroll software',
        'Monthly Payroll Processing'
      ],
      suitableFor: 'Non-trading companies, holding companies, dormant entities'
    },
    {
      id: 'accurate',
      name: 'ACCURATE',
      price: 1662,
      period: 'month',
      description: 'For actively trading companies with turnover less than R1 million per year.',
      icon: <TrendingUp className="h-8 w-8" />,
      features: {
        cipc: ['CIPC Annual Return reminders', 'CIPC Beneficial Ownership register', 'Company Changes/Updates'],
        tax: ['Submit Company Income Tax Return (ITR14)', 'VAT return (VAT201) - R500 per return', 'PAYE return (EMP201) - R300 per return'],
        accounting: ['Xero Accounting Software', 'Monthly bookkeeping (limited to 20 transactions)'],
        payroll: ['SimplePay payroll software', 'Monthly Payroll Processing (limited to 3 employees)'],
        funding: ['Pre-approved purchase order facility']
      },
      excluded: [],
      suitableFor: 'Small active businesses, startups, growing companies'
    },
    {
      id: 'go-brave',
      name: 'GO BRAVE',
      price: 4589,
      period: 'month',
      description: 'For companies with turnover above R1 million per year.',
      icon: <Rocket className="h-8 w-8" />,
      features: {
        cipc: ['CIPC Annual Return reminders', 'CIPC Beneficial Ownership register', 'Company Changes/Updates'],
        tax: ['Submit Company Income Tax Return (ITR14)', 'VAT return (VAT201) review and submission', 'PAYE return (EMP201) review and submission'],
        accounting: ['Xero Accounting Software', 'Full monthly bookkeeping by experts'],
        payroll: ['SimplePay payroll software', 'Complete Monthly Payroll Processing'],
        funding: ['Pre-approved purchase order facility']
      },
      excluded: [],
      suitableFor: 'Established businesses, high-turnover companies, complex operations'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  const FeatureSection = ({ title, features, excluded = [] }: { title: string; features: string[]; excluded?: string[] }) => (
    <div className="mb-4">
      <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">{title}</h4>
      <ul className="space-y-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-xs">
            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400">{feature}</span>
          </li>
        ))}
        {excluded.map((feature, index) => (
          <li key={`excluded-${index}`} className="flex items-start gap-2 text-xs">
            <X className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-500 dark:text-gray-500 line-through">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Run & Grow Your Business
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Select the plan that's right for your business. You can always upgrade or downgrade anytime.
            </p>
            <Badge variant="secondary" className="mt-4">
              Monthly Subscription Service
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <Card key={plan.id} className={`h-full flex flex-col ${plan.id === 'accurate' ? 'ring-2 ring-primary shadow-xl' : ''}`}>
                <CardHeader className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-primary">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-primary">
                      {formatCurrency(plan.price)}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
                  </div>
                  <Badge variant="outline" className="mt-2">
                    {plan.suitableFor}
                  </Badge>
                </CardHeader>

                <CardContent className="flex-grow">
                  <FeatureSection title="CIPC Services" features={plan.features.cipc} />
                  <FeatureSection title="Tax Services" features={plan.features.tax} />
                  <FeatureSection title="Accounting Services" features={plan.features.accounting} />
                  <FeatureSection title="Payroll Services" features={plan.features.payroll} />
                  <FeatureSection title="Funding Services" features={plan.features.funding} />
                  {plan.excluded.length > 0 && (
                    <FeatureSection title="Not Included" features={[]} excluded={plan.excluded} />
                  )}
                </CardContent>

                <CardFooter>
                  <PaymentButton
                    invoiceId={`business-plan-${plan.id}`}
                    amount={plan.price}
                    description={`${plan.name} Business Plan - Monthly Subscription`}
                    className="w-full"
                  />
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Why Choose Our Business Plans?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Building className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Complete Business Support</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  From company registration to ongoing compliance, we handle all aspects of your business administration.
                </p>
              </div>
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Scalable Solutions</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Start with what you need today and upgrade as your business grows. No long-term commitments.
                </p>
              </div>
              <div className="text-center">
                <Rocket className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Expert Guidance</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Dedicated account managers and specialist consultants to guide your business growth.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Need Custom Solutions?</CardTitle>
                <CardDescription>
                  Every business is unique. Contact us to discuss custom packages tailored to your specific needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Our business consultants can create a personalized plan that grows with your business and adapts to your industry requirements.
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

export default BusinessPlans;