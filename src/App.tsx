
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
import Services from "@/pages/dashboard/Services";
import Documents from "@/pages/dashboard/Documents";
import Support from "@/pages/dashboard/Support";
import Notifications from "@/pages/dashboard/Notifications";
import Profile from "@/pages/dashboard/Profile";
import RefundPolicy from "@/pages/policies/RefundPolicy";
import ServicesPolicy from "@/pages/policies/ServicesPolicy";
import InvoiceQuotePolicy from "@/pages/policies/InvoiceQuotePolicy";
import SalesOrderPolicy from "@/pages/policies/SalesOrderPolicy";
import PrivacyPolicy from "@/pages/policies/PrivacyPolicy";
import TermsConditions from "@/pages/policies/TermsConditions";
import ExportCustomsPolicy from "@/pages/policies/ExportCustomsPolicy";
import ShelfCompaniesPolicy from "@/pages/policies/ShelfCompaniesPolicy";

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
                <Route path="/dashboard/services" element={<Services />} />
                <Route path="/dashboard/documents" element={<Documents />} />
                <Route path="/dashboard/support" element={<Support />} />
                <Route path="/dashboard/notifications" element={<Notifications />} />
                <Route path="/dashboard/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/services/:category/:service" element={<ServicePage />} />
                <Route path="/policies/refund" element={<RefundPolicy />} />
                <Route path="/policies/services" element={<ServicesPolicy />} />
                <Route path="/policies/invoice-quote" element={<InvoiceQuotePolicy />} />
                <Route path="/policies/sales-order" element={<SalesOrderPolicy />} />
                <Route path="/policies/privacy" element={<PrivacyPolicy />} />
                <Route path="/policies/terms" element={<TermsConditions />} />
                <Route path="/policies/export-customs" element={<ExportCustomsPolicy />} />
                <Route path="/policies/shelf-companies" element={<ShelfCompaniesPolicy />} />
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
