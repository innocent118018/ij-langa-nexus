import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user' | 'any';
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredRole = 'any',
  redirectTo = '/auth'
}: ProtectedRouteProps) {
  const { user, loading: authLoading } = useAuth();
  const { role, isAdmin, isLoading: roleLoading } = useUserRole();

  const isLoading = authLoading || roleLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
