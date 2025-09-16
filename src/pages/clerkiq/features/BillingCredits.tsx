import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, DollarSign, Clock, Shield, CheckCircle, HelpCircle } from 'lucide-react';

const BillingCredits = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Billing and Credits</h1>
          <p className="text-muted-foreground">
            Learn about ClerkiQ's simple pay-as-you-go credit system and how to manage your billing.
          </p>
        </div>

        {/* How It Works */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">The billing model is built on two simple concepts:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <h3 className="font-semibold">Free Platform Access</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Every user gets complete access to all of ClerkiQ's features without any recurring subscription fees.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CreditCard className="h-6 w-6 text-primary" />
                    <h3 className="font-semibold">Page Credits</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    To process bank statements, you use credits. One credit equals one page of a bank statement.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                This approach ensures you only pay for what you actually use.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Free Trial */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">Free Trial</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              To help you get started and experience the full power of ClerkiQ, every new account automatically receives:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">30 Free Trial Credits</p>
                  <p className="text-sm text-muted-foreground">Use these credits to process your first 30 pages of bank statements at no cost.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">No Time Limit on Trial</p>
                  <p className="text-sm text-muted-foreground">Your trial credits don't expire.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="font-medium">No Credit Card Required</p>
                  <p className="text-sm text-muted-foreground">You can start using ClerkiQ right away without providing any payment information.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Purchasing Credits */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Purchasing Additional Page Credits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Once you've used your free trial credits, you can easily purchase more to continue processing statements. 
              We offer several credit bundles with volume discounts—the larger the bundle, the lower the cost per page.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Small</div>
                  <div className="text-lg font-semibold mb-1">R175</div>
                  <div className="text-sm text-muted-foreground mb-2">50 credits</div>
                  <div className="text-xs text-muted-foreground">R3.50 per page</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center border-primary">
                  <Badge className="mb-2">Best Value</Badge>
                  <div className="text-2xl font-bold text-primary mb-2">Medium</div>
                  <div className="text-lg font-semibold mb-1">R300</div>
                  <div className="text-sm text-muted-foreground mb-2">100 credits</div>
                  <div className="text-xs text-muted-foreground">R3.00 per page</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Large</div>
                  <div className="text-lg font-semibold mb-1">R1,250</div>
                  <div className="text-sm text-muted-foreground mb-2">500 credits</div>
                  <div className="text-xs text-muted-foreground">R2.50 per page</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Enterprise</div>
                  <div className="text-lg font-semibold mb-1">R1,750</div>
                  <div className="text-sm text-muted-foreground mb-2">1000 credits</div>
                  <div className="text-xs text-muted-foreground">R1.75 per page</div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-3 mt-6">
              <h4 className="font-semibold">Key Benefits:</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Credits Never Expire: Any credits you purchase will remain in your account until you use them.</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Top-Up Anytime: Purchase more credits whenever you need them directly from your account's billing section.</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Managing Billing */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Managing Your Billing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Viewing Your Credit Balance</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">1</span>
                  <span>Navigate to the Billing section in your dashboard.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">2</span>
                  <span>Your current credit balance is clearly displayed, showing both remaining trial credits and purchased credits.</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Purchasing Credits</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">1</span>
                  <span>Go to the Billing section.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">2</span>
                  <span>In the Page Credits card, select your preferred bundle.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">3</span>
                  <span>Click Purchase to complete your order through our secure Stripe checkout.</span>
                </div>
              </div>
              <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-700">
                  <strong>Note:</strong> Only account owners or members with billing permissions can purchase credits.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              ClerkiQ uses Stripe for secure payment processing and supports:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-primary" />
                <span>Credit cards (Visa, Mastercard, American Express)</span>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-primary" />
                <span>Debit cards (supported by Stripe)</span>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">To manage your payment methods or download invoices:</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">1</span>
                  <span>Go to the Billing section.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">2</span>
                  <span>Click Visit Billing Portal.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">3</span>
                  <div>
                    <span>In the Stripe billing portal, you can:</span>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>Update your payment method</li>
                      <li>Download invoices</li>
                      <li>View your payment history</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Billing FAQs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Q: Are there any monthly fees or hidden costs?</h3>
              <p className="text-muted-foreground">
                A: No. ClerkiQ is a pure pay-as-you-go service. You only pay for the credits you purchase. There are no subscription fees, setup costs, or feature gates.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Q: Do my credits expire?</h3>
              <p className="text-muted-foreground">
                A: No, both trial credits and purchased credits never expire.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Q: What happens when I run out of credits?</h3>
              <p className="text-muted-foreground">
                A: The application will notify you when your credit balance is low. If your balance reaches zero, you will be unable to process new bank statements until you purchase additional credits.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Q: Who can purchase credits?</h3>
              <p className="text-muted-foreground">
                A: To ensure security and control, only the account owner or team members who have been granted "billing.manage" permissions can purchase credits.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Q: How do I get invoices for my purchases?</h3>
              <p className="text-muted-foreground">
                A: All your invoices are available for download from the Stripe billing portal, accessible from your account's billing section.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Ready to get started?</h3>
            <p className="text-muted-foreground mb-4">
              Begin with 30 free credits and experience ClerkiQ's transparent pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/clerkiq/pricing">View Pricing</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/auth">Start Free Trial</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillingCredits;