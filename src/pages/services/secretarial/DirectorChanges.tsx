import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

export default function DirectorChanges() {
  return (
    <ServicePageTemplate
      title="Notice of Change Concerning a Director"
      code="CoR39"
      category="secretarial"
      subcategory="Companies: Formation and Amendments"
      description="Professional handling of director appointment, resignation, and change notifications with CIPC."
      price={850}
      processingTime="7-14 Working Days"
      requirements={[
        "Director personal details",
        "Board resolution",
        "Consent to act forms",
        "Identity documents"
      ]}
      features={[
        "Director change processing",
        "CIPC submission and tracking",
        "Resolution drafting",
        "COR39 form completion",
        "Compliance verification"
      ]}
      metaDescription="Professional director change services with CIPC. Handle director appointments and resignations efficiently."
    />
  );
}