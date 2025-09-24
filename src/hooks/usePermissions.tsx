import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  action: string;
}

interface PermissionsContextType {
  permissions: Permission[];
  hasPermission: (permission: string) => boolean;
  isLoading: boolean;
  userRole: string | null;
}

const PermissionsContext = createContext<PermissionsContextType | null>(null);

export const usePermissions = () => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};

interface PermissionsProviderProps {
  children: ReactNode;
}

export const PermissionsProvider: React.FC<PermissionsProviderProps> = ({ children }) => {
  const { user } = useAuth();

  // Fetch user role and permissions - using existing database structure
  const { data: userPermissions, isLoading } = useQuery({
    queryKey: ['user-permissions', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      // Get user role from profiles table
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (userError) throw userError;

      // For now, define permissions based on role until we have the full permissions system
      const rolePermissions: Record<string, string[]> = {
        'super_admin': ['*'], // All permissions
        'admin': [
          'business:read', 'business:export', 'customers:create', 'customers:read', 'customers:update', 'customers:delete',
          'invoices:create', 'invoices:read', 'invoices:update', 'invoices:approve',
          'bank_accounts:create', 'bank_accounts:read', 'bank_accounts:update', 'bank_accounts:delete',
          'receipts:create', 'receipts:read', 'receipts:update', 'receipts:delete',
          'payments:create', 'payments:read', 'payments:update', 'payments:delete',
          'employees:create', 'employees:read', 'employees:update', 'employees:delete',
          'reports:read', 'reports:export', 'users:read', 'users:create', 'users:update',
          'settings:read', 'audit:read', 'inventory:read', 'inventory:create', 'inventory:update',
          'projects:read', 'projects:create', 'projects:update', 'time_entries:read', 'time_entries:approve'
        ],
        'accountant': [
          'business:read', 'customers:read', 'invoices:create', 'invoices:read', 'invoices:update', 'invoices:approve',
          'bank_accounts:read', 'receipts:create', 'receipts:read', 'receipts:update',
          'payments:create', 'payments:read', 'payments:update', 'reports:read', 'reports:export', 'audit:read'
        ],
        'manager': [
          'business:read', 'customers:create', 'customers:read', 'customers:update',
          'invoices:read', 'employees:read', 'employees:create', 'employees:update',
          'reports:read', 'projects:read', 'projects:create', 'projects:update',
          'time_entries:read', 'time_entries:approve'
        ],
        'employee': ['business:read', 'time_entries:create', 'payslips:read_own'],
        'viewer': ['business:read', 'customers:read', 'invoices:read', 'reports:read'],
        'client': ['invoices:read_own', 'customers:read_own']
      };

      const userPermissionNames = rolePermissions[userData.role] || ['business:read'];
      
      // Convert to Permission objects
      const permissions = userPermissionNames.map((name) => ({
        id: `${name}-${userData.role}`,
        name,
        description: `Permission: ${name}`,
        module: name.split(':')[0],
        action: name.split(':')[1] || 'read'
      }));

      return {
        role: userData.role,
        permissions
      };
    },
    enabled: !!user?.id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const hasPermission = (permission: string): boolean => {
    if (!userPermissions?.permissions) return false;
    
    // Super admin has all permissions
    if (userPermissions.role === 'super_admin') return true;
    
    // Check if user has specific permission
    return userPermissions.permissions.some(p => p.name === permission);
  };

  const value = {
    permissions: userPermissions?.permissions || [],
    hasPermission,
    isLoading,
    userRole: userPermissions?.role || null,
  };

  return (
    <PermissionsContext.Provider value={value}>
      {children}
    </PermissionsContext.Provider>
  );
};