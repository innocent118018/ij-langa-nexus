
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ShelfCompaniesPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Information Officer & POPIA Compliance Policy</CardTitle>
            <div className="text-center text-gray-600 space-y-1">
              <p><strong>IJ Langa Consulting (Pty) Ltd</strong></p>
              <p>78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</p>
              <p>CSD No.: MAAA0988528 | Reg. No.: 2020/754266/07 | Tax No.: 4540304286</p>
              <p><strong>Registered Information Officer:</strong> Mr. Innocent Joseph Langa</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>
              IJ Langa Consulting is formally registered with the <strong>Information Regulator of South Africa</strong> as a private company with an appointed <strong>Information Officer</strong>, Mr. Innocent Joseph Langa. This ensures accountability under the <strong>POPIA Act, 2013</strong>.
            </p>
            
            <p>
              The Information Officer's role includes overseeing lawful data processing, handling access requests, and reporting data breaches. This role is aligned with <strong>Section 55 of POPIA</strong>, ensuring that clients' privacy rights are upheld.
            </p>
            
            <p>
              Our company implements policies and training to ensure that all staff understand their obligations under POPIA. Breaches of confidentiality or data misuse are treated as serious disciplinary matters.
            </p>
            
            <p>
              Clients may contact the Information Officer to exercise their rights to access, correction, or deletion of their personal data, in accordance with <strong>Section 23 of POPIA</strong>.
            </p>
            
            <p>
              This policy reaffirms our commitment to lawful, ethical, and transparent data management, protecting all clients and stakeholders.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShelfCompaniesPolicy;
