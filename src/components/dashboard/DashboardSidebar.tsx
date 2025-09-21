
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
  Activity,
  Landmark,
  Receipt,
  CreditCard,
  ArrowLeftRight,
  CheckSquare,
  Wallet,
  UserCheck,
  FileX,
  FileEdit,
  Minus,
  Clock,
  FileCheck,
  ShoppingCart,
  ClipboardList,
  Truck,
  Package,
  ArrowUpDown,
  PackageX,
  Factory,
  Briefcase as ProjectIcon,
  UserIcon,
  Banknote,
  TrendingUp,
  Building2,
  Calendar,
  Calculator,
  FolderOpen,
  SettingsIcon
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
    { title: 'Summary', url: '/dashboard', icon: LayoutDashboard, exact: true },
    { title: 'Bank and Cash Accounts', url: '/dashboard/bank-cash-accounts', icon: Landmark },
    { title: 'Receipts', url: '/dashboard/receipts', icon: Receipt },
    { title: 'Payments', url: '/dashboard/payments', icon: CreditCard },
    { title: 'Inter Account Transfers', url: '/dashboard/inter-account-transfers', icon: ArrowLeftRight },
    { title: 'Bank Reconciliations', url: '/dashboard/bank-reconciliations', icon: CheckSquare },
    { title: 'Expense Claims', url: '/dashboard/expense-claims', icon: Wallet },
    { title: 'Customers', url: '/dashboard/customers', icon: UserCheck },
    { title: 'Sales Quotes', url: '/dashboard/sales-quotes', icon: FileEdit },
    { title: 'Sales Orders', url: '/dashboard/sales-orders', icon: ShoppingCart },
    { title: 'Sales Invoices', url: '/dashboard/sales-invoices', icon: FileText },
    { title: 'Credit Notes', url: '/dashboard/credit-notes', icon: FileX },
    { title: 'Late Payment Fees', url: '/dashboard/late-payment-fees', icon: Clock },
    { title: 'Delivery Notes', url: '/dashboard/delivery-notes', icon: Truck },
    { title: 'Billable Time', url: '/dashboard/billable-time', icon: Clock },
    { title: 'Withholding Tax Receipts', url: '/dashboard/withholding-tax-receipts', icon: Receipt },
    { title: 'Suppliers', url: '/dashboard/suppliers', icon: Building },
    { title: 'Purchase Quotes', url: '/dashboard/purchase-quotes', icon: ClipboardList },
    { title: 'Purchase Orders', url: '/dashboard/purchase-orders', icon: ShoppingCart },
    { title: 'Purchase Invoices', url: '/dashboard/purchase-invoices', icon: FileText },
    { title: 'Debit Notes', url: '/dashboard/debit-notes', icon: Minus },
    { title: 'Goods Receipts', url: '/dashboard/goods-receipts', icon: Package },
    { title: 'Inventory Items', url: '/dashboard/inventory-items', icon: Package },
    { title: 'Inventory Transfers', url: '/dashboard/inventory-transfers', icon: ArrowUpDown },
    { title: 'Inventory Write-offs', url: '/dashboard/inventory-writeoffs', icon: PackageX },
    { title: 'Production Orders', url: '/dashboard/production-orders', icon: Factory },
    { title: 'Projects', url: '/dashboard/projects', icon: ProjectIcon },
    { title: 'Employees', url: '/dashboard/employees', icon: Users },
    { title: 'Payslips', url: '/dashboard/payslips', icon: FileCheck },
    { title: 'Investments', url: '/dashboard/investments', icon: TrendingUp },
    { title: 'Fixed Assets', url: '/dashboard/fixed-assets', icon: Building2 },
    { title: 'Depreciation Entries', url: '/dashboard/depreciation-entries', icon: Calendar },
    { title: 'Intangible Assets', url: '/dashboard/intangible-assets', icon: Shield },
    { title: 'Amortization Entries', url: '/dashboard/amortization-entries', icon: Calendar },
    { title: 'Capital Accounts', url: '/dashboard/capital-accounts', icon: Banknote },
    { title: 'Special Accounts', url: '/dashboard/special-accounts', icon: Landmark },
    { title: 'Journal Entries', url: '/dashboard/journal-entries', icon: FileEdit },
    { title: 'Folders', url: '/dashboard/folders', icon: FolderOpen },
    { title: 'Reports', url: '/dashboard/reports', icon: BarChart3 },
    { title: 'Settings', url: '/dashboard/settings', icon: SettingsIcon },
    { title: 'System Settings', url: '/dashboard/system-settings', icon: Settings }
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
              {!collapsed && (isAdmin ? 'Accounting System' : 'Client Portal')}
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
