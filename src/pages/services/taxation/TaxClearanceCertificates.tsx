import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, CheckCircle, Clock, FileText, Shield } from 'lucide-react';

const TaxClearanceCertificates = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Award className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium text-primary">Business Compliance</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Tax Clearance Certificates
                </h1>
                <p className="text-lg text-muted-foreground">
                  Good standing certificates for tenders, contracts, and business requirements
                </p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <div className="text-3xl font-bold text-primary mb-2">
                  R950
                </div>
                <div className="flex items-center text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  3-5 Working Days
                </div>
                <Button size="lg">
                  Order Now
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  What's Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Tax compliance verification</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Certificate application</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>SARS correspondence</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Outstanding matters resolution</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Certificate delivery</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Uses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  When You Need This
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Government tender applications</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Large contract requirements</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Banking applications</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>License renewals</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Business sale/purchase</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Requirements */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Requirements for Tax Clearance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-primary">Current Requirements</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• All tax returns filed and up to date</li>
                    <li>• No outstanding tax debt</li>
                    <li>• Valid tax registration</li>
                    <li>• Compliant provisional tax payments</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-primary">Common Issues We Resolve</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Outstanding return submissions</li>
                    <li>• Payment arrangement applications</li>
                    <li>• Dispute resolution</li>
                    <li>• Registration updates</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaxClearanceCertificates;