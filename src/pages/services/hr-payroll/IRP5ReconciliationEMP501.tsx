import React from 'react';
import ServiceTemplate from '../ServiceTemplate';
import { Calculator, CheckCircle, Clock } from 'lucide-react';

const IRP5ReconciliationEMP501 = () => {
  return (
    <ServiceTemplate
      serviceName="IRP5 Bi-annual Reconciliation (EMP501)"
      category="HR & Payroll Services"
      description="Annual employee tax reconciliation and EMP501 submission"
      price={750}
      turnaround="Annual Service"
      icon={<Calculator className="h-6 w-6 text-primary" />}
      features={[
        "EMP501 reconciliation preparation",
        "IRP5 certificate generation",
        "Annual payroll reconciliation",
        "Tax year-end calculations",
        "SARS submission",
        "Employee certificate distribution"
      ]}
      requirements={[
        "Annual payroll summary",
        "All monthly EMP201 returns",
        "Employee personal details",
        "Medical aid and pension fund details"
      ]}
    />
  );
};

export default IRP5ReconciliationEMP501;