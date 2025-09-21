import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

export default function NoticeOfObjection() {
  return (
    <ServicePageTemplate
      title="Notice of Objection"
      code="NOO"
      category="taxation"
      subcategory="Individual"
      description="Professional preparation and submission of notices of objection to SARS assessments for individual taxpayers."
      price={750}
      processingTime="5-7 Working Days"
      requirements={[
        "SARS assessment notice",
        "Supporting documentation",
        "Objection grounds",
        "Taxpayer details"
      ]}
      features={[
        "Objection preparation",
        "Legal grounds analysis",
        "SARS submission",
        "Follow-up services",
        "Professional representation"
      ]}
      metaDescription="Professional notice of objection services. Expert SARS objection preparation and tax dispute resolution."
    />
  );
}