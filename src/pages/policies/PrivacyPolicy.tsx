
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Privacy Policy (POPIA-Aligned)</CardTitle>
            <div className="text-center text-gray-600 space-y-1">
              <p><strong>IJ Langa Consulting (Pty) Ltd</strong></p>
              <p>78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</p>
              <p>CSD No.: MAAA0988528 | Reg. No.: 2020/754266/07 | Tax No.: 4540304286</p>
              <p><strong>CEO & Information Officer:</strong> Mr. Innocent Joseph Langa</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>
              IJ Langa Consulting respects the <strong>Protection of Personal Information Act (POPIA), Act 4 of 2013</strong>, and protects all personal and company information entrusted to us.
            </p>
            
            <p>
              We collect client information such as identity numbers, addresses, company details, and financial records for compliance purposes. Information is shared only with SARS, CIPC, and other regulatory bodies where legally required.
            </p>
            
            <p>
              In compliance with <strong>Section 19 of POPIA</strong>, we maintain strict safeguards against unauthorized access. Only authorized staff, bound by confidentiality, may access client data.
            </p>
            
            <p>
              Clients may request access, corrections, or deletion of their personal data in accordance with <strong>Section 23 of POPIA</strong>. Requests should be sent to <strong>privacy@ijlanga.co.za</strong>.
            </p>
            
            <p>
              By engaging our services, clients consent to our lawful handling of personal information under POPIA and related South African laws.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
