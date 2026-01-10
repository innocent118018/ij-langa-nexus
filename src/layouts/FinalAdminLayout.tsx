import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  LayoutDashboard, Users, ShoppingCart, FileText, 
  BarChart3, Settings, Building2, CreditCard,
  ClipboardCheck, Bell, Menu, X, ChevronLeft,
  ChevronRight, LogOut, Shield, UserCheck
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const adminNavItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { label: 'Clients', icon: Users, href: '/admin/clients' },
  { label: 'Resellers', icon: Building2, href: '/admin/resellers' },
  { label: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
  { label: 'Invoices', icon: FileText, href: '/admin/invoices' },
  { label: 'Payments', icon: CreditCard, href: '/admin/payments' },
  { label: 'Reports', icon: BarChart3, href: '/admin/reports' },
  { label: 'Compliance', icon: ClipboardCheck, href: '/admin/compliance' },
  { label: 'Settings', icon: Settings, href: '/admin/settings' },
];

export default function FinalAdminLayout() {
  const { user, loading: authLoading, logout } = useAuth();
  const { isAdmin, isLoading: roleLoading } = useUserRole();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Domain lock check
  const ADMIN_DOMAIN = '@ijlanga.co.za';

  useEffect(() => {
    if (authLoading || roleLoading) return;

    if (!user) {
      navigate('/auth/login');
      return;
    }

    const email = user.email?.toLowerCase() || '';
    
    // Check domain lock
    if (!email.endsWith(ADMIN_DOMAIN)) {
      toast({
        title: "Access Denied",
        description: "Admin access is restricted to authorized personnel only.",
        variant: "destructive",
      });
      logout();
      navigate('/auth/login');
      return;
    }

    // Check admin role
    if (!isAdmin) {
      navigate('/portal');
      return;
    }
  }, [user, authLoading, roleLoading, isAdmin, navigate, logout, toast]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const userInitials = user.email?.slice(0, 2).toUpperCase() || 'AD';

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-sidebar-background text-sidebar-foreground transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-64",
          "hidden lg:block"
        )}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-accent" />
              <span className="font-bold text-lg">Admin Panel</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <nav className="p-2 space-y-1">
            {adminNavItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                    "hover:bg-sidebar-accent hover:text-accent",
                    isActive 
                      ? "bg-sidebar-accent text-accent border-r-2 border-accent" 
                      : "text-sidebar-foreground",
                    sidebarCollapsed && "justify-center"
                  )
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </NavLink>
            ))}
          </nav>
        </ScrollArea>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-sidebar-border">
          <div className={cn(
            "flex items-center gap-3 p-2 rounded-lg",
            sidebarCollapsed && "justify-center"
          )}>
            <Avatar className="h-9 w-9 border-2 border-accent">
              <AvatarFallback className="bg-accent text-accent-foreground text-sm">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.email}</p>
                <p className="text-xs text-sidebar-foreground/60">Administrator</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            className={cn(
              "w-full mt-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-red-400",
              sidebarCollapsed && "p-2"
            )}
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {!sidebarCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-background border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="font-bold">Admin</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background pt-16">
          <ScrollArea className="h-full">
            <nav className="p-4 space-y-2">
              {adminNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg",
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    )
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}
              <Button 
                variant="ghost" 
                className="w-full justify-start px-4 py-3 text-red-500"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </Button>
            </nav>
          </ScrollArea>
        </div>
      )}

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 min-h-screen transition-all duration-300",
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64",
          "pt-16 lg:pt-0"
        )}
      >
        {/* Top Header Bar */}
        <header className="hidden lg:flex h-16 items-center justify-between px-6 border-b bg-background">
          <div>
            <h2 className="text-lg font-semibold capitalize">
              {location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="text-right">
              <p className="text-sm font-medium">{user.email}</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
