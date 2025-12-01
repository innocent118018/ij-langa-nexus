
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { CartButton } from '@/components/cart/CartButton';
import { TaxCalculator } from '@/components/ui/TaxCalculator';
import { useAuth } from '@/hooks/useAuth';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { LogoutButton } from '@/components/auth/LogoutButton';

export const Header = () => {
  const { user, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const serviceCategories = [
    {
      title: "Accounting",
      items: [
        { name: "Bookkeeping to Trial Balance", path: "/services/accounting/bookkeeping-trial-balance" },
        { name: "Monthly Management Accounts", path: "/services/accounting/monthly-management-accounts" },
        { name: "Annual Financial Statements", path: "/services/accounting/annual-financial-statements" },
        { name: "Independent Review", path: "/services/accounting/independent-review" }
      ]
    },
    {
      title: "Taxation", 
      items: [
        { name: "eFiling Registration", path: "/services/taxation/efiling-registration" },
        { name: "Personal Income Tax", path: "/services/taxation/personal-income-tax" },
        { name: "Company Tax", path: "/services/taxation/company-tax" },
        { name: "Provisional Tax", path: "/services/taxation/provisional-tax" },
        { name: "Tax Clearance Certificates", path: "/services/taxation/tax-clearance-certificates" },
        { name: "VAT Registration", path: "/services/taxation/vat-registration" },
        { name: "PAYE Registration", path: "/services/taxation/paye-registration" }
      ]
    },
    {
      title: "HR & Payroll",
      items: [
        { name: "SARS Returns EMP201", path: "/services/hr-payroll/sars-returns-emp201" },
        { name: "IRP5 Reconciliation EMP501", path: "/services/hr-payroll/irp5-reconciliation-emp501" },
        { name: "UIF Registration & Returns", path: "/services/hr-payroll/uif-registration-returns" },
        { name: "Payroll Administration", path: "/services/hr-payroll/payroll-administration" },
        { name: "Workmen's Compensation", path: "/services/hr-payroll/workmens-compensation" }
      ]
    },
    {
      title: "Secretarial",
      items: [
        { name: "Company Registrations", path: "/services/secretarial/company-registrations" },
        { name: "CIPC Annual Returns", path: "/services/secretarial/cipc-annual-returns" },
        { name: "Change Company Details", path: "/services/secretarial/change-company-details" },
        { name: "Beneficial Ownership Submissions", path: "/services/secretarial/beneficial-ownership-submissions" },
        { name: "B-BBEE Certificates", path: "/services/secretarial/bbbee-certificates" },
        { name: "Credit Checks", path: "/services/secretarial/credit-checks" },
        { name: "Criminal Record Check", path: "/services/secretarial/criminal-record-check" }
      ]
    }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IJ</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900">IJ Langa Consulting</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isServicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
            <Link to="/services/secretarial-services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsServicesDropdownOpen(false)}>
              Secretarial Services
            </Link>
            <Link to="/services/payroll-services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsServicesDropdownOpen(false)}>
              Payroll Services  
            </Link>
            <Link to="/services/bookkeeping-services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsServicesDropdownOpen(false)}>
              Bookkeeping Services
            </Link>
            <Link to="/services/taxation-services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsServicesDropdownOpen(false)}>
              Taxation Services
            </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
              Pricing
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <Link to="/mentorship" className="text-gray-600 hover:text-blue-600 transition-colors">
              Mentorship
            </Link>
            <CartButton />
            <TaxCalculator />
            
            {/* Authentication Section */}
            {user && (
              <>
                <NotificationBell />
                <Link to="/dashboard">
                  <Button size="sm" variant="outline">Dashboard</Button>
                </Link>
                <LogoutButton size="sm" />
              </>
            )}
            {!user && !loading && (
              <Link to="/login">
                <Button size="sm">Login</Button>
              </Link>
            )}
          </nav>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center space-x-2">
            <CartButton />
            {user && <NotificationBell />}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              {/* Mobile Services Menu */}
              <div>
                <button
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1 w-full text-left"
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                >
                  Services
                  <ChevronDown className={`h-4 w-4 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileServicesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      to="/services/secretarial-services"
                      className="block text-gray-600 hover:text-blue-600 transition-colors text-sm"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsMobileServicesOpen(false);
                      }}
                    >
                      Secretarial Services
                    </Link>
                    <Link
                      to="/services/payroll-services"
                      className="block text-gray-600 hover:text-blue-600 transition-colors text-sm"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsMobileServicesOpen(false);
                      }}
                    >
                      Payroll Services
                    </Link>
                    <Link
                      to="/services/bookkeeping-services"
                      className="block text-gray-600 hover:text-blue-600 transition-colors text-sm"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsMobileServicesOpen(false);
                      }}
                    >
                      Bookkeeping Services
                    </Link>
                    <Link
                      to="/services/taxation-services"
                      className="block text-gray-600 hover:text-blue-600 transition-colors text-sm"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsMobileServicesOpen(false);
                      }}
                    >
                      Taxation Services
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/pricing"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/mentorship"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Mentorship
              </Link>
              
              {/* Mobile Authentication Section */}
              {user && (
                <div className="pt-2 border-t border-gray-200 space-y-2">
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button size="sm" variant="outline" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <LogoutButton 
                    size="sm" 
                    variant="outline"
                    className="w-full"
                  />
                </div>
              )}
              {!user && !loading && (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm" className="w-full">Login</Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
