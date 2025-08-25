
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ServicesPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Services Policy</CardTitle>
            <div className="text-center text-gray-600 space-y-1">
              <p><strong>IJ Langa Consulting (Pty) Ltd</strong></p>
              <p>78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</p>
              <p>CSD No.: MAAA0988528 | Reg. No.: 2020/754266/07 | Tax No.: 4540304286</p>
              <p><strong>CEO:</strong> Mr. Innocent Joseph Langa</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>
              Our services include <strong>taxation, bookkeeping, accounting, payroll, business registration, CIPC amendments, and compliance consulting</strong>. These are delivered in terms of the <strong>Companies Act (2008)</strong>, <strong>Income Tax Act (1962)</strong>, and <strong>Value-Added Tax Act (1991)</strong> to ensure legal compliance.
            </p>
            
            <p>
              Service delivery begins once payment is confirmed. Timelines depend on regulatory bodies such as SARS and CIPC. Clients must provide accurate, complete information as required by the <strong>Tax Administration Act (2011)</strong>.
            </p>
            
            <p>
              If a client provides incomplete or incorrect information, resulting penalties or delays are the client's responsibility. IJ Langa Consulting is not liable for losses caused by client negligence or third-party delays.
            </p>
            
            <p>
              We reserve the right to suspend or terminate services in cases of non-payment, fraud, or breach of agreement, consistent with South African commercial law.
            </p>
            
            <p>
              Our CEO's expertise and governance training ensure that services are managed with efficiency, compliance, and accountability.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServicesPolicy;
