
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, FileText, DollarSign } from 'lucide-react';

const ServicePage = () => {
  const { category, service } = useParams();

  // This is a template - in a real app, you'd fetch service data based on the params
  const serviceData = {
    name: 'Company Registration',
    description: 'Register a new private company (Pty Ltd) in South Africa',
    price: 590.00,
    duration: '3-5 Days',
    category: 'Register',
    features: [
      'Company name reservation',
      'CIPC registration',
      'Share certificates',
      'Memorandum of Incorporation',
      'Certificate of Incorporation',
      'Directors appointed'
    ],
    requirements: [
      'Valid South African ID or passport',
      'Proof of residential address',
      'Proposed company name (3 options)',
      'Director details and consent',
      'Registered office address'
    ],
    process: [
      'Submit application with required documents',
      'Name availability check',
      'CIPC processing and approval',
      'Certificate generation',
      'Document delivery'
    ]
  };

  const addToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', serviceData.name);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <Badge variant="outline" className="mb-2">{serviceData.category}</Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{serviceData.name}</h1>
                <p className="text-lg text-gray-600">{serviceData.description}</p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  R{serviceData.price.toFixed(2)}
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  {serviceData.duration}
                </div>
                <Button onClick={addToCart} size="lg">
                  Add to Cart
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
                  {serviceData.features.map((feature, index) => (
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
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {serviceData.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Process */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-purple-600" />
                Our Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {serviceData.process.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                      {index + 1}
                    </div>
                    <p className="text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="bg-blue-600 text-white rounded-lg p-8 mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg mb-6">
              Join thousands of satisfied customers who trust IJ Langa Consulting
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" onClick={addToCart}>
                Add to Cart - R{serviceData.price.toFixed(2)}
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
