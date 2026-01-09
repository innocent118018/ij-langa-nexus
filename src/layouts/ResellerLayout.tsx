import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  Users,
  Building2,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Bell,
  Package,
  FileText,
  DollarSign,
  Megaphone,
  HelpCircle,
  Menu,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const resellerNavItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/reseller/dashboard' },
  { label: 'My Clients', icon: Building2, href: '/reseller/clients' },
  { label: 'Client Usage', icon: BarChart3, href: '/reseller/usage' },
  { label: 'Commissions', icon: DollarSign, href: '/reseller/commissions' },
  { label: 'Pricing Packages', icon: Package, href: '/reseller/packages' },
  { label: 'Marketing Tools', icon: Megaphone, href: '/reseller/marketing' },
  { label: 'Support Tickets', icon: HelpCircle, href: '/reseller/support' },
  { label: 'Settings', icon: Settings, href: '/reseller/settings' },
];

export default function ResellerLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, loading: authLoading } = useAuth();
  const { role, isLoading: roleLoading } = useUserRole();
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

  // Role check - only resellers
  if (role !== 'reseller') {
    // Redirect based on role
    if (role === 'super_admin' || role === 'admin' || role === 'accountant' || role === 'consultant') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/client/dashboard" replace />;
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
              <div className="w-10 h-10 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
                RS
              </div>
              <div>
                <h1 className="text-lg font-semibold">Reseller Portal</h1>
                <p className="text-xs text-muted-foreground">Partner Dashboard</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{user?.email}</p>
              <p className="text-xs text-orange-600 font-medium">Reseller Partner</p>
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
              {resellerNavItems.map((item) => {
                const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    title={sidebarCollapsed ? item.label : undefined}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                      isActive
                        ? 'bg-orange-500 text-white'
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
