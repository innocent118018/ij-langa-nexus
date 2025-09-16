import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, ArrowRight, FileText, Users, Shield, CreditCard } from 'lucide-react';

const ClerkIQ = () => {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Bank Statement Processing",
      description: "Streamline the reconciliation process with automated bank statement processing. Upload statements and have transactions automatically extracted, categorized, and verified.",
      link: "/clerkiq/features/bank-statements"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Team Management",
      description: "Manage your accounting firm's team members efficiently. Invite colleagues, assign roles with appropriate permissions, and collaborate seamlessly.",
      link: "/clerkiq/features/team-management"
    },
    {
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      title: "Billing and Credits",
      description: "Simple pay-as-you-go pricing model with page credit system. Full access to all features with no monthly subscriptions - only pay for pages you process.",
      link: "/clerkiq/features/billing-credits"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Account Security & MFA",
      description: "Enhanced account security using Multi-Factor Authentication (MFA) to protect sensitive financial information from unauthorized access.",
      link: "/clerkiq/features/security-mfa"
    }
  ];

  const comingSoonFeatures = [
    "Invoice Processing - Automatically extract and process invoice data from various formats",
    "Account Integration - Connect directly with popular accounting software platforms",
    "Advanced Reporting - Generate insightful reports and analytics based on processed data",
    "Multi-Currency Support - Process invoices and statements in multiple currencies",
    "Custom Validation Rules - Tailor ClerkiQ to your specific needs",
    "Configurable Processing Workflows - Personalized export formats"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            ClerkiQ
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            AI-powered tools designed to automate time-consuming accounting tasks, allowing South African accountants and accounting firms to focus on high-value work for their clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/clerkiq/pricing">
                Get Started with 30 Free Credits
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/clerkiq/features/bank-statements">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Simple Credit-Based Pricing</h2>
            <p className="text-xl text-muted-foreground">Pay Only For What You Process</p>
            <p className="text-muted-foreground mt-2">
              No subscriptions, no monthly fees. Get 30 trial credits when you create your team, then purchase more credits as needed. All features included with every purchase.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">99%</div>
              <div className="text-sm text-muted-foreground">AI Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">
                <CheckCircle className="h-8 w-8 mx-auto" />
              </div>
              <div className="text-sm text-muted-foreground">Side-by-Side Verification</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">CSV</div>
              <div className="text-sm text-muted-foreground">Email-to-CSV Processing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">12</div>
              <div className="text-sm text-muted-foreground">Month Statement History</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">
                <Star className="h-8 w-8 mx-auto" />
              </div>
              <div className="text-sm text-muted-foreground">All Advanced Features</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">ClerkiQ Features</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to automate your accounting processes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    {feature.icon}
                    <div>
                      <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Button variant="outline" asChild>
                    <Link to={feature.link}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ClerkIQ Credit Pricing Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Credit Packages</h2>
            <p className="text-xl text-muted-foreground">
              Simple, transparent pricing for AI-powered bank statement processing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Small</CardTitle>
                <div className="text-2xl font-bold text-primary">R175</div>
                <p className="text-sm text-muted-foreground">for 50 page credits</p>
                <p className="text-xs text-muted-foreground">R3.50 per page</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>50 page processing credits</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Credits never expire</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>All premium features included</span>
                  </div>
                </div>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/clerkiq/pricing">Try for Free</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-primary relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Best Value</Badge>
              <CardHeader>
                <CardTitle>Medium</CardTitle>
                <div className="text-2xl font-bold text-primary">R300</div>
                <p className="text-sm text-muted-foreground">for 100 page credits</p>
                <p className="text-xs text-muted-foreground">R3.00 per page</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>100 page processing credits</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Credits never expire</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>All premium features included</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link to="/clerkiq/pricing">Try for Free</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle>Large</CardTitle>
                <div className="text-2xl font-bold text-primary">R1,250</div>
                <p className="text-sm text-muted-foreground">for 500 page credits</p>
                <p className="text-xs text-muted-foreground">R2.50 per page</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>500 page processing credits</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Credits never expire</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>All premium features included</span>
                  </div>
                </div>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/clerkiq/pricing">Try for Free</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <div className="text-2xl font-bold text-primary">R1,750</div>
                <p className="text-sm text-muted-foreground">for 1000 page credits</p>
                <p className="text-xs text-muted-foreground">R1.75 per page</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>1000 page processing credits</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Credits never expire</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>All premium features included</span>
                  </div>
                </div>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/clerkiq/pricing">Try for Free</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
            <p className="text-xl text-muted-foreground">
              We're continuously expanding our platform capabilities
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {comingSoonFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-muted/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Collaboration */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Team Collaboration</h2>
            <p className="text-xl text-muted-foreground">
              ClerkiQ is built with accounting teams in mind
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Team-based Access Control</h3>
                <p className="text-sm text-muted-foreground">Control who can access what</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Shared Document Libraries</h3>
                <p className="text-sm text-muted-foreground">Centralized document storage</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Processing Status Tracking</h3>
                <p className="text-sm text-muted-foreground">Track all processing activities</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Activity Logs & Audit Trails</h3>
                <p className="text-sm text-muted-foreground">Complete audit history</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">
            Ready to Transform Your Accounting Workflow?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Start with 30 free credits and experience the power of AI-driven accounting automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/clerkiq/pricing">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/contact">
                Contact Sales
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClerkIQ;