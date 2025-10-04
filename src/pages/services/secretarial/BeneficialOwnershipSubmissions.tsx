import React from 'react';
import ServiceTemplate from '../ServiceTemplate';
import { Users, Shield, FileText } from 'lucide-react';

const BeneficialOwnershipSubmissions = () => {
  return (
    <ServiceTemplate
      serviceName="Beneficial Ownership Submissions"
      category="Secretarial Services"
      description="Beneficial ownership disclosure submissions for compliance"
      turnaround="5-7 Working Days"
      icon={<Users className="h-6 w-6 text-primary" />}
      features={[
        "Beneficial ownership identification",
        "Disclosure documentation",
        "CIPC submissions",
        "Compliance verification",
        "Annual updates",
        "Register maintenance"
      ]}
      requirements={[
        "Company ownership structure",
        "Shareholder details and ID copies",
        "Trust and partnership details",
        "Percentage ownership information"
      ]}
    />
  );
};

export default BeneficialOwnershipSubmissions;