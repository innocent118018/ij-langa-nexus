import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Activity,
  Building2,
  Receipt,
  CreditCard,
  ArrowLeftRight,
  FileCheck,
  FileText,
  Users,
  ShoppingCart,
  FileSpreadsheet,
  Package,
  Truck,
  Clock,
  FileWarning,
  Warehouse,
  FolderKanban,
  UserCog,
  TrendingUp,
  Landmark,
  Calculator,
  BookOpen,
  FolderOpen,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Scale,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface AdminSidebarNavProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navigationGroups: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Summary', href: '/admin/summary', icon: LayoutDashboard },
      { label: 'System Monitoring', href: '/admin/monitoring', icon: Activity },
    ],
  },
  {
    title: 'Banking',
    items: [
      { label: 'Bank & Cash Accounts', href: '/admin/bank-accounts', icon: Building2 },
      { label: 'Receipts', href: '/admin/receipts', icon: Receipt },
      { label: 'Payments', href: '/admin/payments', icon: CreditCard },
      { label: 'Inter Account Transfers', href: '/admin/transfers', icon: ArrowLeftRight },
      { label: 'Bank Reconciliations', href: '/admin/reconciliations', icon: FileCheck },
      { label: 'Expense Claims', href: '/admin/expense-claims', icon: FileText },
    ],
  },
  {
    title: 'Sales',
    items: [
      { label: 'Customers', href: '/admin/customers', icon: Users },
      { label: 'Sales Quotes', href: '/admin/sales-quotes', icon: FileSpreadsheet },
      { label: 'Sales Orders', href: '/admin/sales-orders', icon: ShoppingCart },
      { label: 'Sales Invoices', href: '/admin/sales-invoices', icon: FileText },
      { label: 'Credit Notes', href: '/admin/credit-notes', icon: FileWarning },
      { label: 'Late Payment Fees', href: '/admin/late-fees', icon: Clock },
      { label: 'Delivery Notes', href: '/admin/delivery-notes', icon: Truck },
      { label: 'Billable Time', href: '/admin/billable-time', icon: Clock },
      { label: 'Withholding Tax Receipts', href: '/admin/withholding-tax', icon: Receipt },
    ],
  },
  {
    title: 'Purchases',
    items: [
      { label: 'Suppliers', href: '/admin/suppliers', icon: Package },
      { label: 'Purchase Quotes', href: '/admin/purchase-quotes', icon: FileSpreadsheet },
      { label: 'Purchase Orders', href: '/admin/purchase-orders', icon: ShoppingCart },
      { label: 'Purchase Invoices', href: '/admin/purchase-invoices', icon: FileText },
      { label: 'Debit Notes', href: '/admin/debit-notes', icon: FileWarning },
      { label: 'Goods Receipts', href: '/admin/goods-receipts', icon: Package },
    ],
  },
  {
    title: 'Inventory',
    items: [
      { label: 'Inventory Items', href: '/admin/inventory', icon: Warehouse },
      { label: 'Inventory Transfers', href: '/admin/inventory-transfers', icon: ArrowLeftRight },
      { label: 'Inventory Write-offs', href: '/admin/inventory-writeoffs', icon: FileWarning },
      { label: 'Production Orders', href: '/admin/production-orders', icon: FolderKanban },
    ],
  },
  {
    title: 'Payroll',
    items: [
      { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
      { label: 'Employees', href: '/admin/employees', icon: UserCog },
      { label: 'Payslips', href: '/admin/payslips', icon: FileText },
    ],
  },
  {
    title: 'Assets',
    items: [
      { label: 'Investments', href: '/admin/investments', icon: TrendingUp },
      { label: 'Fixed Assets', href: '/admin/fixed-assets', icon: Landmark },
      { label: 'Depreciation Entries', href: '/admin/depreciation', icon: Calculator },
      { label: 'Intangible Assets', href: '/admin/intangible-assets', icon: BookOpen },
      { label: 'Amortization Entries', href: '/admin/amortization', icon: Calculator },
    ],
  },
  {
    title: 'Accounting',
    items: [
      { label: 'Capital Accounts', href: '/admin/capital-accounts', icon: Landmark },
      { label: 'Special Accounts', href: '/admin/special-accounts', icon: Scale },
      { label: 'Journal Entries', href: '/admin/journal-entries', icon: BookOpen },
    ],
  },
  {
    title: 'Documents',
    items: [
      { label: 'Folders', href: '/admin/folders', icon: FolderOpen },
      { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
];

export function AdminSidebarNav({ collapsed, onToggle }: AdminSidebarNavProps) {
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Brand */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <Link to="/admin/summary" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">IJ</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-sidebar-foreground text-sm">IJ Langa</span>
              <span className="text-[10px] text-sidebar-foreground/60">Consulting</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="px-2 space-y-6">
          {navigationGroups.map((group) => (
            <div key={group.title}>
              {!collapsed && (
                <h3 className="px-3 mb-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
                  {group.title}
                </h3>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.href;
                  const Icon = item.icon;
                  
                  return (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                          isActive 
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                          collapsed && "justify-center"
                        )}
                        title={collapsed ? item.label : undefined}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>{item.label}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {!collapsed && <Separator className="my-4 bg-sidebar-border" />}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Toggle Button */}
      <div className="p-2 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={cn(
            "w-full flex items-center gap-2 text-sidebar-foreground/70 hover:text-sidebar-foreground",
            collapsed && "justify-center"
          )}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </Button>
      </div>
    </aside>
  );
}

export default AdminSidebarNav;
