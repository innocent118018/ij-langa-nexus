import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { allPayrollProducts } from '@/data/payrollProducts';
import { 
  Users, 
  Calculator, 
  Shield, 
  CheckCircle, 
  Clock, 
  FileText, 
  ArrowRight,
  Award,
  DollarSign,
  Briefcase
} from 'lucide-react';

const PayrollServicesLanding = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-foreground to-secondary text-primary-foreground py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Payroll Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Payroll Management
            </h1>
            <p className="text-xl mb-8 text-muted-foreground max-w-3xl mx-auto">
              We can free up time spent on payroll functions and save you costs of hiring staff to perform 
              these functions. Our processes are developed to ensure all payroll functions and related 
              activities are performed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Get Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-border">
                View All Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Payroll Services Include</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <Calculator className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Monthly Payroll Preparation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Preparation of the payroll on a monthly basis with accurate calculations
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Payslip Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Processing and submission of payslips to employees electronically
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <DollarSign className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Salary Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Payment of net salaries to employees through secure banking
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Detailed Reporting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Providing detailed payroll reports on employees leave, earnings, deductions, etc.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Tax Calculations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Calculation of amounts due for PAYE, SDL and UIF with full compliance
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Briefcase className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Year-end Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Preparing and issuing of IRP5s to employees at tax year-end
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CheckCircle className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Payroll Tax Returns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Calculating the payroll taxes – EMP201 and EMP501 submissions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Award className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">SARS Liaison</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Manage communication from SARS and other institutions relating to the payroll
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Clock className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Compliance Advice</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Advise on the amount payable to SARS in respect of PAYE and SDL
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Payroll Services?</h2>
            <p className="text-lg text-muted-foreground mb-12">
              We keep ourselves up to date with legislative changes ensuring compliance is met with all 
              payroll authorities. We provide you with a payroll system were your employee information 
              is kept in a safe and secure environment.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Safe</h3>
                <p className="text-muted-foreground">
                  Employee information kept in a safe and secure environment
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Always Compliant</h3>
                <p className="text-muted-foreground">
                  Up to date with legislative changes and regulatory requirements
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Time Saving</h3>
                <p className="text-muted-foreground">
                  Free up time spent on payroll functions for core business activities
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cost Effective</h3>
                <p className="text-muted-foreground">
                  Save costs of hiring staff to perform payroll functions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Employee Tax Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive employee tax services to ensure compliance with SARS requirements
            </p>
          </div>

          <ProductGrid 
            products={allPayrollProducts}
            category="payroll"
            itemsPerPage={30}
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Outsource Your Payroll?</h2>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Let us handle your payroll complexities while you focus on growing your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary">
                Get Quote Now
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-border">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PayrollServicesLanding;