import React from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

interface PermissionGateProps {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showMessage?: boolean;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({ 
  permission, 
  children, 
  fallback, 
  showMessage = true 
}) => {
  const { hasPermission, isLoading } = usePermissions();

  if (isLoading) {
    return <div className="animate-pulse bg-muted h-8 w-full rounded"></div>;
  }

  if (!hasPermission(permission)) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    if (showMessage) {
      return (
        <Alert className="border-destructive/50 text-destructive">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            You don't have permission to access this feature. Contact your administrator if you need access.
          </AlertDescription>
        </Alert>
      );
    }
    
    return null;
  }

  return <>{children}</>;
};