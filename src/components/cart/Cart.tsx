
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  products: {
    name: string;
    price: number;
    category: string;
    image_url: string;
  };
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && isOpen) {
      fetchCartItems();
    } else if (!user && isOpen) {
      // Load cart from localStorage for non-logged in users
      loadLocalCart();
    }
  }, [user, isOpen]);

  const loadLocalCart = () => {
    const localCart = localStorage.getItem('guestCart');
    if (localCart) {
      try {
        const items = JSON.parse(localCart);
        setCartItems(items);
      } catch (error) {
        console.error('Error loading local cart:', error);
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }
  };

  const saveLocalCart = (items: CartItem[]) => {
    localStorage.setItem('guestCart', JSON.stringify(items));
  };

  const fetchCartItems = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await (supabase as any)
        .from('cart_items')
        .select(`
          id,
          product_id,
          quantity,
          products!cart_items_product_id_fkey (
            name,
            price,
            category,
            image_url
          )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Cart fetch error:', error);
        throw error;
      }
      
      // Filter out any items with null products and ensure proper typing
      const validCartItems = (data || []).filter((item: any) => item.products && item.products.price !== null) as CartItem[];
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

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }

    if (!user) {
      // Update local storage cart
      const updatedItems = cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
      saveLocalCart(updatedItems);
      return;
    }

    try {
      const { error } = await (supabase as any)
        .from('cart_items')
        .update({ 
          quantity: newQuantity,
          updated_at: new Date().toISOString()
        })
        .eq('id', itemId);

      if (error) throw error;
      
      setCartItems(items =>
        items.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    }
  };

  const removeItem = async (itemId: string) => {
    if (!user) {
      // Remove from local storage cart
      const updatedItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedItems);
      saveLocalCart(updatedItems);
      toast({
        title: "Success",
        description: "Item removed from cart",
      });
      return;
    }

    try {
      const { error } = await (supabase as any)
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      
      setCartItems(items => items.filter(item => item.id !== itemId));
      toast({
        title: "Success",
        description: "Item removed from cart",
      });
    } catch (error) {
      console.error('Error removing item:', error);
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.products.price * item.quantity);
    }, 0);
  };

  const calculateVAT = () => {
    return calculateTotal() * 0.15;
  };

  const calculateTotalWithVAT = () => {
    return calculateTotal() + calculateVAT();
  };

  const formatCategoryName = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    onClose();
    navigate('/checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {loading ? (
            <div className="flex items-center justify-center flex-1">
              <p>Loading cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1">
              <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
              <p className="text-gray-600">Your cart is empty</p>
              <p className="text-sm text-gray-500 mt-2">Services requiring quotes will be handled separately</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.products.name}</h3>
                          <Badge variant="outline" className="mt-1 capitalize">
                            {formatCategoryName(item.products.category)}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            R{(item.products.price * item.quantity).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                          </p>
                          <p className="text-sm text-gray-600">
                            R{item.products.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })} each
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R{calculateTotal().toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (15%):</span>
                  <span>R{calculateVAT().toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>R{calculateTotalWithVAT().toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
                </div>
                <Button 
                  className="w-full mt-4" 
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </Button>
                {!user && (
                  <p className="text-xs text-gray-500 text-center mt-2">
                    You'll be prompted to login during checkout
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
