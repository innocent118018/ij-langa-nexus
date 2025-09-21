import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { bookkeepingProducts } from '@/data/bookkeepingProducts';
import { 
  BookOpen, 
  Calculator, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  FileText, 
  ArrowRight,
  Award,
  BarChart3,
  Shield,
  Target,
  Database
} from 'lucide-react';

const BookkeepingServicesLanding = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-foreground to-secondary text-primary-foreground py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Bookkeeping Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Bookkeeping & Accounting
            </h1>
            <p className="text-xl mb-8 text-muted-foreground max-w-3xl mx-auto">
              It is very crucial for small and medium-sized businesses to know and understand the importance 
              of record keeping and financial statements. Monitoring business performance through record 
              keeping is vital, hence the need for a qualified accountant.
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

      {/* Importance Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Professional Bookkeeping Matters</h2>
            
            <div className="space-y-6 mb-12">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <p className="text-lg text-muted-foreground">
                    In so many instances business owners do not assess the performance and growth of their 
                    businesses and unfortunately, this has led to unexpected business failures and closures 
                    in South Africa and Africa as a continent.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-secondary">
                <CardContent className="p-6">
                  <p className="text-lg text-muted-foreground">
                    By law, taxpayers (Companies and Individuals) are required to keep certain tax records 
                    for 5 years. Businesses are also required to prepare Annual Financial Statements according 
                    to reporting standards i.e. International Financial Reporting Standards (IFRS) or 
                    International Financial Reporting Standards for Small to Medium-sized entities (IFRS for SMEs).
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Bookkeeping Services Include</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Proper Bookkeeping</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Proper bookkeeping/recordkeeping using appropriate accounting system
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Management Accounts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Preparation and review of monthly management accounts for management decision making
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Target className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Budgeting & Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Budgeting and review of budgets against actual performance
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Annual Financial Statements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Preparations and presentation of Annual Financial Statements
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CheckCircle className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Reconciliations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Monthly and yearly reconciliations for accurate financial reporting
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Database className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Fixed Asset Register</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Processing, updating and general maintenance of a fixed asset register
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Why Choose Our Bookkeeping Services?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Legal Compliance</h3>
                <p className="text-muted-foreground">
                  Ensuring all records meet legal requirements for 5-year retention
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Business Growth</h3>
                <p className="text-muted-foreground">
                  Monitor performance and growth to prevent business failures
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">IFRS Compliant</h3>
                <p className="text-muted-foreground">
                  Financial statements prepared according to IFRS standards
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional Systems</h3>
                <p className="text-muted-foreground">
                  Using appropriate accounting systems and software
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Accounting & Administrative Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional accounting services, certifications, and administrative support for your business
            </p>
          </div>

          <ProductGrid 
            products={bookkeepingProducts}
            category="bookkeeping"
            itemsPerPage={30}
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Financial Management?</h2>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Let our qualified accountants help you maintain proper records and monitor your business performance
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

export default BookkeepingServicesLanding;