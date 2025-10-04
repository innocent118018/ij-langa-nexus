import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit, Plus, Package, Wrench, ShoppingCart, Eye } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  is_active: boolean;
  image_url?: string;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  is_active: boolean;
  processing_time?: string;
  requirements?: string;
  created_at: string;
  updated_at: string;
}

const StoreManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsResult, servicesResult] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('services').select('*').order('created_at', { ascending: false })
      ]);

      if (productsResult.error) throw productsResult.error;
      if (servicesResult.error) throw servicesResult.error;

      setProducts(productsResult.data || []);
      setServices(servicesResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch store data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProductSave = async (formData: FormData) => {
    try {
      const productData = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: parseFloat(formData.get('price') as string),
        category: formData.get('category') as string,
        is_active: formData.get('is_active') === 'true',
        stock_quantity: parseInt(formData.get('stock_quantity') as string),
        image_url: formData.get('image_url') as string,
      };

      let result;
      if (editingProduct) {
        result = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
      } else {
        result = await supabase
          .from('products')
          .insert([productData]);
      }

      if (result.error) throw result.error;

      toast({
        title: 'Success',
        description: `Product ${editingProduct ? 'updated' : 'created'} successfully`,
      });

      setIsProductDialogOpen(false);
      setEditingProduct(null);
      fetchData();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: 'Error',
        description: 'Failed to save product',
        variant: 'destructive',
      });
    }
  };

  const handleServiceSave = async (formData: FormData) => {
    try {
      const serviceData = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: parseFloat(formData.get('price') as string),
        category: formData.get('category') as string,
        is_active: formData.get('is_active') === 'true',
        processing_time: formData.get('processing_time') as string,
        requirements: formData.get('requirements') as string,
      };

      let result;
      if (editingService) {
        result = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id);
      } else {
        result = await supabase
          .from('services')
          .insert([serviceData]);
      }

      if (result.error) throw result.error;

      toast({
        title: 'Success',
        description: `Service ${editingService ? 'updated' : 'created'} successfully`,
      });

      setIsServiceDialogOpen(false);
      setEditingService(null);
      fetchData();
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: 'Error',
        description: 'Failed to save service',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (type: 'product' | 'service', id: string) => {
    try {
      const result = await supabase
        .from(type === 'product' ? 'products' : 'services')
        .delete()
        .eq('id', id);

      if (result.error) throw result.error;

      toast({
        title: 'Success',
        description: `${type} deleted successfully`,
      });

      fetchData();
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      toast({
        title: 'Error',
        description: `Failed to delete ${type}`,
        variant: 'destructive',
      });
    }
  };

  const toggleStatus = async (type: 'product' | 'service', id: string, currentStatus: boolean) => {
    try {
      const result = await supabase
        .from(type === 'product' ? 'products' : 'services')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (result.error) throw result.error;

      toast({
        title: 'Success',
        description: `${type} status updated successfully`,
      });

      fetchData();
    } catch (error) {
      console.error(`Error updating ${type} status:`, error);
      toast({
        title: 'Error',
        description: `Failed to update ${type} status`,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Store Management</h2>
          <p className="text-muted-foreground">Manage your products and services</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingProduct(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
          </Dialog>
          
          <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setEditingService(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Products ({products.length})
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Services ({services.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="relative">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                    <Badge variant={product.is_active ? 'default' : 'secondary'}>
                      {product.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground capitalize">
                    {product.category.replace(/-/g, ' ')}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4 line-clamp-3">{product.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">R{product.price?.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">Stock: {product.stock_quantity}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingProduct(product);
                        setIsProductDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleStatus('product', product.id, product.is_active)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete('product', product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="services">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <Card key={service.id} className="relative">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2">{service.name}</CardTitle>
                    <Badge variant={service.is_active ? 'default' : 'secondary'}>
                      {service.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground capitalize">
                    {service.category.replace(/-/g, ' ')}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4 line-clamp-3">{service.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">R{service.price?.toLocaleString()}</span>
                    {service.processing_time && (
                      <span className="text-sm text-muted-foreground">{service.processing_time}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingService(service);
                        setIsServiceDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleStatus('service', service.id, service.is_active)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete('service', service.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Product Dialog */}
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleProductSave(formData);
          }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={editingProduct?.name || ''}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={editingProduct?.description || ''}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                defaultValue={editingProduct?.price || ''}
                required
              />
            </div>
            <div>
              <Label htmlFor="stock_quantity">Stock</Label>
              <Input
                id="stock_quantity"
                name="stock_quantity"
                type="number"
                defaultValue={editingProduct?.stock_quantity || 999}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              defaultValue={editingProduct?.category || ''}
              required
            />
          </div>
          <div>
            <Label htmlFor="image_url">Image URL (optional)</Label>
            <Input
              id="image_url"
              name="image_url"
              type="url"
              defaultValue={editingProduct?.image_url || ''}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              name="is_active"
              defaultChecked={editingProduct?.is_active ?? true}
            />
            <Label htmlFor="is_active">Active</Label>
            <input
              type="hidden"
              name="is_active"
              value={editingProduct?.is_active ? 'true' : 'false'}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsProductDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingProduct ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>

      {/* Service Dialog */}
      <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingService ? 'Edit Service' : 'Add New Service'}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleServiceSave(formData);
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={editingService?.name || ''}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={editingService?.description || ''}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={editingService?.price || ''}
                  required
                />
              </div>
              <div>
                <Label htmlFor="processing_time">Processing Time</Label>
                <Input
                  id="processing_time"
                  name="processing_time"
                  defaultValue={editingService?.processing_time || ''}
                  placeholder="e.g., 3-5 days"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                defaultValue={editingService?.category || ''}
                required
              />
            </div>
            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea
                id="requirements"
                name="requirements"
                defaultValue={editingService?.requirements || ''}
                rows={2}
                placeholder="Documents or information needed"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                name="is_active"
                defaultChecked={editingService?.is_active ?? true}
              />
              <Label htmlFor="is_active">Active</Label>
              <input
                type="hidden"
                name="is_active"
                value={editingService?.is_active ? 'true' : 'false'}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsServiceDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingService ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoreManagement;