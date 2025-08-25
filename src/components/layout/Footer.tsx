
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/9ba4ae64-601e-4162-9165-29b1004a73d1.png" 
                alt="IJ Langa Logo" 
                className="h-8 w-auto brightness-0 invert"
              />
              <img 
                src="/lovable-uploads/3a4a6cc6-a0f7-4d80-831d-5c7bddc9bad0.png" 
                alt="IJ Langa Logo" 
                className="h-8 w-auto brightness-0 invert"
              />
              <img 
                src="/lovable-uploads/a40ab648-5c25-4e45-8711-428b8042e179.png" 
                alt="IJ Langa Logo" 
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
            <div className="space-y-2 text-gray-300">
              <p className="font-semibold">IJ Langa Consulting</p>
              <p>SAIBA16176</p>
              <p>🌹 www.ijlanga.co.za</p>
              <p>🌹 info@ijlanga.co.za</p>
              <p>🌹 79 TekaTakho, Kabokwen, Nelpsruit 1200</p>
              <p>🌹 +27 1300 40 620</p>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              IJ Langa Consulting has partnered with <strong>Daniel Attorneys</strong> to handle all unpaid invoices.
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal & Policies</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/policies/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link to="/policies/services" className="hover:text-white transition-colors">Services Policy</Link></li>
              <li><Link to="/policies/invoice" className="hover:text-white transition-colors">Invoice & Quote Policy</Link></li>
              <li><Link to="/policies/sales" className="hover:text-white transition-colors">Sales Order Policy</Link></li>
              <li><Link to="/policies/privacy" className="hover:text-white transition-colors">Privacy Policy (POPIA)</Link></li>
              <li><Link to="/policies/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Additional Policies */}
          <div>
            <h3 className="font-semibold mb-4">Compliance</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/policies/export" className="hover:text-white transition-colors">Export & Customs Policy</Link></li>
              <li><Link to="/policies/shelf-companies" className="hover:text-white transition-colors">Shelf Companies Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} IJ Langa Consulting (Pty) Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
