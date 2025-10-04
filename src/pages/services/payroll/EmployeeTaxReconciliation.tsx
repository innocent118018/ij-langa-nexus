import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

export default function EmployeeTaxReconciliation() {
  return (
    <ServicePageTemplate
      title="Employee Tax Reconciliation"
      code="EMP501"
      category="payroll"
      subcategory="Employees Tax"
      description="Annual employee tax reconciliation services ensuring accurate PAYE calculations and SARS compliance."
      price={750}
      processingTime="5-10 Working Days"
      requirements={[
        "Annual payroll records",
        "IRP5 certificates",
        "Tax deduction summaries",
        "Employee details"
      ]}
      features={[
        "EMP501 preparation",
        "PAYE reconciliation",
        "Variance analysis",
        "SARS submission",
        "Compliance reporting"
      ]}
      metaDescription="Professional employee tax reconciliation services. Expert EMP501 preparation and annual PAYE reconciliation."
    />
  );
}