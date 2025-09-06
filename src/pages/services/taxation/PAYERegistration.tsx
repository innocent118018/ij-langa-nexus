import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CheckCircle, Clock, UserPlus, Calculator } from 'lucide-react';

const PAYERegistration = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium text-primary">Payroll Services</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  PAYE Registration (EMP101)
                </h1>
                <p className="text-lg text-muted-foreground">
                  Register as an employer for PAYE, Skills Development Levy, and UIF
                </p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <div className="text-3xl font-bold text-primary mb-2">
                  R1,850
                </div>
                <div className="flex items-center text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  7-14 Working Days
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
                    <span>EMP101 form completion</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>PAYE registration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Skills Development Levy registration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>UIF employer registration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>SARS employer number allocation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Payroll compliance guidance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* When Required */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserPlus className="h-5 w-5 mr-2 text-primary" />
                  When You Need This
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Hiring your first employee</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Paying directors/members salaries</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Contract worker payments</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Commission-based payments</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Professional services payments</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Registration Components */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>What You're Registering For</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">PAYE</h3>
                  <p className="text-sm text-muted-foreground">
                    Pay As You Earn income tax deduction from employee salaries
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-blue-600">SDL</span>
                  </div>
                  <h3 className="font-semibold mb-2">Skills Development Levy</h3>
                  <p className="text-sm text-muted-foreground">
                    1% of payroll for skills development (payroll &gt; R500,000)
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-green-600">UIF</span>
                  </div>
                  <h3 className="font-semibold mb-2">Unemployment Insurance</h3>
                  <p className="text-sm text-muted-foreground">
                    2% of salary (1% employee, 1% employer contribution)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ongoing Obligations */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Ongoing Obligations After Registration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-primary">Monthly Requirements</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Submit EMP201 return by 7th of following month</li>
                    <li>• Pay PAYE, UIF, and SDL by 7th</li>
                    <li>• Submit UIF declarations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-primary">Annual Requirements</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Issue IRP5 certificates to employees</li>
                    <li>• Submit EMP501 reconciliation</li>
                    <li>• File annual UIF returns</li>
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

export default PAYERegistration;