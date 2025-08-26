
import React from 'react';
import { MetricsCard } from './MetricsCard';
import { QuickActions } from './QuickActions';
import { RecentActivity } from './RecentActivity';
import { SecurityAlert } from './SecurityAlert';
import { 
  FileText, 
  DollarSign, 
  Clock, 
  CheckCircle,
  Scale,
  Shield
} from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useNavigate } from 'react-router-dom';

export const UserDashboard = () => {
  const { invoices, orders, notifications } = useDashboardData();
  const navigate = useNavigate();

  // Calculate user-specific metrics
  const activeServices = orders.filter(order => order.status === 'processing' || order.status === 'pending').length;
  const pendingInvoices = invoices.filter(inv => inv.status === 'Overdue' || Number(inv.balance_due) > 0);
  const totalPendingAmount = pendingInvoices.reduce((sum, inv) => sum + Number(inv.balance_due || 0), 0);
  const complianceStatus = orders.filter(order => order.status === 'completed').length > 0 ? 'Current' : 'Pending';

  // Convert notifications to activity format
  const recentActivity = notifications.slice(0, 5).map(notification => ({
    id: notification.id,
    type: 'document' as const,
    title: notification.title,
    description: notification.message,
    timestamp: notification.created_at,
    status: 'info' as const
  }));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Client Portal</h1>
            <p className="text-slate-300">Your comprehensive legal services dashboard</p>
          </div>
          <div className="flex items-center space-x-2">
            <Scale className="h-12 w-12 text-amber-400" />
            <Shield className="h-12 w-12 text-amber-400" />
          </div>
        </div>
      </div>

      {/* Service Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricsCard
          title="Active Services"
          value={activeServices}
          subtitle="Services in progress"
          icon={Clock}
          onClick={() => navigate('/dashboard/orders')}
        />
        
        <MetricsCard
          title="Pending Invoices"
          value={formatCurrency(totalPendingAmount)}
          subtitle="Outstanding balance"
          icon={DollarSign}
          onClick={() => navigate('/dashboard/invoices')}
        />
        
        <MetricsCard
          title="Compliance Status"
          value={complianceStatus}
          subtitle="All documents up to date"
          icon={CheckCircle}
          onClick={() => navigate('/dashboard/documents')}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions isAdmin={false} />
        <RecentActivity activities={recentActivity} isAdmin={false} />
      </div>

      {/* Security Notice */}
      <SecurityAlert isAdmin={false} />

      {/* Service Information */}
      <div className="bg-slate-50 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Scale className="h-5 w-5 text-slate-700" />
          <h3 className="text-lg font-semibold text-slate-900">Legal Notice</h3>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          <strong>IJ Langa Consulting</strong> is a registered legal consulting firm 
          specializing in corporate compliance, CIPC registrations, and SARS matters. 
          All services are provided under strict confidentiality and professional standards.
        </p>
      </div>
    </div>
  );
};
