import React from 'react';
import ServiceTemplate from '../ServiceTemplate';
import { Award, CheckCircle, FileText } from 'lucide-react';

const BBBEECertificates = () => {
  return (
    <ServiceTemplate
      serviceName="B-BBEE Certificates"
      category="Secretarial Services"
      description="Broad-Based Black Economic Empowerment certification services"
      turnaround="14-21 Working Days"
      icon={<Award className="h-6 w-6 text-primary" />}
      features={[
        "B-BBEE scorecard preparation",
        "Verification assistance",
        "Certificate application",
        "Compliance verification",
        "Annual renewals",
        "Exempted Micro Enterprise affidavits"
      ]}
      requirements={[
        "Company financial information",
        "Ownership details",
        "Employment equity data",
        "Procurement records"
      ]}
    />
  );
};

export default BBBEECertificates;