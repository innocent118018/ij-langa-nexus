import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

// Define cart item interface
export interface CartItem {
  id: string;
  quantity: number;
  product_id?: string;
  service_id?: string;
  user_id?: string;
  products?: {
    name: string;
    price: number;
    category: string;
    image_url: string;
  };
  services?: {
    name: string;
    price: number;
    category: string;
  };
}

// Define cart context interface
interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  isLoading: boolean;
  addToCart: (item: any) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  getTotalAmount: () => number;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Clear corrupted cart data on mount
  useEffect(() => {
    try {
      const guestCart = localStorage.getItem('guestCart');
      if (guestCart) {
        const items = JSON.parse(guestCart);
        const hasCorrupted = items.some((item: any) => 
          !item.id || 
          item.id.includes('undefined') || 
          (!item.products && !item.services) ||
          (item.products && typeof item.products.price !== 'number') ||
          (item.services && typeof item.services.price !== 'number')
        );
        if (hasCorrupted) {
          console.log('Clearing corrupted cart data');
          localStorage.removeItem('guestCart');
        }
      }
    } catch (error) {
      console.log('Clearing corrupted cart due to error:', error);
      localStorage.removeItem('guestCart');
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchCartItems();
    } else {
      loadLocalCart();
    }
  }, [user]);

  const fetchCartItems = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          id,
          product_id,
          service_id,
          quantity,
          products (
            name,
            price,
            category,
            image_url
          ),
          services (
            name,
            price,
            category
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      
      const validCartItems = (data || []).filter((item: any) => 
        item.products || item.services
      ) as CartItem[];
      
      setCartItems(validCartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadLocalCart = () => {
    try {
      const localCart = localStorage.getItem('guestCart');
      if (localCart) {
        const items = JSON.parse(localCart);
        // Validate items before setting
        const validItems = items.filter((item: CartItem) => {
          const hasValidPrice = (item.products?.price && typeof item.products.price === 'number') || 
                               (item.services?.price && typeof item.services.price === 'number');
          const hasValidId = item.id && !item.id.includes('undefined');
          const hasValidData = (item.products?.name) || (item.services?.name);
          return hasValidPrice && hasValidId && hasValidData;
        });
        
        setCartItems(validItems);
        
        // Update localStorage if items were filtered
        if (validItems.length !== items.length) {
          saveLocalCart(validItems);
        }
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error loading local cart:', error);
      setCartItems([]);
      localStorage.removeItem('guestCart');
    }
  };

  const saveLocalCart = (items: CartItem[]) => {
    try {
      localStorage.setItem('guestCart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving local cart:', error);
    }
  };

  const refreshCart = async () => {
    if (user) {
      await fetchCartItems();
    } else {
      loadLocalCart();
    }
  };

  const addToCart = async (item: any) => {
    console.log('Adding item to cart:', item);

    if (!user) {
      // Add to localStorage cart for guest users
      try {
        // Ensure we have valid data
        if (!item.service?.price && !item.product?.price && !item.price) {
          throw new Error('Item has no valid price');
        }

        const newItem: CartItem = {
          id: `guest-${Date.now()}-${Math.random()}`,
          product_id: item.type === 'product' ? (item.product?.id || item.id) : undefined,
          service_id: item.type === 'service' ? (item.service?.id || item.code || item.id) : undefined,
          quantity: item.quantity || 1,
          products: item.type === 'product' ? {
            name: item.product?.name || item.name,
            price: Number(item.product?.price || item.price),
            category: item.product?.category || item.category,
            image_url: item.product?.image_url || item.image_url || ''
          } : undefined,
          services: item.type === 'service' ? {
            name: item.service?.name || item.name,
            price: Number(item.service?.price || item.price),
            category: item.service?.category || item.category
          } : undefined
        };

        console.log('Created cart item:', newItem);

        // Validate the created item
        if (!newItem.products && !newItem.services) {
          throw new Error('Failed to create valid cart item');
        }

        const validPrice = newItem.products?.price || newItem.services?.price;
        if (!validPrice || isNaN(validPrice)) {
          throw new Error('Invalid price in cart item');
        }

        const existingItemIndex = cartItems.findIndex(cartItem => {
          if (newItem.product_id && cartItem.product_id) {
            return cartItem.product_id === newItem.product_id;
          }
          if (newItem.service_id && cartItem.service_id) {
            return cartItem.service_id === newItem.service_id;
          }
          return false;
        });

        let updatedItems;
        if (existingItemIndex > -1) {
          updatedItems = cartItems.map((cartItem, index) => 
            index === existingItemIndex 
              ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
              : cartItem
          );
        } else {
          updatedItems = [...cartItems, newItem];
        }

        setCartItems(updatedItems);
        saveLocalCart(updatedItems);
        
        toast({
          title: "Success",
          description: `${newItem.services?.name || newItem.products?.name} added to cart`,
        });
      } catch (error) {
        console.error('Error adding to local cart:', error);
        toast({
          title: "Error",
          description: "Failed to add item to cart. Please try again.",
          variant: "destructive",
        });
      }
      return;
    }

    // Add to database cart for logged-in users
    try {
      const { data: existingItem, error: checkError } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('user_id', user.id)
        .eq(item.product_id ? 'product_id' : 'service_id', item.id)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingItem) {
        const { error: updateError } = await supabase
          .from('cart_items')
          .update({ 
            quantity: existingItem.quantity + (item.quantity || 1),
            updated_at: new Date().toISOString()
          })
          .eq('id', existingItem.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: item.product_id || null,
            service_id: item.service_id || null,
            quantity: item.quantity || 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (insertError) throw insertError;
      }

      await refreshCart();
      toast({
        title: "Success",
        description: `${item.name} added to cart`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (!user) {
      const updatedItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedItems);
      saveLocalCart(updatedItems);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      
      await refreshCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      await removeFromCart(itemId);
      return;
    }

    if (!user) {
      const updatedItems = cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
      saveLocalCart(updatedItems);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ 
          quantity: newQuantity,
          updated_at: new Date().toISOString()
        })
        .eq('id', itemId);

      if (error) throw error;
      
      await refreshCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    if (!user) {
      setCartItems([]);
      localStorage.removeItem('guestCart');
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getTotalAmount = () => {
    const total = cartItems.reduce((total, item) => {
      const price = item.products?.price || item.services?.price || 0;
      
      if (typeof price !== 'number' || isNaN(price)) {
        console.warn('Invalid price for item:', item);
        return total;
      }
      
      return total + (price * item.quantity);
    }, 0);
    
    console.log('Total amount calculated:', total, 'from items:', cartItems);
    return total;
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      isLoading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      refreshCart,
      getTotalAmount
    }}>
      {children}
    </CartContext.Provider>
  );
};