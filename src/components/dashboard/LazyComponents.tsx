import { lazy } from 'react';

// Lazy load dashboard components for better performance
export const LazyClientDashboard = lazy(() => 
  import('@/pages/dashboard/ClientDashboard').then(module => ({ 
    default: module.ClientDashboard 
  }))
);

export const LazyAdminDashboard = lazy(() => 
  import('@/pages/dashboard/AdminDashboard').then(module => ({ 
    default: module.AdminDashboard 
  }))
);

export const LazyOrders = lazy(() => import('@/pages/dashboard/Orders'));
export const LazyInvoices = lazy(() => import('@/pages/dashboard/Invoices'));
export const LazyDocuments = lazy(() => import('@/pages/dashboard/Documents'));
export const LazyProfile = lazy(() => import('@/pages/dashboard/Profile'));
export const LazySettings = lazy(() => import('@/pages/dashboard/Settings'));
export const LazySupport = lazy(() => import('@/pages/dashboard/Support'));
export const LazyNotifications = lazy(() => import('@/pages/dashboard/Notifications'));

// Accounting System Pages
export const LazySummary = lazy(() => import('@/pages/dashboard/Overview'));
export const LazyBankCashAccounts = lazy(() => import('@/pages/dashboard/BankCashAccounts'));
export const LazyReceipts = lazy(() => import('@/pages/dashboard/Receipts'));
export const LazyPayments = lazy(() => import('@/pages/dashboard/Payments'));
export const LazyInterAccountTransfers = lazy(() => import('@/pages/dashboard/InterAccountTransfers'));
export const LazyBankReconciliations = lazy(() => import('@/pages/dashboard/BankReconciliations'));
export const LazyExpenseClaims = lazy(() => import('@/pages/dashboard/ExpenseClaims'));
export const LazyCustomers = lazy(() => import('@/pages/dashboard/Customers'));
export const LazySalesQuotes = lazy(() => import('@/pages/dashboard/SalesQuotes'));
export const LazySalesOrders = lazy(() => import('@/pages/dashboard/SalesOrders'));
export const LazySalesInvoices = lazy(() => import('@/pages/dashboard/SalesInvoices'));
export const LazyCreditNotes = lazy(() => import('@/pages/dashboard/CreditNotes'));
export const LazyLatePaymentFees = lazy(() => import('@/pages/dashboard/LatePaymentFees'));
export const LazyDeliveryNotes = lazy(() => import('@/pages/dashboard/DeliveryNotes'));
export const LazyBillableTime = lazy(() => import('@/pages/dashboard/BillableTime'));
export const LazyWithholdingTaxReceipts = lazy(() => import('@/pages/dashboard/WithholdingTaxReceipts'));
export const LazySuppliers = lazy(() => import('@/pages/dashboard/Suppliers'));
export const LazyPurchaseQuotes = lazy(() => import('@/pages/dashboard/PurchaseQuotes'));
export const LazyPurchaseOrders = lazy(() => import('@/pages/dashboard/PurchaseOrders'));
export const LazyPurchaseInvoices = lazy(() => import('@/pages/dashboard/PurchaseInvoices'));
export const LazyDebitNotes = lazy(() => import('@/pages/dashboard/DebitNotes'));
export const LazyGoodsReceipts = lazy(() => import('@/pages/dashboard/GoodsReceipts'));
export const LazyInventoryItems = lazy(() => import('@/pages/dashboard/InventoryItems'));
export const LazyInventoryTransfers = lazy(() => import('@/pages/dashboard/InventoryTransfers'));
export const LazyInventoryWriteoffs = lazy(() => import('@/pages/dashboard/InventoryWriteoffs'));
export const LazyProductionOrders = lazy(() => import('@/pages/dashboard/ProductionOrders'));
export const LazyProjects = lazy(() => import('@/pages/dashboard/Projects'));
export const LazyEmployees = lazy(() => import('@/pages/dashboard/Employees'));
export const LazyPayslips = lazy(() => import('@/pages/dashboard/Payslips'));
export const LazyInvestments = lazy(() => import('@/pages/dashboard/Investments'));
export const LazyFixedAssets = lazy(() => import('@/pages/dashboard/FixedAssets'));
export const LazyDepreciationEntries = lazy(() => import('@/pages/dashboard/DepreciationEntries'));
export const LazyIntangibleAssets = lazy(() => import('@/pages/dashboard/IntangibleAssets'));
export const LazyAmortizationEntries = lazy(() => import('@/pages/dashboard/AmortizationEntries'));
export const LazyCapitalAccounts = lazy(() => import('@/pages/dashboard/CapitalAccounts'));
export const LazySpecialAccounts = lazy(() => import('@/pages/dashboard/SpecialAccounts'));
export const LazyJournalEntries = lazy(() => import('@/pages/dashboard/JournalEntries'));
export const LazyFolders = lazy(() => import('@/pages/dashboard/Folders'));
export const LazyReports = lazy(() => import('@/pages/dashboard/Reports'));
export const LazySystemSettings = lazy(() => import('@/pages/dashboard/SystemSettings'));