
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AdminDashboard } from '@/pages/dashboard/AdminDashboard';
import { ClientDashboard } from '@/pages/dashboard/ClientDashboard';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const { user, loading } = useAuth();

  // Fetch user role from database
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
  });

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto"></div>
          <p className="text-white mt-4">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Check if user is admin based on database role
  const isAdmin = userRole && ['admin', 'super_admin', 'accountant', 'consultant'].includes(userRole);

  return isAdmin ? <AdminDashboard /> : <ClientDashboard />;
};

export default Dashboard;
