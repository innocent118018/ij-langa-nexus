import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Coupon {
  id: string;
  code: string;
  discount_percentage: number;
  used: boolean;
  expires_at: string;
  created_at: string;
}

export const useCoupons = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [availableCoupon, setAvailableCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    if (user) {
      checkAvailableCoupon();
    }
  }, [user]);

  const checkAvailableCoupon = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_coupons')
        .select('*')
        .eq('user_id', user.id)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data && !error) {
        setAvailableCoupon(data);
      }
    } catch (error) {
      // No available coupon, which is fine
    }
  };

  const createCouponForNextOrder = async () => {
    if (!user) return;

    try {
      const couponCode = `LOYAL5-${Date.now().toString().slice(-6)}`;
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 3); // Expires in 3 months

      const { error } = await supabase
        .from('user_coupons')
        .insert({
          user_id: user.id,
          code: couponCode,
          discount_percentage: 5,
          expires_at: expiresAt.toISOString()
        });

      if (!error) {
        toast({
          title: "🎉 Loyalty Reward!",
          description: `You've earned a 5% discount coupon: ${couponCode}. It will be automatically applied to your next order!`,
          duration: 8000,
        });
        checkAvailableCoupon();
      }
    } catch (error) {
      console.error('Error creating coupon:', error);
    }
  };

  const applyCoupon = async (orderId: string) => {
    if (!availableCoupon) return null;

    try {
      const { error } = await supabase
        .from('user_coupons')
        .update({ 
          used: true, 
          used_at: new Date().toISOString(),
          order_id: orderId 
        })
        .eq('id', availableCoupon.id);

      if (!error) {
        setAvailableCoupon(null);
        return availableCoupon.discount_percentage;
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
    }
    return null;
  };

  return {
    availableCoupon,
    createCouponForNextOrder,
    applyCoupon,
    checkAvailableCoupon
  };
};