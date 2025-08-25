
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
  FileText,
  DollarSign,
  Briefcase,
  Settings,
  MessageSquare,
  BarChart3,
  Shield,
  Building,
  Scale,
  Gavel,
  RotateCcw
} from 'lucide-react';

interface DashboardSidebarProps {
  isAdmin: boolean;
}

export const DashboardSidebar = ({ isAdmin }: DashboardSidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

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
      icon: Users
    },
    {
      title: 'Orders & Projects',
      url: '/dashboard/orders',
      icon: Briefcase
    },
    {
      title: 'Invoices & Payments',
      url: '/dashboard/invoices',
      icon: DollarSign
    },
    {
      title: 'Legal Escalations',
      url: '/dashboard/legal',
      icon: Gavel
    },
    {
      title: 'Refunds & Cancellations',
      url: '/dashboard/refunds',
      icon: RotateCcw
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
      icon: Shield
    },
    {
      title: 'Messages & Support',
      url: '/dashboard/support',
      icon: MessageSquare
    },
    {
      title: 'Profile Settings',
      url: '/dashboard/profile',
      icon: Settings
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
    <Sidebar className="w-64 border-r border-gray-200 bg-slate-900 text-white">
      <SidebarContent className="bg-slate-900">
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <Scale className="h-8 w-8 text-amber-400" />
            <div>
              <h2 className="text-lg font-bold text-white">
                <a href="https://ijlanga.co.za/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  IJ Langa
                </a>
              </h2>
              <p className="text-xs text-slate-300">Legal Consulting</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-300 text-xs uppercase tracking-wider px-4 py-2">
            {isAdmin ? 'Administration' : 'Client Portal'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={`
                      hover:bg-slate-800 hover:text-amber-400 transition-colors mx-2 mb-1
                      ${isActive(item.url, item.exact) 
                        ? 'bg-slate-800 text-amber-400 border-r-2 border-amber-400' 
                        : 'text-slate-300'
                      }
                    `}
                  >
                    <NavLink to={item.url}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
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
