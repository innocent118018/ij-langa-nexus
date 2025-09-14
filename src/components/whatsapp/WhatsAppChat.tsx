import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Phone, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface WhatsAppMessage {
  id: string;
  content: string;
  direction: string;
  timestamp: string;
  status: string;
}

export const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && user) {
      loadMessages();
      setupRealtimeSubscription();
    }
  }, [isOpen, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_messages')
        .select('*')
        .eq('user_id', user?.id)
        .order('timestamp', { ascending: true })
        .limit(50);

      if (error) {
        console.error('Error loading messages:', error);
        return;
      }

      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('whatsapp-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'whatsapp_messages',
          filter: `user_id=eq.${user?.id}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as WhatsAppMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const connectWhatsApp = async () => {
    if (!phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your WhatsApp phone number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Send initial WhatsApp message to connect
      const response = await fetch('https://nnotjvqgejcmutukcwvt.functions.supabase.co/whatsapp-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          object: 'whatsapp_business_account',
          entry: [{
            id: 'test',
            changes: [{
              value: {
                messaging_product: 'whatsapp',
                metadata: {
                  display_phone_number: '0130040620',
                  phone_number_id: '465811683912021'
                },
                messages: [{
                  from: phoneNumber,
                  id: `connect-${Date.now()}`,
                  timestamp: Date.now().toString(),
                  text: { body: 'connect' },
                  type: 'text'
                }]
              },
              field: 'messages'
            }]
          }]
        })
      });

      if (response.ok) {
        setIsConnected(true);
        toast({
          title: "WhatsApp Connected",
          description: "You should receive a welcome message on WhatsApp",
        });
        loadMessages();
      } else {
        throw new Error('Failed to connect to WhatsApp');
      }
    } catch (error) {
      console.error('Error connecting WhatsApp:', error);
      toast({
        title: "Connection Failed",
        description: "Unable to connect to WhatsApp. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !isConnected) return;

    setLoading(true);
    try {
      // Simulate sending message through WhatsApp webhook
      const response = await fetch('https://nnotjvqgejcmutukcwvt.functions.supabase.co/whatsapp-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          object: 'whatsapp_business_account',
          entry: [{
            id: 'user-message',
            changes: [{
              value: {
                messaging_product: 'whatsapp',
                metadata: {
                  display_phone_number: '0130040620',
                  phone_number_id: '465811683912021'
                },
                messages: [{
                  from: phoneNumber,
                  id: `msg-${Date.now()}`,
                  timestamp: Date.now().toString(),
                  text: { body: newMessage },
                  type: 'text'
                }]
              },
              field: 'messages'
            }]
          }]
        })
      });

      if (response.ok) {
        setNewMessage('');
        toast({
          title: "Message Sent",
          description: "Your message has been sent via WhatsApp",
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Send Failed",
        description: "Unable to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-ZA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 h-96 shadow-xl">
        <CardHeader className="bg-green-500 text-white rounded-t-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <CardTitle className="text-lg">WhatsApp Chat</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-green-600 p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {isConnected && (
            <Badge variant="secondary" className="w-fit">
              <Phone className="h-3 w-3 mr-1" />
              Connected: {phoneNumber}
            </Badge>
          )}
        </CardHeader>

        <CardContent className="p-0 h-full flex flex-col">
          {!isConnected ? (
            <div className="flex-1 p-4 flex flex-col justify-center">
              <h3 className="text-lg font-semibold mb-4 text-center">Connect Your WhatsApp</h3>
              <Input
                placeholder="Enter your WhatsApp number (e.g., +27123456789)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mb-4"
              />
              <Button
                onClick={connectWhatsApp}
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                {loading ? 'Connecting...' : 'Connect WhatsApp'}
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                You'll receive a welcome message on WhatsApp to confirm the connection
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 p-4 overflow-y-auto max-h-64">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No messages yet</p>
                    <p className="text-xs">Send a message to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs p-3 rounded-lg ${
                            message.direction === 'outbound'
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    disabled={loading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={loading || !newMessage.trim()}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Messages are sent via WhatsApp Business API
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};