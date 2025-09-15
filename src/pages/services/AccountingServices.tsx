import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, FileText, BarChart3 } from 'lucide-react';
import { PaymentButton } from '@/components/payments/PaymentButton';

const AccountingServices = () => {
  const services = [
    {
      id: 'bookkeeping-trial-balance',
      name: 'Bookkeeping to Trial Balance',
      price: 2500,
      description: 'Professional bookkeeping services using appropriate accounting systems with monthly reconciliations and trial balance preparation.',
      features: [
        'Daily transaction recording',
        'Bank reconciliations',
        'Creditors and debtors management',
        'Monthly trial balance',
        'Sage/Xero integration',
        'VAT reconciliation'
      ],
      processing_time: '5-7 business days',
      requirements: 'Bank statements, invoices, receipts, expense records'
    },
    {
      id: 'monthly-management-accounts',
      name: 'Monthly Management Accounts',
      price: 3500,
      description: 'Comprehensive monthly management accounts for informed business decision making and performance monitoring.',
      features: [
        'Profit & Loss statements',
        'Balance sheet preparation',
        'Cash flow analysis',
        'Budget vs actual comparison',
        'Key performance indicators',
        'Management recommendations'
      ],
      processing_time: '7-10 business days',
      requirements: 'Complete bookkeeping records, budget information, previous period comparisons'
    },
    {
      id: 'annual-financial-statements',
      name: 'Annual Financial Statements',
      price: 8500,
      description: 'IFRS compliant Annual Financial Statements for Companies Act compliance and stakeholder reporting.',
      features: [
        'IFRS/IFRS for SMEs compliance',
        'Directors report preparation',
        'Note disclosures',
        'Companies Act compliance',
        'Audit readiness review',
        'Digital and printed copies'
      ],
      processing_time: '14-21 business days',
      requirements: 'Trial balance, supporting schedules, prior year statements, company information'
    },
    {
      id: 'independent-review',
      name: 'Independent Review',
      price: 12500,
      description: 'Professional independent review engagement providing limited assurance on your financial statements.',
      features: [
        'Limited assurance engagement',
        'Analytical procedures',
        'Inquiry procedures',
        'Review report',
        'Management letter',
        'Compliance assessment'
      ],
      processing_time: '21-30 business days',
      requirements: 'Annual Financial Statements, supporting documentation, management representations'
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Accounting Services
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              It is very crucial for small and medium-sized businesses to know and understand the importance of record keeping and financial statements. 
              Monitoring business performance through record keeping is vital, hence the need for a qualified accountant.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <FileText className="h-4 w-4 mr-2" />
                IFRS Compliant
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <BarChart3 className="h-4 w-4 mr-2" />
                Performance Monitoring
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Clock className="h-4 w-4 mr-2" />
                5+ Years Experience
              </Badge>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {services.map((service) => (
              <Card key={service.id} className="shadow-lg border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <CardTitle className="text-2xl font-bold">{service.name}</CardTitle>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        {formatCurrency(service.price * 1.15)}
                      </div>
                      <div className="text-sm text-muted-foreground">Including VAT</div>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{service.processing_time}</span>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Requirements:</h5>
                    <p className="text-sm text-muted-foreground">{service.requirements}</p>
                  </div>

                  <div className="flex gap-3">
                    <PaymentButton
                      invoiceId={`accounting-${service.id}`}
                      amount={service.price * 1.15}
                      description={`${service.name} - Professional Accounting Service`}
                      className="flex-1"
                    />
                    <Link to={`/services/accounting/${service.id}`}>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Why Choose Our Accounting Services */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Accounting Services?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Compliance Assured</h3>
                <p className="text-muted-foreground">
                  All work complies with IFRS, Companies Act 71 of 2008, and tax legislation requirements.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Business Insights</h3>
                <p className="text-muted-foreground">
                  Detailed reporting and analysis to help you make informed business decisions.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Qualified Professionals</h3>
                <p className="text-muted-foreground">
                  Our team of qualified accountants ensures accuracy and professional service delivery.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Contact us today to discuss your accounting needs and get a customized solution for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg">Get Free Consultation</Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg">View All Pricing</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountingServices;