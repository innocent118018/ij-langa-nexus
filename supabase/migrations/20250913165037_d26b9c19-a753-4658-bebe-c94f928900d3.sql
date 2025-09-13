-- Create function to auto-cancel expired orders
CREATE OR REPLACE FUNCTION auto_cancel_expired_orders()
RETURNS void AS $$
BEGIN
  -- Cancel orders that are pending for more than 7 days
  UPDATE orders 
  SET status = 'cancelled',
      admin_notes = 'Auto-cancelled: Payment not received within 7 days',
      updated_at = now()
  WHERE status = 'pending' 
    AND created_at < (now() - INTERVAL '7 days');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to run the auto-cancellation function
-- This will be executed periodically by the system
SELECT cron.schedule('auto-cancel-orders', '0 0 * * *', 'SELECT auto_cancel_expired_orders();');