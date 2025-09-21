import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

export default function IndividualTaxReturns() {
  return (
    <ServicePageTemplate
      title="Individual Income Tax Returns"
      code="ITR12"
      category="taxation"
      subcategory="Individual"
      description="Professional preparation and submission of individual income tax returns for salary earners and other income sources."
      price={500}
      processingTime="3-5 Working Days"
      requirements={[
        "IRP5 certificates",
        "Bank statements",
        "Investment statements",
        "Medical aid certificates"
      ]}
      features={[
        "Complete tax return preparation",
        "SARS e-filing submission",
        "Tax optimization strategies",
        "Refund tracking",
        "Professional tax advice"
      ]}
      metaDescription="Professional individual income tax return services. Expert ITR12 preparation and submission for South African taxpayers."
    />
  );
}