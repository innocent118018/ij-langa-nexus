import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Building, Users, FileText, CreditCard, Calculator, 
  TrendingUp, Package, ShoppingCart, Receipt, 
  DollarSign, Calendar, Settings, ChevronDown, 
  ChevronRight, Home, Archive, Truck, UserCheck,
  Briefcase, Clock, PiggyBank, HardHat, Landmark,
  BookOpen, BarChart3, Folder, Wrench, Database,
  Search, BanknoteIcon, HandCoins, ArrowLeftRight,
  Layers, ShoppingBag, FileX, AlertCircle, 
  ClipboardList, PlusCircle, Factory, Target,
  Coins, Building2, RotateCcw, Gem, Calculator as Calc,
  FolderTree, BarChart, Palette
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  key: string;
  label: string;
  to?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: SidebarItem[];
  badge?: number;
}

const sidebarItems: SidebarItem[] = [
  {
    key: 'overview',
    label: 'Overview',
    to: '/dashboard/overview',
    icon: Home
  },
  {
    key: 'banking',
    label: 'Banking & Cash',
    icon: Landmark,
    children: [
      {
        key: 'bank-accounts',
        label: 'Bank and Cash Accounts',
        to: '/dashboard/bank-accounts',
        icon: Landmark
      },
      {
        key: 'receipts',
        label: 'Receipts',
        to: '/dashboard/receipts',
        icon: Receipt
      },
      {
        key: 'payments',
        label: 'Payments',
        to: '/dashboard/payments',
        icon: CreditCard
      },
      {
        key: 'inter-account-transfers',
        label: 'Inter Account Transfers',
        to: '/dashboard/inter-account-transfers',
        icon: ArrowLeftRight
      },
      {
        key: 'bank-reconciliations',
        label: 'Bank Reconciliations',
        to: '/dashboard/bank-reconciliations',
        icon: Calculator
      },
      {
        key: 'expense-claims',
        label: 'Expense Claims',
        to: '/dashboard/expense-claims',
        icon: Receipt
      }
    ]
  },
  {
    key: 'sales',
    label: 'Sales Management',
    icon: TrendingUp,
    children: [
      {
        key: 'customers',
        label: 'Customers',
        to: '/dashboard/customers',
        icon: Users
      },
      {
        key: 'sales-quotes',
        label: 'Sales Quotes',
        to: '/dashboard/sales-quotes',
        icon: FileText
      },
      {
        key: 'sales-orders',
        label: 'Sales Orders',
        to: '/dashboard/sales-orders',
        icon: ShoppingCart
      },
      {
        key: 'sales-invoices',
        label: 'Sales Invoices',
        to: '/dashboard/sales-invoices',
        icon: FileText
      },
      {
        key: 'credit-notes',
        label: 'Credit Notes',
        to: '/dashboard/credit-notes',
        icon: FileX
      },
      {
        key: 'late-payment-fees',
        label: 'Late Payment Fees',
        to: '/dashboard/late-payment-fees',
        icon: AlertCircle
      },
      {
        key: 'delivery-notes',
        label: 'Delivery Notes',
        to: '/dashboard/delivery-notes',
        icon: Truck
      },
      {
        key: 'billable-time',
        label: 'Billable Time',
        to: '/dashboard/billable-time',
        icon: Clock
      },
      {
        key: 'withholding-tax-receipts',
        label: 'Withholding Tax Receipts',
        to: '/dashboard/withholding-tax-receipts',
        icon: Receipt
      }
    ]
  },
  {
    key: 'purchasing',
    label: 'Purchasing',
    icon: ShoppingBag,
    children: [
      {
        key: 'suppliers',
        label: 'Suppliers',
        to: '/dashboard/suppliers',
        icon: Building
      },
      {
        key: 'purchase-quotes',
        label: 'Purchase Quotes',
        to: '/dashboard/purchase-quotes',
        icon: FileText
      },
      {
        key: 'purchase-orders',
        label: 'Purchase Orders',
        to: '/dashboard/purchase-orders',
        icon: ShoppingCart
      },
      {
        key: 'purchase-invoices',
        label: 'Purchase Invoices',
        to: '/dashboard/purchase-invoices',
        icon: FileText
      },
      {
        key: 'debit-notes',
        label: 'Debit Notes',
        to: '/dashboard/debit-notes',
        icon: FileX
      },
      {
        key: 'goods-receipts',
        label: 'Goods Receipts',
        to: '/dashboard/goods-receipts',
        icon: Package
      }
    ]
  },
  {
    key: 'inventory',
    label: 'Inventory',
    icon: Package,
    children: [
      {
        key: 'inventory-items',
        label: 'Inventory Items',
        to: '/dashboard/inventory-items',
        icon: Package
      },
      {
        key: 'inventory-transfers',
        label: 'Inventory Transfers',
        to: '/dashboard/inventory-transfers',
        icon: ArrowLeftRight
      },
      {
        key: 'inventory-writeoffs',
        label: 'Inventory Write-offs',
        to: '/dashboard/inventory-writeoffs',
        icon: FileX
      },
      {
        key: 'production-orders',
        label: 'Production Orders',
        to: '/dashboard/production-orders',
        icon: Factory
      }
    ]
  },
  {
    key: 'projects',
    label: 'Projects',
    to: '/dashboard/projects',
    icon: Target
  },
  {
    key: 'hr-payroll',
    label: 'HR & Payroll',
    icon: UserCheck,
    children: [
      {
        key: 'employees',
        label: 'Employees',
        to: '/dashboard/employees',
        icon: Users
      },
      {
        key: 'payslips',
        label: 'Payslips',
        to: '/dashboard/payslips',
        icon: FileText
      }
    ]
  },
  {
    key: 'investments-assets',
    label: 'Investments & Assets',
    icon: PiggyBank,
    children: [
      {
        key: 'investments',
        label: 'Investments',
        to: '/dashboard/investments',
        icon: PiggyBank
      },
      {
        key: 'fixed-assets',
        label: 'Fixed Assets',
        to: '/dashboard/fixed-assets',
        icon: Building2
      },
      {
        key: 'depreciation-entries',
        label: 'Depreciation Entries',
        to: '/dashboard/depreciation-entries',
        icon: RotateCcw
      },
      {
        key: 'intangible-assets',
        label: 'Intangible Assets',
        to: '/dashboard/intangible-assets',
        icon: Gem
      },
      {
        key: 'amortization-entries',
        label: 'Amortization Entries',
        to: '/dashboard/amortization-entries',
        icon: RotateCcw
      }
    ]
  },
  {
    key: 'accounting',
    label: 'Accounting',
    icon: Calculator,
    children: [
      {
        key: 'capital-accounts',
        label: 'Capital Accounts',
        to: '/dashboard/capital-accounts',
        icon: Coins
      },
      {
        key: 'special-accounts',
        label: 'Special Accounts',
        to: '/dashboard/special-accounts',
        icon: Database
      },
      {
        key: 'journal-entries',
        label: 'Journal Entries',
        to: '/dashboard/journal-entries',
        icon: BookOpen
      }
    ]
  },
  {
    key: 'documents',
    label: 'Documents',
    to: '/dashboard/folders',
    icon: Folder
  },
  {
    key: 'reports',
    label: 'Reports',
    to: '/dashboard/reports',
    icon: BarChart3
  },
  {
    key: 'settings',
    label: 'System Settings',
    to: '/dashboard/system-settings',
    icon: Settings
  },
  {
    key: 'customize',
    label: 'Customize',
    to: '/dashboard/customize',
    icon: Palette
  }
];

interface EnhancedAdminSidebarProps {
  className?: string;
}

export const EnhancedAdminSidebar: React.FC<EnhancedAdminSidebarProps> = ({
  className
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['sales', 'banking']);
  const location = useLocation();

  const toggleExpanded = (key: string) => {
    setExpandedItems(prev => 
      prev.includes(key) 
        ? prev.filter(item => item !== key)
        : [...prev, key]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const isParentActive = (children?: SidebarItem[]) => {
    if (!children) return false;
    return children.some(child => isActive(child.to));
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.key);
    const isItemActive = isActive(item.to);
    const isChildActive = isParentActive(item.children);

    if (hasChildren) {
      return (
        <div key={item.key} className="mb-1">
          <button
            onClick={() => toggleExpanded(item.key)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors",
              level === 0 ? "text-gray-700 hover:bg-gray-100" : "text-gray-600 hover:bg-gray-50",
              isChildActive && "bg-blue-50 text-blue-700"
            )}
          >
            <div className="flex items-center">
              <item.icon className={cn("h-4 w-4 mr-3", level > 0 && "h-3 w-3 mr-2")} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          
          {isExpanded && (
            <div className="ml-4 mt-1 space-y-1">
              {item.children?.map(child => renderSidebarItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        key={item.key}
        to={item.to!}
        className={({ isActive }) => cn(
          "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors mb-1",
          level === 0 ? "text-gray-700 hover:bg-gray-100" : "text-gray-600 hover:bg-gray-50",
          isActive && "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
        )}
      >
        <item.icon className={cn("h-4 w-4 mr-3", level > 0 && "h-3 w-3 mr-2")} />
        <span>{item.label}</span>
        {item.badge && (
          <span className="ml-auto px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
            {item.badge}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <aside className={cn("w-80 bg-white border-r border-gray-200 min-h-screen flex flex-col", className)}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building className="h-6 w-6 text-white" />
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-semibold text-gray-900">IJ Langa Consulting</h1>
            <p className="text-sm text-gray-500">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {sidebarItems.map(item => renderSidebarItem(item))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          Version 25.8.19.2622
        </div>
      </div>
    </aside>
  );
};