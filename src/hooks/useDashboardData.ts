
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { apiClient } from './useApiClient';

export const useDashboardData = () => {
  // Fetch dashboard data through API with ownership validation - optimized with caching
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: async () => {
      return await apiClient.getUserData('dashboard-metrics');
    },
    staleTime: 2 * 60 * 1000, // 2 minutes for dashboard data
    gcTime: 5 * 60 * 1000, // 5 minutes cache
  });

  // Fetch services data (public) - less frequent updates needed
  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('id, name, description, price, category, is_active')
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      return data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes for services
    gcTime: 30 * 60 * 1000, // 30 minutes cache
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
