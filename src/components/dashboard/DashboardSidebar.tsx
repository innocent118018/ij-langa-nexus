
import React, { useState } from 'react';
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
  SidebarTrigger,
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
  Scale,
  Gavel,
  RotateCcw,
  FileOutput,
  ChevronLeft,
  ChevronRight,
  Bell,
  Headphones,
  Activity
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DashboardSidebarProps {
  isAdmin: boolean;
}

export const DashboardSidebar = ({ isAdmin }: DashboardSidebarProps) => {
  const location = useLocation();
  const { state: sidebarState, toggleSidebar } = useSidebar();
  const currentPath = location.pathname;
  const collapsed = sidebarState === 'collapsed';

  const adminMenuItems = [
    {
      title: 'Overview',
      url: '/dashboard',
      icon: LayoutDashboard,
      exact: true
    },
    {
      title: 'User Management',
      url: '/dashboard/users',
      icon: Users
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
      title: 'Document Generation',
      url: '/dashboard/document-generation',
      icon: FileOutput
    },
    {
      title: 'Admin Support',
      url: '/dashboard/admin-support',
      icon: Headphones
    },
    {
      title: 'Automation Flows',
      url: '/dashboard/automation-flows',
      icon: Activity
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
      title: 'Notifications',
      url: '/dashboard/notifications',
      icon: Bell
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
      title: 'Notifications',
      url: '/dashboard/notifications',
      icon: Bell
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
    <TooltipProvider>
      <Sidebar className={`border-r bg-sidebar text-sidebar-foreground transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
        <SidebarContent>
          {/* Header with toggle */}
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Scale className="h-8 w-8 text-sidebar-primary flex-shrink-0" />
                {!collapsed && (
                  <div>
                    <h2 className="text-lg font-bold">
                      <a href="https://ijlanga.co.za/" target="_blank" rel="noopener noreferrer" className="hover:text-sidebar-primary transition-colors">
                        IJ Langa
                      </a>
                    </h2>
                    <p className="text-xs text-sidebar-foreground/70">Legal Consulting</p>
                  </div>
                )}
              </div>
              <button
                onClick={toggleSidebar}
                className="p-1 hover:bg-sidebar-accent rounded transition-colors"
              >
                {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs uppercase tracking-wider px-4 py-2">
              {!collapsed && (isAdmin ? 'Administration' : 'Client Portal')}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => {
                  const active = isActive(item.url, item.exact);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton 
                            asChild
                            className={`
                              sidebar-nav-item
                              ${active 
                                ? 'sidebar-nav-item active' 
                                : ''
                              }
                            `}
                          >
                            <NavLink to={item.url} className="flex items-center space-x-3 px-3 py-2">
                              <item.icon className="h-5 w-5 flex-shrink-0" />
                              {!collapsed && <span>{item.title}</span>}
                            </NavLink>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        {collapsed && (
                          <TooltipContent side="right" className="z-50">
                            {item.title}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </TooltipProvider>
  );
};
