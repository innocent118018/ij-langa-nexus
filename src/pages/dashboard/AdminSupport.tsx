import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, MessageCircle, Clock, CheckCircle, AlertTriangle, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
  users?: {
    full_name: string;
    email: string;
  } | null;
}

const AdminSupport = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [response, setResponse] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  // Check if user is admin
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkUserRole = async () => {
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();
        
        setUserRole(userData?.role || 'client');
      }
    };

    checkUserRole();
  }, [user]);

  useEffect(() => {
    if (userRole && ['admin', 'super_admin', 'accountant', 'consultant'].includes(userRole)) {
      fetchTickets();
    }
  }, [userRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!userRole || !['admin', 'super_admin', 'accountant', 'consultant'].includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  const fetchTickets = async () => {
    try {
      let query = supabase
        .from('support_tickets')
        .select(`
          *,
          users:user_id (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus);
      }

      const { data, error } = await query;

      if (error) throw error;
      setTickets((data || []) as any);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateTicketStatus = async (ticketId: string, newStatus: string) => {
    try {
      const updateData: any = { status: newStatus };
      if (newStatus === 'resolved') {
        updateData.resolved_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('support_tickets')
        .update(updateData)
        .eq('id', ticketId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Ticket status updated",
      });

      fetchTickets();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const assignTicket = async (ticketId: string, assignedTo: string) => {
    try {
      const { error } = await supabase
        .from('support_tickets')
        .update({ assigned_to: assignedTo })
        .eq('id', ticketId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Ticket assigned successfully",
      });

      fetchTickets();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'destructive';
      case 'high':
        return 'secondary';
      case 'medium':
        return 'outline';
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Support Management</h1>
            <p className="text-muted-foreground">
              Manage customer support tickets and requests
            </p>
          </div>
          
          <Select value={filterStatus} onValueChange={(value) => {
            setFilterStatus(value);
            setIsLoading(true);
          }}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tickets</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid gap-4">
            {tickets.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No support tickets found</p>
                </CardContent>
              </Card>
            ) : (
              tickets.map((ticket) => (
                <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusIcon(ticket.status)}
                          <h3 className="font-semibold">{ticket.subject}</h3>
                          <Badge variant={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                          <Badge variant="outline">
                            {ticket.category}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <User className="h-4 w-4" />
                          <span>{ticket.users?.full_name} ({ticket.users?.email})</span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {ticket.description}
                        </p>
                        
                        <div className="text-xs text-muted-foreground">
                          Created {formatDistanceToNow(new Date(ticket.created_at))} ago
                          {ticket.resolved_at && (
                            <span className="ml-2">
                              • Resolved {formatDistanceToNow(new Date(ticket.resolved_at))} ago
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Select
                          value={ticket.status}
                          onValueChange={(value) => updateTicketStatus(ticket.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedTicket(ticket)}
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Support Ticket Details</DialogTitle>
                              <DialogDescription>
                                Ticket ID: {ticket.id}
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedTicket && (
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-1">Customer</h4>
                                  <p>{ticket.users?.full_name} ({ticket.users?.email})</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-1">Subject</h4>
                                  <p>{ticket.subject}</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-1">Description</h4>
                                  <p className="whitespace-pre-wrap">{ticket.description}</p>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <h4 className="font-semibold mb-1">Status</h4>
                                    <Badge variant="outline">{ticket.status}</Badge>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-1">Priority</h4>
                                    <Badge variant={getPriorityColor(ticket.priority)}>
                                      {ticket.priority}
                                    </Badge>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-1">Category</h4>
                                    <Badge variant="outline">{ticket.category}</Badge>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminSupport;