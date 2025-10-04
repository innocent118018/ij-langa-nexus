import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, Plus, Search, Eye, Download } from 'lucide-react';

const BankReconciliations = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const reconciliations = [
    {
      id: 'REC-2025-001',
      account: 'FNB Business Cheque',
      period: 'January 2025',
      status: 'Completed',
      difference: 0.00,
      completedDate: '2025-01-15',
      completedBy: 'Admin User'
    },
    {
      id: 'REC-2025-002',
      account: 'Standard Bank Savings',
      period: 'January 2025',
      status: 'In Progress',
      difference: 1250.50,
      completedDate: null,
      completedBy: null
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Bank Reconciliations</h1>
          <p className="text-slate-600">Reconcile bank accounts with internal records</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Reconciliation
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search reconciliations..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reconciliation Status</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">ID</th>
                  <th className="text-left p-4 font-medium text-gray-900">Account</th>
                  <th className="text-left p-4 font-medium text-gray-900">Period</th>
                  <th className="text-right p-4 font-medium text-gray-900">Difference</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Completed By</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reconciliations.map((rec) => (
                  <tr key={rec.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{rec.id}</td>
                    <td className="p-4">{rec.account}</td>
                    <td className="p-4">{rec.period}</td>
                    <td className="p-4 text-right font-medium">
                      {rec.difference === 0 ? (
                        <span className="text-green-600">Balanced</span>
                      ) : (
                        <span className="text-red-600">{formatCurrency(rec.difference)}</span>
                      )}
                    </td>
                    <td className="p-4">
                      <Badge className={rec.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {rec.status}
                      </Badge>
                    </td>
                    <td className="p-4">{rec.completedBy || 'In Progress'}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BankReconciliations;