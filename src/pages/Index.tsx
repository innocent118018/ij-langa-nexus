
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star, Users, Award, Phone, MapPin } from 'lucide-react';

const Index = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Hero Section - Full Screen */}
      <section className="w-full min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Professional Business
            <span className="block text-amber-400">Registration Services</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            IJ Langa Consulting has been South Africa's trusted partner for company registration 
            for over 22 years. We register 1 in every 20 companies in the country.
          </p>
          <p className="text-amber-300 font-semibold text-lg mb-8">
            Company Registration Package 1 — From R579 <br />
            Company Registration Package 2 — From R683
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-3">
                View Our Services
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 px-8 py-3">
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            Why Choose IJ Langa Consulting?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <Award className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-800 mb-2">Experience</h3>
              <p className="text-gray-600">Years of trusted business registration and compliance services</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-800 mb-2">Trusted by Many</h3>
              <p className="text-gray-600">We've helped hundreds of South African businesses get compliant</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <Star className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-800 mb-2">Bank Ready</h3>
              <p className="text-gray-600">Documents accepted by ABSA, Nedbank, and Standard Bank</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-800 mb-2">Real Support</h3>
              <p className="text-gray-600">Phone, WhatsApp, and email support whenever you need help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-blue-800 mb-3">Company Registration</h3>
              <p className="text-gray-600 mb-4">Complete company registration (PTY Ltd, NPC, etc.)</p>
              <p className="text-yellow-600 font-semibold mb-4">From R579</p>
              <Link to="/services/register/company">
                <Button variant="outline" size="sm" className="w-full">Learn More</Button>
              </Link>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-blue-800 mb-3">SARS Services</h3>
              <p className="text-gray-600 mb-4">Tax clearance, VAT registration, and SARS-related services</p>
              <Link to="/services/sars/tax-clearance">
                <Button variant="outline" size="sm" className="w-full">Learn More</Button>
              </Link>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-blue-800 mb-3">Company Changes</h3>
              <p className="text-gray-600 mb-4">Director changes, name changes, and company restructuring</p>
              <Link to="/services/change/company-name">
                <Button variant="outline" size="sm" className="w-full">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Ready to Register Your Business?
          </h2>
          <p className="text-lg sm:text-xl text-blue-200 mb-8 leading-relaxed">
            Join thousands of satisfied customers who trust us with their business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-3">
                View Services
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 px-8 py-3">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
