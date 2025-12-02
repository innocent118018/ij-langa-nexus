import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export type UserRole = 'super_admin' | 'admin' | 'accountant' | 'consultant' | 'client' | 'user';

interface UseUserRoleReturn {
  role: UserRole | null;
  isAdmin: boolean;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export function useUserRole(): UseUserRoleReturn {
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRole = async () => {
    if (!user?.id) {
      setRole(null);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .order('assigned_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        // Default to 'user' if no role found
        setRole('user');
      } else {
        setRole(data?.role as UserRole || 'user');
      }
    } catch (err) {
      console.error('Error in useUserRole:', err);
      setRole('user');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRole();
  }, [user?.id]);

  const isAdmin = role === 'super_admin' || role === 'admin' || role === 'accountant' || role === 'consultant';

  return {
    role,
    isAdmin,
    isLoading,
    refetch: fetchRole,
  };
}