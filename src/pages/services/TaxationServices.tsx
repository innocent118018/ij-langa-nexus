import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, FileText, Shield, Calculator } from 'lucide-react';
import { PaymentButton } from '@/components/payments/PaymentButton';

const TaxationServices = () => {
  const services = [
    {
      id: 'efiling-registration',
      name: 'eFiling Registration',
      price: 850,
      description: 'Complete SARS eFiling profile setup and registration for individuals and businesses.',
      features: [
        'SARS eFiling profile creation',
        'Tax number application',
        'Digital certificate setup',
        'User account configuration',
        'Initial login assistance',
        'Basic eFiling training'
      ],
      processing_time: '2-3 business days',
      requirements: 'ID document, proof of address, banking details, contact information'
    },
    {
      id: 'personal-income-tax',
      name: 'Personal Income Tax Returns',
      price: 1200,
      description: 'Professional preparation and submission of individual income tax returns (ITR12).',
      features: [
        'ITR12 completion and submission',
        'Salary/wage calculations',
        'Medical aid tax credits',
        'Retirement annuity deductions',
        'Travel allowance calculations',
        'Tax optimization advice'
      ],
      processing_time: '3-5 business days',
      requirements: 'IRP5/IT3(a), medical aid certificate, RA certificate, travel logbook if applicable'
    },
    {
      id: 'company-tax',
      name: 'Company Income Tax Returns',
      price: 4500,
      description: 'Complete corporate income tax return preparation (ITR14) and submission.',
      features: [
        'ITR14 preparation and submission',
        'Tax computation schedules',
        'Provisional tax calculations',
        'Capital allowances claims',
        'Section 12E deductions',
        'Tax planning strategies'
      ],
      processing_time: '7-10 business days',
      requirements: 'Annual Financial Statements, trial balance, asset registers, prior year assessments'
    },
    {
      id: 'provisional-tax',
      name: 'Provisional Tax Returns',
      price: 1800,
      description: 'Bi-annual provisional tax calculations and submissions for individuals and companies.',
      features: [
        '1st and 2nd provisional submissions',
        'Taxable income estimates',
        'Tax liability calculations',
        'Payment due date reminders',
        'Basic penalty calculations',
        'Year-end reconciliation'
      ],
      processing_time: '2-4 business days',
      requirements: 'Current year income estimates, prior year assessment, business projections'
    },
    {
      id: 'vat-registration',
      name: 'VAT Registration',
      price: 2200,
      description: 'Complete VAT vendor registration and compliance setup with SARS.',
      features: [
        'VAT registration application',
        'Vendor number allocation',
        'Return period determination',
        'VAT system setup',
        'Initial compliance guidance',
        'First return assistance'
      ],
      processing_time: '5-7 business days',
      requirements: 'Business registration, projected turnover, banking details, business address proof'
    },
    {
      id: 'paye-registration',
      name: 'PAYE Registration',
      price: 1500,
      description: 'Employer PAYE registration and payroll tax compliance setup.',
      features: [
        'PAYE registration submission',
        'Employer reference allocation',
        'SDL and UIF registration',
        'Payroll tax setup guidance',
        'EMP201 preparation assistance',
        'Compliance calendar setup'
      ],
      processing_time: '3-5 business days',
      requirements: 'Company registration, director details, employee information, business address'
    },
    {
      id: 'tax-clearance-certificates',
      name: 'Tax Clearance Certificates',
      price: 950,
      description: 'Application and facilitation of tax clearance certificates for various purposes.',
      features: [
        'TCC application submission',
        'Compliance status review',
        'Outstanding returns resolution',
        'Payment arrangement assistance',
        'Certificate collection',
        'Validity period monitoring'
      ],
      processing_time: '5-14 business days',
      requirements: 'Tax compliance status, outstanding return information, payment records'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="bg-green-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Taxation Services
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              IJ Langa Consulting has a team of skilled, experienced, and knowledgeable tax practitioners, 
              who are up-to-date with the laws and regulations of the South African Revenue Services (SARS). 
              Our main objective is to keep our clients compliant.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                SARS Compliant
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Calculator className="h-4 w-4 mr-2" />
                Tax Optimization
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <FileText className="h-4 w-4 mr-2" />
                Professional Service
              </Badge>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {services.map((service) => (
              <Card key={service.id} className="shadow-lg border-2 border-green-200 hover:border-green-400 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <CardTitle className="text-2xl font-bold">{service.name}</CardTitle>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">
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
                      <Clock className="h-4 w-4 text-green-600" />
                      <span>{service.processing_time}</span>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Requirements:</h5>
                    <p className="text-sm text-muted-foreground">{service.requirements}</p>
                  </div>

                  <div className="flex gap-3">
                    <PaymentButton
                      invoiceId={`taxation-${service.id}`}
                      amount={service.price * 1.15}
                      description={`${service.name} - Professional Tax Service`}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    />
                    <Link to={`/services/taxation/${service.id}`}>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Tax Services */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-bold mb-6">Additional Tax Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Specialized Services:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Diesel rebate applications and returns
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    IT14SD reconciliations and returns
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Withholding tax calculations (dividends, interest, royalties)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Public Benefit Organisation tax returns
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Voluntary Disclosure Programme applications
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Support Services:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Tax dispute resolutions and appeals
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    SARS correspondence management
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Tax planning and advisory services
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Amending/updating SARS registered details
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Tax directives and clearances
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why Choose Our Tax Services */}
          <div className="bg-green-50 dark:bg-gray-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Tax Services?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-600/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">SARS Compliance</h3>
                <p className="text-muted-foreground">
                  Stay compliant with all SARS requirements and avoid penalties through our expert guidance.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-600/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Tax Optimization</h3>
                <p className="text-muted-foreground">
                  Maximize your tax benefits and minimize liabilities with strategic tax planning.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-600/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Expert Knowledge</h3>
                <p className="text-muted-foreground">
                  Our qualified tax practitioners stay current with all tax law changes and regulations.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">Need Tax Assistance?</h2>
            <p className="text-muted-foreground mb-6">
              Contact our tax practitioners today for professional guidance and compliance support.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Get Tax Consultation
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg">View All Services</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};

export default TaxationServices;