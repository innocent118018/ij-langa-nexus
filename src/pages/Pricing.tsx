import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

const Pricing = () => {
  const popularServices = [
    { name: 'Company Registration', price: 'R590', duration: '3-5 Days' },
    { name: 'Beneficial Ownership', price: 'R590', duration: '1-7 Days' },
    { name: 'Annual Returns', price: 'R190 + CIPC Fee', duration: '2 days' },
    { name: 'Public Officer Appointment', price: 'R590', duration: '6-8 weeks' },
    { name: 'Tax Clearance', price: 'R490', duration: '1-7 Days' },
    { name: 'Director/Shareholder Changes', price: 'R850', duration: '1-7 Days' }
  ];

  const packages = [
    {
      name: 'Starter Package',
      price: 'R1,670',
      features: ['New Company', 'Bank Ready', 'Share Certificates', 'Public Officer Appointment', 'Tax Clearance Certificate']
    },
    {
      name: 'Tender Package', 
      price: 'R3,040',
      features: ['New Company', 'Bank Ready', 'Share Certificates', 'Beneficial Ownership', 'Public Officer Appointment', 'Tax Clearance Certificate', 'BEE Affidavit', 'CSD Registration']
    },
    {
      name: 'Premium Package',
      price: 'R6,155', 
      features: ['New Company', 'Bank Ready', 'Share Certificates', 'Beneficial Ownership', 'Public Officer Appointment', 'Tax Clearance Certificate', 'BEE Affidavit', 'CSD Registration', 'Standard Website', 'Google Map', 'SEO', 'Social Media Links', 'User Access Control', '500 Business Cards']
    }
  ];

  const industryPackages = [
    {
      name: 'Transport Package',
      price: 'R3,040',
      features: ['New Company', 'Bank Ready', 'Share Certificates', 'Beneficial Ownership', 'Public Officer Appointment', 'Tax Clearance Certificate', 'BEE Affidavit', 'CSD Registration']
    },
    {
      name: 'Construction Package',
      price: 'R4,290', 
      features: ['New Company', 'Bank Ready', 'Share Certificates', 'Beneficial Ownership', 'Public Officer Appointment', 'Tax Clearance Certificate', 'BEE Affidavit', 'CSD Registration', 'CIBD (1 Class Included)']
    },
    {
      name: 'Security (PSIRA) Package',
      price: 'R5,620',
      features: ['New Company', 'Bank Ready', 'Share Certificates', 'Public Officer Appointment', 'Tax Clearance Certificate', 'Mandatory Design Elements', 'Authorisation Resolution', 'Operational Readiness Resolution', 'Security Business Plan']
    }
  ];

  const registrations = [
    { name: 'Pty Registration', price: 'From R590', duration: '3-5 Days' },
    { name: 'Non-Profit Company Registration', price: 'From R1,500', duration: '3-7 Days' },
    { name: 'Incorporation Company Registration', price: 'R1,500', duration: '21 Days' },
    { name: 'Company Name Only', price: 'R250', duration: '1 Day' }
  ];

  const amendments = [
    { name: 'Company Name Change', price: 'R650', duration: '1-2 Days' },
    { name: 'Director/Shareholder Changes', price: 'R850', duration: '1-7 Days' },
    { name: 'CC Changes', price: 'From R390', duration: 'Various' },
    { name: 'Registered Address Change', price: 'R390', duration: '15 Days' },
    { name: 'Share Certificate Printing', price: 'R390', duration: 'Immediate' },
    { name: 'Shareholders Agreement', price: 'R990', duration: '1 Day' },
    { name: 'MOI Changes', price: 'From R990', duration: '21 Days' },
    { name: 'Financial Year End Change', price: 'From R390', duration: '1 Day' }
  ];

  const taxServices = [
    { name: 'Individual Tax Return (IRP5)', price: 'R1,665.20', description: 'IT12 – Individual with IRP5' },
    { name: 'Individual Tax Return (IRP5 + Rental)', price: 'R2,248.20', description: 'Individual with IRP5 & Rental Income' },
    { name: 'Individual Tax Return (Sole Proprietor)', price: 'R2,831.20', description: 'IT12 – Sole Proprietor' },
    { name: 'Company Tax Return', price: 'R1,915.40', description: 'IT14 – Company or Close Corporation' },
    { name: 'VAT Return', price: 'R288.40', description: 'VAT201' },
    { name: 'PAYE Return', price: 'R288.40', description: 'EMP201' }
  ];

  const otherServices = [
    { name: 'Annual Returns', price: 'R190 + CIPC Fee', duration: '2 days' },
    { name: 'BEE Affidavit', price: 'R390', duration: '1 Day' },
    { name: 'CSD Registration', price: 'R390', duration: '1 Day' },
    { name: 'Beneficial Ownership', price: 'R590', duration: '1-7 Days' },
    { name: 'PSIRA Assistance', price: 'R5,620', duration: 'Various' },
    { name: 'Trademarks', price: 'R2,200', duration: '10 Days to Receipt' },
    { name: 'Company Restoration', price: 'R2,580', duration: '21 Days' },
    { name: 'CIDB Registration', price: 'R1,250', duration: 'Various' },
    { name: 'NHBRC Registration', price: 'R1,990', duration: 'Suspended Service' }
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
                  <Button className="w-full">Add to Cart</Button>
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
                  <Button className="w-full">Select Package</Button>
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
                  <Button className="w-full">Select Package</Button>
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
                    <Button size="sm">Add to Cart</Button>
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
                    <Button size="sm">Add to Cart</Button>
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
                    <Button size="sm">Add to Cart</Button>
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
                    <Button size="sm">Add to Cart</Button>
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
