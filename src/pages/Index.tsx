
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calculator, 
  Building, 
  FileText, 
  Users, 
  Shield, 
  Award,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  const services = [
    {
      icon: Calculator,
      title: "Taxation Services",
      description: "VAT, PAYE, Provisional Tax, Annual Returns",
      items: ["VAT Registration & Returns", "PAYE Management", "Provisional Tax", "Income Tax Returns"]
    },
    {
      icon: FileText,
      title: "Bookkeeping & Accounting",
      description: "Professional bookkeeping and financial management",
      items: ["Monthly Bookkeeping", "Financial Statements", "Management Accounts", "Payroll Services"]
    },
    {
      icon: Building,
      title: "CIPC Services",
      description: "Company registrations and compliance",
      items: ["New Company Registration", "Name Changes", "Shelf Companies", "Annual Returns"]
    },
    {
      icon: Shield,
      title: "Compliance Services",
      description: "NHBRC, CIDB, COIDA, UIF registrations",
      items: ["NHBRC Registration", "CIDB Registration", "COIDA Compliance", "UIF Management"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-4 mb-6">
              <img 
                src="/lovable-uploads/9ba4ae64-601e-4162-9165-29b1004a73d1.png" 
                alt="IJ Langa Logo" 
                className="h-16 w-auto brightness-0 invert"
              />
              <img 
                src="/lovable-uploads/3a4a6cc6-a0f7-4d80-831d-5c7bddc9bad0.png" 
                alt="IJ Langa Logo" 
                className="h-16 w-auto brightness-0 invert"
              />
              <img 
                src="/lovable-uploads/a40ab648-5c25-4e45-8711-428b8042e179.png" 
                alt="IJ Langa Logo" 
                className="h-16 w-auto brightness-0 invert"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              IJ Langa Consulting
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Your trusted partner for taxation, bookkeeping, CIPC services, and business compliance solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth?mode=signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Professional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive business solutions to help your company grow and stay compliant
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <service.icon className="h-10 w-10 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/pricing">
              <Button size="lg">
                View All Services & Pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About IJ Langa Consulting
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>SAIBA16176</strong> - IJ Langa Consulting (Pty) Ltd is a professional consulting 
                  firm specializing in taxation, bookkeeping, CIPC services, and business compliance.
                </p>
                <p>
                  Led by <strong>Mr. Innocent Joseph Langa</strong>, our team brings years of experience 
                  in helping businesses navigate the complex landscape of South African business regulations 
                  and tax requirements.
                </p>
                <p>
                  We pride ourselves on delivering personalized service, ensuring your business stays 
                  compliant while maximizing growth opportunities.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Award className="h-6 w-6 text-blue-600 mr-2" />
                  <span className="font-semibold">SAIBA Registered</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-blue-600 mr-2" />
                  <span className="font-semibold">247+ Happy Clients</span>
                </div>
              </div>

              <div className="mt-8">
                <Link to="/about">
                  <Button variant="outline">
                    Learn More About Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h3>
              <ul className="space-y-4">
                {[
                  "Professional SAIBA registered consultants",
                  "Personalized service for every client",
                  "Comprehensive compliance solutions",
                  "Competitive transparent pricing",
                  "Quick turnaround times",
                  "WhatsApp and online support"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who trust us with their business compliance and growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth?mode=signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Create Your Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
