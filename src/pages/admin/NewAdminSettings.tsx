import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import {
  Building2,
  Mail,
  Landmark,
  Globe,
  Shield,
  Users,
  Bell,
  Database,
  Save,
  Loader2,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

// Company Settings Form
function CompanySettingsForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['company-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('company_settings')
        .select('*')
        .limit(1)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });

  const [form, setForm] = useState({
    name: '',
    registration_number: '',
    tax_number: '',
    csd_number: '',
    address: '',
  });

  React.useEffect(() => {
    if (data) {
      setForm({
        name: data.name || '',
        registration_number: data.registration_number || '',
        tax_number: data.tax_number || '',
        csd_number: data.csd_number || '',
        address: data.address || '',
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (values: typeof form) => {
      const { error } = await supabase
        .from('company_settings')
        .upsert({ 
          ...values, 
          id: data?.id,
          updated_by: user?.id,
          updated_at: new Date().toISOString()
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company-settings'] });
      toast({ title: 'Success', description: 'Company settings saved' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i}>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(form); }} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Company Name</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="registration_number">Registration Number</Label>
          <Input
            id="registration_number"
            value={form.registration_number}
            onChange={(e) => setForm({ ...form, registration_number: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="tax_number">Tax Number</Label>
          <Input
            id="tax_number"
            value={form.tax_number}
            onChange={(e) => setForm({ ...form, tax_number: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="csd_number">CSD Number</Label>
          <Input
            id="csd_number"
            value={form.csd_number}
            onChange={(e) => setForm({ ...form, csd_number: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          rows={3}
        />
      </div>
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
        Save Changes
      </Button>
    </form>
  );
}

// Contact Settings Form
function ContactSettingsForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['contact-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_settings')
        .select('*')
        .limit(1)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });

  const [form, setForm] = useState({
    primary_email: '',
    billing_email: '',
    orders_email: '',
    support_email: '',
    phone: '',
    whatsapp: '',
  });

  React.useEffect(() => {
    if (data) {
      setForm({
        primary_email: data.primary_email || '',
        billing_email: data.billing_email || '',
        orders_email: data.orders_email || '',
        support_email: data.support_email || '',
        phone: data.phone || '',
        whatsapp: data.whatsapp || '',
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (values: typeof form) => {
      const { error } = await supabase
        .from('contact_settings')
        .upsert({ 
          ...values, 
          id: data?.id,
          updated_by: user?.id,
          updated_at: new Date().toISOString()
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-settings'] });
      toast({ title: 'Success', description: 'Contact settings saved' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(form); }} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="primary_email">Primary Email</Label>
          <Input
            id="primary_email"
            type="email"
            value={form.primary_email}
            onChange={(e) => setForm({ ...form, primary_email: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="billing_email">Billing Email</Label>
          <Input
            id="billing_email"
            type="email"
            value={form.billing_email}
            onChange={(e) => setForm({ ...form, billing_email: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="orders_email">Orders Email</Label>
          <Input
            id="orders_email"
            type="email"
            value={form.orders_email}
            onChange={(e) => setForm({ ...form, orders_email: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="support_email">Support Email</Label>
          <Input
            id="support_email"
            type="email"
            value={form.support_email}
            onChange={(e) => setForm({ ...form, support_email: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input
            id="whatsapp"
            value={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
          />
        </div>
      </div>
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
        Update Contact Info
      </Button>
    </form>
  );
}

// Banking Details Form
function BankingDetailsForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['banking-details'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('banking_details')
        .select('*')
        .limit(1)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });

  const [form, setForm] = useState({
    bank_name: '',
    branch_name: '',
    branch_code: '',
    account_number: '',
    account_type: 'Current Account',
  });

  React.useEffect(() => {
    if (data) {
      setForm({
        bank_name: data.bank_name || '',
        branch_name: data.branch_name || '',
        branch_code: data.branch_code || '',
        account_number: data.account_number || '',
        account_type: data.account_type || 'Current Account',
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (values: typeof form) => {
      const { error } = await supabase
        .from('banking_details')
        .upsert({ 
          ...values, 
          id: data?.id,
          updated_by: user?.id,
          updated_at: new Date().toISOString(),
          verified: false // Reset verification on update
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banking-details'] });
      toast({ title: 'Success', description: 'Banking details saved' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(form); }} className="space-y-4">
      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
        <p className="text-sm text-amber-700 dark:text-amber-300">
          ⚠️ Banking details are sensitive. Only super admins can modify this information.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="bank_name">Bank Name</Label>
          <Input
            id="bank_name"
            value={form.bank_name}
            onChange={(e) => setForm({ ...form, bank_name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="branch_name">Branch Name</Label>
          <Input
            id="branch_name"
            value={form.branch_name}
            onChange={(e) => setForm({ ...form, branch_name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="branch_code">Branch Code</Label>
          <Input
            id="branch_code"
            value={form.branch_code}
            onChange={(e) => setForm({ ...form, branch_code: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="account_number">Account Number</Label>
          <Input
            id="account_number"
            value={form.account_number}
            onChange={(e) => setForm({ ...form, account_number: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="account_type">Account Type</Label>
          <Select 
            value={form.account_type} 
            onValueChange={(v) => setForm({ ...form, account_type: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Current Account">Current Account</SelectItem>
              <SelectItem value="Savings Account">Savings Account</SelectItem>
              <SelectItem value="Cheque Account">Cheque Account</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <div className="text-sm text-muted-foreground">
            Verified: <span className={data?.verified ? 'text-emerald-500' : 'text-amber-500'}>
              {data?.verified ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
        Update Banking Details
      </Button>
    </form>
  );
}

// Main Settings Page
export default function NewAdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage system settings and configurations</p>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden md:inline">Company</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="hidden md:inline">Contact</span>
          </TabsTrigger>
          <TabsTrigger value="banking" className="flex items-center gap-2">
            <Landmark className="h-4 w-4" />
            <span className="hidden md:inline">Banking</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="website" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden md:inline">Website</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details and registration information</CardDescription>
            </CardHeader>
            <CardContent>
              <CompanySettingsForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Settings</CardTitle>
              <CardDescription>Manage email addresses and phone numbers</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactSettingsForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banking">
          <Card>
            <CardHeader>
              <CardTitle>Banking Details</CardTitle>
              <CardDescription>Manage your banking information (Super Admin only)</CardDescription>
            </CardHeader>
            <CardContent>
              <BankingDetailsForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security policies and access controls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline">Manage 2FA Settings</Button>
                <Separator />
                <Button variant="outline">View Audit Logs</Button>
                <Separator />
                <Button variant="outline">Session Management</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>Manage Users</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="website">
          <Card>
            <CardHeader>
              <CardTitle>Website Settings</CardTitle>
              <CardDescription>Configure website URLs and social links</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Website settings coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
