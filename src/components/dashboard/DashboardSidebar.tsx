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
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  Briefcase,
  Settings,
  MessageSquare,
  BarChart3,
  Shield,
  Building,
  Upload,
  Bell,
  UserCog,
  Scale,
  Gavel
} from 'lucide-react';

interface DashboardSidebarProps {
  isAdmin: boolean;
}

export const DashboardSidebar = ({ isAdmin }: DashboardSidebarProps) => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const adminMenuItems = [
    {
      title: 'Overview',
      url: '/dashboard',
      icon: LayoutDashboard,
      exact: true
    },
    {
      title: 'Clients',
      url: '/dashboard/clients',
      icon: Users,
      submenu: [
        { title: 'All Clients', url: '/dashboard/clients' },
        { title: 'Add Client', url: '/dashboard/clients/add' },
        { title: 'Suspended Clients', url: '/dashboard/clients/suspended' }
      ]
    },
    {
      title: 'Orders & Projects',
      url: '/dashboard/orders',
      icon: Briefcase,
      submenu: [
        { title: 'Pending Orders', url: '/dashboard/orders/pending' },
        { title: 'Ongoing Projects', url: '/dashboard/orders/ongoing' },
        { title: 'Completed Projects', url: '/dashboard/orders/completed' }
      ]
    },
    {
      title: 'Invoices & Payments',
      url: '/dashboard/invoices',
      icon: DollarSign,
      submenu: [
        { title: 'Create Invoice', url: '/dashboard/invoices/create' },
        { title: 'Paid Invoices', url: '/dashboard/invoices/paid' },
        { title: 'Unpaid Invoices', url: '/dashboard/invoices/unpaid' },
        { title: 'Payment Reconciliation', url: '/dashboard/invoices/reconciliation' }
      ]
    },
    {
      title: 'Legal Escalations',
      url: '/dashboard/legal',
      icon: Gavel,
      submenu: [
        { title: 'Pending Escalations', url: '/dashboard/legal/pending' },
        { title: 'With Attorneys', url: '/dashboard/legal/attorneys' }
      ]
    },
    {
      title: 'Refunds & Cancellations',
      url: '/dashboard/refunds',
      icon: Scale
    },
    {
      title: 'Reports & Analytics',
      url: '/dashboard/reports',
      icon: BarChart3
    },
    {
      title: 'Service Management',
      url: '/dashboard/services',
      icon: Building
    },
    {
      title: 'Content Management',
      url: '/dashboard/content',
      icon: FileText
    },
    {
      title: 'Support & Messages',
      url: '/dashboard/support',
      icon: MessageSquare
    },
    {
      title: 'Settings',
      url: '/dashboard/settings',
      icon: Settings
    }
  ];

  const userMenuItems = [
    {
      title: 'Overview',
      url: '/dashboard',
      icon: LayoutDashboard,
      exact: true
    },
    {
      title: 'My Services',
      url: '/dashboard/services',
      icon: Briefcase
    },
    {
      title: 'Invoices & Payments',
      url: '/dashboard/invoices',
      icon: DollarSign
    },
    {
      title: 'Orders',
      url: '/dashboard/orders',
      icon: FileText
    },
    {
      title: 'Documents',
      url: '/dashboard/documents',
      icon: Upload
    },
    {
      title: 'Messages & Support',
      url: '/dashboard/support',
      icon: MessageSquare
    },
    {
      title: 'Notifications',
      url: '/dashboard/notifications',
      icon: Bell
    },
    {
      title: 'Profile Settings',
      url: '/dashboard/profile',
      icon: UserCog
    }
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  return (
    <Sidebar className={`${collapsed ? 'w-14' : 'w-64'} border-r border-gray-200 bg-slate-900 text-white`}>
      <SidebarContent className="bg-slate-900">
        <div className="p-4 border-b border-slate-700">
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
            <Scale className="h-8 w-8 text-amber-400" />
            {!collapsed && (
              <div>
                <h2 className="text-lg font-bold text-white">IJ Langa</h2>
                <p className="text-xs text-slate-300">Legal Consulting</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-300 text-xs uppercase tracking-wider">
            {isAdmin ? 'Administration' : 'Client Portal'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={`
                      hover:bg-slate-800 hover:text-amber-400 transition-colors
                      ${isActive(item.url, item.exact) 
                        ? 'bg-slate-800 text-amber-400 border-r-2 border-amber-400' 
                        : 'text-slate-300'
                      }
                    `}
                  >
                    <NavLink to={item.url}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
