
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, MessageCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number | null;
  image_url: string;
  category: string;
  stock_quantity: number;
}

interface ProductCardProps {
  product: Product;
  onCartUpdate?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onCartUpdate }) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const addToCart = async () => {
    if (!user) {
      // Add to localStorage cart for guest users
      addToLocalCart();
      return;
    }

    try {
      // Check if item already exists in cart
      const { data: existingItem, error: checkError } = await (supabase as any)
        .from('cart_items')
        .select('id, quantity')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingItem) {
        // Update existing item
        const { error: updateError } = await (supabase as any)
          .from('cart_items')
          .update({ 
            quantity: existingItem.quantity + 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingItem.id);

        if (updateError) throw updateError;
      } else {
        // Insert new item
        const { error: insertError } = await (supabase as any)
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: product.id,
            quantity: 1
          });

        if (insertError) throw insertError;
      }

      toast({
        title: "Success",
        description: `${product.name} added to cart`,
      });

      onCartUpdate?.();
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: `Failed to add ${product.name} to cart`,
        variant: "destructive",
      });
    }
  };

  const addToLocalCart = () => {
    try {
      const existingCart = localStorage.getItem('guestCart');
      let cartItems = existingCart ? JSON.parse(existingCart) : [];
      
      // Check if item already exists
      const existingItemIndex = cartItems.findIndex((item: any) => item.product_id === product.id);
      
      if (existingItemIndex > -1) {
        // Update quantity
        cartItems[existingItemIndex].quantity += 1;
      } else {
        // Add new item
        const newItem = {
          id: `guest-${Date.now()}-${product.id}`,
          product_id: product.id,
          quantity: 1,
          products: {
            name: product.name,
            price: product.price,
            category: product.category,
            image_url: product.image_url
          }
        };
        cartItems.push(newItem);
      }
      
      localStorage.setItem('guestCart', JSON.stringify(cartItems));
      
      toast({
        title: "Success",
        description: `${product.name} added to cart`,
      });

      onCartUpdate?.();
    } catch (error) {
      console.error('Error adding to local cart:', error);
      toast({
        title: "Error",
        description: `Failed to add ${product.name} to cart`,
        variant: "destructive",
      });
    }
  };

  const requestQuote = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to request a quote",
        variant: "destructive",
      });
      return;
    }

    // For now, show a toast. In the future, this could open a modal or redirect to a quote form
    toast({
      title: "Quote Requested",
      description: `We'll contact you shortly regarding ${product.name}`,
    });
  };

  const formatCategoryName = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardHeader className="p-4 flex-shrink-0">
        <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
          <div className="text-gray-400 text-sm text-center p-4">
            {formatCategoryName(product.category)} Service
          </div>
        </div>
        <CardTitle className="text-base sm:text-lg leading-tight">{product.name}</CardTitle>
        <div className="flex items-center justify-between flex-wrap gap-2">
          {product.price ? (
            <span className="text-lg sm:text-2xl font-bold text-primary">
              R{product.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
            </span>
          ) : (
            <span className="text-base sm:text-lg font-semibold text-orange-600">
              Quote Required
            </span>
          )}
          <Badge variant="outline" className="capitalize text-xs">
            {formatCategoryName(product.category)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow flex flex-col justify-between">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
          {product.description || 'Professional service - contact us for more details'}
        </p>
        {product.price ? (
          <Button 
            onClick={addToCart}
            className="w-full"
            disabled={product.stock_quantity === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
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
