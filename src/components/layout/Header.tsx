
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { CartButton } from '@/components/cart/CartButton';
import { TaxCalculator } from '@/components/ui/TaxCalculator';

export const Header = () => {
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
    <header className="bg-white shadow-md relative z-50">
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
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isServicesDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-4 z-50"
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                >
                  <div className="px-4 pb-2">
                    <Link
                      to="/services"
                      className="text-blue-600 font-semibold hover:text-blue-800 block"
                      onClick={() => setIsServicesDropdownOpen(false)}
                    >
                      View All Services
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-4 px-4">
                    {serviceCategories.map((category) => (
                      <div key={category.title} className="space-y-2">
                        <h4 className="font-semibold text-gray-900 text-sm">{category.title}</h4>
                        <ul className="space-y-1">
                          {category.items.slice(0, 3).map((item) => (
                            <li key={item.path}>
                              <Link
                                to={item.path}
                                className="text-sm text-gray-600 hover:text-blue-600 block"
                                onClick={() => setIsServicesDropdownOpen(false)}
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                          {category.items.length > 3 && (
                            <li className="text-xs text-gray-400">+ {category.items.length - 3} more</li>
                          )}
                        </ul>
                      </div>
                    ))}
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
            <CartButton />
            <TaxCalculator />
            <Link to="/auth">
              <Button size="sm">Login</Button>
            </Link>
          </nav>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center space-x-2">
            <CartButton />
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
                to="/about"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              {/* Mobile Services Dropdown */}
              <div>
                <button
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors w-full"
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                >
                  Services
                  <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isMobileServicesOpen && (
                  <div className="mt-2 ml-4 space-y-3">
                    <Link
                      to="/services"
                      className="block text-blue-600 font-medium"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsMobileServicesOpen(false);
                      }}
                    >
                      View All Services
                    </Link>
                    
                    {serviceCategories.map((category) => (
                      <div key={category.title} className="space-y-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{category.title}</h4>
                        <ul className="space-y-1 ml-2">
                          {category.items.map((item) => (
                            <li key={item.path}>
                              <Link
                                to={item.path}
                                className="text-sm text-gray-600 hover:text-blue-600 block"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setIsMobileServicesOpen(false);
                                }}
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
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
              <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm" className="w-full">Login</Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
