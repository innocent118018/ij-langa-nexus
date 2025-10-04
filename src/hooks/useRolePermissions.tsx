import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuthWithProfiles';
import { useToast } from '@/hooks/use-toast';

export interface RolePermission {
  id: string;
  role_name: string;
  resource: string;
  can_view: boolean;
  can_create: boolean;
  can_update: boolean;
  can_delete: boolean;
  created_at: string;
  updated_at: string;
}

export interface RolePermissionAudit {
  id: string;
  action_type: string;
  role_permission_id?: string;
  role_name?: string;
  resource?: string;
  can_view?: boolean;
  can_create?: boolean;
  can_update?: boolean;
  can_delete?: boolean;
  changed_by?: string;
  changed_at: string;
}

export const useRolePermissions = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [permissions, setPermissions] = useState<RolePermission[]>([]);
  const [auditLogs, setAuditLogs] = useState<RolePermissionAudit[]>([]);
  const [loading, setLoading] = useState(true);

  const isSuperAdmin = profile?.role === 'super_admin';

  useEffect(() => {
    if (!isSuperAdmin) {
      setPermissions([]);
      setAuditLogs([]);
      setLoading(false);
      return;
    }

    fetchPermissions();
    fetchAuditLogs();
  }, [isSuperAdmin]);

  const fetchPermissions = async () => {
    try {
      const { data, error } = await supabase
        .from('role_permissions')
        .select('*')
        .order('role_name', { ascending: true })
        .order('resource', { ascending: true });

      if (error) throw error;
      setPermissions(data || []);
    } catch (error) {
      console.error('Error fetching role permissions:', error);
      toast({
        title: "Error",
        description: "Failed to load role permissions",
        variant: "destructive",
      });
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('role_permissions_audit')
        .select('*')
        .order('changed_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setAuditLogs(data || []);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePermission = async (
    id: string, 
    updates: Partial<Pick<RolePermission, 'can_view' | 'can_create' | 'can_update' | 'can_delete'>>
  ) => {
    if (!isSuperAdmin) {
      toast({
        title: "Access Denied",
        description: "Only super administrators can modify permissions",
        variant: "destructive",
      });
      return { success: false };
    }

    try {
      const { error } = await supabase
        .from('role_permissions')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      // Refresh permissions
      await fetchPermissions();
      await fetchAuditLogs();

      toast({
        title: "Permission Updated",
        description: "Role permission has been updated successfully",
      });

      return { success: true };
    } catch (error) {
      console.error('Error updating permission:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update role permission",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const createPermission = async (
    permission: Pick<RolePermission, 'role_name' | 'resource' | 'can_view' | 'can_create' | 'can_update' | 'can_delete'>
  ) => {
    if (!isSuperAdmin) {
      toast({
        title: "Access Denied",
        description: "Only super administrators can create permissions",
        variant: "destructive",
      });
      return { success: false };
    }

    try {
      const { error } = await supabase
        .from('role_permissions')
        .insert(permission);

      if (error) throw error;

      // Refresh permissions
      await fetchPermissions();
      await fetchAuditLogs();

      toast({
        title: "Permission Created",
        description: "New role permission has been created successfully",
      });

      return { success: true };
    } catch (error) {
      console.error('Error creating permission:', error);
      toast({
        title: "Creation Failed",
        description: "Failed to create role permission",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const deletePermission = async (id: string) => {
    if (!isSuperAdmin) {
      toast({
        title: "Access Denied",
        description: "Only super administrators can delete permissions",
        variant: "destructive",
      });
      return { success: false };
    }

    try {
      const { error } = await supabase
        .from('role_permissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Refresh permissions
      await fetchPermissions();
      await fetchAuditLogs();

      toast({
        title: "Permission Deleted",
        description: "Role permission has been deleted successfully",
      });

      return { success: true };
    } catch (error) {
      console.error('Error deleting permission:', error);
      toast({
        title: "Deletion Failed",
        description: "Failed to delete role permission",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const checkPermission = (role: string, resource: string, action: 'view' | 'create' | 'update' | 'delete'): boolean => {
    // Super admin has all permissions
    if (role === 'super_admin') return true;

    const permission = permissions.find(p => p.role_name === role && p.resource === resource);
    if (!permission) return false;

    switch (action) {
      case 'view': return permission.can_view;
      case 'create': return permission.can_create;
      case 'update': return permission.can_update;
      case 'delete': return permission.can_delete;
      default: return false;
    }
  };

  return {
    permissions,
    auditLogs,
    loading,
    isSuperAdmin,
    updatePermission,
    createPermission,
    deletePermission,
    checkPermission,
    refreshData: () => {
      fetchPermissions();
      fetchAuditLogs();
    }
  };
};