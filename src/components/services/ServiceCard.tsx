import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, MessageCircle, Clock, DollarSign } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import type { ServiceData } from '@/data/services';

interface ServiceCardProps {
  service: ServiceData;
  onCartUpdate?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onCartUpdate }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    try {
      // Convert ServiceData to cart item format
      const cartItem = {
        id: `service-${service.code}-${Date.now()}`,
        service_id: service.code, // Use service code as identifier
        quantity: 1,
        services: {
          name: service.name,
          price: service.price || 0,
          category: service.category,
        }
      };

      if (service.price) {
        await addToCart(cartItem);
        onCartUpdate?.();
        
        toast({
          title: "Added to Cart",
          description: `${service.name} has been added to your cart`,
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: `Failed to add ${service.name} to cart`,
        variant: "destructive",
      });
    }
  };

  const requestQuote = () => {
    toast({
      title: "Quote Requested",
      description: `We'll contact you shortly regarding ${service.name}`,
    });
  };

  const formatCategoryName = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getIcon = () => {
    switch (service.category) {
      case 'professional-fees': return <MessageCircle className="h-5 w-5" />;
      case 'individual-taxation': return <DollarSign className="h-5 w-5" />;
      case 'business-entities': return <ShoppingCart className="h-5 w-5" />;
      case 'employees-tax': return <Clock className="h-5 w-5" />;
      case 'vat': return <DollarSign className="h-5 w-5" />;
      default: return <MessageCircle className="h-5 w-5" />;
    }
  };

  return (
    <Card className={`hover:shadow-lg transition-shadow h-full flex flex-col ${service.popular ? 'ring-2 ring-primary' : ''}`}>
      {service.popular && (
        <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-t-lg text-center">
          Popular
        </div>
      )}
      <CardHeader className="p-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="text-primary">
            {getIcon()}
          </div>
          <Badge variant="outline" className="text-xs">
            {formatCategoryName(service.category)}
          </Badge>
        </div>
        <CardTitle className="text-base leading-tight">{service.name}</CardTitle>
        <div className="flex items-center justify-between flex-wrap gap-2">
          {service.price ? (
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">
                R{service.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
              </span>
              {service.unit && (
                <span className="text-xs text-muted-foreground">{service.unit}</span>
              )}
            </div>
          ) : (
            <span className="text-lg font-semibold text-orange-600">
              Quote Required
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow flex flex-col justify-between">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
          {service.description}
        </p>
        {service.price ? (
          <Button 
            onClick={handleAddToCart}
            className="w-full"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        ) : (
          <Button 
            onClick={requestQuote}
            variant="outline"
            className="w-full"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Request Quote
          </Button>
        )}
      </CardContent>
    </Card>
  );
};