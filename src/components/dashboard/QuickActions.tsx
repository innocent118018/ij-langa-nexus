
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users, FileText, DollarSign, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickActionsProps {
  isAdmin: boolean;
}

export const QuickActions = ({ isAdmin }: QuickActionsProps) => {
  const navigate = useNavigate();

  const adminActions = [
    { label: 'Add New Client', icon: Users, onClick: () => navigate('/dashboard/clients') },
    { label: 'Create Invoice', icon: FileText, onClick: () => navigate('/dashboard/invoices') },
    { label: 'Manage Services', icon: Settings, onClick: () => navigate('/dashboard/services') },
    { label: 'View Reports', icon: DollarSign, onClick: () => navigate('/dashboard/reports') },
  ];

  const userActions = [
    { label: 'Update Profile', icon: Users, onClick: () => navigate('/dashboard/profile') },
    { label: 'View Documents', icon: FileText, onClick: () => navigate('/dashboard/documents') },
    { label: 'Pay Invoices', icon: DollarSign, onClick: () => navigate('/dashboard/invoices') },
    { label: 'Contact Support', icon: Settings, onClick: () => navigate('/dashboard/support') },
  ];

  const actions = isAdmin ? adminActions : userActions;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-16 flex flex-col items-center justify-center space-y-2"
              onClick={action.onClick}
            >
              <action.icon className="h-5 w-5" />
              <span className="text-xs text-center">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
