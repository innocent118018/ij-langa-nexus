import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, CheckCircle, Clock, Zap, User } from 'lucide-react';

const EfilingRegistration = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium text-primary">Taxation Services</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  eFiling Registration
                </h1>
                <p className="text-lg text-muted-foreground">
                  Get registered on SARS eFiling system for online tax submissions
                </p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <div className="text-3xl font-bold text-primary mb-2">
                  R250
                </div>
                <div className="flex items-center text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  Same Day Service
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
                    <span>eFiling profile setup</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Username and password creation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Security questions setup</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Contact details verification</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Banking details setup</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Login credentials provided</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary" />
                  What We Need From You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Copy of South African ID document</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>SARS tax number (if available)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Contact details (cell phone & email)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Banking details for refunds</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Benefits */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Benefits of eFiling</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Fast Processing</h3>
                  <p className="text-sm text-muted-foreground">Instant submission and faster refund processing</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">24/7 Access</h3>
                  <p className="text-sm text-muted-foreground">Submit returns anytime, anywhere with internet access</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Secure & Reliable</h3>
                  <p className="text-sm text-muted-foreground">Secure transmission and instant confirmation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="bg-primary text-primary-foreground rounded-lg p-8 mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to register for eFiling?</h2>
            <p className="text-lg mb-6">
              Get started with online tax submissions today
            </p>
            <Button variant="secondary" size="lg">
              Order eFiling Registration
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EfilingRegistration;