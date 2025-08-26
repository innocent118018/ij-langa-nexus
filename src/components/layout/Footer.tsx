
import React from 'react';
import { Link } from 'react-router-dom';
import { SlidingLogo } from '@/components/ui/SlidingLogo';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 lg:py-12 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <SlidingLogo className="h-8 w-12 sm:h-12 sm:w-16" />
              <span className="text-lg sm:text-xl font-bold">IJ Langa Consulting</span>
            </div>
            <div className="space-y-2 text-gray-300 text-sm sm:text-base">
              <p>SAIBA16176</p>
              <p>🌹 www.ijlanga.co.za</p>
              <p>🌹 info@ijlanga.co.za</p>
              <p>🌹 79 TekaTakho, Kabokwen, Nelpsruit 1200</p>
              <p>🌹 +27 1300 40 620</p>
            </div>
            <p className="mt-4 text-xs sm:text-sm text-gray-400">
              IJ Langa Consulting has partnered with <strong>Daniel Attorneys</strong> to handle all unpaid invoices.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/policies/refund" className="text-gray-300 hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link to="/policies/services" className="text-gray-300 hover:text-white transition-colors">Services Policy</Link></li>
              <li><Link to="/policies/invoice-quote" className="text-gray-300 hover:text-white transition-colors">Invoice & Quote Policy</Link></li>
              <li><Link to="/policies/sales-order" className="text-gray-300 hover:text-white transition-colors">Sales Order Policy</Link></li>
              <li><Link to="/policies/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy (POPIA)</Link></li>
              <li><Link to="/policies/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/policies/export-customs" className="text-gray-300 hover:text-white transition-colors">Export & Customs Compliance</Link></li>
              <li><Link to="/policies/shelf-companies" className="text-gray-300 hover:text-white transition-colors">Shelf Companies Policy</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/auth" className="text-gray-300 hover:text-white transition-colors">Login</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p className="text-sm">&copy; 2025 IJ Langa Consulting (Pty) Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
