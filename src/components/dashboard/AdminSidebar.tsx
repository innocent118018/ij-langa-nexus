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
  BarChart3, DollarSign, Banknote, Receipt, CreditCard, ArrowLeftRight,
  BookCheck, FileText, Users, Quote, ShoppingCart, FileBarChart,
  StickyNote, Clock, Timer, FolderOpen, Truck, Building2,
  Package, RotateCcw, Package2, Hammer, UserCheck, DollarSign as PayslipIcon,
  TrendingUp, HardDrive, Calculator, Coins, Folder, FileEdit,
  PieChart, Settings, ChevronDown, ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  badge?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { title: "Business", url: "/dashboard", icon: BarChart3 },
  { title: "Summary", url: "/dashboard/summary", icon: PieChart },
  
  // Financial Management
  { title: "Bank & Cash Accounts", url: "/dashboard/bank-cash-accounts", icon: Banknote },
  { title: "Receipts", url: "/dashboard/receipts", icon: Receipt },
  { title: "Payments", url: "/dashboard/payments", icon: CreditCard },
  { title: "Inter Account Transfers", url: "/dashboard/inter-account-transfers", icon: ArrowLeftRight },
  { title: "Bank Reconciliations", url: "/dashboard/bank-reconciliations", icon: BookCheck },
  { title: "Expense Claims", url: "/dashboard/expense-claims", icon: FileText },
  
  // Customer Management
  { title: "Customers", url: "/dashboard/customers", icon: Users },
  
  // Sales Operations
  { title: "Sales Quotes", url: "/dashboard/sales-quotes", icon: Quote },
  { title: "Sales Orders", url: "/dashboard/sales-orders", icon: ShoppingCart },
  { title: "Sales Invoices", url: "/dashboard/sales-invoices", icon: FileBarChart },
  { title: "Credit Notes", url: "/dashboard/credit-notes", icon: StickyNote },
  { title: "Late Payment Fees", url: "/dashboard/late-payment-fees", icon: Clock },
  { title: "Billable Time", url: "/dashboard/billable-time", icon: Timer },
  { title: "Withholding Tax Receipts", url: "/dashboard/withholding-tax-receipts", icon: FolderOpen },
  { title: "Delivery Notes", url: "/dashboard/delivery-notes", icon: Truck },
  
  // Supplier Management
  { title: "Suppliers", url: "/dashboard/suppliers", icon: Building2 },
  
  // Purchase Operations
  { title: "Purchase Quotes", url: "/dashboard/purchase-quotes", icon: Quote },
  { title: "Purchase Orders", url: "/dashboard/purchase-orders", icon: ShoppingCart },
  { title: "Purchase Invoices", url: "/dashboard/purchase-invoices", icon: FileBarChart },
  { title: "Debit Notes", url: "/dashboard/debit-notes", icon: StickyNote },
  { title: "Goods Receipts", url: "/dashboard/goods-receipts", icon: Package },
  
  // Project Management
  { title: "Projects", url: "/dashboard/projects", icon: FolderOpen },
  
  // Inventory Management
  { title: "Inventory Items", url: "/dashboard/inventory-items", icon: Package },
  { title: "Inventory Transfers", url: "/dashboard/inventory-transfers", icon: RotateCcw },
  { title: "Inventory Write-offs", url: "/dashboard/inventory-writeoffs", icon: Package2 },
  { title: "Production Orders", url: "/dashboard/production-orders", icon: Hammer },
  
  // HR & Payroll
  { title: "Employees", url: "/dashboard/employees", icon: UserCheck },
  { title: "Payslips", url: "/dashboard/payslips", icon: PayslipIcon },
  
  // Investment & Assets
  { title: "Investments", url: "/dashboard/investments", icon: TrendingUp },
  { title: "Fixed Assets", url: "/dashboard/fixed-assets", icon: HardDrive },
  { title: "Depreciation Entries", url: "/dashboard/depreciation-entries", icon: Calculator },
  { title: "Intangible Assets", url: "/dashboard/intangible-assets", icon: HardDrive },
  { title: "Amortization Entries", url: "/dashboard/amortization-entries", icon: Calculator },
  { title: "Capital Accounts", url: "/dashboard/capital-accounts", icon: Coins },
  { title: "Special Accounts", url: "/dashboard/special-accounts", icon: Coins },
  { title: "Folders", url: "/dashboard/folders", icon: Folder },
  
  // Accounting
  { title: "Journal Entries", url: "/dashboard/journal-entries", icon: FileEdit },
  
  // Reporting
  { title: "Reports", url: "/dashboard/reports", icon: PieChart },
  
  // System
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

const groupedMenuItems = {
  "Overview": [
    { title: "Business", url: "/dashboard", icon: BarChart3 },
    { title: "Summary", url: "/dashboard/summary", icon: PieChart },
  ],
  "Financial Management": [
    { title: "Bank & Cash Accounts", url: "/dashboard/bank-cash-accounts", icon: Banknote },
    { title: "Receipts", url: "/dashboard/receipts", icon: Receipt },
    { title: "Payments", url: "/dashboard/payments", icon: CreditCard },
    { title: "Inter Account Transfers", url: "/dashboard/inter-account-transfers", icon: ArrowLeftRight },
    { title: "Bank Reconciliations", url: "/dashboard/bank-reconciliations", icon: BookCheck },
    { title: "Expense Claims", url: "/dashboard/expense-claims", icon: FileText },
  ],
  "Sales & Customers": [
    { title: "Customers", url: "/dashboard/customers", icon: Users },
    { title: "Sales Quotes", url: "/dashboard/sales-quotes", icon: Quote },
    { title: "Sales Orders", url: "/dashboard/sales-orders", icon: ShoppingCart },
    { title: "Sales Invoices", url: "/dashboard/sales-invoices", icon: FileBarChart },
    { title: "Credit Notes", url: "/dashboard/credit-notes", icon: StickyNote },
    { title: "Late Payment Fees", url: "/dashboard/late-payment-fees", icon: Clock },
    { title: "Billable Time", url: "/dashboard/billable-time", icon: Timer },
    { title: "Withholding Tax Receipts", url: "/dashboard/withholding-tax-receipts", icon: FolderOpen },
    { title: "Delivery Notes", url: "/dashboard/delivery-notes", icon: Truck },
  ],
  "Purchase & Suppliers": [
    { title: "Suppliers", url: "/dashboard/suppliers", icon: Building2 },
    { title: "Purchase Quotes", url: "/dashboard/purchase-quotes", icon: Quote },
    { title: "Purchase Orders", url: "/dashboard/purchase-orders", icon: ShoppingCart },
    { title: "Purchase Invoices", url: "/dashboard/purchase-invoices", icon: FileBarChart },
    { title: "Debit Notes", url: "/dashboard/debit-notes", icon: StickyNote },
    { title: "Goods Receipts", url: "/dashboard/goods-receipts", icon: Package },
  ],
  "Project & Inventory": [
    { title: "Projects", url: "/dashboard/projects", icon: FolderOpen },
    { title: "Inventory Items", url: "/dashboard/inventory-items", icon: Package },
    { title: "Inventory Transfers", url: "/dashboard/inventory-transfers", icon: RotateCcw },
    { title: "Inventory Write-offs", url: "/dashboard/inventory-writeoffs", icon: Package2 },
    { title: "Production Orders", url: "/dashboard/production-orders", icon: Hammer },
  ],
  "HR & Payroll": [
    { title: "Employees", url: "/dashboard/employees", icon: UserCheck },
    { title: "Payslips", url: "/dashboard/payslips", icon: PayslipIcon },
  ],
  "Assets & Investments": [
    { title: "Investments", url: "/dashboard/investments", icon: TrendingUp },
    { title: "Fixed Assets", url: "/dashboard/fixed-assets", icon: HardDrive },
    { title: "Depreciation Entries", url: "/dashboard/depreciation-entries", icon: Calculator },
    { title: "Intangible Assets", url: "/dashboard/intangible-assets", icon: HardDrive },
    { title: "Amortization Entries", url: "/dashboard/amortization-entries", icon: Calculator },
    { title: "Capital Accounts", url: "/dashboard/capital-accounts", icon: Coins },
    { title: "Special Accounts", url: "/dashboard/special-accounts", icon: Coins },
    { title: "Folders", url: "/dashboard/folders", icon: Folder },
  ],
  "Accounting & Reports": [
    { title: "Journal Entries", url: "/dashboard/journal-entries", icon: FileEdit },
    { title: "Reports", url: "/dashboard/reports", icon: PieChart },
  ],
  "System Administration": [
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
  ]
};

export const AdminSidebar: React.FC = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set(['Overview']));
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted/50";

  const toggleGroup = (groupName: string) => {
    const newOpenGroups = new Set(openGroups);
    if (newOpenGroups.has(groupName)) {
      newOpenGroups.delete(groupName);
    } else {
      newOpenGroups.add(groupName);
    }
    setOpenGroups(newOpenGroups);
  };

  // Auto-open group containing active route
  React.useEffect(() => {
    for (const [groupName, items] of Object.entries(groupedMenuItems)) {
      if (items.some(item => isActive(item.url))) {
        setOpenGroups(prev => new Set(prev).add(groupName));
        break;
      }
    }
  }, [currentPath]);

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        {Object.entries(groupedMenuItems).map(([groupName, items]) => (
          <SidebarGroup key={groupName}>
            <Collapsible 
              open={openGroups.has(groupName)}
              onOpenChange={() => toggleGroup(groupName)}
            >
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="cursor-pointer hover:bg-muted/50 rounded-md p-2 flex items-center justify-between">
                  <span>{!collapsed && groupName}</span>
                  {!collapsed && (
                    openGroups.has(groupName) ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                  )}
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink 
                            to={item.url} 
                            end={item.url === "/dashboard"}
                            className={getNavCls}
                          >
                            <item.icon className="h-4 w-4 flex-shrink-0" />
                            {!collapsed && (
                              <span className="truncate">{item.title}</span>
                            )}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};