import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface AdminStats {
  totalUsers: number;
  totalCustomers: number;
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  totalInvoices: number;
  paidInvoices: number;
  unpaidInvoices: number;
  overdueInvoices: number;
  totalServices: number;
  recentOrders: any[];
  recentInvoices: any[];
  revenueByMonth: { month: string; revenue: number; orders: number }[];
}

export const useAdminStats = () => {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async (): Promise<AdminStats> => {
      // Fetch all stats in parallel for efficiency
      const [
        usersResult,
        customersResult,
        ordersResult,
        invoicesResult,
        servicesResult,
        recentOrdersResult,
        recentInvoicesResult,
      ] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('customers').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('id, status, total_amount, created_at'),
        supabase.from('sales_invoices').select('id, status, total_amount, balance_due, due_date'),
        supabase.from('services').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('sales_invoices').select('*, customer_accounts!customer_id(customer_name)').order('created_at', { ascending: false }).limit(5),
      ]);

      const orders = ordersResult.data || [];
      const invoices = invoicesResult.data || [];
      const today = new Date().toISOString().split('T')[0];

      // Calculate order stats
      const pendingOrders = orders.filter(o => o.status === 'pending').length;
      const completedOrders = orders.filter(o => o.status === 'completed').length;
      const totalRevenue = orders
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + (o.total_amount || 0), 0);

      // Calculate invoice stats
      const paidInvoices = invoices.filter(i => i.status === 'paid').length;
      const unpaidInvoices = invoices.filter(i => i.status !== 'paid' && i.status !== 'cancelled').length;
      const overdueInvoices = invoices.filter(i => 
        i.status !== 'paid' && i.due_date && i.due_date < today
      ).length;

      // Generate revenue by month (last 6 months)
      const months = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthStr = date.toLocaleString('default', { month: 'short' });
        const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        const monthOrders = orders.filter(o => 
          o.status === 'completed' && 
          o.created_at?.startsWith(yearMonth)
        );
        
        months.push({
          month: monthStr,
          revenue: monthOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0),
          orders: monthOrders.length
        });
      }

      return {
        totalUsers: usersResult.count || 0,
        totalCustomers: customersResult.count || 0,
        totalOrders: orders.length,
        pendingOrders,
        completedOrders,
        totalRevenue,
        totalInvoices: invoices.length,
        paidInvoices,
        unpaidInvoices,
        overdueInvoices,
        totalServices: servicesResult.count || 0,
        recentOrders: recentOrdersResult.data || [],
        recentInvoices: recentInvoicesResult.data || [],
        revenueByMonth: months,
      };
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000,
  });
};
