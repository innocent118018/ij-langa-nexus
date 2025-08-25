
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
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
      toast({
        title: "Login Required",
        description: "Please log in to add items to your cart",
        variant: "destructive",
      });
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

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="p-4">
        <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
          <img 
            src={product.image_url} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            R{product.price.toFixed(2)}
          </span>
          <Badge variant="outline" className="capitalize">
            {product.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">
            Stock: {product.stock_quantity}
          </span>
        </div>
        <Button 
          onClick={addToCart}
          className="w-full"
          disabled={product.stock_quantity === 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardContent>
    </Card>
  );
};
