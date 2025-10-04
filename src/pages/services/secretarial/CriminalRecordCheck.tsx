import React from 'react';
import ServiceTemplate from '../ServiceTemplate';
import { Shield, UserCheck, FileText } from 'lucide-react';

const CriminalRecordCheck = () => {
  return (
    <ServiceTemplate
      serviceName="Criminal Record Check"
      category="Secretarial Services"
      description="Police clearance and criminal record verification services"
      turnaround="5-10 Working Days"
      icon={<Shield className="h-6 w-6 text-primary" />}
      features={[
        "Police clearance certificates",
        "Criminal record checks",
        "Background verification",
        "SAPS submissions",
        "Document authentication",
        "Express service available"
      ]}
      requirements={[
        "Copy of South African ID",
        "Fingerprints (if required)",
        "Purpose declaration",
        "Application fee"
      ]}
    />
  );
};

export default CriminalRecordCheck;