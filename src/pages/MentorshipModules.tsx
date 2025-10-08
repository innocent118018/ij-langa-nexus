import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, FileText, Brain, Award } from "lucide-react";

export const MentorshipModules = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Mentorship Curriculum</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive, school-style learning modules designed to take you from business idea to successful operation
          </p>
        </div>

        <Tabs defaultValue="module1" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="module1">Module 1</TabsTrigger>
            <TabsTrigger value="module2">Module 2</TabsTrigger>
            <TabsTrigger value="module3">Module 3</TabsTrigger>
          </TabsList>

          {/* MODULE 1 */}
          <TabsContent value="module1" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Module 1: Preparing to Start a Business</h3>
                  <p className="text-muted-foreground">Foundation for successful business launch</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Learning Objectives
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-sm ml-7">
                    <li>Identify viable business ideas based on skills, passions, and market needs</li>
                    <li>Conduct basic market research and competitor analysis</li>
                    <li>Assess personal financial readiness</li>
                    <li>Draft a mini-business plan with goals and projected expenses</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Lesson Topics
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4 bg-muted/50">
                      <h5 className="font-medium mb-2">1. Choosing a Business Idea</h5>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Identify your skills, passions, and market needs</li>
                        <li>• Evaluate profitability and sustainability</li>
                        <li>• Consider startup costs and competition</li>
                      </ul>
                    </Card>
                    <Card className="p-4 bg-muted/50">
                      <h5 className="font-medium mb-2">2. Market Research & Feasibility</h5>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Conduct surveys and interviews</li>
                        <li>• Assess competitors and positioning</li>
                        <li>• Create SWOT analysis</li>
                      </ul>
                    </Card>
                    <Card className="p-4 bg-muted/50">
                      <h5 className="font-medium mb-2">3. Personal Finance Readiness</h5>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Review savings and available capital</li>
                        <li>• Consider funding options</li>
                        <li>• Plan for contingencies</li>
                      </ul>
                    </Card>
                    <Card className="p-4 bg-muted/50">
                      <h5 className="font-medium mb-2">4. Business Goals & Planning</h5>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Set SMART goals</li>
                        <li>• Create simple business plan</li>
                        <li>• Define target market & strategy</li>
                      </ul>
                    </Card>
                  </div>
                </div>

                <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200">
                  <h4 className="font-semibold mb-3">📘 Case Study: Sibusiso's Catering Business</h4>
                  <p className="text-sm mb-3">
                    <strong>Scenario:</strong> Sibusiso wants to start a small catering business in Nelspruit with R10,000 to invest. 
                    He wants to sell lunch boxes to offices and small events.
                  </p>
                  <div className="text-sm space-y-1">
                    <p><strong>Tasks:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Identify Sibusiso's target market</li>
                      <li>Conduct basic competitor analysis</li>
                      <li>List potential strengths and weaknesses</li>
                      <li>Create mini-business plan with goals and expenses</li>
                    </ul>
                  </div>
                </Card>

                <Card className="p-4 bg-green-50 dark:bg-green-900/20 border-green-200">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Module 1 Assessment
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    This module includes a comprehensive quiz covering business planning, market research, and goal setting.
                  </p>
                  <p className="text-sm font-medium">
                    🔒 Quiz available to enrolled students only
                  </p>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* MODULE 2 */}
          <TabsContent value="module2" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Module 2: Registering Your Business</h3>
                  <p className="text-muted-foreground">Legal registration and compliance foundations</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Learning Objectives
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-sm ml-7">
                    <li>Understand CIPC registration process</li>
                    <li>Know SARS registration requirements</li>
                    <li>Recognize business compliance categories</li>
                    <li>Maintain accurate business records</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Lesson Topics
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4 bg-muted/50">
                      <h5 className="font-medium mb-2">1. Business Structures in SA</h5>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Sole Proprietor - Simple, owner liable</li>
                        <li>• Partnership - Shared ownership</li>
                        <li>• Pty Ltd - Limited liability</li>
                        <li>• NPC - Non-profit company</li>
                      </ul>
                    </Card>
                    <Card className="p-4 bg-muted/50">
                      <h5 className="font-medium mb-2">2. Choosing Business Name</h5>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Check CIPC availability</li>
                        <li>• Avoid prohibited words</li>
                        <li>• Consider branding appeal</li>
                        <li>• Reserve name before registration</li>
                      </ul>
                    </Card>
                    <Card className="p-4 bg-muted/50">
                      <h5 className="font-medium mb-2">3. CIPC Registration</h5>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Complete registration forms</li>
                        <li>• Provide certified ID copies</li>
                        <li>• Pay registration fees</li>
                        <li>• Receive registration certificate</li>
                      </ul>
                    </Card>
                    <Card className="p-4 bg-muted/50">
                      <h5 className="font-medium mb-2">4. Tax Registration (SARS)</h5>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Income tax (automatic)</li>
                        <li>• VAT (if threshold met)</li>
                        <li>• PAYE (for employees)</li>
                        <li>• Update banking details</li>
                      </ul>
                    </Card>
                  </div>
                </div>

                <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200">
                  <h4 className="font-semibold mb-3">📘 Case Study: Lerato's Online Clothing Store</h4>
                  <p className="text-sm mb-3">
                    <strong>Scenario:</strong> Lerato wants to register her online clothing business as a Pty Ltd in Pretoria. 
                    She will have 2 partners and plans to hire 3 employees in the first year.
                  </p>
                  <div className="text-sm space-y-1">
                    <p><strong>Tasks:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Decide if Pty Ltd is appropriate and explain why</li>
                      <li>List documents needed for CIPC submission</li>
                      <li>Identify required SARS tax registrations</li>
                      <li>Note additional compliance (UIF, COIDA)</li>
                    </ul>
                  </div>
                </Card>

                <Card className="p-4 bg-green-50 dark:bg-green-900/20 border-green-200">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Module 2 Assessment
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    This module includes a quiz on business structures, CIPC registration, and SARS compliance.
                  </p>
                  <p className="text-sm font-medium">
                    🔒 Quiz available to enrolled students only
                  </p>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* MODULE 3 */}
          <TabsContent value="module3" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Module 3: Business Compliance & Licensing</h3>
                  <p className="text-muted-foreground">Maintain regulatory compliance and licenses</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Learning Objectives
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-sm ml-7">
                    <li>Identify regulatory bodies (SARS, UIF, COIDA, NHBRC, CIDB)</li>
                    <li>Complete registrations for employees and operations</li>
                    <li>Create compliance calendar and checklist</li>
                    <li>Understand non-compliance consequences and remediation</li>
                    <li>Prepare documentation for industry-specific licenses</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Key Regulatory Bodies</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4 bg-muted/50">
                      <h5 className="font-medium mb-2">SARS</h5>
                      <p className="text-sm text-muted-foreground">Tax obligations: Income Tax, VAT, PAYE, Provisional Tax</p>
                    </Card>
                    <Card className="p-4 bg-muted/50">
                      <h5 className="font-medium mb-2">CIPC</h5>
                      <p className="text-sm text-muted-foreground">Company registration and annual returns</p>
                    </Card>
                    <Card className="p-4 bg-muted/50">
                      <h5 className="font-medium mb-2">UIF</h5>
                      <p className="text-sm text-muted-foreground">Unemployment Insurance Fund - employer registration for employees</p>
                    </Card>
                    <Card className="p-4 bg-muted/50">
                      <h5 className="font-medium mb-2">COIDA</h5>
                      <p className="text-sm text-muted-foreground">Compensation Fund - workplace injury cover</p>
                    </Card>
                    <Card className="p-4 bg-muted/50">
                      <h5 className="font-medium mb-2">NHBRC</h5>
                      <p className="text-sm text-muted-foreground">National Home Builders Registration - construction compliance</p>
                    </Card>
                    <Card className="p-4 bg-muted/50">
                      <h5 className="font-medium mb-2">CIDB</h5>
                      <p className="text-sm text-muted-foreground">Construction Industry Development Board - contractor grading</p>
                    </Card>
                  </div>
                </div>

                <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200">
                  <h4 className="font-semibold mb-3">⚠️ Non-Compliance Consequences</h4>
                  <ul className="text-sm space-y-2 list-disc list-inside">
                    <li>Penalties and interest charges</li>
                    <li>Criminal charges in severe cases</li>
                    <li>Licenses revoked</li>
                    <li>Inability to tender for projects</li>
                    <li>Possible business closure</li>
                  </ul>
                  <div className="mt-3 pt-3 border-t border-yellow-200">
                    <p className="text-sm font-medium mb-1">Remedial Steps:</p>
                    <p className="text-sm">Request remission, submit RFC (Request for Correction), lodge objection, or apply for VDA (Voluntary Disclosure)</p>
                  </div>
                </Card>

                <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200">
                  <h4 className="font-semibold mb-3">📘 Case Study: Mkhize Construction</h4>
                  <p className="text-sm mb-3">
                    <strong>Scenario:</strong> Mkhize Construction (Pty) Ltd is a new Grade-2 contractor in Ermelo. 
                    They plan to bid for municipal housing projects with 8 workers. They are not yet registered with CIDB, 
                    NHBRC, or COIDA.
                  </p>
                  <div className="text-sm space-y-1">
                    <p><strong>Tasks:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Identify all mandatory registrations and licenses needed</li>
                      <li>Create step-by-step priority checklist with timelines</li>
                      <li>Identify documentation for COIDA, CIDB, and NHBRC</li>
                      <li>Draft email to municipal procurement office</li>
                    </ul>
                  </div>
                </Card>

                <Card className="p-4 bg-green-50 dark:bg-green-900/20 border-green-200">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Module 3 Assessment
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Comprehensive assessment covering regulatory compliance, licensing requirements, and risk management (8 questions, 16 marks).
                  </p>
                  <p className="text-sm font-medium">
                    🔒 Quiz available to enrolled students only
                  </p>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
