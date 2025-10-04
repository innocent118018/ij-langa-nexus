import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useOrderActions = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const cancelOrder = async (orderId: string, reason: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          status: 'cancelled',
          admin_notes: `Cancelled by customer: ${reason}`,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Order Cancelled",
        description: "Your order has been successfully cancelled.",
      });

      return { success: true };
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast({
        title: "Cancellation Failed",
        description: "Unable to cancel order. Please contact support.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Function to auto-cancel orders after 7 days
  const autosCancelExpiredOrders = async () => {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { error } = await supabase
        .from('orders')
        .update({
          status: 'cancelled',
          admin_notes: 'Auto-cancelled: Payment not received within 7 days'
        })
        .eq('status', 'pending')
        .lt('created_at', sevenDaysAgo.toISOString());

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('Error auto-cancelling expired orders:', error);
      return { success: false, error };
    }
  };

  return {
    cancelOrder,
    autosCancelExpiredOrders,
    loading
  };
};