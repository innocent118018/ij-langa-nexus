import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Users, Shield, FileText, Calculator } from 'lucide-react';
import { PaymentButton } from '@/components/payments/PaymentButton';

const PayrollServices = () => {
  const services = [
    {
      id: 'payroll-administration',
      name: 'Payroll Administration',
      price: 250,
      priceType: 'per employee per month',
      description: 'Complete monthly payroll processing and administration for your employees.',
      features: [
        'Monthly payroll calculations',
        'Payslip generation and distribution',
        'Net salary payments to employees',
        'PAYE, SDL, and UIF calculations',
        'Leave management',
        'Detailed payroll reports'
      ],
      processing_time: 'Monthly processing',
      requirements: 'Employee contracts, salary structures, leave policies, banking details'
    },
    {
      id: 'sars-returns-emp201',
      name: 'SARS Returns (EMP201)',
      price: 1200,
      priceType: 'per submission',
      description: 'Monthly and bi-annual PAYE tax return submissions to SARS.',
      features: [
        'EMP201 return preparation',
        'PAYE reconciliation',
        'SDL calculations',
        'UIF submissions',
        'Electronic submission to SARS',
        'Compliance monitoring'
      ],
      processing_time: '2-3 business days',
      requirements: 'Monthly payroll data, employee tax certificates, previous submissions'
    },
    {
      id: 'irp5-reconciliation-emp501',
      name: 'IRP5 Reconciliation (EMP501)',
      price: 2800,
      priceType: 'annually',
      description: 'Year-end employee tax certificate preparation and EMP501 reconciliation.',
      features: [
        'IRP5/IT3(a) certificate generation',
        'Annual reconciliation (EMP501)',
        'Employee certificate distribution',
        'SARS submission and follow-up',
        'Variance analysis and corrections',
        'Compliance certification'
      ],
      processing_time: '7-10 business days',
      requirements: 'Annual payroll data, employee information, previous year certificates'
    },
    {
      id: 'uif-registration-returns',
      name: 'UIF Registration & Returns',
      price: 850,
      priceType: 'per registration + monthly returns',
      description: 'UIF employer registration and monthly contribution submissions.',
      features: [
        'UIF employer registration',
        'Monthly UIF declarations',
        'Contribution calculations',
        'Employee benefit claims assistance',
        'Compliance monitoring',
        'Annual reconciliation'
      ],
      processing_time: '3-5 business days',
      requirements: 'Company registration, employee details, salary information'
    },
    {
      id: 'workmens-compensation',
      name: "Workmen's Compensation",
      price: 1500,
      priceType: 'annually',
      description: 'Annual assessment and return submission for Compensation Fund.',
      features: [
        'Annual assessment calculations',
        'WAS return preparation',
        'Risk classification review',
        'Premium calculations',
        'Claim assistance',
        'Policy compliance review'
      ],
      processing_time: '5-7 business days',
      requirements: 'Employee headcount, salary data, risk assessments, previous submissions'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="bg-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Payroll Services
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              We can free up time spent on payroll functions and save you costs of hiring staff to perform these functions. 
              Our processes are developed to ensure all payroll functions and related activities are performed accurately and on time.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                Employee Management
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                Secure Environment
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Calculator className="h-4 w-4 mr-2" />
                Accurate Calculations
              </Badge>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {services.map((service) => (
              <Card key={service.id} className="shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <CardTitle className="text-2xl font-bold">{service.name}</CardTitle>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-purple-600">
                        {formatCurrency(service.price * 1.15)}
                      </div>
                      <div className="text-sm text-muted-foreground">{service.priceType}</div>
                      <div className="text-xs text-muted-foreground">Including VAT</div>
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
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span>{service.processing_time}</span>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Requirements:</h5>
                    <p className="text-sm text-muted-foreground">{service.requirements}</p>
                  </div>

                  <div className="flex gap-3">
                    <PaymentButton
                      invoiceId={`payroll-${service.id}`}
                      amount={service.price * 1.15}
                      description={`${service.name} - Professional Payroll Service`}
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                    />
                    <Link to={`/services/payroll/${service.id}`}>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key Benefits */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-bold mb-6">Our Payroll Process Ensures</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Comprehensive Services:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Preparation of payroll on monthly basis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Processing and submission of payslips to employees
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Payment of net salaries to employees
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Detailed payroll reports on leave, earnings, deductions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Calculation of PAYE, SDL and UIF amounts
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Professional Support:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Preparing and issuing IRP5s at tax year-end
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Calculating payroll taxes (EMP201 and EMP501)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Advising on amounts payable to SARS
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Managing SARS and institutional communication
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Legislative compliance updates
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why Choose Our Payroll Services */}
          <div className="bg-purple-50 dark:bg-gray-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Payroll Services?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-600/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Secure Environment</h3>
                <p className="text-muted-foreground">
                  Your employee information is kept safe and secure in our professional payroll system.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-600/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Legislative Compliance</h3>
                <p className="text-muted-foreground">
                  We keep up to date with legislative changes ensuring compliance with all payroll authorities.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-600/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Cost Effective</h3>
                <p className="text-muted-foreground">
                  Save on hiring dedicated payroll staff while ensuring professional service delivery.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">Ready to Streamline Your Payroll?</h2>
            <p className="text-muted-foreground mb-6">
              Let us handle your payroll functions so you can focus on growing your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Get Payroll Quote
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

export default PayrollServices;