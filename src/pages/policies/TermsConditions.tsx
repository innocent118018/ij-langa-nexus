
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsConditions = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Terms & Conditions</CardTitle>
            <div className="text-center text-gray-600 space-y-1">
              <p><strong>IJ Langa Consulting (Pty) Ltd</strong></p>
              <p>78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</p>
              <p>CSD No.: MAAA0988528 | Reg. No.: 2020/754266/07 | Tax No.: 4540304286</p>
              <p><strong>CEO:</strong> Mr. Innocent Joseph Langa</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Key Terms</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>All invoices are due within <strong>1 day</strong> of issue unless otherwise stated.</li>
                <li>Invoices unpaid after <strong>7 days</strong> incur a <strong>10% late payment fee</strong>.</li>
                <li>After <strong>21 days</strong>, a <strong>Letter of Demand</strong> is issued at <strong>R600</strong>. Court action may follow at the client's expense.</li>
                <li>Goods remain the property of IJ Langa Consulting until fully paid.</li>
                <li>Discrepancies must be reported within seven (7) days of invoice receipt.</li>
                <li>All quotes are valid for seven (7) days and require a 50% deposit to accept.</li>
                <li>Payments must reference invoice or order numbers.</li>
              </ol>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Banking Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Bank:</strong> Standard Bank</p>
                  <p><strong>Branch:</strong> Ermelo (2844)</p>
                  <p><strong>Account Holder:</strong> IJ Langa Consulting (Pty) Ltd</p>
                </div>
                <div>
                  <p><strong>Acc No:</strong> 10186883984</p>
                  <p><strong>Account Type:</strong> Current Account</p>
                  <p><strong>SWIFT:</strong> SBZAZAJJ</p>
                </div>
              </div>
            </div>
            
            <div className="text-center bg-blue-100 p-4 rounded-lg">
              <p><strong>For inquiries:</strong> billings@ijlanga.co.za | 013 004 0620</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsConditions;
