import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Building, Shield, FileText, Users } from 'lucide-react';
import { PaymentButton } from '@/components/payments/PaymentButton';

const SecretarialServices = () => {
  const services = [
    {
      id: 'company-registrations',
      name: 'Company Registration',
      price: 2500,
      description: 'Complete company registration with CIPC including all required documentation and compliance setup.',
      features: [
        'Name availability search',
        'MOI drafting and filing',
        'CIPC registration submission',
        'Registration certificate',
        'Company seal and stamps',
        'Initial statutory registers setup'
      ],
      processing_time: '7-14 business days',
      requirements: 'Proposed company name, director details, registered address, share capital structure'
    },
    {
      id: 'cipc-annual-returns',
      name: 'CIPC Annual Returns',
      price: 1800,
      description: 'Annual return submission to CIPC ensuring ongoing compliance with Companies Act requirements.',
      features: [
        'Annual return preparation',
        'Director and secretary updates',
        'Share capital reconciliation',
        'Registered office updates',
        'CIPC submission and follow-up',
        'Compliance certificate'
      ],
      processing_time: '5-7 business days',
      requirements: 'Company registration details, current director information, financial statements'
    },
    {
      id: 'change-company-details',
      name: 'Change of Company Details',
      price: 1500,
      description: 'Amendment of company particulars including name changes, director appointments, and address updates.',
      features: [
        'Name change applications',
        'Director appointment/resignation',
        'Registered address changes',
        'MOI amendments',
        'CIPC notifications',
        'Updated certificates'
      ],
      processing_time: '7-10 business days',
      requirements: 'Board resolutions, new director details, proof of new addresses, amended MOI if required'
    },
    {
      id: 'beneficial-ownership-submissions',
      name: 'Beneficial Ownership Register',
      price: 2200,
      description: 'Preparation and maintenance of beneficial ownership register as required by Companies Act.',
      features: [
        'Beneficial ownership identification',
        'Register compilation',
        'Annual updates and maintenance',
        'CIPC submissions',
        'Compliance monitoring',
        'Privacy protections'
      ],
      processing_time: '5-7 business days',
      requirements: 'Shareholder details, ownership structures, trust information, ID documents'
    },
    {
      id: 'bbbee-certificates',
      name: 'B-BBEE Certificates',
      price: 3500,
      description: 'Broad-Based Black Economic Empowerment verification and certificate applications.',
      features: [
        'B-BBEE scorecard preparation',
        'Verification application',
        'Supporting documentation',
        'Certificate facilitation',
        'Annual renewal reminders',
        'Compliance guidance'
      ],
      processing_time: '10-14 business days',
      requirements: 'Company financials, employment equity data, skills development records, enterprise data'
    },
    {
      id: 'credit-checks',
      name: 'Credit Checks',
      price: 450,
      description: 'Comprehensive credit reports for individuals and companies for due diligence purposes.',
      features: [
        'Individual credit reports',
        'Company credit assessments',
        'Payment behavior analysis',
        'Risk assessment reports',
        'Debt review status',
        'Recommendations'
      ],
      processing_time: '1-2 business days',
      requirements: 'ID numbers, company registration numbers, consent forms'
    },
    {
      id: 'criminal-record-check',
      name: 'Criminal Record Checks',
      price: 280,
      description: 'Police clearance certificate applications and criminal background verification services.',
      features: [
        'SAPS clearance applications',
        'Fingerprint coordination',
        'Application tracking',
        'Certificate collection',
        'Apostille assistance',
        'Expedited processing'
      ],
      processing_time: '14-21 business days',
      requirements: 'ID document, fingerprints, passport photos, application forms'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="bg-amber-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Secretarial Services
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              We offer secretarial services to small, medium-sized, and large entities. We understand the administrative 
              requirements involved in keeping company records up to date and the storage of key company documents.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Building className="h-4 w-4 mr-2" />
                Companies Act Compliant
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <FileText className="h-4 w-4 mr-2" />
                Document Management
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                Corporate Governance
              </Badge>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {services.map((service) => (
              <Card key={service.id} className="shadow-lg border-2 border-amber-200 hover:border-amber-400 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <CardTitle className="text-2xl font-bold">{service.name}</CardTitle>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-amber-600">
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
                      <Clock className="h-4 w-4 text-amber-600" />
                      <span>{service.processing_time}</span>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Requirements:</h5>
                    <p className="text-sm text-muted-foreground">{service.requirements}</p>
                  </div>

                  <div className="flex gap-3">
                    <PaymentButton
                      invoiceId={`secretarial-${service.id}`}
                      amount={service.price * 1.15}
                      description={`${service.name} - Professional Secretarial Service`}
                      className="flex-1 bg-amber-600 hover:bg-amber-700"
                    />
                    <Link to={`/services/secretarial/${service.id}`}>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Services */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-bold mb-6">Our Comprehensive Secretarial Services Include</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Registration Services:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Registration of companies (CIPC, Industry bodies)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Close Corporation conversions to companies
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Non-Profit Organisation registrations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Trust registrations and amendments
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Compliance Services:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Submission of annual returns
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Drafting of company resolutions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    AGM documentation and minutes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Maintenance of statutory records
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why Choose Our Secretarial Services */}
          <div className="bg-amber-50 dark:bg-gray-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Secretarial Services?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-amber-600/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Corporate Compliance</h3>
                <p className="text-muted-foreground">
                  Ensure full compliance with Companies Act 71 of 2008 and all regulatory requirements.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-amber-600/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Document Security</h3>
                <p className="text-muted-foreground">
                  Safe and secure storage of key company documents with easy access when needed.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-amber-600/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Expert Guidance</h3>
                <p className="text-muted-foreground">
                  Professional guidance on corporate governance and administrative best practices.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">Need Secretarial Support?</h2>
            <p className="text-muted-foreground mb-6">
              Let us handle your corporate administration so you can focus on running your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                  Get Secretarial Quote
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

export default SecretarialServices;