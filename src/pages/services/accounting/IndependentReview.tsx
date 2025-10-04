import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, CheckCircle, Clock, Shield, FileCheck } from 'lucide-react';

const IndependentReview = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Search className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium text-primary">Accounting Services</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Independent Review
                </h1>
                <p className="text-lg text-muted-foreground">
                  Professional independent review of financial statements by qualified accountants
                </p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <div className="text-3xl font-bold text-primary mb-2">
                  From R5,500
                </div>
                <div className="flex items-center text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  Annual Service
                </div>
                <Button size="lg">
                  Request Quote
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
                  Review Procedures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Analytical procedures</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Inquiry and discussion</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Review of accounting records</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Subsequent events review</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Management representation letter</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Independent reviewer's report</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Why Choose Independent Review?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Lower cost than full audit</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Acceptable to most banks</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Meets Companies Act requirements</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Independent assurance on financials</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* When Required */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>When is Independent Review Required?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Companies Act Requirements</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Public interest score over 100 but under 350</li>
                    <li>• Annual revenue over R10 million</li>
                    <li>• More than 50 employees</li>
                    <li>• Third party accountability</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Optional Benefits</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Bank funding applications</li>
                    <li>• Investor requirements</li>
                    <li>• Enhanced credibility</li>
                    <li>• Internal control insights</li>
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

export default IndependentReview;