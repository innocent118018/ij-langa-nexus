export interface BookkeepingProduct {
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

export const bookkeepingProducts: BookkeepingProduct[] = [
  // ACCOUNTING OFFICERS/PROFESSIONAL CERTIFICATES
  {
    id: "acc-cert-earnings",
    code: "ACC001",
    name: "Accounting officers/Accountants certificate iro Confirmation of Earnings",
    price: 1000,
    category: "bookkeeping",
    subcategory: "Professional Certificates",
    description: "Professional accountant certificate confirming earnings for various purposes",
    processing_time: "3-5 Working Days",
    requirements: [
      "Financial statements", 
      "Bank statements",
      "Payroll records",
      "Tax returns"
    ],
    features: [
      "Professional certification",
      "Earnings verification",
      "Compliance confirmation",
      "Official letterhead"
    ]
  },
  {
    id: "eme-qse-affidavits", 
    code: "ACC002",
    name: "EME/QSE Affidavits",
    price: 500,
    category: "bookkeeping",
    subcategory: "Professional Certificates",
    description: "Exempted Micro Enterprise and Qualifying Small Enterprise affidavits",
    processing_time: "2-3 Working Days",
    requirements: [
      "Annual turnover records",
      "Financial statements", 
      "Company registration",
      "Shareholding details"
    ],
    features: [
      "Turnover verification",
      "B-BBEE compliance",
      "Sworn affidavit",
      "Legal certification"
    ]
  },

  // GENERAL ANNUAL ADMINISTRATION FEES
  {
    id: "aaf1-main-trading",
    code: "AAF1", 
    name: "Main Trading Entity - Company/CC",
    price: 650,
    category: "bookkeeping",
    subcategory: "Annual Administration Fee",
    description: "Annual administration fee for main trading entity record keeping and storage",
    processing_time: "Ongoing Service",
    requirements: [
      "Active trading entity",
      "Financial records",
      "Company registers",
      "SARS profile access"
    ],
    features: [
      "Safe keeping of records",
      "Storage of registers", 
      "Telephonic support",
      "Electronic communication",
      "SARS eFiling maintenance"
    ]
  },
  {
    id: "aaf2-second-entity",
    code: "AAF2",
    name: "2nd Trading Entity - Company/CC", 
    price: 350,
    category: "bookkeeping",
    subcategory: "Annual Administration Fee",
    description: "Annual administration fee for second trading entity",
    processing_time: "Ongoing Service",
    features: [
      "Additional entity support",
      "Record maintenance",
      "Multi-entity management",
      "Consolidated reporting"
    ]
  },
  {
    id: "aaf3-third-entity",
    code: "AAF3",
    name: "3rd Trading Entity - Company/CC/Trust/Partnership",
    price: 250, 
    category: "bookkeeping",
    subcategory: "Annual Administration Fee",
    description: "Annual administration fee for third trading entity or trust/partnership",
    processing_time: "Ongoing Service",
    features: [
      "Multi-entity support",
      "Complex structure management",
      "Trust administration",
      "Partnership record keeping"
    ]
  },
  {
    id: "aaf4-dormant",
    code: "AAF4",
    name: "No Trading entity/property company/CC - Dormant at SARS",
    price: 250,
    category: "bookkeeping", 
    subcategory: "Annual Administration Fee",
    description: "Annual administration fee for dormant entities",
    processing_time: "Ongoing Service",
    requirements: [
      "Dormant status confirmation",
      "SARS dormant registration",
      "Minimal activity records"
    ],
    features: [
      "Dormant entity maintenance",
      "Compliance monitoring", 
      "Status updates",
      "Reactivation support"
    ]
  },

  // PAYROLL ADMINISTRATION
  {
    id: "payroll-1-10",
    code: "PAY001",
    name: "Payroll Administration - 1-10 employees",
    price: 450,
    category: "bookkeeping",
    subcategory: "Payroll Administration",
    description: "Monthly payroll processing for small businesses (1-10 employees)",
    processing_time: "Monthly",
    requirements: [
      "Employee details",
      "Time sheets",
      "Leave records", 
      "Banking details"
    ],
    features: [
      "Salary calculations",
      "Tax deductions", 
      "UIF/SDL processing",
      "Payslip generation",
      "EMP201 submission"
    ]
  },
  {
    id: "payroll-11-50",
    code: "PAY002", 
    name: "Payroll Administration - 11-50 employees",
    price: 350,
    category: "bookkeeping",
    subcategory: "Payroll Administration",
    description: "Monthly payroll processing for medium businesses (11-50 employees)",
    processing_time: "Monthly",
    features: [
      "Bulk payroll processing",
      "Employee self-service",
      "Automated calculations",
      "Compliance reporting"
    ]
  },
  {
    id: "payroll-50-100",
    code: "PAY003",
    name: "Payroll Administration - 50-100 employees", 
    price: 250,
    category: "bookkeeping",
    subcategory: "Payroll Administration",
    description: "Monthly payroll processing for larger businesses (50-100 employees)",
    processing_time: "Monthly",
    features: [
      "Enterprise payroll",
      "Advanced reporting",
      "Integration capabilities",
      "Dedicated support"
    ]
  },
  {
    id: "payroll-100-500",
    code: "PAY004",
    name: "Payroll Administration - 100-500 employees",
    price: 150,
    category: "bookkeeping",
    subcategory: "Payroll Administration",
    description: "Monthly payroll processing for large enterprises (100-500 employees)", 
    processing_time: "Monthly",
    features: [
      "Large scale processing",
      "Custom reporting",
      "API integrations",
      "Priority support"
    ]
  },

  // HUMAN RESOURCES AND RELATED SERVICES
  {
    id: "employment-contract",
    code: "HR001",
    name: "Employment Contract to specification",
    category: "bookkeeping",
    subcategory: "Human Resources and Related Services",
    description: "Customized employment contracts drafted to client specifications - Fee as negotiated",
    processing_time: "3-5 Working Days",
    requirements: [
      "Job description",
      "Salary details",
      "Company policies",
      "Specific requirements"
    ],
    features: [
      "Legal compliance",
      "Customized terms",
      "Industry standards",
      "Professional drafting"
    ]
  }
];

export const allBookkeepingProducts = bookkeepingProducts;