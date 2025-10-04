import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';

const CashFlowStatement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cash Flow Statement</h1>
          <p className="text-muted-foreground">Cash inflows and outflows during the period</p>
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
          <CardTitle>Cash Flow Statement - IJ Langa Consulting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">Operating Activities</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span>Cash receipts from customers</span>
                  <span className="font-mono">R 0.00</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Cash paid to suppliers</span>
                  <span className="font-mono">R 0.00</span>
                </div>
                <div className="flex justify-between py-2 font-semibold">
                  <span>Net cash from operating activities</span>
                  <span className="font-mono">R 0.00</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Investing Activities</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span>Purchase of fixed assets</span>
                  <span className="font-mono">R 0.00</span>
                </div>
                <div className="flex justify-between py-2 font-semibold">
                  <span>Net cash from investing activities</span>
                  <span className="font-mono">R 0.00</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Financing Activities</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span>Proceeds from loans</span>
                  <span className="font-mono">R 0.00</span>
                </div>
                <div className="flex justify-between py-2 font-semibold">
                  <span>Net cash from financing activities</span>
                  <span className="font-mono">R 0.00</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-primary">
              <div className="flex justify-between text-lg font-bold">
                <span>Net Increase in Cash</span>
                <span className="font-mono">R 0.00</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashFlowStatement;