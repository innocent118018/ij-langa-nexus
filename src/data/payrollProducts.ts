export interface PayrollProduct {
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

export const payrollProducts: PayrollProduct[] = [
  {
    id: "emp101",
    code: "EMP101",
    name: "Registration of an Employer - Employer Tax, Skills Development Levy and UIF",
    price: 1850,
    category: "payroll",
    description: "Complete employer registration with SARS for PAYE, SDL and UIF",
    processing_time: "5-7 Working Days",
    requirements: [
      "Company registration documents",
      "Banking details", 
      "Director ID copies",
      "Proof of business address"
    ],
    features: [
      "PAYE registration",
      "SDL registration", 
      "UIF registration",
      "SARS profile setup",
      "eFiling access"
    ]
  },
  {
    id: "emp123t", 
    code: "EMP123T",
    name: "Cancellation of Registration as Employer",
    price: 1200,
    category: "payroll",
    description: "Cancel employer registration with SARS",
    processing_time: "3-5 Working Days",
    requirements: [
      "Final payroll run",
      "Outstanding returns submitted",
      "Final EMP201 filed",
      "All tax obligations settled"
    ],
    features: [
      "Cancellation application",
      "SARS correspondence",
      "Final compliance check", 
      "Confirmation certificate"
    ]
  },
  {
    id: "irp3",
    code: "IRP3", 
    name: "Request for Tax Deduction Directive",
    price: 850,
    category: "payroll",
    description: "Apply for tax deduction directive from SARS",
    processing_time: "10-15 Working Days",
    requirements: [
      "Employee details",
      "Reason for directive",
      "Supporting documentation",
      "Previous year tax certificate"
    ],
    features: [
      "Directive application",
      "SARS submission",
      "Follow-up correspondence",
      "Directive implementation"
    ]
  },
  {
    id: "irp5-it3",
    code: "IRP5/IT3",
    name: "Employees Tax Certificates/General Information Returns and Computation",
    price: 375,
    category: "payroll", 
    description: "Prepare and issue employee tax certificates",
    processing_time: "Monthly/Annually",
    requirements: [
      "Payroll records",
      "Employee details",
      "Tax deductions",
      "Fringe benefit details"
    ],
    features: [
      "IRP5 preparation",
      "IT3(a) compilation",
      "Annual reconciliation",
      "Employee distribution"
    ]
  },
  {
    id: "emp501",
    code: "EMP501",
    name: "Employee's Tax Reconciliation", 
    price: 750,
    category: "payroll",
    description: "Annual employee tax reconciliation submission",
    processing_time: "Annually - September",
    requirements: [
      "Annual payroll summary",
      "All IRP5 certificates",
      "Tax deductions summary",
      "Employee register"
    ],
    features: [
      "EMP501 compilation",
      "Annual reconciliation",
      "SARS submission", 
      "Discrepancy resolution"
    ]
  },
  {
    id: "emp201",
    code: "EMP201", 
    name: "Employee's Tax/SDL and UIF Remittance Return",
    price: 650,
    category: "payroll",
    description: "Monthly PAYE, SDL and UIF returns",
    processing_time: "Monthly by 7th",
    requirements: [
      "Monthly payroll",
      "Tax calculations",
      "SDL calculations", 
      "UIF calculations"
    ],
    features: [
      "Monthly EMP201",
      "Tax calculations",
      "eFiling submission",
      "Payment advice"
    ]
  },
  {
    id: "tadmin",
    code: "TADMIN",
    name: "Preparation of updating bank details/admin, changes at SARS",
    price: 375,
    category: "payroll",
    description: "Update employer administrative details with SARS", 
    processing_time: "3-5 Working Days",
    requirements: [
      "New bank details",
      "Proof of banking",
      "Authorization letter",
      "Company resolution"
    ],
    features: [
      "Bank detail updates",
      "Address changes",
      "Contact updates",
      "SARS correspondence"
    ]
  },
  {
    id: "empsa",
    code: "EMPSA",
    name: "Payroll Taxes - Objection and Reconstruction", 
    price: 850,
    category: "payroll",
    description: "Handle payroll tax disputes and reconstructions",
    processing_time: "15-30 Working Days",
    requirements: [
      "Assessment notices", 
      "Payroll records",
      "Supporting documentation",
      "Grounds for objection"
    ],
    features: [
      "Objection preparation",
      "Tax reconstruction",
      "SARS representation", 
      "Settlement negotiation"
    ]
  }
];