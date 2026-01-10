import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminKPIs {
  totalRevenue: number;
  monthlyRevenue: number;
  paidInvoices: number;
  unpaidInvoices: number;
  overdueInvoices: number;
  activeClients: number;
  activeResellers: number;
  pendingOrders: number;
  completedOrders: number;
  complianceTasks: number;
  overdueCompliance: number;
}

interface RevenueByMonth {
  month: string;
  revenue: number;
}

interface ResellerPerformance {
  id: string;
  name: string;
  clients: number;
  revenue: number;
  tier: string;
}

interface RecentInvoice {
  id: string;
  invoice_number: string;
  customer_name: string;
  total: number;
  status: string;
  created_at: string;
}

interface FailedPayment {
  id: string;
  invoice_id: string;
  amount: number;
  error: string;
  created_at: string;
}

interface AdminDashboardData {
  kpis: AdminKPIs;
  revenueByMonth: RevenueByMonth[];
  resellerPerformance: ResellerPerformance[];
  recentInvoices: RecentInvoice[];
  failedPayments: FailedPayment[];
}

export function useAdminDashboardData() {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch data in parallel for better performance
      const [
        invoicesRes,
        ordersRes,
        customersRes,
        resellersRes,
        paymentsRes,
      ] = await Promise.all([
        supabase.from('invoices').select('id, customer_id, total_amount, status, created_at, due_date'),
        supabase.from('orders').select('id, status, total_amount, created_at'),
        supabase.from('customers').select('id, name, email, created_at'),
        supabase.from('resellers').select('id, user_id, commission_rate, tier'),
        supabase.from('payments').select('id, invoice_id, amount, status, created_at'),
      ]);

      const invoices = (invoicesRes.data || []) as any[];
      const orders = (ordersRes.data || []) as any[];
      const customers = (customersRes.data || []) as any[];
      const resellers = (resellersRes.data || []) as any[];
      const payments = (paymentsRes.data || []) as any[];

      // Calculate KPIs
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const paidInvoices = invoices.filter(i => i.status === 'paid');
      const unpaidInvoices = invoices.filter(i => i.status === 'unpaid' || i.status === 'pending');
      const overdueInvoices = invoices.filter(i => {
        if (i.status === 'paid') return false;
        return i.due_date && new Date(i.due_date) < now;
      });

      const totalRevenue = paidInvoices.reduce((sum: number, i: any) => sum + (Number(i.total_amount) || 0), 0);
      const monthlyRevenue = paidInvoices
        .filter((i: any) => new Date(i.created_at) >= startOfMonth)
        .reduce((sum: number, i: any) => sum + (Number(i.total_amount) || 0), 0);

      const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing');
      const completedOrders = orders.filter(o => o.status === 'completed' || o.status === 'delivered');

      const kpis: AdminKPIs = {
        totalRevenue,
        monthlyRevenue,
        paidInvoices: paidInvoices.length,
        unpaidInvoices: unpaidInvoices.length,
        overdueInvoices: overdueInvoices.length,
        activeClients: customers.length,
        activeResellers: resellers.length,
        pendingOrders: pendingOrders.length,
        completedOrders: completedOrders.length,
        complianceTasks: 0, // Will be populated from compliance_tasks table if exists
        overdueCompliance: 0,
      };

      // Calculate revenue by month (last 6 months)
      const revenueByMonth: RevenueByMonth[] = [];
      for (let i = 5; i >= 0; i--) {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
        const monthName = monthDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        
        const monthRevenue = paidInvoices
          .filter((i: any) => {
            const date = new Date(i.created_at);
            return date >= monthDate && date <= monthEnd;
          })
          .reduce((sum: number, i: any) => sum + (Number(i.total_amount) || 0), 0);
        
        revenueByMonth.push({ month: monthName, revenue: monthRevenue });
      }

      // Get recent invoices with customer names
      const recentInvoices: RecentInvoice[] = invoices
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 10)
        .map((inv: any) => {
          const customer = customers.find((c: any) => c.id === inv.customer_id);
          return {
            id: inv.id,
            invoice_number: `INV-${inv.id.slice(0, 8)}`,
            customer_name: customer?.name || 'Unknown Customer',
            total: Number(inv.total_amount) || 0,
            status: inv.status || 'pending',
            created_at: inv.created_at,
          };
        });

      // Get failed payments
      const failedPayments: FailedPayment[] = payments
        .filter(p => p.status === 'failed')
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5)
        .map(p => ({
          id: p.id,
          invoice_id: p.invoice_id || '',
          amount: Number(p.amount) || 0,
          error: 'Payment processing failed',
          created_at: p.created_at,
        }));

      // Reseller performance
      const resellerPerformance: ResellerPerformance[] = resellers.map((r: any) => ({
        id: r.id,
        name: `Reseller ${r.id.slice(0, 6)}`,
        clients: 0,
        revenue: 0,
        tier: r.tier || 'Bronze',
      }));

      setData({
        kpis,
        revenueByMonth,
        resellerPerformance,
        recentInvoices,
        failedPayments,
      });
    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch dashboard data'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchDashboardData,
  };
}
