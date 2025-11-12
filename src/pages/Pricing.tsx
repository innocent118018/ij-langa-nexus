import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, ChevronLeft, ChevronRight, ShoppingCart, Filter, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  unit: string;
  billing: string;
  description?: string;
  features?: string[];
  code: string;
  vat_inclusive: boolean;
}

interface ServiceFromDB {
  id: string;
  name: string;
  category: string;
  subcategory?: string | null;
  price: number;
  unit: string;
  billing: string;
  description?: string | null;
  features?: any;
  code: string;
  vat_inclusive: boolean;
}

const currency = (n: number) => 
  new Intl.NumberFormat("en-ZA", { 
    style: "currency", 
    currency: "ZAR", 
    maximumFractionDigits: 2 
  }).format(n);

const Pricing = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [showContractModal, setShowContractModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [agreeToContract, setAgreeToContract] = useState(false);
  
  const PAGE_SIZE = 20;
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;
      
      // Transform database records to Service type
      const transformedServices: Service[] = (data || []).map((dbService: ServiceFromDB) => ({
        id: dbService.id,
        name: dbService.name,
        category: dbService.category,
        subcategory: dbService.subcategory || undefined,
        price: dbService.price,
        unit: dbService.unit,
        billing: dbService.billing,
        description: dbService.description || undefined,
        features: Array.isArray(dbService.features) ? dbService.features : [],
        code: dbService.code,
        vat_inclusive: dbService.vat_inclusive,
      }));
      
      setServices(transformedServices);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error",
        description: "Failed to load services. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(services.map(s => s.category)));
    return cats.sort();
  }, [services]);

  const filtered = useMemo(() => {
    const base = category === "All" ? services : services.filter(s => s.category === category);
    const q = query.trim().toLowerCase();
    return q ? base.filter(s => 
      (s.name + " " + (s.description || "")).toLowerCase().includes(q)
    ) : base;
  }, [query, category, services]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const handleAddToCart = (service: Service) => {
    const isMonthly = service.billing === 'monthly' || (service.unit || '').includes('/month');
    
    if (isMonthly) {
      setSelectedService(service);
      setShowContractModal(true);
      return;
    }

    addToCart({
      id: service.id,
      name: service.name,
      price: service.price,
      category: service.category,
      service_id: service.id
    });

    toast({
      title: "Added to cart",
      description: `${service.name} has been added to your cart.`,
    });
  };

  const proceedAfterContract = () => {
    if (!agreeToContract || !selectedService) return;

    addToCart({
      id: selectedService.id,
      name: selectedService.name,
      price: selectedService.price,
      category: selectedService.category,
      service_id: selectedService.id
    });

    toast({
      title: "Added to cart",
      description: `${selectedService.name} has been added to your cart. You'll need to review and sign the service agreement at checkout.`,
    });

    setShowContractModal(false);
    setAgreeToContract(false);
    setSelectedService(null);
    
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Our Services</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Professional accounting, tax, and business services
              </p>
            </div>
            <Button 
              onClick={() => navigate('/')} 
              variant="outline"
              size="sm"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <select 
              className="border rounded-lg px-4 py-2 bg-background min-w-[200px]" 
              value={category} 
              onChange={e => { setCategory(e.target.value); setPage(1); }}
            >
              <option>All</option>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search services..." 
              value={query} 
              onChange={e => { setQuery(e.target.value); setPage(1); }}
              className="pl-10"
            />
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {pageItems.length} of {filtered.length} services
        </p>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${category}-${page}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {pageItems.map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button 
              variant="outline" 
              onClick={() => setPage(p => Math.max(1, p - 1))} 
              disabled={page === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <div className="text-sm font-medium">
              Page {page} of {totalPages}
            </div>
            <Button 
              variant="outline" 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
              disabled={page === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>

      {/* Monthly Service Contract Modal */}
      {showContractModal && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-background w-full max-w-2xl rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-xl font-semibold">Monthly Service Agreement</h3>
              <button 
                onClick={() => {
                  setShowContractModal(false);
                  setAgreeToContract(false);
                  setSelectedService(null);
                }}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 max-h-[60vh] overflow-auto">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{selectedService.name}</h4>
                <p className="text-2xl font-bold">
                  {currency(selectedService.price)} 
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    {selectedService.unit}
                  </span>
                </p>
              </div>

              <div className="prose prose-sm max-w-none">
                <h4 className="font-semibold text-foreground">Service Agreement Terms</h4>
                
                <p className="text-sm text-muted-foreground">
                  <strong>1. Purpose.</strong> This agreement governs monthly accounting services billed on a recurring basis via iKhokha. 
                  Term: month-to-month, 30‑day cancellation notice required. Price escalations aligned to CPI unless otherwise agreed.
                </p>
                
                <p className="text-sm text-muted-foreground">
                  <strong>2. Scope.</strong> Services as per product features listed. Client to provide access to bank feeds, 
                  source documents and statutory portals (SARS, CIPC, UIF/COID) as needed.
                </p>
                
                <p className="text-sm text-muted-foreground">
                  <strong>3. Payments.</strong> First payment due on signup; recurring debits happen monthly on your chosen date via iKhokha. 
                  Failed payments may pause services until resolved.
                </p>
                
                <p className="text-sm text-muted-foreground">
                  <strong>4. Privacy & Security.</strong> We follow POPIA; your data is confidential and processed lawfully for service delivery.
                </p>
                
                <p className="text-sm text-muted-foreground">
                  <strong>5. Termination.</strong> Either party may cancel with 30 days' written notice. Outstanding fees remain payable.
                </p>

                <p className="text-sm text-muted-foreground">
                  <strong>6. Governing Law.</strong> This agreement is governed by the laws of South Africa.
                </p>
              </div>

              <div className="border-t pt-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={agreeToContract} 
                    onChange={e => setAgreeToContract(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm">
                    I have read and agree to the Monthly Service Agreement terms and conditions. 
                    I understand that this is a recurring monthly service.
                  </span>
                </label>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowContractModal(false);
                  setAgreeToContract(false);
                  setSelectedService(null);
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={proceedAfterContract}
                disabled={!agreeToContract}
                className="bg-primary text-primary-foreground"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ 
  service, 
  onAddToCart 
}: { 
  service: Service; 
  onAddToCart: (service: Service) => void;
}) => {
  const isMonthly = service.billing === 'monthly' || (service.unit || '').includes('/month');
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-5 rounded-2xl border shadow-sm bg-card hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                {service.category}
                {service.subcategory && ` • ${service.subcategory}`}
              </div>
              <h3 className="text-lg font-semibold mt-1 line-clamp-2">{service.name}</h3>
            </div>
            {isMonthly && (
              <span className="shrink-0 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                Monthly
              </span>
            )}
          </div>
          
          <div className="mb-3">
            <div className="text-2xl font-bold">
              {currency(service.price)}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                {service.unit}
              </span>
            </div>
            {service.vat_inclusive && (
              <p className="text-xs text-muted-foreground">VAT Inclusive</p>
            )}
          </div>
          
          {service.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {service.description}
            </p>
          )}
          
          {service.features && service.features.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-semibold mb-2">What's included:</p>
              <ul className="text-xs text-muted-foreground space-y-1 max-h-32 overflow-auto">
                {service.features.slice(0, 5).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span className="line-clamp-2">{feature}</span>
                  </li>
                ))}
                {service.features.length > 5 && (
                  <li className="text-xs italic">
                    +{service.features.length - 5} more features
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 mt-4 pt-4 border-t">
          <Button 
            onClick={() => onAddToCart(service)}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isMonthly ? 'Subscribe' : 'Add to Cart'}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default Pricing;
