import React, { Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import EnhancedAdminDashboard from '@/pages/dashboard/EnhancedAdminDashboard';
import { LazyClientDashboard } from '@/components/dashboard/LazyComponents';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { isAdmin, isLoading: roleLoading } = useUserRole();

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-12">
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

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {isAdmin ? <EnhancedAdminDashboard /> : <LazyClientDashboard />}
    </Suspense>
  );
};

export default Dashboard;
