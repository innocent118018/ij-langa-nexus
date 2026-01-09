import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Award,
  UserPlus,
  FileText,
  BarChart3,
  Wallet
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ResellerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch reseller data
  const { data: resellerData, isLoading } = useQuery({
    queryKey: ['reseller-dashboard', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      // Get reseller info
      const { data: reseller } = await supabase
        .from('resellers')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!reseller) return null;

      // Get clients count
      const { count: clientsCount } = await supabase
        .from('reseller_clients')
        .select('*', { count: 'exact', head: true })
        .eq('reseller_id', reseller.id);

      // Get pending commissions
      const { data: pendingCommissions } = await supabase
        .from('reseller_commissions')
        .select('commission_amount')
        .eq('reseller_id', reseller.id)
        .eq('status', 'pending');

      const totalPending = pendingCommissions?.reduce((sum, c) => sum + (c.commission_amount || 0), 0) || 0;

      // Get paid commissions
      const { data: paidCommissions } = await supabase
        .from('reseller_commissions')
        .select('commission_amount')
        .eq('reseller_id', reseller.id)
        .eq('status', 'paid');

      const totalPaid = paidCommissions?.reduce((sum, c) => sum + (c.commission_amount || 0), 0) || 0;

      return {
        reseller,
        clientsCount: clientsCount || 0,
        pendingCommissions: totalPending,
        paidCommissions: totalPaid,
      };
    },
    enabled: !!user?.id,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'bg-gradient-to-r from-slate-400 to-slate-600';
      case 'Gold': return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      default: return 'bg-gradient-to-r from-gray-300 to-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!resellerData?.reseller) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Not a Reseller Yet</h2>
            <p className="text-muted-foreground mb-4">
              Apply to become a reseller and start earning commissions.
            </p>
            <Button onClick={() => navigate('/contact')}>Apply Now</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { reseller, clientsCount, pendingCommissions, paidCommissions } = resellerData;

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reseller Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {reseller.company_name}
          </p>
        </div>
        <Badge className={`${getTierColor(reseller.tier)} text-white px-4 py-2 text-lg`}>
          <Award className="h-5 w-5 mr-2" />
          {reseller.tier} Partner
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientsCount}</div>
            <p className="text-xs text-muted-foreground">Businesses onboarded</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Volume</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(reseller.monthly_volume || 0)}</div>
            <p className="text-xs text-muted-foreground">This month's sales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Commissions</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{formatCurrency(pendingCommissions)}</div>
            <p className="text-xs text-muted-foreground">Awaiting payout</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(paidCommissions)}</div>
            <p className="text-xs text-muted-foreground">Lifetime earnings</p>
          </CardContent>
        </Card>
      </div>

      {/* Commission Rate Info */}
      <Card>
        <CardHeader>
          <CardTitle>Your Commission Rate</CardTitle>
          <CardDescription>Based on your {reseller.tier} tier status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-primary">{reseller.commission_rate}%</div>
            <div className="text-muted-foreground">
              <p>Earn {reseller.commission_rate}% on every sale from your referred clients.</p>
              <p className="text-sm mt-1">
                Next tier: {reseller.tier === 'Silver' ? 'Gold (R50,000/month)' : 
                           reseller.tier === 'Gold' ? 'Platinum (R200,000/month)' : 
                           'You\'re at the top!'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          className="h-24 flex flex-col items-center justify-center gap-2"
          onClick={() => navigate('/reseller/clients')}
        >
          <UserPlus className="h-6 w-6" />
          <span>Add New Client</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-24 flex flex-col items-center justify-center gap-2"
          onClick={() => navigate('/reseller/commissions')}
        >
          <FileText className="h-6 w-6" />
          <span>View Commissions</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-24 flex flex-col items-center justify-center gap-2"
          onClick={() => navigate('/reseller/reports')}
        >
          <BarChart3 className="h-6 w-6" />
          <span>Sales Reports</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-24 flex flex-col items-center justify-center gap-2"
          onClick={() => navigate('/reseller/marketing')}
        >
          <TrendingUp className="h-6 w-6" />
          <span>Marketing Tools</span>
        </Button>
      </div>
    </div>
  );
}
