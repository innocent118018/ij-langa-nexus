import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Calculator } from 'lucide-react';

export const TaxCalculator = () => {
  const [amount, setAmount] = useState('');
  const [vatRate, setVatRate] = useState('15');
  const [results, setResults] = useState({
    exclusive: 0,
    vat: 0,
    inclusive: 0
  });

  const calculateTax = () => {
    const inputAmount = parseFloat(amount) || 0;
    const rate = parseFloat(vatRate) / 100;

    // Calculate based on VAT inclusive amount
    const vatInclusive = inputAmount;
    const vatExclusive = vatInclusive / (1 + rate);
    const vatAmount = vatInclusive - vatExclusive;

    setResults({
      exclusive: vatExclusive,
      vat: vatAmount,
      inclusive: vatInclusive
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Calculator className="h-4 w-4" />
          Tax Calculator
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              VAT Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount (VAT Inclusive)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="vatRate">VAT Rate (%)</Label>
              <Input
                id="vatRate"
                type="number"
                value={vatRate}
                onChange={(e) => setVatRate(e.target.value)}
              />
            </div>

            <Button onClick={calculateTax} className="w-full">
              Calculate
            </Button>

            {results.inclusive > 0 && (
              <div className="space-y-2 p-4 bg-muted rounded-lg">
                <div className="flex justify-between">
                  <span>VAT Exclusive:</span>
                  <span className="font-semibold">{formatCurrency(results.exclusive)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT Amount:</span>
                  <span className="font-semibold">{formatCurrency(results.vat)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>VAT Inclusive:</span>
                  <span className="font-bold">{formatCurrency(results.inclusive)}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};