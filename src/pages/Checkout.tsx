
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    price: number;
    category: string;
  };
}

const Checkout = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchCartItems();
  }, [user, navigate]);

  const fetchCartItems = async () => {
    if (!user) return;

    try {
      const { data, error } = await (supabase as any)
        .from('cart_items')
        .select(`
          id,
          product_id,
          quantity,
          products!cart_items_product_id_fkey (
            id,
            name,
            price,
            category
          )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Cart fetch error:', error);
        throw error;
      }
      
      // Filter out items with null products and ensure proper typing
      const validCartItems = (data || []).filter((item: any) => item.products) as CartItem[];
      setCartItems(validCartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast({
        title: "Error",
        description: "Failed to load cart items",
        variant: "destructive",
      });
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.products.price * item.quantity), 0);
  };

  const calculateVAT = () => {
    return calculateSubtotal() * 0.15;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateVAT();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerDetails.name || !customerDetails.email || !customerDetails.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Error",
        description: "Your cart is empty",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      // Create order
      const { data: order, error: orderError } = await (supabase as any)
        .from('orders')
        .insert({
          user_id: user!.id,
          customer_name: customerDetails.name,
          customer_email: customerDetails.email,
          customer_phone: customerDetails.phone,
          customer_address: customerDetails.address,
          subtotal: calculateSubtotal(),
          vat_amount: calculateVAT(),
          total_amount: calculateTotal(),
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.products.price,
        total: item.products.price * item.quantity
      }));

      const { error: itemsError } = await (supabase as any)
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Log payment attempt
      const { error: logError } = await (supabase as any)
        .from('payment_logs')
        .insert({
          order_id: order.id,
          user_id: user!.id,
          status: 'initiated',
          request_data: {
            order_total: calculateTotal(),
            customer_details: customerDetails,
            items_count: cartItems.length
          }
        });

      if (logError) console.error('Error logging payment:', logError);

      // Clear cart
      await (supabase as any)
        .from('cart_items')
        .delete()
        .eq('user_id', user!.id);

      // Redirect to iKhokha payment (placeholder for now)
      toast({
        title: "Order Created",
        description: "Redirecting to payment...",
      });

      // For now, simulate payment processing
      setTimeout(() => {
        navigate(`/dashboard`);
      }, 2000);

    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="mb-4">Your cart is empty</p>
            <Button onClick={() => navigate('/products')}>
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Details Form */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerDetails.email}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Payment'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.products.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity} × R{item.products.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-semibold">
                      R{(item.products.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R{calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT (15%):</span>
                    <span>R{calculateVAT().toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>R{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
