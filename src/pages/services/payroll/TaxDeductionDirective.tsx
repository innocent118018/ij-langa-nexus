import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

export default function TaxDeductionDirective() {
  return (
    <ServicePageTemplate
      title="Request for Tax Deduction Directive"
      code="IRP3"
      category="payroll"
      subcategory="Employees Tax"
      description="Professional assistance with tax deduction directive applications to optimize employee tax deductions."
      price={850}
      processingTime="5-7 Working Days"
      requirements={[
        "Employee personal details",
        "Tax deduction requirements",
        "Supporting documentation",
        "SARS registration details"
      ]}
      features={[
        "IRP3 form preparation",
        "SARS submission",
        "Follow-up and tracking",
        "Tax optimization advice",
        "Compliance verification"
      ]}
      metaDescription="Expert tax deduction directive services. Professional IRP3 applications for optimal employee tax management."
    />
  );
}