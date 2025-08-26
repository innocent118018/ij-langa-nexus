
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from './DashboardSidebar';
import { useAuth } from '@/hooks/useAuth';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDashboardData } from '@/hooks/useDashboardData';
import { Layout } from '@/components/layout/Layout';

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

  // Only show dashboard content for dashboard pages
  if (!isDashboardPage) {
    return (
      <Layout>
        {children}
      </Layout>
    );
  }

  return (
    <Layout>
      <SidebarProvider defaultOpen={true}>
        <div className="flex w-full bg-gray-50">
          <DashboardSidebar isAdmin={isAdmin} />
          
          <div className="flex-1 flex flex-col">
            {/* Top Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search clients, invoices, or documents..." 
                      className="pl-10 bg-gray-50 border-gray-200"
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      onFocus={() => searchTerm.length >= 2 && setShowSearchResults(true)}
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
                
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="relative"
                    onClick={() => navigate('/dashboard/notifications')}
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      3
                    </span>
                  </Button>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                      <p className="text-xs text-gray-500">
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
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto">
              {children}
            </main>
          </div>
        </div>
        
        {/* Click outside to close search results */}
        {showSearchResults && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowSearchResults(false)}
          />
        )}
      </SidebarProvider>
    </Layout>
  );
};
