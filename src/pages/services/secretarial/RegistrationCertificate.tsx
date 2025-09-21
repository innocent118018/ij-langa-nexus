import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

export default function RegistrationCertificate() {
  return (
    <ServicePageTemplate
      title="Registration Certificate"
      code="COR14.3"
      category="secretarial"
      subcategory="Companies: Formation and Amendments"
      description="Obtain official company registration certificate from CIPC for your business operations."
      price={50}
      processingTime="1-2 Working Days"
      requirements={[
        "Company registration number",
        "Incorporation documents",
        "Identity verification"
      ]}
      features={[
        "CIPC certificate request",
        "Official documentation",
        "Fast processing",
        "Authenticated copies"
      ]}
      metaDescription="Official company registration certificate services. Fast CIPC certificate processing for South African companies."
    />
  );
}