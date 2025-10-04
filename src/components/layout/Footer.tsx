
import React from 'react';
import { Link } from 'react-router-dom';
import { SlidingLogo } from '@/components/ui/SlidingLogo';

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-12 lg:py-16 w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.2),transparent_50%)]"></div>
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-accent rounded-lg">
                <SlidingLogo className="h-8 w-12 sm:h-10 sm:w-14 text-primary" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-accent">IJ Langa Consulting</span>
                <p className="text-sm text-white/80">Professional Services</p>
              </div>
            </div>
            <div className="space-y-3 text-white/90 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <span className="text-accent">🏢</span>
                <span>SAIBA16176</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">🌐</span>
                <a href="https://www.ijlanga.co.za" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">www.ijlanga.co.za</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">✉️</span>
                <a href="mailto:info@ijlanga.co.za" className="hover:text-accent transition-colors">info@ijlanga.co.za</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">📍</span>
                <span>79 TekaTakho, Kabokwen, Nelpsruit 1200</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">📞</span>
                <a href="tel:+27130040620" className="hover:text-accent transition-colors">+27 13 004 0620</a>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white/10 rounded-lg border border-accent/20">
              <p className="text-sm text-white/90 leading-relaxed">
                <span className="text-accent font-semibold">Legal Partnership:</span> IJ Langa Consulting has partnered with <strong className="text-accent">Daniel Attorneys</strong> to handle all unpaid invoices and legal matters.
              </p>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-accent flex items-center gap-2">
              <span>⚖️</span> Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/policies/refund-policy" className="text-white/80 hover:text-accent transition-colors duration-200 flex items-center gap-2">
                <span className="w-1 h-1 bg-accent rounded-full"></span>Refund Policy
              </Link></li>
              <li><Link to="/policies/service-cancellation" className="text-white/80 hover:text-accent transition-colors duration-200 flex items-center gap-2">
                <span className="w-1 h-1 bg-accent rounded-full"></span>Service Cancellation
              </Link></li>
              <li><Link to="/policies/services-policy" className="text-white/80 hover:text-accent transition-colors duration-200 flex items-center gap-2">
                <span className="w-1 h-1 bg-accent rounded-full"></span>Services Policy
              </Link></li>
              <li><Link to="/policies/invoice-quote-policy" className="text-white/80 hover:text-accent transition-colors duration-200 flex items-center gap-2">
                <span className="w-1 h-1 bg-accent rounded-full"></span>Invoice & Quote Policy
              </Link></li>
              <li><Link to="/policies/sales-order-policy" className="text-white/80 hover:text-accent transition-colors duration-200 flex items-center gap-2">
                <span className="w-1 h-1 bg-accent rounded-full"></span>Sales Order Policy
              </Link></li>
              <li><Link to="/policies/privacy-policy" className="text-white/80 hover:text-accent transition-colors duration-200 flex items-center gap-2">
                <span className="w-1 h-1 bg-accent rounded-full"></span>Privacy Policy (POPIA)
              </Link></li>
              <li><Link to="/policies/terms-conditions" className="text-white/80 hover:text-accent transition-colors duration-200 flex items-center gap-2">
                <span className="w-1 h-1 bg-accent rounded-full"></span>Terms & Conditions
              </Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-accent flex items-center gap-2">
              <span>🔗</span> Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-white/80 hover:text-accent transition-colors duration-200 flex items-center gap-2">
                <span className="w-1 h-1 bg-accent rounded-full"></span>About Us
              </Link></li>
              <li><Link to="/services" className="text-white/80 hover:text-accent transition-colors duration-200 flex items-center gap-2">
                <span className="w-1 h-1 bg-accent rounded-full"></span>Services
              </Link></li>
               <li><Link to="/pricing" className="text-white/80 hover:text-accent transition-colors duration-200 flex items-center gap-2">
                 <span className="w-1 h-1 bg-accent rounded-full"></span>Pricing
               </Link></li>
               <li><Link to="/tax-calculator" className="text-white/80 hover:text-accent transition-colors duration-200 flex items-center gap-2">
                 <span className="w-1 h-1 bg-accent rounded-full"></span>Tax Calculator
               </Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-accent transition-colors duration-200 flex items-center gap-2">
                <span className="w-1 h-1 bg-accent rounded-full"></span>Contact
              </Link></li>
              <li><Link to="/auth" className="text-white/80 hover:text-accent transition-colors duration-200 flex items-center gap-2">
                <span className="w-1 h-1 bg-accent rounded-full"></span>Login
              </Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-accent/20 mt-12 pt-8 text-center">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/70">
              &copy; 2025 IJ Langa Consulting (Pty) Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <span>Powered by Excellence</span>
              <span className="text-accent">✨</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
