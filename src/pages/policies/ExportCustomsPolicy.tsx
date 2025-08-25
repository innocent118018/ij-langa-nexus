
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ExportCustomsPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Export & Customs Compliance Policy</CardTitle>
            <div className="text-center text-gray-600 space-y-1">
              <p><strong>IJ Langa Consulting (Pty) Ltd</strong></p>
              <p>78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</p>
              <p>CSD No.: MAAA0988528 | Reg. No.: 2020/754266/07 | Tax No.: 4540304286</p>
              <p><strong>SARS Registered Exporter</strong> - Customs Code: CU25710563</p>
              <p><strong>CEO:</strong> Mr. Innocent Joseph Langa</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>
              IJ Langa Consulting is a <strong>SARS-registered exporter</strong> with Customs Code CU25710563, under the <strong>Customs & Excise Act, 91 of 1964</strong>. This registration allows us to provide export services responsibly and legally.
            </p>
            
            <p>
              As a registered exporter, we commit to full compliance with customs requirements, including accurate declarations, lawful trade practices, and timely submission of documentation.
            </p>
            
            <p>
              Clients using our export services must provide accurate and lawful documentation. Failure to comply may result in penalties or withdrawal of services, as permitted by SARS.
            </p>
            
            <p>
              We will comply with all obligations under the <strong>International Trade Administration Act</strong> and SARS customs controls. Transparency in duties, costs, and timelines will be maintained throughout.
            </p>
            
            <p>
              By using IJ Langa Consulting's export services, clients agree to comply with South African customs laws and recognize our registered compliance status.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExportCustomsPolicy;
