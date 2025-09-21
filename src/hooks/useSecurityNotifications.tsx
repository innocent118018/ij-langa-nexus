import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuthWithProfiles';

export interface SecurityNotification {
  id: string;
  channel: string;
  recipient: string;
  message: string;
  status: 'pending' | 'sent' | 'failed';
  created_at: string;
  sent_at?: string;
  error_message?: string;
}

export const useSecurityNotifications = () => {
  const { profile } = useAuth();
  const [notifications, setNotifications] = useState<SecurityNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only super_admin can view security notifications
    if (!profile || profile.role !== 'super_admin') {
      setNotifications([]);
      setLoading(false);
      return;
    }

    // Fetch existing security notifications
    const fetchNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);

        if (error) throw error;
        setNotifications(data || []);
      } catch (error) {
        console.error('Error fetching security notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    // Subscribe to real-time security notifications
    const channel = supabase
      .channel('security-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          const newNotification = payload.new as SecurityNotification;
          setNotifications(prev => [newNotification, ...prev]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          const updatedNotification = payload.new as SecurityNotification;
          setNotifications(prev => 
            prev.map(n => n.id === updatedNotification.id ? updatedNotification : n)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile]);

  const processNotifications = async () => {
    try {
      const { error } = await supabase.functions.invoke('process-notifications');
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error processing notifications:', error);
      return { success: false, error };
    }
  };

  const pendingCount = notifications.filter(n => n.status === 'pending').length;
  const failedCount = notifications.filter(n => n.status === 'failed').length;

  return {
    notifications,
    loading,
    pendingCount,
    failedCount,
    processNotifications
  };
};