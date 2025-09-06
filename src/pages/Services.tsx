import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calculator, 
  FileText, 
  Users, 
  Building, 
  TrendingUp,
  ClipboardList,
  CreditCard,
  UserCheck,
  Award,
  Search,
  Shield,
  HelpCircle
} from 'lucide-react';

const Services = () => {
  const serviceCategories = [
    {
      title: "Accounting",
      icon: Calculator,
      description: "Professional accounting services for your business",
      services: [
        { name: "Bookkeeping to Trial Balance", slug: "bookkeeping-trial-balance" },
        { name: "Monthly Management Accounts", slug: "monthly-management-accounts" },
        { name: "Annual Financial Statements", slug: "annual-financial-statements" },
        { name: "Independent Review", slug: "independent-review" }
      ]
    },
    {
      title: "Taxation",
      icon: FileText,
      description: "Complete tax services and compliance",
      services: [
        { name: "eFiling Registration", slug: "efiling-registration" },
        { name: "Personal Income Tax", slug: "personal-income-tax" },
        { name: "Company Tax", slug: "company-tax" },
        { name: "Provisional Tax", slug: "provisional-tax" },
        { name: "Tax Clearance Certificates", slug: "tax-clearance-certificates" },
        { name: "VAT Registration", slug: "vat-registration" },
        { name: "PAYE Registration", slug: "paye-registration" }
      ]
    },
    {
      title: "HR & Payroll",
      icon: Users,
      description: "Human resources and payroll management",
      services: [
        { name: "SARS returns for VAT, PAYE & SDL (EMP201)", slug: "sars-returns-emp201" },
        { name: "IRP5 bi-annual reconciliation (EMP501)", slug: "irp5-reconciliation-emp501" },
        { name: "UIF Registration & Returns", slug: "uif-registration-returns" },
        { name: "Payroll administration and services", slug: "payroll-administration" },
        { name: "Workmen's Compensation", slug: "workmens-compensation" }
      ]
    },
    {
      title: "Secretarial",
      icon: Building,
      description: "Company registration and secretarial services",
      services: [
        { name: "Company Registrations", slug: "company-registrations" },
        { name: "CIPC Annual Returns", slug: "cipc-annual-returns" },
        { name: "Change of Company Details", slug: "change-company-details" },
        { name: "Beneficial Ownership Submissions", slug: "beneficial-ownership-submissions" },
        { name: "B-BBEE Certificates", slug: "bbee-certificates" },
        { name: "Credit Checks", slug: "credit-checks" },
        { name: "Criminal Record Check", slug: "criminal-record-check" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Need reliable bookkeeping<br />
            & accounting services?
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Look no further!
          </p>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Our list of services includes but is not limited to professional accounting, 
            taxation, HR & payroll, and secretarial services for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                View Pricing
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                Get Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Service Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional services designed to keep your business compliant and profitable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                    </div>
                    <p className="text-gray-600">{category.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.services.map((service, serviceIndex) => (
                        <li key={serviceIndex}>
                          <Link 
                            to={`/services/${category.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}/${service.slug}`}
                            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors group"
                          >
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 group-hover:bg-blue-800"></div>
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose IJ Langa Consulting?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">22+ Years Experience</h3>
              <p className="text-gray-600">Trusted expertise in South African business services</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">SARS Registered</h3>
              <p className="text-gray-600">Authorized and compliant with all regulations</p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Turnaround</h3>
              <p className="text-gray-600">Efficient processing for all standard services</p>
            </div>
            <div className="text-center">
              <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Professional consultants ready to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Contact us today for professional business services you can trust
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                Contact Us
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;