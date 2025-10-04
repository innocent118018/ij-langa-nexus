import React from 'react';
import ServiceTemplate from '../ServiceTemplate';
import { FileText, CheckCircle, Calendar } from 'lucide-react';

const SARSReturnsEMP201 = () => {
  return (
    <ServiceTemplate
      serviceName="SARS Returns for VAT, PAYE & SDL (EMP201)"
      category="HR & Payroll Services"
      description="Monthly employer tax returns for PAYE, UIF, and Skills Development Levy"
      price={650}
      turnaround="Monthly Service"
      icon={<FileText className="h-6 w-6 text-primary" />}
      features={[
        "EMP201 monthly return preparation",
        "PAYE calculation and submission",
        "UIF contribution calculation",
        "Skills Development Levy calculation",
        "eFiling submission",
        "Payment advice"
      ]}
      requirements={[
        "Monthly payroll reports",
        "Employee salary details",
        "Previous month's reconciliation",
        "Banking details for payments"
      ]}
      benefits={[
        {
          title: "Compliance",
          description: "Stay compliant with monthly SARS requirements",
          icon: <CheckCircle className="h-6 w-6 text-primary" />
        },
        {
          title: "Timely Filing",
          description: "Never miss the 7th of month deadline",
          icon: <Calendar className="h-6 w-6 text-green-600" />
        },
        {
          title: "Accurate Calculations",
          description: "Expert payroll tax calculations",
          icon: <FileText className="h-6 w-6 text-blue-600" />
        }
      ]}
    />
  );
};

export default SARSReturnsEMP201;