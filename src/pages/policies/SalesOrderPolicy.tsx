
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SalesOrderPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Sales Order Policy</CardTitle>
            <div className="text-center text-gray-600 space-y-1">
              <p><strong>IJ Langa Consulting (Pty) Ltd</strong></p>
              <p>78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</p>
              <p>CSD No.: MAAA0988528 | Reg. No.: 2020/754266/07 | Tax No.: 4540304286</p>
              <p><strong>CEO:</strong> Mr. Innocent Joseph Langa</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>
              Sales orders are confirmed once a client accepts a quote and makes payment. This constitutes a binding agreement under the <strong>Electronic Communications and Transactions Act, 25 of 2002 (ECTA)</strong>.
            </p>
            
            <p>
              Cancellations or changes must be requested in writing within twenty-four (24) hours of order confirmation. Beyond this period, cancellations are not allowed, and payments are non-refundable under the <strong>CPA</strong>.
            </p>
            
            <p>
              Service completion depends on external institutions (e.g., SARS, CIPC). Delays beyond our control are not grounds for cancellation or refund.
            </p>
            
            <p>
              Orders will be executed professionally, with all communications documented to protect both parties under South African law.
            </p>
            
            <p>
              Our CEO's background in business management and governance ensures that sales orders are processed with fairness, efficiency, and accountability.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesOrderPolicy;
