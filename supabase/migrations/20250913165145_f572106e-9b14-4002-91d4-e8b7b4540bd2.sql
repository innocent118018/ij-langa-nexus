-- Create function to auto-cancel expired orders (without cron)
CREATE OR REPLACE FUNCTION auto_cancel_expired_orders()
RETURNS integer AS $$
DECLARE
  cancelled_count integer;
BEGIN
  -- Cancel orders that are pending for more than 7 days
  UPDATE orders 
  SET status = 'cancelled',
      admin_notes = 'Auto-cancelled: Payment not received within 7 days',
      updated_at = now()
  WHERE status = 'pending' 
    AND created_at < (now() - INTERVAL '7 days');
    
  GET DIAGNOSTICS cancelled_count = ROW_COUNT;
  
  RETURN cancelled_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;