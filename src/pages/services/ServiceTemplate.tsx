import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock } from 'lucide-react';

interface ServiceTemplateProps {
  serviceName: string;
  category: string;
  description: string;
  price?: number;
  unit?: string;
  turnaround: string;
  icon: React.ReactNode;
  features: string[];
  requirements: string[];
  benefits?: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

const ServiceTemplate: React.FC<ServiceTemplateProps> = ({
  serviceName,
  category,
  description,
  price,
  unit,
  turnaround,
  icon,
  features,
  requirements,
  benefits
}) => {
  const handleRequest = () => {
    // Integration with quote system or cart
    console.log(`Requesting service: ${serviceName}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  {icon}
                  <span className="text-sm font-medium text-primary">{category}</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {serviceName}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {description}
                </p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <div className="text-3xl font-bold text-primary mb-2">
                  {price ? `R${price.toLocaleString()}` : 'Quote Required'}
                  {unit && <span className="text-sm text-muted-foreground">/{unit}</span>}
                </div>
                <div className="flex items-center text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  {turnaround}
                </div>
                <Button size="lg" onClick={handleRequest}>
                  {price ? 'Order Now' : 'Request Quote'}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  What's Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {icon}
                  What We Need From You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Benefits */}
          {benefits && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Why Choose This Service?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                        {benefit.icon}
                      </div>
                      <h3 className="font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Call to Action */}
          <div className="bg-primary text-primary-foreground rounded-lg p-8 mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg mb-6">
              Contact us today to begin your {serviceName.toLowerCase()} process
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" onClick={handleRequest}>
                {price ? 'Order Now' : 'Request Quote'}
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTemplate;