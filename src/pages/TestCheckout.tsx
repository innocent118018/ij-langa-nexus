import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

const TestCheckout = () => {
  const { addToCart, cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const testServices = [
    {
      id: 'test-service-1',
      service_id: 'PARTNERS',
      quantity: 1,
      services: {
        name: 'Partners Consultation',
        price: 1150,
        category: 'professional-fees',
      }
    },
    {
      id: 'test-service-2', 
      service_id: 'VAT201',
      quantity: 1,
      services: {
        name: 'VAT Return',
        price: 700,
        category: 'vat',
      }
    },
    {
      id: 'test-service-3',
      service_id: 'ITR12-BASIC', 
      quantity: 1,
      services: {
        name: 'Basic Tax Return',
        price: 500,
        category: 'individual-taxation',
      }
    }
  ];

  const handleAddTestService = async (service: any) => {
    try {
      await addToCart(service);
      toast({
        title: "Added to Cart",
        description: `${service.services.name} added to cart`,
      });
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to add service to cart",
        variant: "destructive",
      });
    }
  };

  const handleRemoveFromCart = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
      toast({
        title: "Removed from Cart",
        description: "Service removed from cart",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove service from cart", 
        variant: "destructive",
      });
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      toast({
        title: "Cart Cleared",
        description: "All items removed from cart",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive", 
      });
    }
  };

  const goToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart Empty",
        description: "Please add some services to your cart first",
        variant: "destructive",
      });
      return;
    }
    navigate('/checkout');
  };

  const totalAmount = cartItems.reduce((total, item) => {
    return total + (item.services?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Test Checkout Process</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Services */}
          <Card>
            <CardHeader>
              <CardTitle>Test Services - Add to Cart</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {testServices.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{service.services.name}</h3>
                    <p className="text-sm text-gray-600">R{service.services.price.toLocaleString('en-ZA')}</p>
                    <p className="text-xs text-gray-500">{service.services.category}</p>
                  </div>
                  <Button
                    onClick={() => handleAddTestService(service)}
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Cart Contents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart Contents ({cartItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{item.services?.name || item.products?.name}</h4>
                        <p className="text-sm text-gray-600">
                          R{((item.services?.price || item.products?.price || 0) * item.quantity).toLocaleString('en-ZA')}
                          {item.quantity > 1 && ` (${item.quantity}x)`}
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Subtotal:</span>
                      <span>R{totalAmount.toLocaleString('en-ZA')}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>VAT (15%):</span>
                      <span>R{(totalAmount * 0.15).toLocaleString('en-ZA')}</span>
                    </div>
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total:</span>
                      <span>R{(totalAmount * 1.15).toLocaleString('en-ZA')}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {cartItems.length > 0 && (
                <div className="flex gap-2 mt-4">
                  <Button onClick={goToCheckout} className="flex-1">
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline" onClick={handleClearCart}>
                    Clear Cart
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Test Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Add test services to your cart using the buttons above</li>
                <li>Click "Proceed to Checkout" when ready</li>
                <li>Fill in the checkout form with test data</li>
                <li>Test the payment flow (it will redirect to iKhokha)</li>
                <li>Verify success/cancel pages work correctly</li>
                <li>Check that orders are created in the database</li>
                <li>Test email functionality for form submissions</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TestCheckout;