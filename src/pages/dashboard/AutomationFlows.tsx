import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, Mail, Calendar, ShoppingCart, Users, Activity, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface AutomationFlow {
  id: string;
  name: string;
  description: string;
  flow_type: string;
  trigger_conditions: any;
  actions: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface FlowExecution {
  id: string;
  flow_id: string;
  executed_at: string;
  execution_data: any;
  status: string;
  customer_contacts: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

interface CustomerContact {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  birthday: string | null;
  tags: string[];
  is_subscribed: boolean;
  created_at: string;
}

const AutomationFlows = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [flows, setFlows] = useState<AutomationFlow[]>([]);
  const [executions, setExecutions] = useState<FlowExecution[]>([]);
  const [contacts, setContacts] = useState<CustomerContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('flows');

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
      fetchData();
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

  const fetchData = async () => {
    try {
      // Fetch automation flows
      const { data: flowsData, error: flowsError } = await supabase
        .from('automation_flows')
        .select('*')
        .order('created_at', { ascending: false });

      if (flowsError) throw flowsError;

      // Fetch recent executions
      const { data: executionsData, error: executionsError } = await supabase
        .from('flow_executions')
        .select(`
          *,
          customer_contacts (
            first_name,
            last_name,
            email
          )
        `)
        .order('executed_at', { ascending: false })
        .limit(10);

      if (executionsError) throw executionsError;

      // Fetch contacts
      const { data: contactsData, error: contactsError } = await supabase
        .from('customer_contacts')
        .select('*')
        .eq('is_subscribed', true)
        .order('created_at', { ascending: false })
        .limit(100);

      if (contactsError) throw contactsError;

      setFlows((flowsData || []) as AutomationFlow[]);
      setExecutions((executionsData || []) as FlowExecution[]);
      setContacts((contactsData || []) as CustomerContact[]);
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

  const toggleFlowStatus = async (flowId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('automation_flows')
        .update({ is_active: isActive })
        .eq('id', flowId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Flow ${isActive ? 'activated' : 'deactivated'}`,
      });

      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getFlowIcon = (flowType: string) => {
    switch (flowType) {
      case 'birthday':
        return <Calendar className="h-5 w-5 text-pink-500" />;
      case 'welcome':
        return <Mail className="h-5 w-5 text-blue-500" />;
      case 'abandoned_cart':
        return <ShoppingCart className="h-5 w-5 text-orange-500" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  const getFlowTypeColor = (flowType: string) => {
    switch (flowType) {
      case 'birthday':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'welcome':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'abandoned_cart':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Automation Flows</h1>
          <p className="text-muted-foreground">
            Manage email automation campaigns and customer engagement flows
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b">
          <button
            onClick={() => setActiveTab('flows')}
            className={`px-4 py-2 border-b-2 font-medium text-sm ${
              activeTab === 'flows'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Activity className="h-4 w-4 inline mr-2" />
            Flows
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 border-b-2 font-medium text-sm ${
              activeTab === 'contacts'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Contacts
          </button>
          <button
            onClick={() => setActiveTab('executions')}
            className={`px-4 py-2 border-b-2 font-medium text-sm ${
              activeTab === 'executions'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Mail className="h-4 w-4 inline mr-2" />
            Recent Executions
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            {/* Flows Tab */}
            {activeTab === 'flows' && (
              <div className="grid gap-4">
                {flows.map((flow) => (
                  <Card key={flow.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          {getFlowIcon(flow.flow_type)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{flow.name}</h3>
                              <Badge className={getFlowTypeColor(flow.flow_type)}>
                                {flow.flow_type.replace('_', ' ')}
                              </Badge>
                              {flow.is_active && (
                                <Badge variant="outline" className="text-green-600 border-green-200">
                                  Active
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-2">
                              {flow.description}
                            </p>
                            
                            <div className="text-xs text-muted-foreground">
                              Created {formatDistanceToNow(new Date(flow.created_at))} ago
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center space-x-2">
                            <label htmlFor={`flow-${flow.id}`} className="text-sm font-medium">
                              {flow.is_active ? 'Active' : 'Inactive'}
                            </label>
                            <Switch
                              id={`flow-${flow.id}`}
                              checked={flow.is_active}
                              onCheckedChange={(checked) => toggleFlowStatus(flow.id, checked)}
                            />
                          </div>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Settings className="h-4 w-4 mr-2" />
                                Configure
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Flow Configuration</DialogTitle>
                                <DialogDescription>
                                  {flow.name} - {flow.flow_type.replace('_', ' ')}
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Trigger Conditions</h4>
                                  <pre className="bg-muted p-3 rounded text-xs overflow-auto">
                                    {JSON.stringify(flow.trigger_conditions, null, 2)}
                                  </pre>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2">Actions</h4>
                                  <pre className="bg-muted p-3 rounded text-xs overflow-auto">
                                    {JSON.stringify(flow.actions, null, 2)}
                                  </pre>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Customer Contacts</h2>
                  <Badge variant="outline">
                    {contacts.length} subscribed contacts
                  </Badge>
                </div>
                
                <div className="grid gap-4">
                  {contacts.map((contact) => (
                    <Card key={contact.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">
                              {contact.first_name} {contact.last_name}
                            </h3>
                            <p className="text-sm text-muted-foreground">{contact.email}</p>
                            {contact.birthday && (
                              <p className="text-xs text-muted-foreground">
                                Birthday: {new Date(contact.birthday).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {contact.tags.length > 0 && (
                              <div className="flex gap-1">
                                {contact.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              Subscribed
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Executions Tab */}
            {activeTab === 'executions' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Recent Email Executions</h2>
                
                <div className="grid gap-4">
                  {executions.map((execution) => (
                    <Card key={execution.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Mail className="h-4 w-4" />
                              <h3 className="font-medium">
                                Email sent to {execution.customer_contacts?.first_name} {execution.customer_contacts?.last_name}
                              </h3>
                              <Badge 
                                variant={execution.status === 'completed' ? 'default' : 'destructive'}
                                className="text-xs"
                              >
                                {execution.status}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                              {execution.customer_contacts?.email}
                            </p>
                            
                            <div className="text-xs text-muted-foreground mt-1">
                              {formatDistanceToNow(new Date(execution.executed_at))} ago
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {executions.length === 0 && (
                    <Card>
                      <CardContent className="text-center py-8">
                        <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No email executions yet</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AutomationFlows;