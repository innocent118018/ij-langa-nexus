import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  Search, 
  Calendar,
  DollarSign,
  User,
  FileText,
  Filter
} from 'lucide-react';
import { format } from 'date-fns';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const ordersData = [
    { date: '8/6/2025', reference: '252', customer: 'SP NGOBESE', description: 'Tax Compliance Status Request Sifiso Phinias Ngobese 0805643251', amount: 563.50 },
    { date: '8/1/2025', reference: '251', customer: 'Sembo Collective', description: 'MY COMPLIANCE PROFILE', amount: 678.50 },
    { date: '7/31/2025', reference: '250', customer: 'Chulumanco Lilitha', description: 'B-BBEE CERTIFICATE FOR EXEMPTED MICRO ENTERPRISES Renewal', amount: 207.00 },
    { date: '7/23/2025', reference: '249', customer: 'Chulumanco Lilitha', description: 'CLEGG APPLETON (Pty) Ltd (2021/389526/07) file Beneficial Ownership and Securities Register declarations', amount: 1081.00 },
    { date: '7/23/2025', reference: '248', customer: 'JO CHILOANE', description: 'Income Tax Return for Individuals (Income Tax Act, No. 58 of 1962, as amended) 0080053804', amount: 2680.98 },
    { date: '7/22/2025', reference: '247', customer: 'NATHAN N NYANGUWO MEDICAL ORTHOTIST AND PROSTHETIST', description: 'Vat Registration ( 2018/363588/21 )', amount: 3448.85 },
    { date: '7/16/2025', reference: '246', customer: 'Sthuthamagade Trading and Projects Cc', description: 'CIPC Director Amendments for Enterprise STHUTHAMAGADE TRADING AND PROJECTS CC', amount: 1046.50 },
    { date: '6/30/2025', reference: '245', customer: 'TECHLOGIX', description: 'MORENA KE LETHABO TRAINING CENTRE', amount: 2252.74 },
    { date: '6/27/2025', reference: '244', customer: 'NATHAN N NYANGUWO MEDICAL ORTHOTIST AND PROSTHETIST', description: 'Submitter Instatlation', amount: 4896.15 },
    { date: '6/27/2025', reference: '243', customer: 'JAMA KAMNISI TRADING AND PROJECTS', description: 'MAKULUMANE HGM GENERAL DEALERS', amount: 920.00 },
    { date: '6/27/2025', reference: '242', customer: 'Chulumanco Lilitha', description: 'Tax Compliance Status Request MBALWANE BY V', amount: 695.75 },
    { date: '6/20/2025', reference: '241', customer: 'TECHLOGIX', description: 'MY COMPLIANCE PROFILE YOUTH ACCESS SOUTH AFRICA NPC', amount: 2978.50 },
    { date: '6/3/2025', reference: '240', customer: 'JAMA KAMNISI TRADING AND PROJECTS', description: 'CIPC Director Amendments for Enterprise JAMA KAMNISI TRADING AND PROJECTS (Pty) Ltd', amount: 345.00 },
    { date: '5/29/2025', reference: '239', customer: 'Global Business Solutions', description: 'MAREBEYANE TRADING ENTERPRISE', amount: 4081.35 },
    { date: '5/28/2025', reference: '238', customer: 'SSL PROJECTS AND SUPPLY', description: 'Tax Compliance Status Request', amount: 678.50 },
    { date: '5/20/2025', reference: '236', customer: 'Global Business Solutions', description: 'DV HYDRAULIC TECH ENGINEERING IRP6 Correction of  R  215,160.50', amount: 5750.00 },
    { date: '5/12/2025', reference: '237', customer: 'Global Business Solutions', description: 'DV HYDRAULIC TECH ENGINEERING', amount: 24584.70 },
    { date: '4/3/2025', reference: '239', customer: 'Sembo Collective', description: 'MY COMPLIANCE PROFILE SEMBO COLLECTIVE', amount: 1138.50 },
    { date: '3/25/2025', reference: '235', customer: 'Suzan Ramapulane', description: 'Garage Motor Repais', amount: 9093.05 },
    { date: '3/11/2025', reference: '234', customer: 'THE NEW ST SAMPSON APOSTOLIC CHURCH', description: 'NPC Registration', amount: 661.25 },
    { date: '3/3/2025', reference: '233', customer: 'THOKOZA NHLANHLA INVESTMENTS', description: 'MY COMPLIANCE PROFILE  2022/646469/07', amount: 2921.00 },
    { date: '3/3/2025', reference: '232', customer: 'PRETTY HOPE SMITH', description: 'NOTICE OF REGISTRATION', amount: 115.00 },
    { date: '3/2/2025', reference: '231', customer: 'JAMA KAMNISI TRADING AND PROJECTS', description: 'Address Changes for Companies and Close Corporations', amount: 115.00 },
    { date: '2/28/2025', reference: '230', customer: 'NTANDOSE TRADING AND PROJECTS', description: 'MY COMPLIANCE PROFILE 2012/086601/07', amount: 999.99 },
    { date: '2/28/2025', reference: '229', customer: 'THOKOZA NHLANHLA INVESTMENTS', description: 'OUTSTANDING ANNUAL RETURNS - THOKOZA NHLANHLA INVESTMENTS', amount: 1426.00 },
    { date: '2/24/2025', reference: '228', customer: 'JAMA KAMNISI TRADING AND PROJECTS', description: 'Tax Compliance Status Request', amount: 769.93 },
    { date: '2/20/2025', reference: '227', customer: 'Chulumanco Lilitha', description: 'MY COMPLIANCE PROFILE TSHALA CONCEPTS (PTY) LTD', amount: 1150.00 },
    { date: '2/17/2025', reference: '226', customer: 'YOWGATY', description: 'TCC', amount: 563.50 },
    { date: '2/13/2025', reference: '225', customer: 'THOKOZA SIYAVUMA CONSTRUCTION AND PROJECTS', description: 'Request for Information - Potential Suppliers/Service Providers (Grootvlei)', amount: 1350.10 },
    { date: '2/10/2025', reference: '224', customer: 'Chulumanco Lilitha', description: 'MY COMPLIANCE PROFILE Chulumanco Lilitha (PTY) LTD', amount: 1150.00 },
    { date: '1/30/2025', reference: '223', customer: 'SIPHALI', description: 'MY COMPLIANCE PROFILE', amount: 2389.70 },
    { date: '1/28/2025', reference: '222', customer: 'THOKOZA SIYAVUMA CONSTRUCTION AND PROJECTS', description: 'MY COMPLIANCE PROFILE', amount: 862.50 },
    { date: '1/28/2025', reference: '221', customer: 'Chulumanco Lilitha', description: 're-instatement', amount: 1596.18 },
    { date: '1/17/2025', reference: '220', customer: 'ORIS POULTRY AND GENERAL TRADING', description: 'Renewal SARS,CIPC AND BBBEE', amount: 1574.35 },
    { date: '1/8/2025', reference: '219', customer: 'MDALUKWANE PROJECTS ENTERPRISE', description: 'Tax Compliance System', amount: 563.50 },
    { date: '1/7/2025', reference: '218', customer: 'NSIBANDE MHURI TRADING AND PROJEC', description: 'MY COMPLIANCE PROFILE', amount: 402.50 },
    { date: '1/5/2025', reference: '217', customer: 'Chulumanco Lilitha', description: 'VUYOKAZI MNYANI has been allotted 1000 Ordinary Shares.', amount: 665.85 },
    { date: '12/24/2024', reference: '216', customer: 'Chulumanco Lilitha', description: 'MY COMPLIANCE PROFILE   Registration Number: 2018/472183/07 Tax Reference: 9336586194', amount: 1150.00 },
    { date: '11/27/2024', reference: '215', customer: 'Surprise Tuckshop & General', description: 'Surprise Tuckshop & General Company Registration', amount: 545.10 },
    { date: '11/22/2024', reference: '214', customer: 'AZALE COMMUNICATIONS (PTY) LTD', description: '', amount: 3737.50 },
    { date: '11/18/2024', reference: '213', customer: 'Refithile Agency', description: 'REBONE PROD ZA', amount: 966.00 },
    { date: '11/8/2024', reference: '212', customer: 'MDALUKWANE PROJECTS ENTERPRISE', description: 'Annual Return details for: K2020567210 [ MDALUKWANE PROJECTS ENTERPRISE ]', amount: 851.00 },
    { date: '10/29/2024', reference: '211', customer: 'Chulumanco Lilitha', description: 'B-BBEE Certificates » Enterprises  K2018472183 - CHULUMANCO LILI... applied for a B-BBEE certificate on 2024/10/29 10:55:10. This certificate is valid for a year, you can only apply for a new certificate after the first anniversary (2025/10/29 10:55:10) of this date has lapsed', amount: 207.00 },
    { date: '10/24/2024', reference: '210', customer: 'Chulumanco Lilitha', description: 'RE : LUTHZ CONCEPTS (PTY) LTD Maintan Registered  Details', amount: 690.00 },
    { date: '10/10/2024', reference: '209', customer: 'JO CHILOANE', description: 'Statement of Account: Assessed Tax R 178 144.74', amount: 55406.08 },
    { date: '10/8/2024', reference: '208', customer: 'FEZEKA CIVIL ENGINEERING AND CONSTRUCTION', description: 'MY COMPLIANCE PROFILE', amount: 684.83 },
    { date: '10/4/2024', reference: '207', customer: 'JAMA KAMNISI TRADING AND PROJECTS', description: 'Tax Compliance System', amount: 563.50 },
    { date: '10/1/2024', reference: '206', customer: 'FREESTYLE  KITCHEN AND CATERING', description: 'TAX COMPLIANCE STATUS', amount: 690.00 },
    { date: '9/30/2024', reference: '205', customer: 'Chulumanco Lilitha', description: 'OUTSTANDING ANNUAL RETURNS - OYINTANDA SOLUTIONS', amount: 517.50 },
    { date: '9/30/2024', reference: '204', customer: 'Chulumanco Lilitha', description: 'MODIMETSI EVENTS MANAGEMENT PROPRIETARY LIMITED', amount: 897.00 },
    { date: '9/25/2024', reference: '163', customer: 'DESIREE NOLWAZI LUTHULI', description: 'Luthz Corporation ( New Company Registration 9416781196)', amount: 1707.75 },
    { date: '9/20/2024', reference: 'NSO201', customer: 'THOKOZA SIYAVUMA CONSTRUCTION AND PROJECTS', description: 'Organogram', amount: 1518.00 },
    { date: '9/20/2024', reference: '202', customer: 'MANYUNYU LOGISTICS', description: 'BEE CERTIFICATE', amount: 727.95 },
    { date: '7/25/2024', reference: '203', customer: 'MABS MEDIA AGENCY', description: 'THABANG HENDRICK', amount: 2166.60 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusBadge = (date: string) => {
    const orderDate = new Date(date);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 3600 * 24));
    
    if (daysDiff < 7) return <Badge className="bg-green-100 text-green-800">Recent</Badge>;
    if (daysDiff < 30) return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
    return <Badge className="bg-amber-100 text-amber-800">Processing</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Orders & Projects</h1>
          <p className="text-slate-600">Track and manage all client orders and projects</p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search orders by reference, customer, or description..." 
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
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-slate-900">{ordersData.length}</p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-green-900">
                  {formatCurrency(ordersData.reduce((sum, order) => sum + order.amount, 0))}
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
                <p className="text-sm font-medium text-gray-600">Recent Orders</p>
                <p className="text-2xl font-bold text-blue-900">
                  {ordersData.filter(o => {
                    const orderDate = new Date(o.date);
                    const now = new Date();
                    const daysDiff = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 3600 * 24));
                    return daysDiff < 7;
                  }).length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unique Clients</p>
                <p className="text-2xl font-bold text-purple-900">
                  {new Set(ordersData.map(o => o.customer)).size}
                </p>
              </div>
              <User className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>All Orders</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Date</th>
                  <th className="text-left p-4 font-medium text-gray-900">Reference</th>
                  <th className="text-left p-4 font-medium text-gray-900">Customer</th>
                  <th className="text-left p-4 font-medium text-gray-900">Description</th>
                  <th className="text-left p-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {ordersData.map((order, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{order.date}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-blue-600">#{order.reference}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-slate-900">{order.customer}</span>
                    </td>
                    <td className="p-4">
                      <div className="max-w-md">
                        <p className="text-sm text-slate-600 truncate">{order.description}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-green-600">
                        {formatCurrency(order.amount)}
                      </span>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(order.date)}
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

export default Orders;
