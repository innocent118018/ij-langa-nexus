import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';

const TaxSummary = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tax Summary</h1>
          <p className="text-muted-foreground">Summary of all tax transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tax Summary - IJ Langa Consulting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">VAT Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span>Output VAT (Sales)</span>
                  <span className="font-mono">R 0.00</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Input VAT (Purchases)</span>
                  <span className="font-mono">R 0.00</span>
                </div>
                <div className="flex justify-between py-2 font-semibold bg-muted px-2 rounded">
                  <span>VAT Payable / (Refund)</span>
                  <span className="font-mono">R 0.00</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Withholding Tax Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span>Withholding Tax Collected</span>
                  <span className="font-mono">R 0.00</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Withholding Tax Paid</span>
                  <span className="font-mono">R 0.00</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">PAYE Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span>Employee PAYE</span>
                  <span className="font-mono">R 0.00</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>SDL</span>
                  <span className="font-mono">R 0.00</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>UIF</span>
                  <span className="font-mono">R 0.00</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxSummary;