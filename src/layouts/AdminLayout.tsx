import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Settings,
  CreditCard,
  Package,
  LogOut,
  ChevronRight,
  Bell,
  BarChart3,
  FolderOpen,
  Receipt,
  Calculator
} from 'lucide-react';
import { cn } from '@/lib/utils';

const adminNavItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { label: 'Users', icon: Users, href: '/admin/users' },
  { label: 'Clients', icon: Building2, href: '/admin/clients' },
  { label: 'Orders', icon: Package, href: '/admin/orders' },
  { label: 'Invoices', icon: FileText, href: '/admin/invoices' },
  { label: 'Services', icon: CreditCard, href: '/admin/services' },
  { label: 'Documents', icon: FolderOpen, href: '/admin/documents' },
  { label: 'Reports', icon: BarChart3, href: '/admin/reports' },
  { label: 'Settings', icon: Settings, href: '/admin/settings' },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { role } = useUserRole();

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
              IJ
            </div>
            <div>
              <h1 className="text-lg font-semibold">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">IJ Langa Consulting</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="text-right">
              <p className="text-sm font-medium">{user?.email}</p>
              <p className="text-xs text-muted-foreground capitalize">{role || 'Admin'}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card min-h-[calc(100vh-4rem)] sticky top-16">
          <ScrollArea className="h-full py-4">
            <nav className="space-y-1 px-3">
              {adminNavItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                    {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
