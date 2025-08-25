
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import About from "@/pages/About";
import Pricing from "@/pages/Pricing";
import ServicePage from "@/pages/services/ServicePage";
import NotFound from "@/pages/NotFound";
import Clients from "@/pages/dashboard/Clients";
import Orders from "@/pages/dashboard/Orders";
import Invoices from "@/pages/dashboard/Invoices";
import LegalEscalations from "@/pages/dashboard/LegalEscalations";
import Reports from "@/pages/dashboard/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/clients" element={<Clients />} />
                <Route path="/dashboard/orders" element={<Orders />} />
                <Route path="/dashboard/invoices" element={<Invoices />} />
                <Route path="/dashboard/legal" element={<LegalEscalations />} />
                <Route path="/dashboard/reports" element={<Reports />} />
                <Route path="/about" element={<About />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/services/:category/:service" element={<ServicePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
