import React from 'react';
import { useUserRole, UserRole } from '@/hooks/useUserRole';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, Loader2 } from 'lucide-react';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
  showAccessDenied?: boolean;
}

/**
 * RoleGate component - Gates content based on user role
 * Uses server-side role from user_roles table (secure)
 */
export function RoleGate({ 
  children, 
  allowedRoles, 
  fallback,
  showAccessDenied = true 
}: RoleGateProps) {
  const { role, isLoading } = useUserRole();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!role || !allowedRoles.includes(role)) {
    if (fallback) {
      return <>{fallback}</>;
    }

    if (showAccessDenied) {
      return (
        <Alert variant="destructive" className="max-w-lg mx-auto mt-8">
          <Shield className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You don't have permission to access this content. 
            Required role: {allowedRoles.join(' or ')}.
          </AlertDescription>
        </Alert>
      );
    }

    return null;
  }

  return <>{children}</>;
}

/**
 * AdminGate - Shorthand for admin-only content
 */
export function AdminGate({ 
  children, 
  fallback,
  showAccessDenied = true 
}: Omit<RoleGateProps, 'allowedRoles'>) {
  return (
    <RoleGate 
      allowedRoles={['super_admin', 'admin', 'accountant', 'consultant']} 
      fallback={fallback}
      showAccessDenied={showAccessDenied}
    >
      {children}
    </RoleGate>
  );
}

/**
 * SuperAdminGate - Shorthand for super admin only content
 */
export function SuperAdminGate({ 
  children, 
  fallback,
  showAccessDenied = true 
}: Omit<RoleGateProps, 'allowedRoles'>) {
  return (
    <RoleGate 
      allowedRoles={['super_admin']} 
      fallback={fallback}
      showAccessDenied={showAccessDenied}
    >
      {children}
    </RoleGate>
  );
}