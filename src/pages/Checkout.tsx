
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import type { CartItem, CustomerDetails, Order, OrderItem, PaymentResponse } from '@/types';

const Checkout: React.FC = () => {
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    console.log('Checkout page loaded. Cart items:', cartItems);
    console.log('Cart items length:', cartItems.length);
    
    // Don't redirect if no user - allow guest checkout
    if (cartItems.length === 0) {
      console.log('No cart items, redirecting to services');
      navigate('/services');
    }
  }, [cartItems, navigate]);

  // Optimized calculations with useMemo
  const subtotal = useMemo(() => {
    return cartItems.reduce((total: number, item: CartItem) => {
      const price = item.products?.price || item.services?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  }, [cartItems]);

  const vat = useMemo(() => subtotal * 0.15, [subtotal]);
  const total = useMemo(() => subtotal + vat, [subtotal, vat]);

  const createPayment = async (orderId: string): Promise<PaymentResponse> => {
    try {
      console.log('Creating payment for order:', orderId);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      const paymentData = {
        orderId: orderId,
        amount: total,
        description: `Order #${orderId} - ${cartItems.length} item(s)`,
        customerEmail: customerDetails.email,
        externalTransactionID: `ORDER-${orderId}-${Date.now()}`
      };

      console.log('Payment data:', paymentData);

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: paymentData,
        headers: session?.access_token ? {
          Authorization: `Bearer ${session.access_token}`,
        } : {},
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Payment request failed');
      }

      console.log('Payment response:', data);

      if (data?.error) {
        throw new Error(data.error);
      }

      if (!data || !data.paylinkUrl) {
        throw new Error('No payment URL received');
      }

      return data as PaymentResponse;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Enhanced validation
    if (!customerDetails.name || !customerDetails.email || !customerDetails.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Phone validation (South Africa: +27XXXXXXXXX or 0XXXXXXXXX)
    const phoneRegex = /^(\+27|0)\d{9}$/;
    if (!phoneRegex.test(customerDetails.phone)) {
      toast({
        title: "Error",
        description: "Invalid phone number format. Use +27XXXXXXXXX or 0XXXXXXXXX",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerDetails.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
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
      // Create order data
      const orderData: Partial<Order> = {
        customer_name: customerDetails.name,
        customer_email: customerDetails.email,
        customer_phone: customerDetails.phone,
        customer_address: customerDetails.address,
        subtotal,
        vat_amount: vat,
        total_amount: total,
        status: 'pending'
      };

      // Add user_id if logged in
      if (user) {
        orderData.user_id = user.id;
        console.log('Adding user_id to order:', user.id);
      } else {
        console.log('Creating guest order (no user_id)');
      }

      console.log('Creating order with data:', orderData);
      console.log('Cart items:', cartItems);

      // Validate cart items before proceeding
      if (cartItems.length === 0) {
        throw new Error('Cart is empty');
      }

      // Validate that cart items have valid prices
      const invalidItems = cartItems.filter(item => {
        const price = item.products?.price || item.services?.price;
        return !price || price <= 0;
      });

      if (invalidItems.length > 0) {
        console.error('Invalid cart items found:', invalidItems);
        throw new Error('Some items in your cart have invalid prices. Please refresh and try again.');
      }

      // Create order first
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (orderError) {
        console.error('Order creation error:', orderError);
        throw new Error(`Failed to create order: ${orderError.message}`);
      }

      if (!order) {
        throw new Error('No order returned from database');
      }

      console.log('Order created:', order);

      // Create order items with better validation
      const orderItems = cartItems.map((item: CartItem) => {
        // For guest cart items, service_id might be a string code, not a UUID
        // We'll store it as a reference in a different way or handle it properly
        let productId = null;
        let serviceId = null;
        
        // Check if IDs are valid UUIDs (36 characters with hyphens)
        if (item.product_id && item.product_id.length === 36 && item.product_id.includes('-')) {
          productId = item.product_id;
        }
        if (item.service_id && item.service_id.length === 36 && item.service_id.includes('-')) {
          serviceId = item.service_id;
        }
        
        return {
          order_id: order.id,
          product_id: productId,
          service_id: serviceId,
          quantity: item.quantity,
          price: item.products?.price || item.services?.price || 0,
          total: (item.products?.price || item.services?.price || 0) * item.quantity
        };
      });

      console.log('Creating order items:', orderItems);

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Order items creation error:', itemsError);
        throw new Error(`Failed to create order items: ${itemsError.message}`);
      }

      // Store order ID before payment redirect
      localStorage.setItem('lastOrderId', order.id);
      localStorage.setItem('lastOrderTotal', total.toString());

      // Create payment link
      const paymentResponse = await createPayment(order.id);
      
      // Clear cart before redirecting
      await clearCart();

      toast({
        title: "Redirecting to Payment",
        description: "You will be redirected to complete your payment",
      });

      // Small delay to ensure toast is visible
      setTimeout(() => {
        // Open payment in new tab as required by iKhokha
        window.open(paymentResponse.paylinkUrl!, '_blank');
      }, 1000);

    } catch (error) {
      console.error('Error creating order:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to create order. Please try again.";
      
      toast({
        title: "Order Creation Failed",
        description: errorMessage,
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
            <Button onClick={() => navigate('/services')}>
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
                      Creating Payment...
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
                {cartItems.map((item) => {
                  const itemData = item.products || item.services;
                  const price = itemData?.price || 0;
                  
                  return (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{itemData?.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} × R{price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <p className="font-semibold">
                        R{(price * item.quantity).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  );
                })}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R{subtotal.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT (15%):</span>
                    <span>R{vat.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>R{total.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                {!user && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💡 Create an account to track your orders and access exclusive features!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
