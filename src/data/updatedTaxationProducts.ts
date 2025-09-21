export interface TaxationProduct {
  id: string;
  code: string;
  name: string;
  price?: number;
  category: string;
  subcategory?: string;
  description?: string;
  processing_time?: string;
  requirements?: string[];
  features?: string[];
}

export const taxationProducts: TaxationProduct[] = [
  // PROFESSIONAL FEES
  {
    id: "consultation-taxation",
    code: "PROF001",
    name: "Consultation",
    price: 1500,
    category: "taxation",
    subcategory: "Professional Fees",
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
    id: "partners-rate-taxation",
    code: "PROF002", 
    name: "Partners - Accounting/Taxation Rate per Hour",
    price: 1000,
    category: "taxation",
    subcategory: "Professional Fees",
    description: "Partner-level consultation per hour",
    processing_time: "As required"
  },
  {
    id: "consultants-rate-taxation",
    code: "PROF003",
    name: "Accounting Officers/Tax Consultants Rate per Hour", 
    price: 650,
    category: "taxation",
    subcategory: "Professional Fees",
    description: "Senior consultant consultation per hour",
    processing_time: "As required"
  },

  // INDIVIDUAL TAXATION
  {
    id: "noo-individual-taxation",
    code: "NOO",
    name: "Notice of Objection",
    price: 750,
    category: "taxation",
    subcategory: "Individual",
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
    id: "nod-individual-taxation", 
    code: "NOD",
    name: "Notice of Correction",
    price: 875,
    category: "taxation",
    subcategory: "Individual",
    description: "Request correction of SARS records for individuals",
    processing_time: "21 days processing"
  },
  {
    id: "noa-individual-taxation",
    code: "NOA",
    name: "Notice of Appeal to SARS", 
    price: 1250,
    category: "taxation",
    subcategory: "Individual",
    description: "Appeal SARS decision to Tax Tribunal",
    processing_time: "30 days from objection result"
  },
  {
    id: "itr12-salary-basic-taxation",
    code: "ITR12A",
    name: "Return of Income/Tax Returns: Salary Case (Under R250,000)",
    price: 500,
    category: "taxation",
    subcategory: "Individual",
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
    id: "itr12-salary-complex-taxation",
    code: "ITR12B", 
    name: "Return of Income/Tax Returns: Salary Case (Allowance and deductions)",
    price: 1750,
    category: "taxation",
    subcategory: "Individual",
    description: "Complex personal tax return with allowances and deductions",
    processing_time: "Annual - October 31st"
  },
  {
    id: "itr12-director-taxation",
    code: "ITR12C",
    name: "Return of Income/Tax Returns: Salary Case (Directors/Members/Sole Trader)",
    price: 1750,
    category: "taxation", 
    subcategory: "Individual",
    description: "Tax returns for business owners and directors",
    processing_time: "Annual - October 31st"
  },
  {
    id: "sad-taxation",
    code: "SAD",
    name: "Submission of Review/Audit Documents",
    price: 500,
    category: "taxation",
    subcategory: "Individual",
    description: "Submit review and audit documents to SARS",
    processing_time: "As required"
  },
  {
    id: "sal-taxation",
    code: "SAL",
    name: "Prepare Statement of Liabilities, Reconcile Schedule Income Statements",
    price: 850,
    category: "taxation",
    subcategory: "Individual",
    description: "Statement of liabilities and income reconciliation (R850-R2,000)",
    processing_time: "5-10 Working Days"
  },
  {
    id: "tlog-taxation",
    code: "TLOG",
    name: "Compilation of Travel Logbook",
    price: 1000,
    category: "taxation",
    subcategory: "Individual",
    description: "Travel logbook compilation (R1,000-R2,000)",
    processing_time: "3-5 Working Days"
  },
  {
    id: "annx-taxation",
    code: "ANNX",
    name: "Prepare Annexure, Rental Schedule Income Statements",
    price: 1000,
    category: "taxation",
    subcategory: "Individual",
    description: "Annexure and rental schedule preparation (R1,000-R2,000)",
    processing_time: "5-7 Working Days"
  },
  {
    id: "cgt-taxation",
    code: "CGT",
    name: "Compilation of Capital Gain Tax",
    price: 850,
    category: "taxation",
    subcategory: "Individual",
    description: "Capital gains tax compilation (R850-R2,000)",
    processing_time: "3-7 Working Days"
  },
  {
    id: "taudits-taxation",
    code: "TAUDITS",
    name: "Tax Audits - Income Tax, PAYE, SDL, UIF, VAT, WHT",
    price: 650,
    category: "taxation",
    subcategory: "Individual",
    description: "Comprehensive tax audit services (R650-R1,500)",
    processing_time: "15-30 Working Days"
  },

  // BUSINESS ENTITIES
  {
    id: "it77-update-taxation",
    code: "IT77",
    name: "Update of administration details with SARS - Companies, CC's and Individuals", 
    price: 750,
    category: "taxation",
    subcategory: "Business Entities - (Co CC and Trust)",
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
    id: "it77-dereg-taxation",
    code: "IT77 (LET)",
    name: "Deregistration as a taxpayer - Individual, CC, PTY and Trust",
    price: 1500,
    category: "taxation",
    subcategory: "Business Entities - (Co CC and Trust)",
    description: "Deregister entity from SARS tax system", 
    processing_time: "10-15 Working Days"
  },
  {
    id: "itr14-dormant-taxation",
    code: "ITR14A",
    name: "Return of Income Tax - Dormant", 
    price: 500,
    category: "taxation",
    subcategory: "Business Entities - (Co CC and Trust)",
    description: "Annual tax return for dormant companies",
    processing_time: "Annual - July 31st"
  },
  {
    id: "itr14-micro-taxation",
    code: "ITR14B",
    name: "Return of Income Tax - Under R1 Million (Micro)",
    price: 1200,
    category: "taxation",
    subcategory: "Business Entities - (Co CC and Trust)",
    description: "Annual tax return for micro businesses", 
    processing_time: "Annual - July 31st"
  },
  {
    id: "itr14-small-taxation", 
    code: "ITR14C",
    name: "Return of Income Tax - Under R14 Million (Small)",
    price: 1850,
    category: "taxation",
    subcategory: "Business Entities - (Co CC and Trust)",
    description: "Annual tax return for small businesses",
    processing_time: "Annual - July 31st"
  },
  {
    id: "itr14-large-taxation",
    code: "ITR14D", 
    name: "Return of Income Tax - Over R15 Million (Med/Large)",
    price: 2450,
    category: "taxation",
    subcategory: "Business Entities - (Co CC and Trust)",
    description: "Annual tax return for medium and large businesses",
    processing_time: "Annual - July 31st"
  },
  {
    id: "irp6-non-trading-taxation",
    code: "IRP6A",
    name: "Return of provisional tax (CC/Pty/Trust) Non Trading",
    price: 400,
    category: "taxation",
    subcategory: "Business Entities - (Co CC and Trust)",
    description: "Provisional tax return for non-trading entities",
    processing_time: "Bi-annual"
  },
  {
    id: "irp6-first-taxation",
    code: "IRP6B",
    name: "Return of provisional tax (Individuals/CC/Pty/Trust) 1st", 
    price: 650,
    category: "taxation",
    subcategory: "Business Entities - (Co CC and Trust)",
    description: "First provisional tax payment calculation",
    processing_time: "August 31st"
  },
  {
    id: "irp6-second-taxation",
    code: "IRP6C",
    name: "Return of provisional tax (Individuals/CC/Pty/Trust) 2nd",
    price: 1000,
    category: "taxation",
    subcategory: "Business Entities - (Co CC and Trust)", 
    description: "Second provisional tax payment calculation",
    processing_time: "February 28th"
  },
  {
    id: "irp6-additional-taxation",
    code: "IRP6(3)",
    name: "Return of additional provisional tax",
    price: 500,
    category: "taxation",
    subcategory: "Business Entities - (Co CC and Trust)",
    description: "Additional provisional tax payment calculation",
    processing_time: "As required"
  },
  {
    id: "it12tr-taxation",
    code: "IT12TR",
    name: "Return of Income (All Trust)",
    price: 1800,
    category: "taxation",
    subcategory: "Business Entities - (Co CC and Trust)",
    description: "Annual income tax return for all types of trusts",
    processing_time: "Annual - July 31st"
  },
  {
    id: "it12trd-taxation",
    code: "IT12TRD",
    name: "Returns of Income (All trust Dormant)",
    price: 950,
    category: "taxation",
    subcategory: "Business Entities - (Co CC and Trust)",
    description: "Annual tax return for dormant trusts",
    processing_time: "Annual - July 31st"
  },
  {
    id: "dtr02-taxation",
    code: "DTR02",
    name: "Return dividends Tax and Resolution",
    price: 950,
    category: "taxation",
    subcategory: "Business Entities - (Co CC and Trust)",
    description: "Dividends tax return and resolution preparation",
    processing_time: "As required"
  },
  {
    id: "it14sd-taxation",
    code: "IT14SD",
    name: "Return for supplementary Declaration",
    price: 1250,
    category: "taxation",
    subcategory: "Business Entities - (Co CC and Trust)",
    description: "Supplementary declaration return",
    processing_time: "As required"
  },
  {
    id: "tcs-taxation",
    code: "TCS",
    name: "Tax Compliance Certificate (Good Standing, Tender)",
    price: 950,
    category: "taxation",
    subcategory: "Business Entities - (Co CC and Trust)",
    description: "Tax clearance certificate for tenders and compliance",
    processing_time: "5-10 Working Days"
  },
  {
    id: "it96-taxation",
    code: "IT96",
    name: "Arrangement for deferred payment of Income Tax",
    price: 750,
    category: "taxation",
    subcategory: "Business Entities - (Co CC and Trust)",
    description: "Deferred tax payment arrangement with SARS",
    processing_time: "10-15 Working Days"
  },
  {
    id: "efiling-reg-taxation",
    code: "EFILING001",
    name: "E-filing Registration",
    price: 250,
    category: "taxation",
    subcategory: "Business Entities - (Co CC and Trust)",
    description: "SARS eFiling profile registration",
    processing_time: "1-2 Working Days"
  },
  {
    id: "payment-taxation",
    code: "PAY001",
    name: "Payment of provisional Tax, Assessment Tax",
    price: 110,
    category: "taxation",
    subcategory: "Business Entities - (Co CC and Trust)",
    description: "Tax payment processing service",
    processing_time: "Same day"
  },

  // EMPLOYEE TAX (Duplicate category for taxation)
  {
    id: "emp101-taxation",
    code: "EMP101",
    name: "Registration of an Employer - Employer Tax, Skills Development Levy and UIF",
    price: 1850,
    category: "taxation",
    subcategory: "Employee Tax",
    description: "Complete employer registration with SARS for PAYE, SDL and UIF",
    processing_time: "5-7 Working Days"
  },
  {
    id: "emp123t-taxation", 
    code: "EMP123T",
    name: "Cancellation of Registration as Employer",
    price: 1200,
    category: "taxation",
    subcategory: "Employee Tax",
    description: "Cancel employer registration with SARS",
    processing_time: "3-5 Working Days"
  },
  {
    id: "irp3-taxation",
    code: "IRP3", 
    name: "Request for Tax Deduction Directive",
    price: 850,
    category: "taxation",
    subcategory: "Employee Tax",
    description: "Apply for tax deduction directive from SARS",
    processing_time: "10-15 Working Days"
  },
  {
    id: "irp5-it3-taxation",
    code: "IRP5/IT3",
    name: "Employees Tax Certificates/General Information Returns and Computation",
    price: 375,
    category: "taxation", 
    subcategory: "Employee Tax",
    description: "Prepare and issue employee tax certificates",
    processing_time: "Monthly/Annually"
  },
  {
    id: "emp501-taxation",
    code: "EMP501",
    name: "Employee's Tax Reconciliation", 
    price: 750,
    category: "taxation",
    subcategory: "Employee Tax",
    description: "Annual employee tax reconciliation submission",
    processing_time: "Annually - September"
  },
  {
    id: "emp201-taxation",
    code: "EMP201", 
    name: "Employee's Tax/SDL and UIF Remittance Return",
    price: 650,
    category: "taxation",
    subcategory: "Employee Tax",
    description: "Monthly PAYE, SDL and UIF returns",
    processing_time: "Monthly by 7th"
  },
  {
    id: "tadmin-taxation",
    code: "TADMIN",
    name: "Preparation of updating bank details/admin, changes at SARS",
    price: 375,
    category: "taxation",
    subcategory: "Employee Tax",
    description: "Update employer administrative details with SARS", 
    processing_time: "3-5 Working Days"
  },
  {
    id: "empsa-taxation",
    code: "EMPSA",
    name: "Payroll Taxes - Objection and Reconstruction", 
    price: 850,
    category: "taxation",
    subcategory: "Employee Tax",
    description: "Handle payroll tax disputes and reconstructions",
    processing_time: "15-30 Working Days"
  },

  // VALUE ADDED TAX
  {
    id: "vat101-taxation",
    code: "VAT101",
    name: "VAT registration",
    price: 1500,
    category: "taxation",
    subcategory: "Value Added Tax",
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
    id: "vat201-taxation",
    code: "VAT201", 
    name: "VAT return",
    price: 700,
    category: "taxation",
    subcategory: "Value Added Tax",
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

  // STATUTORY RETURNS - UIF
  {
    id: "uf1-taxation",
    code: "UF1",
    name: "UIF Registration - uFiling",
    price: 850, 
    category: "taxation",
    subcategory: "Statutory Returns - Unemployment Insurance Fund Act",
    description: "Register employer for UIF contributions",
    processing_time: "7-10 Working Days"
  },
  {
    id: "uf2-taxation",
    code: "UF2",
    name: "Monthly Return - UIF Declaration",
    price: 475,
    category: "taxation",
    subcategory: "Statutory Returns - Unemployment Insurance Fund Act",
    description: "Monthly UIF contribution returns", 
    processing_time: "Monthly - 7th"
  },
  {
    id: "uf19-taxation", 
    code: "UF19",
    name: "Employer Contribution Return - (Per Month if non payroll client)",
    price: 400,
    category: "taxation",
    subcategory: "Statutory Returns - Unemployment Insurance Fund Act",
    description: "UIF employer contribution calculations",
    processing_time: "Monthly"
  }
];

export const allTaxationProducts = taxationProducts;