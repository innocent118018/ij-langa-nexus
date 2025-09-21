import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

export default function EmployeeTaxCertificates() {
  return (
    <ServicePageTemplate
      title="Employee Tax Certificates and General Information Returns"
      code="IRP5/IT3"
      category="payroll"
      subcategory="Employees Tax"
      description="Professional preparation and submission of IRP5 certificates and IT3 general information returns."
      price={375}
      processingTime="3-5 Working Days"
      requirements={[
        "Employee payroll records",
        "Tax deduction details",
        "Benefits information",
        "Banking details"
      ]}
      features={[
        "IRP5 certificate preparation",
        "IT3 return compilation",
        "SARS e-filing submission",
        "Employee distribution",
        "Compliance verification"
      ]}
      metaDescription="Professional IRP5 and IT3 tax certificate services. Expert employee tax documentation and SARS submissions."
    />
  );
}