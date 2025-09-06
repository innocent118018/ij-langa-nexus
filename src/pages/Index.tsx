import React from 'react';
import { Layout } from '@/components/layout/Layout';

const Index = () => {
  return (
    <div className="min-h-screen w-full">
      <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Business Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Accounting, Taxation, HR & Payroll, and Secretarial Services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/services" className="bg-accent hover:bg-accent/90 text-primary px-8 py-3 rounded-lg font-semibold transition-colors">
                View Services
              </a>
              <a href="/contact" className="border border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-semibold transition-colors">
                Get Quote
              </a>
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
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-2">Accounting</h3>
                <p className="text-muted-foreground">Bookkeeping, Financial Statements, and Reviews</p>
              </div>
              
              <div className="text-center p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-2">Taxation</h3>
                <p className="text-muted-foreground">Income Tax, VAT, PAYE, and Compliance</p>
              </div>
              
              <div className="text-center p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-semibold mb-2">HR & Payroll</h3>
                <p className="text-muted-foreground">Payroll Administration and SARS Returns</p>
              </div>
              
              <div className="text-center p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-xl font-semibold mb-2">Secretarial</h3>
                <p className="text-muted-foreground">Company Registration and CIPC Returns</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact us today for a consultation and see how we can help your business
            </p>
            <a href="/contact" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors">
              Contact Us
            </a>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default Index;