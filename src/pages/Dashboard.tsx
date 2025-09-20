
import React, { Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LazyAdminDashboard, LazyClientDashboard } from '@/components/dashboard/LazyComponents';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user, loading } = useAuth();

  // Fetch user role from database - optimized with caching
  const { data: userRole, isLoading: roleLoading } = useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data.role;
    },
    enabled: !!user?.id,
    staleTime: 10 * 60 * 1000, // 10 minutes - role doesn't change often
    gcTime: 30 * 60 * 1000, // 30 minutes cache
  });

  const LoadingSpinner = () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    </div>
  );

  if (loading || roleLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Check if user is admin based on database role
  const isAdmin = userRole && ['admin', 'super_admin', 'accountant', 'consultant'].includes(userRole);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {isAdmin ? <LazyAdminDashboard /> : <LazyClientDashboard />}
    </Suspense>
  );
};

export default Dashboard;
