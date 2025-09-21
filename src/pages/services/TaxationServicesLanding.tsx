import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { taxationProducts } from '@/data/taxationProducts';
import { 
  FileText, 
  Calculator, 
  Shield, 
  CheckCircle, 
  Clock, 
  Users, 
  ArrowRight,
  Award,
  Building,
  DollarSign,
  Target,
  TrendingUp
} from 'lucide-react';

const TaxationServicesLanding = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-foreground to-secondary text-primary-foreground py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Taxation Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Expert Tax Services & Compliance
            </h1>
            <p className="text-xl mb-8 text-muted-foreground max-w-3xl mx-auto">
              IJ Langa Consulting has a team of skilled, experienced, and knowledgeable tax practitioners, 
              who are up-to-date with the laws and regulations of the South African Revenue Services (SARS).
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

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Tax Service Commitment</h2>
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground mb-4">
                  Our main objective is to keep our clients compliant. We also have an intense focus on 
                  helping our clients to move forward in the best way possible while not breaking any 
                  Revenue Authority laws and regulations.
                </p>
                <p className="text-lg text-muted-foreground">
                  IJ Langa Consulting Tax Practitioners are ready and able to assist you with comprehensive 
                  tax services designed to maximize compliance while optimizing your tax position.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Tax Services Include</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Tax Registrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Income Tax, VAT, PAYE, SDL, Diesel Rebate, Dividend withholding tax, etc.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Calculator className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Income Tax Returns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Income tax calculations and returns for Individuals and companies
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Clock className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Provisional Tax</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Provisional Tax calculations and returns for timely compliance
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Building className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Public Benefit Organisations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    PBO and tax-exempt entity tax calculations and returns
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Target className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Tax Planning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Strategic tax planning to optimize your tax position legally
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">PAYE & UIF</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    PAYE, UIF and SDL calculation and returns for employers
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <DollarSign className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">VAT Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    VAT compilations and returns with diesel rebate services
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Tax Clearance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Tax clearance certificates and Tax directives for compliance
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Award className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Dispute Resolution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Tax dispute resolutions, appeals, and SARS representation
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-4">
                <strong>And much more tax services from reliable tax practitioners including:</strong>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div>• IT14SD reconciliations and returns</div>
                <div>• Withholding calculations and returns</div>
                <div>• Voluntary Disclosure Programme applications</div>
                <div>• Amending/updating SARS registered details</div>
                <div>• Professional representation at SARS</div>
                <div>• Strategic tax compliance advice</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Why Choose Our Tax Practitioners?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Knowledge</h3>
                <p className="text-muted-foreground">
                  Skilled and experienced tax practitioners up-to-date with SARS laws
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Compliance Focus</h3>
                <p className="text-muted-foreground">
                  Main objective to keep clients compliant with all regulations
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Strategic Planning</h3>
                <p className="text-muted-foreground">
                  Help clients move forward optimally within legal boundaries
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Full Service</h3>
                <p className="text-muted-foreground">
                  Comprehensive tax services from registration to dispute resolution
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
            <h2 className="text-3xl font-bold mb-4">Professional Tax Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tax services covering individual, business, and specialized requirements
            </p>
          </div>

          <ProductGrid 
            products={taxationProducts}
            category="taxation"
            itemsPerPage={30}
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Tax Position?</h2>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Let our expert tax practitioners ensure your compliance while maximizing opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary">
                Get Tax Consultation
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

export default TaxationServicesLanding;