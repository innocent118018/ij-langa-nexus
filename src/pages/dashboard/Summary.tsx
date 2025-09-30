import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';

const Summary = () => {
  const { user, loading: authLoading } = useAuth();

  const { data: userRole } = useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      if (error) throw error;
      return data?.role;
    },
    enabled: !!user?.id,
  });

  const { data: summaryData, isLoading } = useQuery({
    queryKey: ['summary-data'],
    queryFn: async () => {
      // Fetch counts for各tab items
      const [
        bankAccounts,
        receipts,
        payments,
        transfers,
        reconciliations,
        expenseClaims,
        customers,
        salesQuotes,
        salesOrders,
        salesInvoices,
        creditNotes,
        latePaymentFees,
        billableTime,
        suppliers,
        purchaseQuotes,
        purchaseOrders,
        purchaseInvoices,
        inventoryItems
      ] = await Promise.all([
        supabase.from('bank_cash_accounts').select('id', { count: 'exact', head: true }),
        supabase.from('bank_receipts').select('id', { count: 'exact', head: true }),
        supabase.from('bank_payments').select('id', { count: 'exact', head: true }),
        supabase.from('inter_account_transfers').select('id', { count: 'exact', head: true }),
        supabase.from('bank_reconciliations').select('id', { count: 'exact', head: true }),
        supabase.from('expense_claims').select('id', { count: 'exact', head: true }),
        supabase.from('customer_accounts').select('id', { count: 'exact', head: true }),
        supabase.from('sales_quotes').select('id', { count: 'exact', head: true }),
        supabase.from('sales_orders').select('id', { count: 'exact', head: true }),
        supabase.from('sales_invoices').select('id', { count: 'exact', head: true }),
        supabase.from('credit_notes').select('id', { count: 'exact', head: true }),
        supabase.from('late_payment_fees').select('id', { count: 'exact', head: true }),
        supabase.from('billable_time').select('id', { count: 'exact', head: true }),
        supabase.from('suppliers').select('id', { count: 'exact', head: true }),
        supabase.from('purchase_quotes').select('id', { count: 'exact', head: true }),
        supabase.from('purchase_orders').select('id', { count: 'exact', head: true }),
        supabase.from('purchase_invoices').select('id', { count: 'exact', head: true }),
        supabase.from('inventory_items').select('id', { count: 'exact', head: true }),
      ]);

      return {
        bankAccounts: bankAccounts.count || 0,
        receipts: receipts.count || 0,
        payments: payments.count || 0,
        transfers: transfers.count || 0,
        reconciliations: reconciliations.count || 0,
        expenseClaims: expenseClaims.count || 0,
        customers: customers.count || 0,
        salesQuotes: salesQuotes.count || 0,
        salesOrders: salesOrders.count || 0,
        salesInvoices: salesInvoices.count || 0,
        creditNotes: creditNotes.count || 0,
        latePaymentFees: latePaymentFees.count || 0,
        billableTime: billableTime.count || 0,
        suppliers: suppliers.count || 0,
        purchaseQuotes: purchaseQuotes.count || 0,
        purchaseOrders: purchaseOrders.count || 0,
        purchaseInvoices: purchaseInvoices.count || 0,
        inventoryItems: inventoryItems.count || 0,
      };
    },
    enabled: !!userRole && ['admin', 'super_admin', 'accountant', 'consultant'].includes(userRole),
  });

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !userRole || !['admin', 'super_admin', 'accountant', 'consultant'].includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  const tabs = [
    { name: 'Summary', href: '/dashboard/summary', icon: 'presentation', active: true },
    { name: 'Bank and Cash Accounts', href: '/dashboard/bank-cash-accounts', icon: 'coins', count: summaryData?.bankAccounts },
    { name: 'Receipts', href: '/dashboard/receipts', icon: 'plus-square', count: summaryData?.receipts },
    { name: 'Payments', href: '/dashboard/payments', icon: 'minus-square', count: summaryData?.payments },
    { name: 'Inter Account Transfers', href: '/dashboard/inter-account-transfers', icon: 'arrow-right', count: summaryData?.transfers },
    { name: 'Bank Reconciliations', href: '/dashboard/bank-reconciliations', icon: 'clipboard-check', count: summaryData?.reconciliations },
    { name: 'Expense Claims', href: '/dashboard/expense-claims', icon: 'wallet', count: summaryData?.expenseClaims },
    { name: 'Customers', href: '/dashboard/customers', icon: 'users', count: summaryData?.customers },
    { name: 'Sales Quotes', href: '/dashboard/sales-quotes', icon: 'file-text', count: summaryData?.salesQuotes },
    { name: 'Sales Orders', href: '/dashboard/sales-orders', icon: 'shopping-bag', count: summaryData?.salesOrders },
    { name: 'Sales Invoices', href: '/dashboard/sales-invoices', icon: 'file-invoice', count: summaryData?.salesInvoices },
    { name: 'Credit Notes', href: '/dashboard/credit-notes', icon: 'scissors', count: summaryData?.creditNotes },
    { name: 'Late Payment Fees', href: '/dashboard/late-payment-fees', icon: 'bell', count: summaryData?.latePaymentFees },
    { name: 'Billable Time', href: '/dashboard/billable-time', icon: 'clock', count: summaryData?.billableTime },
    { name: 'Suppliers', href: '/dashboard/suppliers', icon: 'building', count: summaryData?.suppliers },
    { name: 'Purchase Quotes', href: '/dashboard/purchase-quotes', icon: 'file-text', count: summaryData?.purchaseQuotes },
    { name: 'Purchase Orders', href: '/dashboard/purchase-orders', icon: 'shopping-cart', count: summaryData?.purchaseOrders },
    { name: 'Purchase Invoices', href: '/dashboard/purchase-invoices', icon: 'file-invoice', count: summaryData?.purchaseInvoices },
    { name: 'Inventory Items', href: '/dashboard/inventory-items', icon: 'package', count: summaryData?.inventoryItems },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card border rounded-lg shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-border">
          {tabs.map((tab, idx) => (
            <Link
              key={idx}
              to={tab.href}
              className={`group flex items-center justify-between p-4 bg-card hover:bg-accent transition-colors ${
                tab.active ? 'bg-accent font-semibold' : ''
              }`}
            >
              <span className="text-sm">{tab.name}</span>
              {tab.count !== undefined && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  tab.count > 0 ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                }`}>
                  {tab.count}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Customers:</span>
                <span className="font-bold">{summaryData?.customers || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Invoices:</span>
                <span className="font-bold">{summaryData?.salesInvoices || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pending Payments:</span>
                <span className="font-bold">{summaryData?.receipts || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quotes:</span>
                <span className="font-bold">{summaryData?.salesQuotes || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Orders:</span>
                <span className="font-bold">{summaryData?.salesOrders || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Invoices:</span>
                <span className="font-bold">{summaryData?.salesInvoices || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Purchase Overview</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Suppliers:</span>
                <span className="font-bold">{summaryData?.suppliers || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Purchase Orders:</span>
                <span className="font-bold">{summaryData?.purchaseOrders || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Purchase Invoices:</span>
                <span className="font-bold">{summaryData?.purchaseInvoices || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Summary;