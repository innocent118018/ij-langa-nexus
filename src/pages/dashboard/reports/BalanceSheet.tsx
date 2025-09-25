import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Scale } from 'lucide-react';

const BalanceSheet = () => {
  const [period, setPeriod] = useState('current-month');

  const sampleData = {
    assets: {
      currentAssets: [
        { name: 'Cash and Bank', amount: 145000 },
        { name: 'Accounts Receivable', amount: 89250 },
        { name: 'Inventory', amount: 25000 },
        { name: 'Prepaid Expenses', amount: 12500 }
      ],
      fixedAssets: [
        { name: 'Office Equipment', amount: 85000 },
        { name: 'Computer Equipment', amount: 45000 },
        { name: 'Furniture & Fixtures', amount: 25000 },
        { name: 'Accumulated Depreciation', amount: -35000 }
      ]
    },
    liabilities: {
      currentLiabilities: [
        { name: 'Accounts Payable', amount: 65000 },
        { name: 'Accrued Expenses', amount: 23500 },
        { name: 'Short-term Loans', amount: 45000 }
      ],
      longTermLiabilities: [
        { name: 'Long-term Debt', amount: 120000 },
        { name: 'Deferred Tax', amount: 8500 }
      ]
    },
    equity: [
      { name: 'Owner Capital', amount: 150000 },
      { name: 'Retained Earnings', amount: 78750 }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(Math.abs(amount));
  };

  const totalCurrentAssets = sampleData.assets.currentAssets.reduce((sum, item) => sum + item.amount, 0);
  const totalFixedAssets = sampleData.assets.fixedAssets.reduce((sum, item) => sum + item.amount, 0);
  const totalAssets = totalCurrentAssets + totalFixedAssets;

  const totalCurrentLiabilities = sampleData.liabilities.currentLiabilities.reduce((sum, item) => sum + item.amount, 0);
  const totalLongTermLiabilities = sampleData.liabilities.longTermLiabilities.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;

  const totalEquity = sampleData.equity.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Balance Sheet</h1>
          <p className="text-muted-foreground">
            Statement of financial position showing assets, liabilities, and equity
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="current-quarter">Current Quarter</SelectItem>
              <SelectItem value="current-year">Current Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-primary mb-2">Current Assets</h4>
                <Table>
                  <TableBody>
                    {sampleData.assets.currentAssets.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="pl-4">{item.name}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-t font-semibold">
                      <TableCell className="pl-4">Total Current Assets</TableCell>
                      <TableCell className="text-right">{formatCurrency(totalCurrentAssets)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h4 className="font-semibold text-primary mb-2">Fixed Assets</h4>
                <Table>
                  <TableBody>
                    {sampleData.assets.fixedAssets.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="pl-4">{item.name}</TableCell>
                        <TableCell className="text-right">
                          <span className={item.amount < 0 ? 'text-red-600' : ''}>
                            {item.amount < 0 ? '-' : ''}{formatCurrency(item.amount)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-t font-semibold">
                      <TableCell className="pl-4">Total Fixed Assets</TableCell>
                      <TableCell className="text-right">{formatCurrency(totalFixedAssets)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>TOTAL ASSETS</span>
                  <span>{formatCurrency(totalAssets)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Liabilities & Equity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-primary mb-2">Current Liabilities</h4>
                <Table>
                  <TableBody>
                    {sampleData.liabilities.currentLiabilities.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="pl-4">{item.name}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-t font-semibold">
                      <TableCell className="pl-4">Total Current Liabilities</TableCell>
                      <TableCell className="text-right">{formatCurrency(totalCurrentLiabilities)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div>
                <h4 className="font-semibold text-primary mb-2">Long-term Liabilities</h4>
                <Table>
                  <TableBody>
                    {sampleData.liabilities.longTermLiabilities.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="pl-4">{item.name}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-t font-semibold">
                      <TableCell className="pl-4">Total Long-term Liabilities</TableCell>
                      <TableCell className="text-right">{formatCurrency(totalLongTermLiabilities)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div>
                <h4 className="font-semibold text-primary mb-2">Owner's Equity</h4>
                <Table>
                  <TableBody>
                    {sampleData.equity.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="pl-4">{item.name}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-t font-semibold">
                      <TableCell className="pl-4">Total Equity</TableCell>
                      <TableCell className="text-right">{formatCurrency(totalEquity)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>TOTAL LIABILITIES & EQUITY</span>
                  <span>{formatCurrency(totalLiabilities + totalEquity)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BalanceSheet;