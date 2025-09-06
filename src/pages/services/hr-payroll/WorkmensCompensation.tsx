import React from 'react';
import ServiceTemplate from '../ServiceTemplate';
import { Shield, FileText, Users } from 'lucide-react';

const WorkmensCompensation = () => {
  return (
    <ServiceTemplate
      serviceName="Workmen's Compensation"
      category="HR & Payroll Services"
      description="Workmen's Compensation Fund registration and annual returns"
      turnaround="Annual Service"
      icon={<Shield className="h-6 w-6 text-primary" />}
      features={[
        "WCF registration assistance",
        "Annual return preparation",
        "Risk assessment classification",
        "Premium calculation",
        "Claims assistance",
        "Compliance monitoring"
      ]}
      requirements={[
        "Company registration documents",
        "Employee details and job descriptions",
        "Annual payroll figures",
        "Previous WCF documentation"
      ]}
    />
  );
};

export default WorkmensCompensation;