import React from 'react';
import ServiceTemplate from '../ServiceTemplate';
import { Edit, UserCheck, Building } from 'lucide-react';

const ChangeCompanyDetails = () => {
  return (
    <ServiceTemplate
      serviceName="Change of Company Details"
      category="Secretarial Services"
      description="Director changes, address changes, and company amendments"
      price={850}
      turnaround="7-14 Working Days"
      icon={<Edit className="h-6 w-6 text-primary" />}
      features={[
        "Director appointment/resignation (COR39)",
        "Address changes",
        "MOI amendments",
        "Share transfers",
        "CIPC submissions",
        "Register updates"
      ]}
      requirements={[
        "Current company documents",
        "New director details (if applicable)",
        "Resolutions and consents",
        "Proof of new address (if applicable)"
      ]}
    />
  );
};

export default ChangeCompanyDetails;