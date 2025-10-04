import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Send, FileText } from 'lucide-react';

interface Order {
  id: string;
  status: string;
  created_at: string;
  total_amount: number;
  services?: {
    name: string;
    description: string;
  };
}

interface ContactSupportModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactSupportModal = ({ order, isOpen, onClose }: ContactSupportModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [message, setMessage] = useState('');

  const sendSupportMessageMutation = useMutation({
    mutationFn: async (messageText: string) => {
      if (!user || !order) throw new Error('Missing user or order data');

      // Get admin users to send message to
      const { data: adminUsers } = await supabase
        .from('users')
        .select('id')
        .in('role', ['admin', 'super_admin'])
        .limit(1);

      if (!adminUsers || adminUsers.length === 0) {
        throw new Error('No admin users found');
      }

      // Create support message
      const supportMessage = `SUPPORT REQUEST FOR ORDER #${order.id.slice(-8).toUpperCase()}

Order Details:
- Order ID: ${order.id}
- Service: ${order.services?.name || 'Unknown Service'}
- Order Date: ${new Date(order.created_at).toLocaleDateString()}
- Amount: R${order.total_amount?.toFixed(2)}
- Status: ${order.status}

Customer Details:
- Name: ${user.user_metadata?.full_name || user.email}
- Email: ${user.email}

Issue Description:
${messageText}

Please assist with this matter as soon as possible.`;

      // Send message to admin
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          recipient_id: adminUsers[0].id,
          subject: `Support Request - Order #${order.id.slice(-8).toUpperCase()}`,
          content: supportMessage
        })
        .select()
        .single();

      if (error) throw error;

      // Send email notification
      await supabase.functions.invoke('send-notification-email', {
        body: {
          type: 'contact',
          data: {
            customerName: user.user_metadata?.full_name || user.email,
            customerEmail: user.email,
            subject: `Support Request - Order #${order.id.slice(-8).toUpperCase()}`,
            message: supportMessage,
            orderId: order.id
          },
          customerEmail: user.email
        }
      });

      return data;
    },
    onSuccess: () => {
      toast({
        title: "Support request sent",
        description: "Your support request has been sent successfully. We'll get back to you soon.",
      });
      setMessage('');
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send support request",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter your message",
        variant: "destructive",
      });
      return;
    }
    sendSupportMessageMutation.mutate(message);
  };

  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Contact Support
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Order Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Order #{order.id.slice(-8).toUpperCase()}</span>
                  <Badge variant="outline">{order.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {order.services?.name || 'Service Order'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Placed: {new Date(order.created_at).toLocaleDateString()}
                </p>
                <p className="font-medium">R{order.total_amount?.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Customer Details */}
          {user && (
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Your Details</h4>
                  <p className="text-sm">Name: {user.user_metadata?.full_name || 'Not provided'}</p>
                  <p className="text-sm">Email: {user.email}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Message Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Describe your issue:</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please describe the issue you're experiencing with this order..."
              rows={4}
            />
          </div>

          <Button 
            onClick={handleSendMessage}
            disabled={!message.trim() || sendSupportMessageMutation.isPending}
            className="w-full"
          >
            {sendSupportMessageMutation.isPending ? (
              <>Sending...</>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Support Request
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};