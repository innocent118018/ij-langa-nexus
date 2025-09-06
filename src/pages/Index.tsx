import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleServiceClick = (category: string) => {
    navigate(`/services?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            IJ Langa Consulting (Pty) Ltd
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Professional Business Services - Accounting, Taxation, HR & Payroll, and Secretarial Services
          </p>
          <p className="text-lg mb-8 text-white/80">
            Our secure platform allows clients to access services, manage documents, and track orders. We collect only necessary business information to provide our professional services and comply with South African regulatory requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="bg-accent hover:bg-accent/90 text-primary px-8 py-3 rounded-lg font-semibold transition-colors">
              View Services
            </Link>
            <Link to="/contact" className="border border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-semibold transition-colors">
              Get Quote
            </Link>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Services</h2>
              <p className="text-muted-foreground text-lg">
                Comprehensive business services to help your company thrive
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Click on any service category below to explore our offerings
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div 
                className="text-center p-6 rounded-lg border hover:shadow-lg transition-all cursor-pointer hover:border-primary"
                onClick={() => handleServiceClick('Accounting')}
              >
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-2">Accounting</h3>
                <p className="text-muted-foreground">Bookkeeping, Financial Statements, and Reviews</p>
              </div>
              
              <div 
                className="text-center p-6 rounded-lg border hover:shadow-lg transition-all cursor-pointer hover:border-primary"
                onClick={() => handleServiceClick('Taxation')}
              >
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-2">Taxation</h3>
                <p className="text-muted-foreground">Income Tax, VAT, PAYE, and Compliance</p>
              </div>
              
              <div 
                className="text-center p-6 rounded-lg border hover:shadow-lg transition-all cursor-pointer hover:border-primary"
                onClick={() => handleServiceClick('HR & Payroll')}
              >
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-semibold mb-2">HR & Payroll</h3>
                <p className="text-muted-foreground">Payroll Administration and SARS Returns</p>
              </div>
              
              <div 
                className="text-center p-6 rounded-lg border hover:shadow-lg transition-all cursor-pointer hover:border-primary"
                onClick={() => handleServiceClick('Secretarial')}
              >
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-xl font-semibold mb-2">Secretarial</h3>
                <p className="text-muted-foreground">Company Registration and CIPC Returns</p>
              </div>
            </div>
          </div>
        </section>

        {/* App Description Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">About Our Platform</h2>
              <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground">
                <p>
                  IJ Langa Consulting (Pty) Ltd provides a secure digital platform for professional business services in South Africa. Our application enables clients to access accounting, taxation, HR & payroll, and secretarial services through a streamlined online interface.
                </p>
                <p>
                  <strong>Data Usage & Privacy:</strong> We collect and process only the business information necessary to provide our professional services, including company details, financial data, and contact information. All data is handled in compliance with South Africa's Protection of Personal Information Act (POPIA) and stored securely within our platform.
                </p>
                <p>
                  <strong>Platform Features:</strong> Client document management, secure order processing, invoice generation, and direct communication with our professional team. Users can track service progress and access completed documents through their secure dashboard.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-lg text-muted-foreground mb-8">
                Contact us today for a consultation and see how we can help your business
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors">
                  Contact Us
                </Link>
                <Link to="/policies/privacy-policy" className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  export default Index;