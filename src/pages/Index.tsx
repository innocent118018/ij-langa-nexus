
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star, Users, Award, Phone, MapPin } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Professional Business
            <span className="block text-amber-400">Registration Services</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            IJ Langa Consulting has been South Africa's trusted partner for company registration 
            for over 22 years. We register 1 in every 20 companies in the country.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                View Our Services
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900">
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose IJ Langa Consulting?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Award className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">22 Years Experience</h3>
              <p className="text-gray-600">Over two decades of trusted business registration services</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Market Leader</h3>
              <p className="text-gray-600">We register 1 out of every 20 companies in South Africa</p>
            </div>
            <div className="text-center">
              <Star className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Bank Partnerships</h3>
              <p className="text-gray-600">Trusted by ABSA, Nedbank, and Standard Bank</p>
            </div>
            <div className="text-center">
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Real Support</h3>
              <p className="text-gray-600">Dedicated call center and physical offices</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Company Registration</h3>
              <p className="text-gray-600 mb-4">Complete company registration services including PTY Ltd, NPC, and more.</p>
              <Link to="/services/register/company">
                <Button variant="outline" size="sm">Learn More</Button>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">SARS Services</h3>
              <p className="text-gray-600 mb-4">Tax clearance, VAT registration, and all SARS-related services.</p>
              <Link to="/services/sars/tax-clearance">
                <Button variant="outline" size="sm">Learn More</Button>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Company Changes</h3>
              <p className="text-gray-600 mb-4">Director changes, name changes, and company restructuring.</p>
              <Link to="/services/change/company-name">
                <Button variant="outline" size="sm">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Register Your Business?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of satisfied customers who trust us with their business needs.
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
