import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  Search, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Filter,
  Download
} from 'lucide-react';

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const invoicesData = [
    { issueDate: '8/1/2025', reference: '20202604', customer: 'Sembo Collective', amount: 678.50, balanceDue: 0.00, status: 'Paid in full', daysOverdue: 0 },
    { issueDate: '7/31/2025', reference: '20202603', customer: 'Chulumanco Lilitha', amount: 207.00, balanceDue: 0.00, status: 'Paid in full', daysOverdue: 0 },
    { issueDate: '6/20/2025', reference: '20202595', customer: 'TECHLOGIX', amount: 2978.50, balanceDue: 2978.50, status: 'Overdue', daysOverdue: 35 },
    { issueDate: '6/3/2025', reference: '20202594', customer: 'JAMA KAMNISI TRADING AND PROJECTS', amount: 345.00, balanceDue: 345.00, status: 'Overdue', daysOverdue: 76 },
    { issueDate: '5/29/2025', reference: '20202592', customer: 'Global Business Solutions', amount: 8162.70, balanceDue: 162.70, status: 'Overdue', daysOverdue: 81 },
    { issueDate: '5/20/2025', reference: '20202589', customer: 'Global Business Solutions', amount: 5750.00, balanceDue: 5750.00, status: 'Overdue', daysOverdue: 90 },
    { issueDate: '5/12/2025', reference: '20202590', customer: 'Global Business Solutions', amount: 24584.70, balanceDue: 12299.35, status: 'Overdue', daysOverdue: 98 },
    { issueDate: '4/3/2025', reference: '20202593', customer: 'Sembo Collective', amount: 1138.50, balanceDue: 0.00, status: 'Paid in full', daysOverdue: 0 },
    { issueDate: '3/25/2025', reference: '20202588', customer: 'Suzan Ramapulane', amount: 9093.05, balanceDue: 1621.86, status: 'Overdue', daysOverdue: 146 },
    { issueDate: '3/13/2025', reference: '20202605', customer: 'JAMA KAMNISI TRADING AND PROJECTS', amount: 1437.50, balanceDue: 3325.91, status: 'Overdue', daysOverdue: 158 },
    { issueDate: '3/11/2025', reference: '20202587', customer: 'THE NEW ST SAMPSON APOSTOLIC CHURCH', amount: 661.25, balanceDue: 661.25, status: 'Overdue', daysOverdue: 160 },
    { issueDate: '3/3/2025', reference: '20202586', customer: 'THOKOZA NHLANHLA INVESTMENTS', amount: 2921.00, balanceDue: 2921.00, status: 'Overdue', daysOverdue: 168 },
    { issueDate: '3/3/2025', reference: '20202585', customer: 'PRETTY HOPE SMITH', amount: 115.00, balanceDue: 0.00, status: 'Paid in full', daysOverdue: 0 },
    { issueDate: '3/2/2025', reference: '20202584', customer: 'JAMA KAMNISI TRADING AND PROJECTS', amount: 115.00, balanceDue: 15.00, status: 'Overdue', daysOverdue: 169 },
    { issueDate: '2/28/2025', reference: '20202583', customer: 'NTANDOSE TRADING AND PROJECTS', amount: 999.99, balanceDue: 0.00, status: 'Paid in full', daysOverdue: 0 },
    { issueDate: '2/28/2025', reference: '20202582', customer: 'THOKOZA NHLANHLA INVESTMENTS', amount: 1426.00, balanceDue: 0.00, status: 'Paid in full', daysOverdue: 0 },
    { issueDate: '2/24/2025', reference: '20202581', customer: 'JAMA KAMNISI TRADING AND PROJECTS', amount: 669.50, balanceDue: -2100.43, status: 'Overpaid', daysOverdue: 0 },
    { issueDate: '2/20/2025', reference: '20202580', customer: 'Chulumanco Lilitha', amount: 1000.00, balanceDue: 0.00, status: 'Paid in full', daysOverdue: 0 },
    { issueDate: '2/17/2025', reference: '20202579', customer: 'YOWGATY', amount: 490.00, balanceDue: 940.80, status: 'Overdue', daysOverdue: 182 },
    { issueDate: '2/10/2025', reference: '20202578', customer: 'Chulumanco Lilitha', amount: 1000.00, balanceDue: -150.00, status: 'Overpaid', daysOverdue: 0 },
    { issueDate: '1/30/2025', reference: '20202577', customer: 'SIPHALI', amount: 2078.00, balanceDue: -311.70, status: 'Overpaid', daysOverdue: 0 },
    { issueDate: '1/28/2025', reference: '20202576', customer: 'Chulumanco Lilitha', amount: 1387.98, balanceDue: 737.98, status: 'Overdue', daysOverdue: 202 },
    { issueDate: '1/17/2025', reference: '20202575', customer: 'ORIS POULTRY AND GENERAL TRADING', amount: 1369.00, balanceDue: 0.00, status: 'Paid in full', daysOverdue: 0 },
    { issueDate: '1/8/2025', reference: '20202574', customer: 'MDALUKWANE PROJECTS ENTERPRISE', amount: 490.00, balanceDue: -73.50, status: 'Overpaid', daysOverdue: 0 },
    { issueDate: '1/7/2025', reference: '20202573', customer: 'NSIBANDE MHURI TRADING AND PROJEC', amount: 350.00, balanceDue: -52.50, status: 'Overpaid', daysOverdue: 0 },
    { issueDate: '1/5/2025', reference: '20202572', customer: 'Chulumanco Lilitha', amount: 579.00, balanceDue: -86.85, status: 'Overpaid', daysOverdue: 0 },
    { issueDate: '12/24/2024', reference: '20202571', customer: 'Chulumanco Lilitha', amount: 1000.00, balanceDue: -150.00, status: 'Overpaid', daysOverdue: 0 },
    { issueDate: '11/27/2024', reference: '20202570', customer: 'Surprise Tuckshop & General', amount: 474.00, balanceDue: 128.14, status: 'Overdue', daysOverdue: 264 },
    { issueDate: '11/22/2024', reference: '20202569', customer: 'AZALE COMMUNICATIONS (PTY) LTD', amount: 3250.00, balanceDue: 0.00, status: 'Paid in full', daysOverdue: 0 },
    { issueDate: '11/18/2024', reference: '20202568', customer: 'Refithile Agency', amount: 840.00, balanceDue: 0.00, status: 'Paid in full', daysOverdue: 0 },
    { issueDate: '11/18/2024', reference: '20202567', customer: 'Refithile Agency', amount: 660.00, balanceDue: 0.00, status: 'Paid in full', daysOverdue: 0 },
    { issueDate: '11/8/2024', reference: '20202566', customer: 'MDALUKWANE PROJECTS ENTERPRISE', amount: 740.00, balanceDue: -111.00, status: 'Overpaid', daysOverdue: 0 },
    { issueDate: '11/7/2024', reference: '20202565', customer: 'JO CHILOANE', amount: 48179.19, balanceDue: 23179.19, status: 'Overdue', daysOverdue: 284 },
    { issueDate: '10/29/2024', reference: '20202564', customer: 'Chulumanco Lilitha', amount: 180.00, balanceDue: -27.00, status: 'Overpaid', daysOverdue: 0 },
    { issueDate: '10/24/2024', reference: '20202563', customer: 'Chulumanco Lilitha', amount: 600.00, balanceDue: 36.50, status: 'Overdue', daysOverdue: 298 },
    { issueDate: '10/8/2024', reference: '20202562', customer: 'FEZEKA CIVIL ENGINEERING AND CONSTRUCTION', amount: 684.83, balanceDue: 0.00, status: 'Paid in full', daysOverdue: 0 },
    { issueDate: '10/4/2024', reference: '20202561', customer: 'JAMA KAMNISI TRADING AND PROJECTS', amount: 563.50, balanceDue: 13.50, status: 'Overdue', daysOverdue: 318 },
    { issueDate: '10/1/2024', reference: '20202559', customer: 'FREESTYLE KITCHEN AND CATERING', amount: 690.00, balanceDue: 0.00, status: 'Paid in full', daysOverdue: 0 },
    { issueDate: '9/30/2024', reference: '20202558', customer: 'Chulumanco Lilitha', amount: 517.50, balanceDue: 0.00, status: 'Paid in full', daysOverdue: 0 },
    { issueDate: '9/30/2024', reference: '20202557', customer: 'Chulumanco Lilitha', amount: 897.00, balanceDue: -17.50, status: 'Overpaid', daysOverdue: 0 },
    { issueDate: '9/25/2024', reference: '20202560', customer: 'Chulumanco Lilitha', amount: 1707.75, balanceDue: 0.00, status: 'Paid in full', daysOverdue: 0 },
    { issueDate: '9/20/2024', reference: 'INV-20202553', customer: 'THOKOZA SIYAVUMA CONSTRUCTION AND PROJECTS', amount: 1320.00, balanceDue: 10.00, status: 'Overdue', daysOverdue: 333 },
    { issueDate: '9/20/2024', reference: '20202556', customer: 'MANYUNYU LOGISTICS', amount: 633.00, balanceDue: 0.00, status: 'Paid in full', daysOverdue: 0 },
    { issueDate: '9/20/2024', reference: '20202554', customer: 'Refithile Agency', amount: 609.50, balanceDue: 0.00, status: 'Paid in full', daysOverdue: 0 },
    { issueDate: '8/24/2024', reference: 'INV-20202549', customer: 'Chulumanco Lilitha', amount: 563.50, balanceDue: -563.50, status: 'Overpaid', daysOverdue: 0 },
    { issueDate: '8/20/2024', reference: 'INV-20202548', customer: 'Chulumanco Lilitha', amount: 1470.00, balanceDue: -500.00, status: 'Overpaid', daysOverdue: 0 },
    { issueDate: '7/25/2024', reference: '20202555', customer: 'MABS MEDIA AGENCY', amount: 1884.00, balanceDue: 5875.20, status: 'Overdue', daysOverdue: 389 },
    { issueDate: '5/28/2025', reference: '20202591', customer: 'SSL PROJECTS AND SUPPLY', amount: 678.50, balanceDue: 814.20, status: 'Overdue', daysOverdue: 82 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusBadge = (status: string, balanceDue: number, daysOverdue: number) => {
    if (status === 'Paid in full') {
      return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Paid</Badge>;
    } else if (status === 'Overdue' || daysOverdue > 0) {
      return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="h-3 w-3 mr-1" />Overdue</Badge>;
    } else if (balanceDue < 0) {
      return <Badge className="bg-blue-100 text-blue-800"><TrendingUp className="h-3 w-3 mr-1" />Overpaid</Badge>;
    }
    return <Badge className="bg-amber-100 text-amber-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Invoices & Payments</h1>
          <p className="text-slate-600">Manage invoices and track payment status</p>
        </div>
        <Button className="bg-slate-900 hover:bg-slate-800">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search invoices by reference or customer..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Invoiced</p>
                <p className="text-2xl font-bold text-slate-900">
                  {formatCurrency(invoicesData.reduce((sum, inv) => sum + inv.amount, 0))}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outstanding</p>
                <p className="text-2xl font-bold text-red-900">
                  {formatCurrency(invoicesData.reduce((sum, inv) => sum + Math.max(0, inv.balanceDue), 0))}
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
                <p className="text-sm font-medium text-gray-600">Overdue Invoices</p>
                <p className="text-2xl font-bold text-orange-900">
                  {invoicesData.filter(inv => inv.daysOverdue > 0).length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid Invoices</p>
                <p className="text-2xl font-bold text-green-900">
                  {invoicesData.filter(inv => inv.status === 'Paid in full').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>All Invoices</span>
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
                  <th className="text-left p-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left p-4 font-medium text-gray-900">Balance Due</th>
                  <th className="text-left p-4 font-medium text-gray-900">Days Overdue</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoicesData.map((invoice, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-sm">{invoice.issueDate}</td>
                    <td className="p-4">
                      <span className="font-medium text-blue-600">#{invoice.reference}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-slate-900">{invoice.customer}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium">{formatCurrency(invoice.amount)}</span>
                    </td>
                    <td className="p-4">
                      <span className={`font-medium ${
                        invoice.balanceDue < 0 ? 'text-blue-600' : 
                        invoice.balanceDue > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {formatCurrency(invoice.balanceDue)}
                      </span>
                    </td>
                    <td className="p-4">
                      {invoice.daysOverdue > 0 && (
                        <span className="text-red-600 font-medium">{invoice.daysOverdue} days</span>
                      )}
                    </td>
                    <td className="p-4">
                      {getStatusBadge(invoice.status, invoice.balanceDue, invoice.daysOverdue)}
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

export default Invoices;
