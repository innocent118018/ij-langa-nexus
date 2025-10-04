import React from 'react';
import ServiceTemplate from '../ServiceTemplate';
import { Shield, Users, FileText } from 'lucide-react';

const UIFRegistrationReturns = () => {
  return (
    <ServiceTemplate
      serviceName="UIF Registration & Returns"
      category="HR & Payroll Services"
      description="Unemployment Insurance Fund registration and monthly returns"
      price={850}
      unit="Registration"
      turnaround="5-7 Working Days"
      icon={<Shield className="h-6 w-6 text-primary" />}
      features={[
        "UIF employer registration (UF1)",
        "Monthly UIF declarations (UF2)",
        "Employer contribution returns (UF19)",
        "Employee registration",
        "Compliance monitoring",
        "Claim assistance"
      ]}
      requirements={[
        "Company registration documents",
        "Employee details and contracts",
        "Payroll information",
        "Banking details"
      ]}
    />
  );
};

export default UIFRegistrationReturns;