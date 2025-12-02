import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, FolderOpen, CreditCard, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    invoices: 0,
    documents: 0,
    pendingPayments: 0
  });

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  async function fetchStats() {
    // Fetch user's invoices count
    const { count: invoiceCount } = await supabase
      .from('sales_invoices')
      .select('id', { count: 'exact', head: true });

    // Fetch user's documents count
    const { count: docCount } = await supabase
      .from('company_documents')
      .select('id', { count: 'exact', head: true })
      .eq('uploaded_by', user?.id);

    setStats({
      invoices: invoiceCount || 0,
      documents: docCount || 0,
      pendingPayments: 0
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground">Here's an overview of your account</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.invoices}</p>
                <p className="text-sm text-muted-foreground">Total Invoices</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <FolderOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.documents}</p>
                <p className="text-sm text-muted-foreground">Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pendingPayments}</p>
                <p className="text-sm text-muted-foreground">Pending Payments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/dashboard/invoices">
              <Button variant="outline" className="w-full justify-between">
                View My Invoices
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard/documents">
              <Button variant="outline" className="w-full justify-between">
                Upload Documents
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard/services">
              <Button variant="outline" className="w-full justify-between">
                Browse Services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard/support">
              <Button variant="outline" className="w-full justify-between">
                Get Support
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No recent activity to display
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
