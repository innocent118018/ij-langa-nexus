import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Calculator, Download, FileText } from 'lucide-react';

const TaxCalculator = () => {
  const [revenue, setRevenue] = useState('');
  const [expenses, setExpenses] = useState('');
  const [vatStatus, setVatStatus] = useState('');
  const [taxType, setTaxType] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateTax = () => {
    const revenueAmount = parseFloat(revenue) || 0;
    const expenseAmount = parseFloat(expenses) || 0;
    const profit = revenueAmount - expenseAmount;
    
    let taxRate = 0;
    let vatAmount = 0;
    
    // Calculate VAT if applicable
    if (vatStatus === 'registered') {
      vatAmount = revenueAmount * 0.15;
    }
    
    // Calculate tax based on type
    if (taxType === 'company') {
      taxRate = 0.28; // Company tax rate 28%
    } else if (taxType === 'individual') {
      // Simplified individual tax brackets
      if (profit <= 237100) taxRate = 0.18;
      else if (profit <= 370500) taxRate = 0.26;
      else if (profit <= 512800) taxRate = 0.31;
      else if (profit <= 673000) taxRate = 0.36;
      else if (profit <= 857900) taxRate = 0.39;
      else taxRate = 0.41;
    }
    
    const taxLiability = Math.max(profit * taxRate, 0);
    
    setResults({
      revenue: revenueAmount,
      expenses: expenseAmount,
      profit,
      vatAmount,
      taxLiability,
      totalTax: taxLiability + vatAmount,
      netIncome: profit - taxLiability - vatAmount
    });
  };

  const exportToPDF = () => {
    // In a real implementation, you'd generate a PDF here
    alert('PDF export functionality would be implemented here');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(amount);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              <Calculator className="h-8 w-8 text-primary" />
              Tax Calculator
            </h1>
            <p className="text-muted-foreground text-lg">
              Calculate your estimated tax liability with our professional tax calculator
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle>Tax Calculation Input</CardTitle>
                <CardDescription>
                  Enter your financial information to calculate estimated tax liability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="revenue">Annual Revenue</Label>
                  <Input
                    id="revenue"
                    type="number"
                    placeholder="Enter annual revenue"
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expenses">Annual Expenses</Label>
                  <Input
                    id="expenses"
                    type="number"
                    placeholder="Enter annual expenses"
                    value={expenses}
                    onChange={(e) => setExpenses(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vat-status">VAT Status</Label>
                  <Select value={vatStatus} onValueChange={setVatStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select VAT status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="registered">VAT Registered</SelectItem>
                      <SelectItem value="not-registered">Not VAT Registered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tax-type">Tax Type</Label>
                  <Select value={taxType} onValueChange={setTaxType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tax type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual Tax</SelectItem>
                      <SelectItem value="company">Company Tax</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={calculateTax} 
                  className="w-full"
                  disabled={!revenue || !expenses || !vatStatus || !taxType}
                >
                  Calculate Tax
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Tax Calculation Results</CardTitle>
                <CardDescription>
                  Your estimated tax liability based on the information provided
                </CardDescription>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Annual Revenue</p>
                        <p className="font-semibold">{formatCurrency(results.revenue)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Annual Expenses</p>
                        <p className="font-semibold">{formatCurrency(results.expenses)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Taxable Profit</p>
                        <p className="font-semibold">{formatCurrency(results.profit)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">VAT Liability</p>
                        <p className="font-semibold">{formatCurrency(results.vatAmount)}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Income Tax:</span>
                        <span className="font-semibold">{formatCurrency(results.taxLiability)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">VAT Liability:</span>
                        <span className="font-semibold">{formatCurrency(results.vatAmount)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t pt-2">
                        <span>Total Tax Liability:</span>
                        <span className="text-primary">{formatCurrency(results.totalTax)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span>Net Income After Tax:</span>
                        <span className="text-green-600">{formatCurrency(results.netIncome)}</span>
                      </div>
                    </div>

                    <Button onClick={exportToPDF} className="w-full mt-4" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export to PDF
                    </Button>

                    <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/50 rounded">
                      <p className="font-semibold mb-1">Disclaimer:</p>
                      <p>This is an estimated calculation for planning purposes only. Actual tax liability may vary based on various factors. Please consult with a qualified tax professional for accurate tax planning and compliance.</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Enter your financial information to see tax calculation results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TaxCalculator;