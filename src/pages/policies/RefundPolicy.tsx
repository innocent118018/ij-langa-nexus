
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RefundPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Refund Policy</CardTitle>
            <div className="text-center text-gray-600 space-y-1">
              <p><strong>IJ Langa Consulting (Pty) Ltd</strong></p>
              <p>78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</p>
              <p>CSD No.: MAAA0988528 | Reg. No.: 2020/754266/07 | Tax No.: 4540304286</p>
              <p><strong>CEO:</strong> Mr. Innocent Joseph Langa</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>
              IJ Langa Consulting (Pty) Ltd complies with the <strong>Consumer Protection Act, 68 of 2008 (CPA)</strong> by offering fair and transparent refund procedures. Refunds are considered only where services have not yet commenced, payments were made in error, or duplicate payments were received. Clients must request refunds in writing within seven (7) working days of payment.
            </p>
            
            <p>
              Refunds will not be granted once professional services have commenced, especially where statutory submissions have been filed with <strong>SARS, CIPC, NHBRC, or CIDB</strong>. This aligns with the <strong>Companies Act, 71 of 2008</strong>, which governs compliance-related work.
            </p>
            
            <p>
              Approved refunds will be processed within fourteen (14) business days, depending on the banking institution. All refunds remain subject to internal approval and compliance verification.
            </p>
            
            <p>
              Administrative fees, consultation costs, and professional time already expended are strictly non-refundable. This is consistent with South African contract law principles.
            </p>
            
            <p>
              By using our services, clients agree to these terms and acknowledge that refunds are limited to the conditions outlined in this policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RefundPolicy;
