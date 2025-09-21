export interface TaxationProduct {
  id: string;
  code: string;
  name: string;
  price?: number;
  category: string;
  description?: string;
  processing_time?: string;
  requirements?: string[];
  features?: string[];
}

export const taxationProducts: TaxationProduct[] = [
  // PROFESSIONAL FEES
  {
    id: "consultation",
    code: "PROF001",
    name: "Consultation",
    price: 1500,
    category: "taxation",
    description: "Professional tax consultation per hour",
    processing_time: "As required",
    features: [
      "Expert tax advice",
      "Strategic planning",
      "Compliance guidance", 
      "Problem resolution"
    ]
  },
  {
    id: "partners-rate",
    code: "PROF002", 
    name: "Partners - Accounting/Taxation Rate",
    price: 1000,
    category: "taxation",
    description: "Partner-level consultation per hour",
    processing_time: "As required"
  },
  {
    id: "consultants-rate",
    code: "PROF003",
    name: "Accounting Officers/Tax Consultants Rate", 
    price: 650,
    category: "taxation",
    description: "Senior consultant consultation per hour",
    processing_time: "As required"
  },

  // INDIVIDUAL TAXATION
  {
    id: "noo-individual",
    code: "NOO",
    name: "Notice of Objection - Individual",
    price: 750,
    category: "taxation",
    description: "Lodge objection to SARS assessment for individuals",
    processing_time: "30 days from assessment",
    requirements: [
      "Assessment notice",
      "Grounds for objection", 
      "Supporting documents",
      "Tax history"
    ],
    features: [
      "Objection preparation",
      "SARS submission",
      "Legal representation",
      "Follow-up correspondence"
    ]
  },
  {
    id: "nod-individual", 
    code: "NOD",
    name: "Notice of Correction - Individual",
    price: 875,
    category: "taxation",
    description: "Request correction of SARS records for individuals",
    processing_time: "21 days processing"
  },
  {
    id: "noa-individual",
    code: "NOA",
    name: "Notice of Appeal to SARS - Individual", 
    price: 1250,
    category: "taxation",
    description: "Appeal SARS decision to Tax Tribunal",
    processing_time: "30 days from objection result"
  },
  {
    id: "itr12-salary-basic",
    code: "ITR12A",
    name: "Return of Income/Tax Returns: Salary Case (Under R250,000)",
    price: 500,
    category: "taxation",
    description: "Personal income tax return for basic salary earners",
    processing_time: "Annual - October 31st",
    requirements: [
      "IRP5 certificate",
      "Banking details",
      "Medical aid details",
      "Retirement fund details"
    ],
    features: [
      "ITR12 completion",
      "eFiling submission", 
      "Refund processing",
      "Compliance verification"
    ]
  },
  {
    id: "itr12-salary-complex",
    code: "ITR12B", 
    name: "Return of Income/Tax Returns: Salary Case (Allowances and deductions)",
    price: 1750,
    category: "taxation",
    description: "Complex personal tax return with allowances and deductions",
    processing_time: "Annual - October 31st"
  },
  {
    id: "itr12-director",
    code: "ITR12C",
    name: "Return of Income/Tax Returns: Directors/Members/Sole Trader",
    price: 1750,
    category: "taxation", 
    description: "Tax returns for business owners and directors",
    processing_time: "Annual - October 31st"
  },

  // BUSINESS ENTITIES
  {
    id: "it77-update",
    code: "IT77",
    name: "Update of administration details with SARS - Companies, CC's and Individuals", 
    price: 750,
    category: "taxation",
    description: "Update taxpayer details with SARS",
    processing_time: "5-7 Working Days",
    requirements: [
      "New details to update",
      "Supporting documentation",
      "Authorization letter",
      "Proof of changes"
    ]
  },
  {
    id: "it77-dereg",
    code: "IT77 (LET)",
    name: "Deregistration as a taxpayer - Individual, CC, PTY and Trust",
    price: 1500,
    category: "taxation",
    description: "Deregister entity from SARS tax system", 
    processing_time: "10-15 Working Days"
  },
  {
    id: "itr14-dormant",
    code: "ITR14A",
    name: "Return of Income Tax - Dormant", 
    price: 500,
    category: "taxation",
    description: "Annual tax return for dormant companies",
    processing_time: "Annual - July 31st"
  },
  {
    id: "itr14-micro",
    code: "ITR14B",
    name: "Return of Income Tax - Under R1 Million (Micro)",
    price: 1200,
    category: "taxation",
    description: "Annual tax return for micro businesses", 
    processing_time: "Annual - July 31st"
  },
  {
    id: "itr14-small", 
    code: "ITR14C",
    name: "Return of Income Tax - Under R14 Million (Small)",
    price: 1850,
    category: "taxation",
    description: "Annual tax return for small businesses",
    processing_time: "Annual - July 31st"
  },
  {
    id: "itr14-large",
    code: "ITR14D", 
    name: "Return of Income Tax - Over R15 Million (Med/Large)",
    price: 2450,
    category: "taxation",
    description: "Annual tax return for medium and large businesses",
    processing_time: "Annual - July 31st"
  },

  // PROVISIONAL TAX
  {
    id: "irp6-non-trading",
    code: "IRP6A",
    name: "Return of provisional tax (CC/Pty/Trust) Non Trading",
    price: 400,
    category: "taxation",
    description: "Provisional tax return for non-trading entities",
    processing_time: "Bi-annual"
  },
  {
    id: "irp6-first",
    code: "IRP6B",
    name: "Return of provisional tax (Individuals/CC/Pty/Trust) 1st", 
    price: 650,
    category: "taxation",
    description: "First provisional tax payment calculation",
    processing_time: "August 31st"
  },
  {
    id: "irp6-second",
    code: "IRP6C",
    name: "Return of provisional tax (Individuals/CC/Pty/Trust) 2nd",
    price: 1000,
    category: "taxation", 
    description: "Second provisional tax payment calculation",
    processing_time: "February 28th"
  },

  // VAT SERVICES
  {
    id: "vat101-registration",
    code: "VAT101",
    name: "VAT Registration",
    price: 1500,
    category: "taxation",
    description: "Register business for VAT with SARS", 
    processing_time: "21 Working Days",
    requirements: [
      "Annual turnover exceeding R1 million",
      "Business registration documents",
      "Banking details",
      "Business address proof"
    ],
    features: [
      "VAT registration application",
      "SARS submission",
      "VAT number allocation", 
      "Compliance setup"
    ]
  },
  {
    id: "vat201-return",
    code: "VAT201", 
    name: "VAT Return",
    price: 700,
    category: "taxation",
    description: "Monthly/Bi-monthly VAT return submission",
    processing_time: "Monthly - 25th",
    requirements: [
      "Sales invoices",
      "Purchase invoices", 
      "Credit notes",
      "Banking records"
    ],
    features: [
      "VAT201 compilation",
      "Input/Output calculations",
      "eFiling submission",
      "Refund processing"
    ]
  },

  // UIF SERVICES
  {
    id: "uf1-registration",
    code: "UF1",
    name: "UIF Registration - uFiling",
    price: 850, 
    category: "taxation",
    description: "Register employer for UIF contributions",
    processing_time: "7-10 Working Days"
  },
  {
    id: "uf2-monthly",
    code: "UF2",
    name: "Monthly Return - UIF Declaration",
    price: 475,
    category: "taxation",
    description: "Monthly UIF contribution returns", 
    processing_time: "Monthly - 7th"
  },
  {
    id: "uf19-contribution", 
    code: "UF19",
    name: "Employer Contribution Return - (Per Month if non payroll client)",
    price: 400,
    category: "taxation",
    description: "UIF employer contribution calculations",
    processing_time: "Monthly"
  }
];