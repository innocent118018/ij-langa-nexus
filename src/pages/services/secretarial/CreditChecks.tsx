import React from 'react';
import ServiceTemplate from '../ServiceTemplate';
import { Search, FileText, Shield } from 'lucide-react';

const CreditChecks = () => {
  return (
    <ServiceTemplate
      serviceName="Credit Checks"
      category="Secretarial Services"
      description="Company and individual credit verification services"
      turnaround="1-3 Working Days"
      icon={<Search className="h-6 w-6 text-primary" />}
      features={[
        "Company credit reports",
        "Individual credit checks",
        "Payment history verification",
        "Risk assessment",
        "Compliance verification",
        "Due diligence reports"
      ]}
      requirements={[
        "Company/individual details",
        "ID or registration numbers",
        "Consent for credit check",
        "Purpose of credit check"
      ]}
    />
  );
};

export default CreditChecks;