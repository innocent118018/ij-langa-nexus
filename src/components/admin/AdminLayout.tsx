import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from './AdminSidebar';
import { useAuth } from '@/hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout'; 
import { Input } from '@/components/ui/input';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Implement global search functionality
      console.log('Searching for:', searchTerm);
    }
  };

  return (
       <Layout>
      {/* Admin Content */}
      <div className="flex flex-1">
        <SidebarProvider defaultOpen={true}>
          <AdminSidebar />

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto">
            <div className="p-2">
              <div className="flex items-center mb-4">
                <SidebarTrigger className="mr-4" />
                
                <form onSubmit={handleSearch} className="ml-auto relative hidden md:block">
                  <Input
                    type="text"
                    placeholder="Search users, orders, invoices..."
                    className="pl-10 pr-4 w-72"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </form>
              </div>

              <div className="container mx-auto px-6 py-4 max-w-7xl">
                {children}
              </div>
            </div>
          </main>
        </SidebarProvider>
      </div>
    </Layout>
  );
};
