import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, TrendingUp, DollarSign, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Service {
  id: string;
  code: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  unit: string;
  billing: string;
  vat_inclusive: boolean;
  description?: string;
  features?: string[];
  is_active: boolean;
}

interface Analytics {
  totalRevenue: number;
  activeServices: number;
  monthlyRecurring: number;
  categoryBreakdown: { category: string; count: number; revenue: number }[];
  popularServices: { name: string; orders: number; revenue: number }[];
}

const currency = (n: number) => 
  new Intl.NumberFormat("en-ZA", { 
    style: "currency", 
    currency: "ZAR", 
    maximumFractionDigits: 2 
  }).format(n);

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    category: "",
    subcategory: "",
    price: "",
    unit: "",
    billing: "once",
    vat_inclusive: true,
    description: "",
    features: "",
    is_active: true,
  });

  useEffect(() => {
    fetchServices();
    fetchAnalytics();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;
      
      // Transform database records to Service type
      const transformedServices: Service[] = (data || []).map((dbService: any) => ({
        id: dbService.id,
        code: dbService.code,
        name: dbService.name,
        category: dbService.category,
        subcategory: dbService.subcategory || undefined,
        price: dbService.price,
        unit: dbService.unit,
        billing: dbService.billing,
        vat_inclusive: dbService.vat_inclusive,
        description: dbService.description || undefined,
        features: Array.isArray(dbService.features) ? dbService.features : [],
        is_active: dbService.is_active,
      }));
      
      setServices(transformedServices);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      // Fetch orders data for analytics
      const { data: orders, error } = await supabase
        .from('orders')
        .select('service_id, total_amount, status, created_at');

      if (error) throw error;

      // Calculate analytics
      const totalRevenue = (orders || [])
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + (o.total_amount || 0), 0);

      const activeServices = services.filter(s => s.is_active).length;

      const monthlyServices = services.filter(
        s => s.billing === 'monthly' && s.is_active
      );
      const monthlyRecurring = monthlyServices.reduce((sum, s) => sum + s.price, 0);

      // Category breakdown
      const categoryMap = new Map<string, { count: number; revenue: number }>();
      services.forEach(s => {
        const existing = categoryMap.get(s.category) || { count: 0, revenue: 0 };
        categoryMap.set(s.category, {
          count: existing.count + 1,
          revenue: existing.revenue + s.price,
        });
      });

      const categoryBreakdown = Array.from(categoryMap.entries()).map(([category, data]) => ({
        category,
        ...data,
      }));

      // Popular services (mock data for now - would need real order data)
      const popularServices = services
        .slice(0, 5)
        .map(s => ({
          name: s.name,
          orders: Math.floor(Math.random() * 50),
          revenue: Math.floor(Math.random() * 50000),
        }));

      setAnalytics({
        totalRevenue,
        activeServices,
        monthlyRecurring,
        categoryBreakdown,
        popularServices,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const handleSave = async () => {
    try {
      const serviceData = {
        code: formData.code,
        name: formData.name,
        category: formData.category,
        subcategory: formData.subcategory || null,
        price: parseFloat(formData.price),
        unit: formData.unit,
        billing: formData.billing,
        vat_inclusive: formData.vat_inclusive,
        description: formData.description || null,
        features: formData.features ? JSON.parse(formData.features) : [],
        is_active: formData.is_active,
      };

      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id);

        if (error) throw error;
        toast({ title: "Service updated successfully" });
      } else {
        const { error } = await supabase
          .from('services')
          .insert([serviceData]);

        if (error) throw error;
        toast({ title: "Service created successfully" });
      }

      setShowModal(false);
      resetForm();
      fetchServices();
      fetchAnalytics();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Service deleted successfully" });
      fetchServices();
      fetchAnalytics();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setFormData({
      code: service.code,
      name: service.name,
      category: service.category,
      subcategory: service.subcategory || "",
      price: service.price.toString(),
      unit: service.unit,
      billing: service.billing,
      vat_inclusive: service.vat_inclusive,
      description: service.description || "",
      features: JSON.stringify(service.features || []),
      is_active: service.is_active,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingService(null);
    setFormData({
      code: "",
      name: "",
      category: "",
      subcategory: "",
      price: "",
      unit: "",
      billing: "once",
      vat_inclusive: true,
      description: "",
      features: "",
      is_active: true,
    });
  };

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Service Management</h1>
        <p className="text-muted-foreground">Manage your services, pricing, and view analytics</p>
      </div>

      <Tabs defaultValue="services" className="space-y-6">
        <TabsList>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            <Button onClick={() => { resetForm(); setShowModal(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredServices.map((service) => (
              <Card key={service.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{service.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        service.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {service.is_active ? 'Active' : 'Inactive'}
                      </span>
                      {service.billing === 'monthly' && (
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                          Monthly
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>Code:</strong> {service.code}</p>
                      <p><strong>Category:</strong> {service.category} {service.subcategory && `• ${service.subcategory}`}</p>
                      <p><strong>Price:</strong> {currency(service.price)} {service.unit}</p>
                      {service.description && <p><strong>Description:</strong> {service.description}</p>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEditModal(service)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {analytics && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">{currency(analytics.totalRevenue)}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Package className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Active Services</p>
                      <p className="text-2xl font-bold">{analytics.activeServices}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Recurring</p>
                      <p className="text-2xl font-bold">{currency(analytics.monthlyRecurring)}</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Revenue by Category</h3>
                  <div className="space-y-3">
                    {analytics.categoryBreakdown.map((cat) => (
                      <div key={cat.category} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{cat.category}</p>
                          <p className="text-sm text-muted-foreground">{cat.count} services</p>
                        </div>
                        <p className="font-semibold">{currency(cat.revenue)}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Popular Services</h3>
                  <div className="space-y-3">
                    {analytics.popularServices.map((svc, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{svc.name}</p>
                          <p className="text-sm text-muted-foreground">{svc.orders} orders</p>
                        </div>
                        <p className="font-semibold">{currency(svc.revenue)}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Code *</Label>
                <Input
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g., MBA-BSA"
                />
              </div>
              <div>
                <Label>Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Service name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category *</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Monthly Billed Accounting"
                />
              </div>
              <div>
                <Label>Subcategory</Label>
                <Input
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Price *</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label>Unit *</Label>
                <Input
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="e.g., /month, each"
                />
              </div>
              <div>
                <Label>Billing *</Label>
                <Select value={formData.billing} onValueChange={(v) => setFormData({ ...formData, billing: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">Once-off</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description"
                rows={3}
              />
            </div>

            <div>
              <Label>Features (JSON array)</Label>
              <Textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder='["Feature 1", "Feature 2"]'
                rows={4}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.vat_inclusive}
                  onChange={(e) => setFormData({ ...formData, vat_inclusive: e.target.checked })}
                />
                VAT Inclusive
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                Active
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}