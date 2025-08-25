
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users,
  Download,
  Calendar,
  Filter
} from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';

const Reports = () => {
  const { invoices, customers, metrics } = useDashboardData();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Calculate monthly revenue data
  const monthlyRevenue = React.useMemo(() => {
    const months = {};
    invoices.forEach(invoice => {
      const date = new Date(invoice.issue_date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!months[monthKey]) {
        months[monthKey] = { month: monthKey, revenue: 0, invoiceCount: 0 };
      }
      months[monthKey].revenue += Number(invoice.invoice_amount || 0);
      months[monthKey].invoiceCount += 1;
    });
    return Object.values(months).sort((a, b) => a.month.localeCompare(b.month));
  }, [invoices]);

  // Calculate service popularity
  const serviceStats = React.useMemo(() => {
    const stats = {};
    invoices.forEach(invoice => {
      // This would need to be enhanced with actual service data from orders
      const service = 'General Consulting'; // Placeholder
      if (!stats[service]) {
        stats[service] = { name: service, count: 0, revenue: 0 };
      }
      stats[service].count += 1;
      stats[service].revenue += Number(invoice.invoice_amount || 0);
    });
    return Object.values(stats);
  }, [invoices]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Revenue Analytics & Reports</h1>
          <p className="text-slate-600">Comprehensive financial and business intelligence</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter Period
          </Button>
          <Button className="bg-slate-900 hover:bg-slate-800">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-900">
                  {formatCurrency(metrics.totalRevenue)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outstanding</p>
                <p className="text-2xl font-bold text-red-900">
                  {formatCurrency(metrics.unpaidAmount)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                <p className="text-2xl font-bold text-blue-900">{invoices.length}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold text-purple-900">{customers.length}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Monthly Revenue Trend</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyRevenue.map((month) => (
              <div key={month.month} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{month.month}</p>
                  <p className="text-sm text-gray-600">{month.invoiceCount} invoices</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{formatCurrency(month.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Service Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceStats.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-gray-600">{service.count} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatCurrency(service.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.slice(0, 5).map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 border-l-4 border-l-blue-500 bg-blue-50 rounded">
                  <div>
                    <p className="font-medium text-sm">Invoice #{invoice.reference}</p>
                    <p className="text-xs text-gray-600">{invoice.customers?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{formatCurrency(Number(invoice.invoice_amount))}</p>
                    <p className="text-xs text-gray-500">{new Date(invoice.issue_date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
