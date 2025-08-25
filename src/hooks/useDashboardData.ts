
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useDashboardData = () => {
  // Fetch invoices data
  const { data: invoices = [] } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          customers(name)
        `)
        .order('issue_date', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch customers data
  const { data: customers = [] } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch services data
  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch notifications data
  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('sent_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data;
    }
  });

  // Calculate dashboard metrics
  const totalRevenue = invoices.reduce((sum, invoice) => sum + Number(invoice.invoice_amount || 0), 0);
  const activeClients = customers.length;
  const unpaidInvoices = invoices.filter(inv => inv.status === 'Overdue' || inv.balance_due > 0);
  const totalUnpaidAmount = unpaidInvoices.reduce((sum, invoice) => sum + Number(invoice.balance_due || 0), 0);
  const pendingOrders = invoices.filter(inv => inv.status === 'Pending' || inv.status === 'Processing').length;

  return {
    invoices,
    customers,
    services,
    notifications,
    metrics: {
      totalRevenue,
      activeClients,
      unpaidAmount: totalUnpaidAmount,
      pendingOrders
    }
  };
};
