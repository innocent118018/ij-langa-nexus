import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, FileText, Shield } from 'lucide-react';

interface ServicePageProps {
  title: string;
  code?: string;
  category: string;
  subcategory?: string;
  description: string;
  price?: number;
  processingTime?: string;
  requirements?: string[];
  features?: string[];
  metaDescription?: string;
}

export const ServicePageTemplate: React.FC<ServicePageProps> = ({
  title,
  code,
  category,
  subcategory,
  description,
  price,
  processingTime,
  requirements = [],
  features = [],
  metaDescription
}) => {
  const navigate = useNavigate();

  // Set page title and meta description for SEO
  React.useEffect(() => {
    document.title = `${title} - ${category} Services | IJ Langa Consulting`;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', metaDescription || `Professional ${title.toLowerCase()} services. ${description}`);
    }
  }, [title, category, description, metaDescription]);

  const handlePurchaseClick = () => {
    if (price) {
      // Navigate to checkout with service details
      navigate('/checkout', { 
        state: { 
          service: { title, price, code, category }
        }
      });
    } else {
      // Navigate to quote request
      navigate('/contact', { 
        state: { 
          service: title,
          requestType: 'quote'
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <a href="/services" className="hover:text-primary">Services</a>
            <span>/</span>
            <span className="capitalize">{category}</span>
            {subcategory && (
              <>
                <span>/</span>
                <span>{subcategory}</span>
              </>
            )}
          </nav>
          
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="secondary">{category}</Badge>
            {subcategory && <Badge variant="outline">{subcategory}</Badge>}
            {code && <Badge variant="outline">{code}</Badge>}
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">{description}</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-2 space-y-8">
            {/* Service Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  Service Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Our {title.toLowerCase()} service ensures full compliance with South African regulations 
                  and provides professional support for all your {category.toLowerCase()} needs. 
                  We handle all the complexities while you focus on your business.
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            {features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    What's Included
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Requirements */}
            {requirements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="text-muted-foreground">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </main>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Pricing Card */}
            <Card>
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {price ? (
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="text-3xl font-bold text-foreground">R{price}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="text-lg font-semibold text-primary">Quote on Request</p>
                  </div>
                )}
                
                {processingTime && (
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Processing Time</p>
                      <p className="font-medium">{processingTime}</p>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handlePurchaseClick}
                  className="w-full"
                  size="lg"
                >
                  {price ? 'Purchase Service' : 'Request Quote'}
                </Button>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>
                  Our experts are ready to assist you with your {category.toLowerCase()} needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/contact')}
                >
                  Contact Our Team
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};