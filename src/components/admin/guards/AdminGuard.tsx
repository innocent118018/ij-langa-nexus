import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminGuardProps {
  children: React.ReactNode;
  requireDomainLock?: boolean;
}

// Domain lock for admin access - only @ijlanga.co.za emails can access admin
const ADMIN_DOMAIN = '@ijlanga.co.za';

export function AdminGuard({ children, requireDomainLock = true }: AdminGuardProps) {
  const { user, loading: authLoading, logout } = useAuth();
  const { isAdmin, isLoading: roleLoading } = useUserRole();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateAdminAccess = async () => {
      if (authLoading || roleLoading) return;
      
      if (!user) {
        navigate('/auth/login');
        return;
      }

      const email = user.email?.toLowerCase() || '';
      
      // Check domain lock if required
      if (requireDomainLock && !email.endsWith(ADMIN_DOMAIN)) {
        toast({
          title: "Access Denied",
          description: "Admin access is restricted to authorized personnel only.",
          variant: "destructive",
        });
        await logout();
        navigate('/auth/login');
        return;
      }

      // Check admin role
      if (!isAdmin) {
        toast({
          title: "Insufficient Permissions",
          description: "You do not have admin privileges.",
          variant: "destructive",
        });
        navigate('/portal');
        return;
      }

      setIsValidating(false);
    };

    validateAdminAccess();
  }, [user, authLoading, roleLoading, isAdmin, navigate, logout, toast, requireDomainLock]);

  if (authLoading || roleLoading || isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Validating admin access...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}

export default AdminGuard;
