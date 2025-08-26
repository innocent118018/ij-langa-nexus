
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SlidingLogo } from '@/components/ui/SlidingLogo';
import { useAuth } from '@/hooks/useAuth';
import { ShoppingCart, User, LogOut, ChevronDown, FileText, DollarSign, MessageSquare, Settings, Menu, X } from 'lucide-react';
import { Cart } from '@/components/cart/Cart';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const serviceSubmenus = {
    Register: [
      { name: 'Company Registration', path: '/services/register/company' },
      { name: 'Non Profit Company', path: '/services/register/non-profit' },
      { name: 'Incorporation', path: '/services/register/incorporation' },
      { name: 'Shelf Company', path: '/services/register/shelf-company' },
      { name: 'CO-OP', path: '/services/register/co-op' },
      { name: 'Company Name Only', path: '/services/register/name-only' }
    ],
    Change: [
      { name: 'Company Name', path: '/services/change/company-name' },
      { name: 'Directors and Shareholders', path: '/services/change/directors-shareholders' },
      { name: 'Close Corporation', path: '/services/change/close-corporation' },
      { name: 'Registered Address', path: '/services/change/registered-address' },
      { name: 'Shareholders Agreement', path: '/services/change/shareholders-agreement' },
      { name: 'Memorandum of Incorporation(MOI)', path: '/services/change/moi' },
      { name: 'Financial Year End', path: '/services/change/financial-year-end' }
    ],
    SARS: [
      { name: 'Tax Clearance', path: '/services/sars/tax-clearance' },
      { name: 'VAT Registration', path: '/services/sars/vat-registration' },
      { name: 'Import Export Licence', path: '/services/sars/import-export' },
      { name: 'Public Officer Appointment', path: '/services/sars/public-officer' },
      { name: 'PAYE and UIF', path: '/services/sars/paye-uif' },
      { name: 'SDL Registration', path: '/services/sars/sdl-registration' }
    ],
    Other: [
      { name: 'Annual Returns', path: '/services/other/annual-returns' },
      { name: 'BEE Affidavit', path: '/services/other/bee-affidavit' },
      { name: 'CSD Registration', path: '/services/other/csd-registration' },
      { name: 'Beneficial Ownership', path: '/services/other/beneficial-ownership' },
      { name: 'PSIRA Assistance', path: '/services/other/psira-assistance' },
      { name: 'Trademarks', path: '/services/other/trademarks' },
      { name: 'Company Restoration', path: '/services/other/company-restoration' },
      { name: 'CIDB Registration', path: '/services/other/cidb-registration' },
      { name: 'COID Registration', path: '/services/other/coid-registration' },
      { name: 'NHBRC Registration', path: '/services/other/nhbrc-registration' }
    ]
  };

  return (
    <>
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
              <SlidingLogo className="h-8 w-12 sm:h-12 sm:w-16" />
              <span className="text-lg sm:text-xl font-bold text-gray-900 hidden sm:block">IJ Langa Consulting</span>
              <span className="text-sm font-bold text-gray-900 sm:hidden">IJ Langa</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
              <div 
                className="relative"
                onMouseEnter={() => setShowServicesMenu(true)}
                onMouseLeave={() => setShowServicesMenu(false)}
              >
                <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                  Services <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {showServicesMenu && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="grid grid-cols-2 gap-4 p-4">
                      {Object.entries(serviceSubmenus).map(([category, items]) => (
                        <div key={category}>
                          <h3 className="font-semibold text-gray-900 mb-2">{category}</h3>
                          <ul className="space-y-1">
                            {items.map((item) => (
                              <li key={item.path}>
                                <Link 
                                  to={item.path}
                                  className="text-sm text-gray-600 hover:text-blue-600 block py-1"
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link to="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
                Pricing
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCart(true)}
                className="relative"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
              
              {user ? (
                <div className="flex items-center space-x-2">
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button>Login</Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCart(true)}
                className="relative"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setShowMobileMenu(false)}>
                  Home
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setShowMobileMenu(false)}>
                  About
                </Link>
                <Link to="/products" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setShowMobileMenu(false)}>
                  Services
                </Link>
                <Link to="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setShowMobileMenu(false)}>
                  Pricing
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setShowMobileMenu(false)}>
                  Contact
                </Link>
                
                {user ? (
                  <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                    <Link to="/dashboard" onClick={() => setShowMobileMenu(false)}>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleLogout();
                        setShowMobileMenu(false);
                      }}
                      className="w-full justify-start"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-200">
                    <Link to="/auth" onClick={() => setShowMobileMenu(false)}>
                      <Button className="w-full">Login</Button>
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
        
        {/* Secondary Menu - Only visible when logged in */}
        {user && (
          <div className="bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex items-center space-x-6 py-2 overflow-x-auto">
                <Link 
                  to="/dashboard/orders" 
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 whitespace-nowrap transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>My Orders</span>
                </Link>
                <Link 
                  to="/dashboard/invoices" 
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 whitespace-nowrap transition-colors"
                >
                  <DollarSign className="h-4 w-4" />
                  <span>Invoices</span>
                </Link>
                <Link 
                  to="/dashboard/documents" 
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 whitespace-nowrap transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>Documents</span>
                </Link>
                <Link 
                  to="/dashboard/support" 
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 whitespace-nowrap transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Support</span>
                </Link>
                <Link 
                  to="/dashboard/profile" 
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 whitespace-nowrap transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  );
};
