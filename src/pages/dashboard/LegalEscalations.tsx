import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Gavel, 
  AlertTriangle,
  Scale,
  Calendar,
  DollarSign,
  User
} from 'lucide-react';

const LegalEscalations = () => {
  // Filter invoices that are 21+ days overdue
  const escalationCandidates = [
    { issueDate: '6/20/2025', reference: '20202595', customer: 'TECHLOGIX', amount: 2978.50, balanceDue: 2978.50, daysOverdue: 35 },
    { issueDate: '6/3/2025', reference: '20202594', customer: 'JAMA KAMNISI TRADING AND PROJECTS', amount: 345.00, balanceDue: 345.00, daysOverdue: 76 },
    { issueDate: '5/29/2025', reference: '20202592', customer: 'Global Business Solutions', amount: 8162.70, balanceDue: 162.70, daysOverdue: 81 },
    { issueDate: '5/20/2025', reference: '20202589', customer: 'Global Business Solutions', amount: 5750.00, balanceDue: 5750.00, daysOverdue: 90 },
    { issueDate: '5/12/2025', reference: '20202590', customer: 'Global Business Solutions', amount: 24584.70, balanceDue: 12299.35, daysOverdue: 98 },
    { issueDate: '3/25/2025', reference: '20202588', customer: 'Suzan Ramapulane', amount: 9093.05, balanceDue: 1621.86, daysOverdue: 146 },
    { issueDate: '3/13/2025', reference: '20202605', customer: 'JAMA KAMNISI TRADING AND PROJECTS', amount: 1437.50, balanceDue: 3325.91, daysOverdue: 158 },
    { issueDate: '3/11/2025', reference: '20202587', customer: 'THE NEW ST SAMPSON APOSTOLIC CHURCH', amount: 661.25, balanceDue: 661.25, daysOverdue: 160 },
    { issueDate: '3/3/2025', reference: '20202586', customer: 'THOKOZA NHLANHLA INVESTMENTS', amount: 2921.00, balanceDue: 2921.00, daysOverdue: 168 },
    { issueDate: '3/2/2025', reference: '20202584', customer: 'JAMA KAMNISI TRADING AND PROJECTS', amount: 115.00, balanceDue: 15.00, daysOverdue: 169 },
    { issueDate: '2/17/2025', reference: '20202579', customer: 'YOWGATY', amount: 490.00, balanceDue: 940.80, daysOverdue: 182 },
    { issueDate: '1/28/2025', reference: '20202576', customer: 'Chulumanco Lilitha', amount: 1387.98, balanceDue: 737.98, daysOverdue: 202 },
    { issueDate: '11/27/2024', reference: '20202570', customer: 'Surprise Tuckshop & General', amount: 474.00, balanceDue: 128.14, daysOverdue: 264 },
    { issueDate: '11/7/2024', reference: '20202565', customer: 'JO CHILOANE', amount: 48179.19, balanceDue: 23179.19, daysOverdue: 284 },
    { issueDate: '10/24/2024', reference: '20202563', customer: 'Chulumanco Lilitha', amount: 600.00, balanceDue: 36.50, daysOverdue: 298 },
    { issueDate: '10/4/2024', reference: '20202561', customer: 'JAMA KAMNISI TRADING AND PROJECTS', amount: 563.50, balanceDue: 13.50, daysOverdue: 318 },
    { issueDate: '9/20/2024', reference: 'INV-20202553', customer: 'THOKOZA SIYAVUMA CONSTRUCTION AND PROJECTS', amount: 1320.00, balanceDue: 10.00, daysOverdue: 333 },
    { issueDate: '7/25/2024', reference: '20202555', customer: 'MABS MEDIA AGENCY', amount: 1884.00, balanceDue: 5875.20, daysOverdue: 389 },
    { issueDate: '5/28/2025', reference: '20202591', customer: 'SSL PROJECTS AND SUPPLY', amount: 678.50, balanceDue: 814.20, daysOverdue: 82 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getEscalationLevel = (daysOverdue: number) => {
    if (daysOverdue >= 90) return { level: 'Critical', color: 'bg-red-100 text-red-800', icon: AlertTriangle };
    if (daysOverdue >= 60) return { level: 'High', color: 'bg-orange-100 text-orange-800', icon: AlertTriangle };
    if (daysOverdue >= 21) return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle };
    return { level: 'Low', color: 'bg-blue-100 text-blue-800', icon: AlertTriangle };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Legal Escalations</h1>
          <p className="text-slate-600">Cases requiring legal action through Daniel Attorneys</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white">
          <Scale className="h-4 w-4 mr-2" />
          Escalate Selected
        </Button>
      </div>

      {/* Alert Card */}
      <Card className="border-l-4 border-l-red-600 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Gavel className="h-8 w-8 text-red-600" />
            <div>
              <h3 className="text-lg font-semibold text-red-800">Legal Action Required</h3>
              <p className="text-red-700">
                {escalationCandidates.filter(inv => inv.daysOverdue >= 90).length} invoices are 90+ days overdue and require immediate escalation to Daniel Attorneys.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cases</p>
                <p className="text-2xl font-bold text-slate-900">{escalationCandidates.length}</p>
              </div>
              <Gavel className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-red-900">
                  {formatCurrency(escalationCandidates.reduce((sum, inv) => sum + inv.balanceDue, 0))}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Cases</p>
                <p className="text-2xl font-bold text-red-900">
                  {escalationCandidates.filter(inv => inv.daysOverdue >= 90).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Days Overdue</p>
                <p className="text-2xl font-bold text-orange-900">
                  {Math.round(escalationCandidates.reduce((sum, inv) => sum + inv.daysOverdue, 0) / escalationCandidates.length)}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Escalation Cases Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Scale className="h-5 w-5" />
            <span>Cases for Legal Action</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Issue Date</th>
                  <th className="text-left p-4 font-medium text-gray-900">Reference</th>
                  <th className="text-left p-4 font-medium text-gray-900">Customer</th>
                  <th className="text-left p-4 font-medium text-gray-900">Amount Due</th>
                  <th className="text-left p-4 font-medium text-gray-900">Days Overdue</th>
                  <th className="text-left p-4 font-medium text-gray-900">Priority</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {escalationCandidates
                  .sort((a, b) => b.daysOverdue - a.daysOverdue)
                  .map((invoice, index) => {
                    const escalation = getEscalationLevel(invoice.daysOverdue);
                    return (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4 text-sm">{invoice.issueDate}</td>
                        <td className="p-4">
                          <span className="font-medium text-blue-600">#{invoice.reference}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-medium text-slate-900">{invoice.customer}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-medium text-red-600">
                            {formatCurrency(invoice.balanceDue)}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-medium text-red-600">{invoice.daysOverdue} days</span>
                        </td>
                        <td className="p-4">
                          <Badge className={escalation.color}>
                            <escalation.icon className="h-3 w-3 mr-1" />
                            {escalation.level}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Button 
                            size="sm" 
                            variant={invoice.daysOverdue >= 90 ? "default" : "outline"}
                            className={invoice.daysOverdue >= 90 ? "bg-red-600 hover:bg-red-700" : ""}
                          >
                            {invoice.daysOverdue >= 90 ? "Escalate Now" : "Monitor"}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalEscalations;
