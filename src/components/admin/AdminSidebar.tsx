import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  FileText,
  DollarSign,
  BarChart3,
  Settings,
  UserCog,
  Building2,
  CreditCard,
  Package,
  Truck,
  Calendar,
  AlertTriangle,
  MessageSquare,
  Database,
  Shield,
  Bell
} from 'lucide-react';

const adminMenuItems = [
  {
    title: 'Overview',
    items: [
      { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
      { title: 'Analytics', url: '/admin/analytics', icon: BarChart3 },
      { title: 'Reports', url: '/admin/reports', icon: FileText },
    ]
  },
  {
    title: 'User Management',
    items: [
      { title: 'All Users', url: '/admin/users', icon: Users },
      { title: 'Customers', url: '/admin/customers', icon: Building2 },
      { title: 'User Roles', url: '/admin/user-roles', icon: UserCog },
      { title: 'Permissions', url: '/admin/permissions', icon: Shield },
    ]
  },
  {
    title: 'Sales & Orders',
    items: [
      { title: 'All Orders', url: '/admin/orders', icon: ShoppingCart },
      { title: 'Sales Quotes', url: '/admin/sales-quotes', icon: FileText },
      { title: 'Sales Orders', url: '/admin/sales-orders', icon: Package },
      { title: 'Invoices', url: '/admin/invoices', icon: CreditCard },
      { title: 'Payments', url: '/admin/payments', icon: DollarSign },
      { title: 'Refunds', url: '/admin/refunds', icon: AlertTriangle },
    ]
  },
  {
    title: 'Financial',
    items: [
      { title: 'Accounting', url: '/admin/accounting', icon: DollarSign },
      { title: 'Bank Accounts', url: '/admin/bank-accounts', icon: CreditCard },
      { title: 'Transactions', url: '/admin/transactions', icon: FileText },
      { title: 'Tax Management', url: '/admin/tax-management', icon: FileText },
    ]
  },
  {
    title: 'Operations',
    items: [
      { title: 'Services', url: '/admin/services', icon: Package },
      { title: 'Products', url: '/admin/products', icon: Package },
      { title: 'Inventory', url: '/admin/inventory', icon: Truck },
      { title: 'Suppliers', url: '/admin/suppliers', icon: Building2 },
    ]
  },
  {
    title: 'Communication',
    items: [
      { title: 'Messages', url: '/admin/messages', icon: MessageSquare },
      { title: 'Notifications', url: '/admin/notifications', icon: Bell },
      { title: 'Email Templates', url: '/admin/email-templates', icon: FileText },
      { title: 'Support Tickets', url: '/admin/support', icon: AlertTriangle },
    ]
  },
  {
    title: 'System',
    items: [
      { title: 'System Settings', url: '/admin/system-settings', icon: Settings },
      { title: 'Database', url: '/admin/database', icon: Database },
      { title: 'Audit Logs', url: '/admin/audit-logs', icon: Shield },
      { title: 'System Health', url: '/admin/system-health', icon: AlertTriangle },
    ]
  }
];

export const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <Sidebar className="w-64 border-r border-gray-200">
      <SidebarContent className="bg-white">
        {adminMenuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive(item.url)
                            ? 'bg-primary/10 text-primary border-r-2 border-primary'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};