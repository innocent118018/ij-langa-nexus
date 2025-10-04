import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { allSecretarialProducts } from '@/data/secretarialProducts';
import { 
  Building2, 
  FileText, 
  Shield, 
  CheckCircle, 
  Clock, 
  Users, 
  ArrowRight,
  Award
} from 'lucide-react';

const SecretarialServicesLanding = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-foreground to-secondary text-primary-foreground py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Secretarial Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Secretarial Services
            </h1>
            <p className="text-xl mb-8 text-muted-foreground max-w-3xl mx-auto">
              We offer secretarial services to small and medium-sized entities as well as large entities. 
              We do understand the administrative requirements involved in keeping the company records 
              up to date and the storage of key company documents.
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
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Secretarial Services Include</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <Building2 className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Company Formation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Registration of companies (CIPC, Industry bodies etc)
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Annual Returns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Submission of annual returns and compliance documents
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">AGM Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Preparation of Annual General meetings' required documentation as well as minutes
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Statutory Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Maintenance of statutory records according to Companies Act 71 of 2008
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CheckCircle className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Company Resolutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Drafting of company resolutions for various corporate actions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Award className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Compliance Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ensuring full compliance with regulatory requirements
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Companies: Formation and Amendments</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive range of CIPC forms and corporate services to meet all your company requirements
            </p>
          </div>

          <ProductGrid 
            products={allSecretarialProducts}
            category="secretarial"
            itemsPerPage={30}
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Why Choose Our Secretarial Services?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
                <p className="text-muted-foreground">
                  Quick turnaround times for all standard secretarial services
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">CIPC Registered</h3>
                <p className="text-muted-foreground">
                  Authorized CIPC agents with direct submission capabilities
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">22+ Years Experience</h3>
                <p className="text-muted-foreground">
                  Extensive experience in South African corporate law
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Full Compliance</h3>
                <p className="text-muted-foreground">
                  Ensuring adherence to all regulatory requirements
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Contact us today for professional secretarial services you can trust
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

export default SecretarialServicesLanding;