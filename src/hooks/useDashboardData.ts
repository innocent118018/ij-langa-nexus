
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { apiClient } from './useApiClient';

export const useDashboardData = () => {
  // Fetch dashboard data through API with ownership validation
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: async () => {
      return await apiClient.getUserData('dashboard-metrics');
    }
  });

  // Fetch services data (public)
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

  return {
    invoices: dashboardData?.invoices || [],
    customers: [], // Users don't need customer data
    orders: dashboardData?.orders || [],
    services,
    notifications: dashboardData?.notifications || [],
    metrics: dashboardData?.metrics || {
      activeServices: 0,
      pendingOrders: 0,
      unpaidAmount: 0,
      pendingInvoices: 0
    },
    isLoading
  };
};
