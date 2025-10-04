import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

export default function VATRegistrationService() {
  return (
    <ServicePageTemplate
      title="VAT Registration"
      code="VAT101"
      category="taxation"
      subcategory="Value Added Tax"
      description="Professional VAT registration services with SARS for businesses exceeding the VAT threshold or voluntary registration."
      price={1500}
      processingTime="10-15 Working Days"
      requirements={[
        "Business registration documents",
        "Financial records",
        "Banking details",
        "Business address proof"
      ]}
      features={[
        "VAT101 form preparation",
        "SARS registration process",
        "Threshold analysis",
        "Compliance guidance",
        "Ongoing VAT support"
      ]}
      metaDescription="Professional VAT registration services with SARS. Expert VAT compliance and registration for South African businesses."
    />
  );
}