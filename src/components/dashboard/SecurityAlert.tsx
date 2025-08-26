
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface SecurityAlertProps {
  isAdmin: boolean;
}

export const SecurityAlert = ({ isAdmin }: SecurityAlertProps) => {
  // Mock security status - in a real app, this would come from your backend
  const securityStatus = {
    rls: true,
    ssl: true,
    backups: true,
    monitoring: true
  };

  const alerts = [
    {
      type: 'success' as const,
      title: 'Row Level Security Active',
      description: 'User data isolation is properly enforced',
      icon: CheckCircle
    },
    {
      type: 'info' as const,
      title: 'SSL Certificate Valid',
      description: 'All connections are encrypted',
      icon: Shield
    },
    {
      type: 'warning' as const,
      title: 'Backup Schedule',
      description: 'Next backup in 2 hours',
      icon: Clock
    }
  ];

  if (!isAdmin) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              Your data is secure and private
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>Security Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <alert.icon className={`h-4 w-4 ${
                  alert.type === 'success' ? 'text-green-600' :
                  alert.type === 'warning' ? 'text-amber-600' :
                  'text-blue-600'
                }`} />
                <div>
                  <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                  <p className="text-xs text-gray-600">{alert.description}</p>
                </div>
              </div>
              <Badge className={
                alert.type === 'success' ? 'bg-green-100 text-green-800' :
                alert.type === 'warning' ? 'bg-amber-100 text-amber-800' :
                'bg-blue-100 text-blue-800'
              }>
                {alert.type === 'success' ? 'Active' :
                 alert.type === 'warning' ? 'Scheduled' : 'OK'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
