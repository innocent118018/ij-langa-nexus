import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CancelOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  orderNumber?: string;
  onOrderCancelled: () => void;
}

export const CancelOrderModal = ({ 
  isOpen, 
  onClose, 
  orderId, 
  orderNumber,
  onOrderCancelled 
}: CancelOrderModalProps) => {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleCancel = async () => {
    if (!reason.trim()) {
      toast({
        title: "Cancellation Reason Required",
        description: "Please provide a reason for cancelling this order.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Update order status to cancelled
      const { error } = await supabase
        .from('orders')
        .update({
          status: 'cancelled',
          admin_notes: `Cancelled by customer: ${reason}`
        })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Order Cancelled",
        description: "Your order has been successfully cancelled.",
      });

      onOrderCancelled();
      onClose();
      setReason('');
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast({
        title: "Cancellation Failed",
        description: "Unable to cancel order. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setReason('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Cancel Order
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">
              Are you sure you want to cancel order {orderNumber || orderId}? 
              This action cannot be undone.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for cancellation *
            </label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please explain why you're cancelling this order..."
              className="min-h-[80px]"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Keep Order
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={isSubmitting || !reason.trim()}
              className="flex-1"
            >
              {isSubmitting ? 'Cancelling...' : 'Cancel Order'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};