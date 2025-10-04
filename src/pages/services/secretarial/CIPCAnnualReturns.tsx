import React from 'react';
import ServiceTemplate from '../ServiceTemplate';
import { Calendar, FileText, Building } from 'lucide-react';

const CIPCAnnualReturns = () => {
  return (
    <ServiceTemplate
      serviceName="CIPC Annual Returns"
      category="Secretarial Services"
      description="Annual return submissions to maintain company compliance"
      turnaround="Annual Service"
      icon={<Calendar className="h-6 w-6 text-primary" />}
      features={[
        "Annual return preparation",
        "CIPC submission",
        "Compliance verification",
        "Director confirmation",
        "Share register updates",
        "Good standing maintenance"
      ]}
      requirements={[
        "Current company details",
        "Director information",
        "Annual financial statements",
        "Share register details"
      ]}
    />
  );
};

export default CIPCAnnualReturns;