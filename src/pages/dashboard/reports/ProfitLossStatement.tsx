import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Calendar } from 'lucide-react';

const ProfitLossStatement = () => {
  const [period, setPeriod] = useState('current-month');

  const sampleData = [
    { category: 'Revenue', items: [
      { name: 'Service Revenue', amount: 125430 },
      { name: 'Consulting Revenue', amount: 89250 },
      { name: 'Other Revenue', amount: 12500 }
    ]},
    { category: 'Cost of Sales', items: [
      { name: 'Direct Costs', amount: -45000 },
      { name: 'Subcontractor Costs', amount: -23500 }
    ]},
    { category: 'Expenses', items: [
      { name: 'Office Rent', amount: -12000 },
      { name: 'Utilities', amount: -3500 },
      { name: 'Marketing', amount: -8500 },
      { name: 'Professional Fees', amount: -15000 }
    ]}
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(Math.abs(amount));
  };

  const totalRevenue = sampleData[0].items.reduce((sum, item) => sum + item.amount, 0);
  const totalCosts = sampleData[1].items.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = sampleData[2].items.reduce((sum, item) => sum + item.amount, 0);
  const netProfit = totalRevenue + totalCosts + totalExpenses;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profit & Loss Statement</h1>
          <p className="text-muted-foreground">
            Comprehensive income statement showing revenue, expenses, and net profit
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
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Income Statement - September 2025
          </CardTitle>
          <CardDescription>
            Financial performance for the selected period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sampleData.map((section, index) => (
              <div key={section.category}>
                <h3 className="text-lg font-semibold mb-3 text-primary">{section.category}</h3>
                <Table>
                  <TableBody>
                    {section.items.map((item, itemIndex) => (
                      <TableRow key={itemIndex}>
                        <TableCell className="font-medium pl-4">{item.name}</TableCell>
                        <TableCell className="text-right">
                          <span className={item.amount < 0 ? 'text-red-600' : 'text-green-600'}>
                            {item.amount < 0 ? '-' : ''}{formatCurrency(item.amount)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {index < sampleData.length - 1 && <hr className="my-4" />}
              </div>
            ))}
            
            <div className="pt-6 border-t">
              <div className="grid grid-cols-2 gap-4 text-lg font-semibold">
                <div>Net Profit</div>
                <div className={`text-right ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {netProfit < 0 ? '-' : ''}{formatCurrency(netProfit)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfitLossStatement;