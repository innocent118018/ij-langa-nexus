import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';

const AgedPayables = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Aged Payables</h1>
          <p className="text-muted-foreground">Outstanding supplier balances by age</p>
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
          <CardTitle>Aged Payables - IJ Langa Consulting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-primary">
                  <th className="text-left py-3 px-2">Supplier</th>
                  <th className="text-right py-3 px-2">Current</th>
                  <th className="text-right py-3 px-2">30 Days</th>
                  <th className="text-right py-3 px-2">60 Days</th>
                  <th className="text-right py-3 px-2">90+ Days</th>
                  <th className="text-right py-3 px-2">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-2 text-muted-foreground" colSpan={6}>No outstanding payables</td>
                </tr>
                <tr className="border-t-2 border-primary font-semibold">
                  <td className="py-3 px-2">Total</td>
                  <td className="text-right py-3 px-2 font-mono">R 0.00</td>
                  <td className="text-right py-3 px-2 font-mono">R 0.00</td>
                  <td className="text-right py-3 px-2 font-mono">R 0.00</td>
                  <td className="text-right py-3 px-2 font-mono">R 0.00</td>
                  <td className="text-right py-3 px-2 font-mono">R 0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgedPayables;