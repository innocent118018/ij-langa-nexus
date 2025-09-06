import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  product_id?: string;
  service_id?: string;
  quantity: number;
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

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refreshCart();
  }, [user]);

  const refreshCart = async () => {
    if (user) {
      await fetchUserCart();
    } else {
      loadLocalCart();
    }
  };

  const fetchUserCart = async () => {
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
          products!cart_items_product_id_fkey (
            name,
            price,
            category,
            image_url
          ),
          services!cart_items_service_id_fkey (
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
        setCartItems(items);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error loading local cart:', error);
      setCartItems([]);
    }
  };

  const saveLocalCart = (items: CartItem[]) => {
    localStorage.setItem('guestCart', JSON.stringify(items));
  };

  const addToCart = async (item: any) => {
    if (!user) {
      // Add to localStorage cart for guest users
      try {
        const newItem: CartItem = {
          id: `guest-${Date.now()}-${item.id}`,
          product_id: item.product_id || item.id,
          service_id: item.service_id,
          quantity: item.quantity || 1,
          products: item.products || (item.price ? {
            name: item.name,
            price: item.price,
            category: item.category,
            image_url: item.image_url || ''
          } : undefined),
          services: item.services || (!item.products && item.price ? {
            name: item.name,
            price: item.price,
            category: item.category
          } : undefined)
        };

        const existingItemIndex = cartItems.findIndex(cartItem => 
          (cartItem.product_id === newItem.product_id && newItem.product_id) ||
          (cartItem.service_id === newItem.service_id && newItem.service_id)
        );

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
          description: `${item.name} added to cart`,
        });
      } catch (error) {
        console.error('Error adding to local cart:', error);
        toast({
          title: "Error",
          description: "Failed to add item to cart",
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
        const insertData: any = {
          user_id: user.id,
          quantity: item.quantity || 1
        };

        if (item.product_id || (!item.service_id && item.id)) {
          insertData.product_id = item.product_id || item.id;
        } else {
          insertData.service_id = item.service_id || item.id;
        }

        const { error: insertError } = await supabase
          .from('cart_items')
          .insert(insertData);

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
      console.error('Error removing item:', error);
      toast({
        title: "Error",
        description: "Failed to remove item",
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
    return cartItems.reduce((total, item) => {
      // Handle both product and service pricing
      const price = item.products?.price || item.services?.price;
      
      // Debug logging
      if (price === undefined || price === null) {
        console.warn('Item with undefined price:', item);
        return total;
      }
      
      return total + (Number(price) * Number(item.quantity));
    }, 0);
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