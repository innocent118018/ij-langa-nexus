
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from './DashboardSidebar';
import { useAuth } from '@/hooks/useAuth';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDashboardData } from '@/hooks/useDashboardData';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const { customers, invoices } = useDashboardData();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  // Check if we're on a dashboard page that should use the layout
  const isDashboardPage = location.pathname.startsWith('/dashboard');
  
  // Dashboard pages should not use the regular Layout
  // They have their own header and footer structure
  
  // Check if user is admin
  const adminEmails = [
    'info@ijlanga.co.za',
    'orders@ijlanga.co.za', 
    'billings@ijlanga.co.za',
    'correspondence@ijlanga.co.za',
    'ij.langa11@gmail.com'
  ];
  
  const isAdmin = adminEmails.includes(user?.email?.toLowerCase() || '');

  // Search functionality
  const searchResults = React.useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return [];
    
    const results = [];
    
    // Search customers
    const matchingCustomers = customers.filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    matchingCustomers.forEach(customer => {
      results.push({
        type: 'client',
        title: customer.name,
        subtitle: customer.email,
        action: () => navigate('/dashboard/clients')
      });
    });
    
    // Search invoices
    const matchingInvoices = invoices.filter(invoice => 
      invoice.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customers?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    matchingInvoices.forEach(invoice => {
      results.push({
        type: 'invoice',
        title: `Invoice #${invoice.reference}`,
        subtitle: invoice.customers?.name,
        action: () => navigate('/dashboard/invoices')
      });
    });
    
    return results.slice(0, 5);
  }, [searchTerm, customers, invoices, navigate]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setShowSearchResults(value.length >= 2);
  };

  const handleSearchResultClick = (result: any) => {
    result.action();
    setSearchTerm('');
    setShowSearchResults(false);
  };

  // For dashboard pages, don't wrap in Layout - create our own structure
  return (
    <div className="min-h-screen flex flex-col w-full">
      {/* Global Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">IJ</span>
                </div>
                <span className="text-lg font-bold text-gray-900">IJ Langa Consulting</span>
              </div>
            </div>

            {/* Global Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text"
                  placeholder="Search clients, invoices, docs..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                
                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-50">
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                        onClick={() => handleSearchResultClick(result)}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 uppercase">
                            {result.type}
                          </span>
                          <div>
                            <p className="font-medium text-sm">{result.title}</p>
                            <p className="text-xs text-gray-500">{result.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={() => navigate('/dashboard/notifications')}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                  3
                </span>
              </Button>
              
              <div className="flex items-center space-x-3 border-l border-border pl-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{user?.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {isAdmin ? 'Administrator' : 'Client'}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="flex flex-1 w-full">
        <SidebarProvider defaultOpen={true}>
          <DashboardSidebar isAdmin={isAdmin} />
          
          {/* Main Content Area */}
          <main className="flex-1 bg-background">
            <div className="container mx-auto px-6 py-8 max-w-7xl">
              {children}
            </div>
          </main>
        </SidebarProvider>
      </div>
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">IJ Langa Consulting</h3>
              <div className="space-y-2 text-primary-foreground/80 text-sm">
                <p>79 Tekatakho, Kabokweni, Nelspruit 1200</p>
                <p>013 004 0620 | info@ijlanga.co.za</p>
                <p className="font-medium">SAIBA 16176</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Legal</h3>
              <ul className="space-y-1.5 text-sm">
                <li><a href="/policies/privacy-policy" className="text-primary-foreground/80 hover:text-accent">Privacy Policy</a></li>
                <li><a href="/policies/terms-conditions" className="text-primary-foreground/80 hover:text-accent">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-1.5 text-sm">
                <li><a href="/about" className="text-primary-foreground/80 hover:text-accent">About Us</a></li>
                <li><a href="/contact" className="text-primary-foreground/80 hover:text-accent">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-primary-foreground/20 text-center text-primary-foreground/60 text-sm">
            <p>&copy; 2025 IJ Langa Consulting (Pty) Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Click outside to close search results */}
      {showSearchResults && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowSearchResults(false)}
        />
      )}
    </div>
  );
};
