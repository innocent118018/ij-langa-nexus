import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

export default function ExtendNameReservation() {
  return (
    <ServicePageTemplate
      title="Application to Extend Name Reservation"
      code="COR9.2"
      category="secretarial"
      subcategory="Companies: Formation and Amendments"
      description="Extend your reserved company name period to give you more time to complete your company formation."
      price={500}
      processingTime="2-3 Working Days"
      requirements={[
        "Original name reservation certificate",
        "Reason for extension",
        "Company formation timeline"
      ]}
      features={[
        "CIPC extension application",
        "Processing and follow-up",
        "Updated reservation certificate",
        "Legal compliance assurance"
      ]}
      metaDescription="Extend your company name reservation period with CIPC. Professional name extension services for South African companies."
    />
  );
}