
import React, { useState } from 'react';
import { MetricsCard } from './MetricsCard';
import { QuickActions } from './QuickActions';
import { RecentActivity } from './RecentActivity';
import { SecurityAlert } from './SecurityAlert';
import { CreateInvoiceModal } from './CreateInvoiceModal';
import { 
  Users, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Building,
  Scale,
  Gavel
} from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const { invoices, customers, services, notifications, metrics } = useDashboardData();
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Convert notifications to activity format for admin view
  const recentActivity = [
    ...notifications.slice(0, 3).map(notification => ({
      id: notification.id,
      type: 'document' as const,
      title: notification.title,
      description: notification.message,
      timestamp: notification.created_at,
      status: 'info' as const
    })),
    // Add some system activities for admin
    ...invoices.slice(0, 2).map(invoice => ({
      id: invoice.id,
      type: 'invoice' as const,
      title: `Invoice ${invoice.reference}`,
      description: `${invoice.customers?.name} - ${formatCurrency(Number(invoice.balance_due))}`,
      timestamp: invoice.issue_date,
      status: invoice.status === 'Paid in full' ? 'success' as const : 'pending' as const
    }))
  ];

  const overdueInvoices = invoices.filter(inv => inv.status === 'Overdue' || (inv.balance_due && Number(inv.balance_due) > 0));
  const legalEscalationCandidates = overdueInvoices.filter(inv => inv.days_overdue && inv.days_overdue > 90);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Administrative Control Center</h1>
            <p className="text-slate-300">Comprehensive legal consulting management dashboard</p>
          </div>
          <div className="flex items-center space-x-2">
            <Scale className="h-12 w-12 text-amber-400" />
            <Building className="h-12 w-12 text-amber-400" />
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Revenue"
          value={formatCurrency(metrics.totalRevenue)}
          subtitle="Click to view revenue reports"
          icon={DollarSign}
          onClick={() => navigate('/dashboard/reports')}
          trend={{ value: 12.5, isPositive: true }}
        />

        <MetricsCard
          title="Registered Clients"
          value={metrics.activeClients}
          subtitle="Click to manage clients"
          icon={Users}
          onClick={() => navigate('/dashboard/clients')}
          trend={{ value: 8.3, isPositive: true }}
        />

        <MetricsCard
          title="Pending Orders"
          value={metrics.pendingOrders}
          subtitle="Click to view orders"
          icon={FileText}
          onClick={() => navigate('/dashboard/orders')}
        />

        <MetricsCard
          title="Unpaid Invoices"
          value={formatCurrency(metrics.unpaidAmount)}
          subtitle="Click to manage invoices"
          icon={AlertTriangle}
          onClick={() => navigate('/dashboard/invoices')}
        />
      </div>

      {/* Legal Escalation Alert */}
      {legalEscalationCandidates.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Gavel className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="text-lg font-semibold text-red-800">Legal Escalation Required</h3>
                <p className="text-red-700">
                  {legalEscalationCandidates.length} invoice(s) overdue by 90+ days require escalation to Daniel Attorneys.
                </p>
              </div>
            </div>
            <button 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              onClick={() => navigate('/dashboard/legal')}
            >
              <Scale className="h-4 w-4" />
              <span>Escalate to Legal</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions isAdmin={true} />
        <RecentActivity activities={recentActivity} isAdmin={true} />
        <SecurityAlert isAdmin={true} />
        
        {/* Business Intelligence Quick Access */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Business Intelligence</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
              onClick={() => navigate('/dashboard/reports')}
            >
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <span className="text-sm font-medium">Revenue Analytics</span>
            </button>
            <button 
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center"
              onClick={() => navigate('/dashboard/clients')}
            >
              <Users className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <span className="text-sm font-medium">Client Reports</span>
            </button>
            <button 
              className="p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors text-center"
              onClick={() => navigate('/dashboard/invoices')}
            >
              <DollarSign className="h-6 w-6 mx-auto mb-2 text-amber-600" />
              <span className="text-sm font-medium">Collections Report</span>
            </button>
            <button 
              className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-center"
              onClick={() => navigate('/dashboard/legal')}
            >
              <Scale className="h-6 w-6 mx-auto mb-2 text-red-600" />
              <span className="text-sm font-medium">Legal Escalations</span>
            </button>
          </div>
        </div>
      </div>

      <CreateInvoiceModal
        isOpen={isCreateInvoiceOpen}
        onClose={() => setIsCreateInvoiceOpen(false)}
        customers={customers}
        services={services}
      />
    </div>
  );
};
