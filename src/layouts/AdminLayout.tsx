import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { EnhancedAdminSidebar } from '@/components/admin/EnhancedAdminSidebar';
import { AdminTopNav } from '@/components/admin/AdminTopNav';
import { cn } from '@/lib/utils';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className={cn(
          "hidden lg:block transition-all duration-300",
          sidebarOpen ? "w-80" : "w-0"
        )}>
          <EnhancedAdminSidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top Navigation */}
          <AdminTopNav onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

          {/* Main Content */}
          <main className="flex-1 overflow-auto bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
