import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Send, Plus, Reply, User, Clock, CheckCircle2 } from 'lucide-react';
import { DashboardWrapper } from '@/components/dashboard/DashboardWrapper';

interface Message {
  id: string;
  subject: string;
  content: string;
  is_read: boolean;
  created_at: string;
  sender_id: string;
  recipient_id: string;
  thread_id?: string;
  users_sender?: {
    full_name: string;
    email: string;
    role: string;
  };
  users_recipient?: {
    full_name: string;
    email: string;
    role: string;
  };
}

const Messages = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [newMessage, setNewMessage] = useState({
    subject: '',
    content: '',
    recipient_id: ''
  });

  // Fetch user's messages
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['user-messages', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          users_sender:users!messages_sender_id_fkey(full_name, email, role),
          users_recipient:users!messages_recipient_id_fkey(full_name, email, role)
        `)
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as any[];
    },
    enabled: !!user?.id,
  });

  // Fetch admin users for messaging
  const { data: adminUsers = [] } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, full_name, email, role')
        .in('role', ['admin', 'super_admin', 'accountant', 'consultant'])
        .order('full_name');
      
      if (error) throw error;
      return data;
    }
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: typeof newMessage) => {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: user!.id,
          recipient_id: messageData.recipient_id,
          subject: messageData.subject,
          content: messageData.content,
        })
        .select()
        .single();
      
      if (error) throw error;

      // Send email notification
      await supabase.functions.invoke('send-message-email', {
        body: {
          type: 'new_message',
          data: {
            senderName: user!.user_metadata?.full_name || user!.email,
            senderEmail: user!.email,
            recipientName: adminUsers.find(u => u.id === messageData.recipient_id)?.full_name || 'Admin',
            recipientEmail: adminUsers.find(u => u.id === messageData.recipient_id)?.email || 'info@ijlanga.co.za',
            subject: messageData.subject,
            content: messageData.content,
            messageId: data.id
          }
        }
      });

      return data;
    },
    onSuccess: () => {
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['user-messages'] });
      setIsComposeOpen(false);
      setNewMessage({ subject: '', content: '', recipient_id: '' });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
    },
  });

  // Mark message as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (messageId: string) => {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', messageId)
        .eq('recipient_id', user!.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-messages'] });
    },
  });

  const handleSendMessage = () => {
    if (!newMessage.subject.trim() || !newMessage.content.trim() || !newMessage.recipient_id) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    sendMessageMutation.mutate(newMessage);
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.is_read && message.recipient_id === user?.id) {
      markAsReadMutation.mutate(message.id);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Loading messages...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const unreadCount = messages.filter(m => !m.is_read && m.recipient_id === user.id).length;

  return (
    <DashboardWrapper>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages & Support</h1>
          <p className="text-muted-foreground">
            Communicate with our support team and manage your messages
          </p>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="mt-2">
              {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>
        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Compose Message
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Compose New Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">To</label>
                <select
                  value={newMessage.recipient_id}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, recipient_id: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select recipient...</option>
                  {adminUsers.map((admin) => (
                    <option key={admin.id} value={admin.id}>
                      {admin.full_name} ({admin.role})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Enter message subject..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  value={newMessage.content}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Type your message..."
                  rows={4}
                />
              </div>
              <Button 
                onClick={handleSendMessage}
                disabled={sendMessageMutation.isPending}
                className="w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                {sendMessageMutation.isPending ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Messages List */}
      <div className="grid gap-4">
        {messages.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Messages</h3>
              <p className="text-muted-foreground mb-4">
                You don't have any messages yet. Start a conversation with our support team.
              </p>
              <Button onClick={() => setIsComposeOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Send First Message
              </Button>
            </CardContent>
          </Card>
        ) : (
          messages.map((message) => (
            <Card 
              key={message.id}
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                !message.is_read && message.recipient_id === user.id ? 'border-l-4 border-l-primary' : ''
              }`}
              onClick={() => handleViewMessage(message)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {message.sender_id === user.id ? (
                      <Reply className="h-4 w-4 text-blue-500" />
                    ) : (
                      <User className="h-4 w-4 text-green-500" />
                    )}
                    {message.subject}
                    {!message.is_read && message.recipient_id === user.id && (
                      <Badge variant="destructive" className="ml-2">New</Badge>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {new Date(message.created_at).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {message.sender_id === user.id ? 'To' : 'From'}: {
                        message.sender_id === user.id 
                          ? message.users_recipient?.full_name || 'Unknown'
                          : message.users_sender?.full_name || 'Unknown'
                      }
                    </span>
                    {message.is_read && message.sender_id === user.id && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle2 className="h-3 w-3" />
                        <span className="text-xs">Read</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {message.content}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Message Detail Dialog */}
      {selectedMessage && (
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedMessage.subject}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  From: {
                    selectedMessage.sender_id === user.id 
                      ? 'You'
                      : selectedMessage.users_sender?.full_name || 'Unknown'
                  }
                </span>
                <span>{new Date(selectedMessage.created_at).toLocaleString()}</span>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg">
                <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
              </div>
              {selectedMessage.sender_id !== user.id && (
                <Button 
                  onClick={() => {
                    setNewMessage({
                      subject: `Re: ${selectedMessage.subject}`,
                      content: '',
                      recipient_id: selectedMessage.sender_id
                    });
                    setSelectedMessage(null);
                    setIsComposeOpen(true);
                  }}
                  className="w-full"
                >
                  <Reply className="h-4 w-4 mr-2" />
                  Reply
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
      </div>
    </DashboardWrapper>
  );
};

export default Messages;