import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  BarChart3, Users, CreditCard, Receipt, Banknote, FileText, 
  Package, Clock, Building, Settings, Shield, Bell, FileCheck,
  Calculator, TrendingUp, PieChart, Folder, Archive, Wrench,
  UserCheck, Briefcase, DollarSign, ShoppingCart, Truck, 
  FileSpreadsheet, Calendar, Target, Award, Zap
} from 'lucide-react';
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
} from "@/components/ui/sidebar";
import { PermissionGate } from './PermissionGate';
import { usePermissions } from '@/hooks/usePermissions';

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  permission: string;
  badge?: string;
}

interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

const sidebarGroups: SidebarGroup[] = [
  {
    title: "Dashboard",
    items: [
      { title: "Business Overview", url: "/dashboard/overview", icon: BarChart3, permission: "business:read" },
      { title: "Summary & P&L", url: "/dashboard/summary", icon: PieChart, permission: "business:read" },
    ]
  },
  {
    title: "Banking & Cash",
    items: [
      { title: "Bank Accounts", url: "/dashboard/bank-cash-accounts", icon: Banknote, permission: "bank_accounts:read" },
      { title: "Receipts", url: "/dashboard/receipts", icon: Receipt, permission: "receipts:read" },
      { title: "Payments", url: "/dashboard/payments", icon: CreditCard, permission: "payments:read" },
      { title: "Inter-Account Transfers", url: "/dashboard/inter-account-transfers", icon: FileSpreadsheet, permission: "bank_accounts:read" },
      { title: "Bank Reconciliations", url: "/dashboard/bank-reconciliations", icon: FileCheck, permission: "bank_accounts:read" },
    ]
  },
  {
    title: "Sales",
    items: [
      { title: "Customers", url: "/dashboard/customers", icon: Users, permission: "customers:read" },
      { title: "Sales Quotes", url: "/dashboard/sales-quotes", icon: FileText, permission: "invoices:read" },
      { title: "Sales Orders", url: "/dashboard/sales-orders", icon: ShoppingCart, permission: "invoices:read" },
      { title: "Sales Invoices", url: "/dashboard/sales-invoices", icon: FileText, permission: "invoices:read" },
      { title: "Credit Notes", url: "/dashboard/credit-notes", icon: FileText, permission: "invoices:read" },
      { title: "Late Payment Fees", url: "/dashboard/late-payment-fees", icon: Clock, permission: "invoices:read" },
      { title: "Delivery Notes", url: "/dashboard/delivery-notes", icon: Truck, permission: "invoices:read" },
    ]
  },
  {
    title: "Purchasing",
    items: [
      { title: "Suppliers", url: "/dashboard/suppliers", icon: Building, permission: "customers:read" },
      { title: "Purchase Quotes", url: "/dashboard/purchase-quotes", icon: FileText, permission: "invoices:read" },
      { title: "Purchase Orders", url: "/dashboard/purchase-orders", icon: ShoppingCart, permission: "invoices:read" },
      { title: "Purchase Invoices", url: "/dashboard/purchase-invoices", icon: Receipt, permission: "invoices:read" },
      { title: "Debit Notes", url: "/dashboard/debit-notes", icon: FileText, permission: "invoices:read" },
      { title: "Goods Receipts", url: "/dashboard/goods-receipts", icon: Package, permission: "inventory:read" },
    ]
  },
  {
    title: "Inventory & Production",
    items: [
      { title: "Inventory Items", url: "/dashboard/inventory-items", icon: Package, permission: "inventory:read" },
      { title: "Inventory Transfers", url: "/dashboard/inventory-transfers", icon: Truck, permission: "inventory:read" },
      { title: "Inventory Write-offs", url: "/dashboard/inventory-writeoffs", icon: Archive, permission: "inventory:read" },
      { title: "Production Orders", url: "/dashboard/production-orders", icon: Wrench, permission: "inventory:read" },
    ]
  },
  {
    title: "Time & Projects",
    items: [
      { title: "Projects", url: "/dashboard/projects", icon: Target, permission: "projects:read" },
      { title: "Billable Time", url: "/dashboard/billable-time", icon: Clock, permission: "time_entries:read" },
      { title: "Expense Claims", url: "/dashboard/expense-claims", icon: Receipt, permission: "receipts:read" },
    ]
  },
  {
    title: "Human Resources",
    items: [
      { title: "Employees", url: "/dashboard/employees", icon: UserCheck, permission: "employees:read" },
      { title: "Payslips", url: "/dashboard/payslips", icon: FileText, permission: "payslips:read" },
    ]
  },
  {
    title: "Assets & Accounting",
    items: [
      { title: "Fixed Assets", url: "/dashboard/fixed-assets", icon: Building, permission: "business:read" },
      { title: "Depreciation Entries", url: "/dashboard/depreciation-entries", icon: TrendingUp, permission: "business:read" },
      { title: "Intangible Assets", url: "/dashboard/intangible-assets", icon: Award, permission: "business:read" },
      { title: "Amortization Entries", url: "/dashboard/amortization-entries", icon: Calculator, permission: "business:read" },
      { title: "Investments", url: "/dashboard/investments", icon: DollarSign, permission: "business:read" },
      { title: "Capital Accounts", url: "/dashboard/capital-accounts", icon: Briefcase, permission: "business:read" },
      { title: "Special Accounts", url: "/dashboard/special-accounts", icon: FileSpreadsheet, permission: "business:read" },
      { title: "Journal Entries", url: "/dashboard/journal-entries", icon: FileText, permission: "business:read" },
    ]
  },
  {
    title: "Tax & Compliance",
    items: [
      { title: "Withholding Tax Receipts", url: "/dashboard/withholding-tax-receipts", icon: Receipt, permission: "receipts:read" },
    ]
  },
  {
    title: "Reports & Analytics",
    items: [
      { title: "Reports", url: "/dashboard/reports", icon: BarChart3, permission: "reports:read" },
      { title: "Documents", url: "/dashboard/documents", icon: FileText, permission: "business:read" },
      { title: "Folders", url: "/dashboard/folders", icon: Folder, permission: "business:read" },
    ]
  },
  {
    title: "Administration",
    items: [
      { title: "System Settings", url: "/dashboard/system-settings", icon: Settings, permission: "settings:read" },
      { title: "System Monitoring", url: "/dashboard/system-monitoring", icon: Shield, permission: "audit:read" },
      { title: "User Management", url: "/dashboard/users", icon: Users, permission: "users:read" },
      { title: "Notifications", url: "/dashboard/notifications", icon: Bell, permission: "business:read" },
      { title: "Automation Flows", url: "/dashboard/automation-flows", icon: Zap, permission: "settings:read" },
    ]
  }
];

export function AdminDashboardSidebar() {
  const location = useLocation();
  const { hasPermission } = usePermissions();
  
  const currentPath = location.pathname;
  
  const getNavClassName = (isActive: boolean) => 
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50";

  return (
    <Sidebar className="w-64">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        {sidebarGroups.map((group) => {
          // Check if user has any permissions for items in this group
          const hasAnyGroupPermission = group.items.some(item => hasPermission(item.permission));
          
          if (!hasAnyGroupPermission) return null;
          
          return (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <PermissionGate 
                      key={item.title} 
                      permission={item.permission}
                      showMessage={false}
                    >
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <NavLink 
                            to={item.url} 
                            className={({ isActive }) => getNavClassName(isActive)}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className="ml-auto text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                                {item.badge}
                              </span>
                            )}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </PermissionGate>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}