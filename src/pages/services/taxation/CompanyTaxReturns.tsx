import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

export default function CompanyTaxReturns() {
  return (
    <ServicePageTemplate
      title="Company Income Tax Returns"
      code="ITR14"
      category="taxation"
      subcategory="Business Entities"
      description="Professional preparation and submission of company income tax returns for all business entities."
      price={1200}
      processingTime="7-10 Working Days"
      requirements={[
        "Annual financial statements",
        "Trial balance",
        "Supporting schedules",
        "Company registration documents"
      ]}
      features={[
        "Complete ITR14 preparation",
        "Tax computation and planning",
        "SARS e-filing submission",
        "Compliance verification",
        "Professional consultation"
      ]}
      metaDescription="Expert company income tax return services. Professional ITR14 preparation for South African companies and close corporations."
    />
  );
}