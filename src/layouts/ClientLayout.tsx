import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  CreditCard,
  Truck,
  Settings,
  LogOut,
  ChevronRight,
  Bell,
  FileText,
  Megaphone,
  Palette,
  BarChart3,
  Menu,
  Loader2,
  Smartphone
} from 'lucide-react';
import { cn } from '@/lib/utils';

const clientNavItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/client/dashboard' },
  { label: 'Products', icon: Package, href: '/client/products' },
  { label: 'Orders', icon: ShoppingCart, href: '/client/orders' },
  { label: 'Customers', icon: Users, href: '/client/customers' },
  { label: 'Invoices', icon: FileText, href: '/client/invoices' },
  { label: 'Payments', icon: CreditCard, href: '/client/payments' },
  { label: 'Shipping', icon: Truck, href: '/client/shipping' },
  { label: 'Marketing', icon: Megaphone, href: '/client/marketing' },
  { label: 'Store Design', icon: Palette, href: '/client/design' },
  { label: 'Analytics', icon: BarChart3, href: '/client/analytics' },
  { label: 'Mobile App', icon: Smartphone, href: '/client/mobile' },
  { label: 'Settings', icon: Settings, href: '/client/settings' },
];

export default function ClientLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, loading: authLoading } = useAuth();
  const { role, isAdmin, isLoading: roleLoading } = useUserRole();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  // Loading state
  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Auth check
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Role check - only clients/users (non-admin, non-reseller)
  if (isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  if (role === 'reseller') {
    return <Navigate to="/reseller/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card shadow-sm">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                SC
              </div>
              <div>
                <h1 className="text-lg font-semibold">Store Console</h1>
                <p className="text-xs text-muted-foreground">E-commerce Dashboard</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </Button>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{user?.email}</p>
              <p className="text-xs text-blue-600 font-medium">Store Owner</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "border-r bg-card min-h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-64"
        )}>
          <ScrollArea className="h-full py-4">
            <nav className="space-y-1 px-3">
              {clientNavItems.map((item) => {
                const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    title={sidebarCollapsed ? item.label : undefined}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {isActive && <ChevronRight className="h-4 w-4" />}
                      </>
                    )}
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
