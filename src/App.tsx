
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

// Import all pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Products from "./pages/Products";
import Pricing from "./pages/Pricing";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";

// Dashboard pages
import Clients from "./pages/dashboard/Clients";
import Orders from "./pages/dashboard/Orders";
import Invoices from "./pages/dashboard/Invoices";
import Reports from "./pages/dashboard/Reports";
import Services from "./pages/dashboard/Services";
import Documents from "./pages/dashboard/Documents";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";
import Support from "./pages/dashboard/Support";
import Notifications from "./pages/dashboard/Notifications";
import ContentManagement from "./pages/dashboard/ContentManagement";
import LegalEscalations from "./pages/dashboard/LegalEscalations";
import Refunds from "./pages/dashboard/Refunds";
import ProductManagementPage from "./pages/dashboard/ProductManagement";

// Document sub-pages
import Correspondence from "./pages/dashboard/documents/Correspondence";
import Shareholders from "./pages/dashboard/documents/Shareholders";

// Payment pages
import PaymentSuccess from "./pages/dashboard/PaymentSuccess";
import PaymentCancel from "./pages/dashboard/PaymentCancel";

// Policy pages
import PrivacyPolicy from "./pages/policies/PrivacyPolicy";
import TermsConditions from "./pages/policies/TermsConditions";
import RefundPolicy from "./pages/policies/RefundPolicy";
import ServicesPolicy from "./pages/policies/ServicesPolicy";
import InvoiceQuotePolicy from "./pages/policies/InvoiceQuotePolicy";
import SalesOrderPolicy from "./pages/policies/SalesOrderPolicy";
import ShelfCompaniesPolicy from "./pages/policies/ShelfCompaniesPolicy";
import ExportCustomsPolicy from "./pages/policies/ExportCustomsPolicy";

// Service pages
import ServicePage from "./pages/services/ServicePage";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/checkout" element={<Checkout />} />

              {/* Policy routes */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/services-policy" element={<ServicesPolicy />} />
              <Route path="/invoice-quote-policy" element={<InvoiceQuotePolicy />} />
              <Route path="/sales-order-policy" element={<SalesOrderPolicy />} />
              <Route path="/shelf-companies-policy" element={<ShelfCompaniesPolicy />} />
              <Route path="/export-customs-policy" element={<ExportCustomsPolicy />} />

              {/* Service routes */}
              <Route path="/services/:serviceSlug" element={<ServicePage />} />

              {/* Dashboard routes with layout */}
              <Route path="/dashboard" element={
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              } />
              
              <Route path="/dashboard/clients" element={
                <DashboardLayout>
                  <Clients />
                </DashboardLayout>
              } />
              
              <Route path="/dashboard/orders" element={
                <DashboardLayout>
                  <Orders />
                </DashboardLayout>
              } />
              
              <Route path="/dashboard/invoices" element={
                <DashboardLayout>
                  <Invoices />
                </DashboardLayout>
              } />
              
              <Route path="/dashboard/reports" element={
                <DashboardLayout>
                  <Reports />
                </DashboardLayout>
              } />
              
              <Route path="/dashboard/services" element={
                <DashboardLayout>
                  <Services />
                </DashboardLayout>
              } />
              
              <Route path="/dashboard/documents" element={
                <DashboardLayout>
                  <Documents />
                </DashboardLayout>
              } />
              
              <Route path="/dashboard/documents/correspondence" element={
                <DashboardLayout>
                  <Correspondence />
                </DashboardLayout>
              } />
              
              <Route path="/dashboard/documents/shareholders" element={
                <DashboardLayout>
                  <Shareholders />
                </DashboardLayout>
              } />
              
              <Route path="/dashboard/profile" element={
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              } />
              
              <Route path="/dashboard/settings" element={
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              } />
              
              <Route path="/dashboard/support" element={
                <DashboardLayout>
                  <Support />
                </DashboardLayout>
              } />
              
              <Route path="/dashboard/notifications" element={
                <DashboardLayout>
                  <Notifications />
                </DashboardLayout>
              } />
              
              <Route path="/dashboard/content" element={
                <DashboardLayout>
                  <ContentManagement />
                </DashboardLayout>
              } />
              
              <Route path="/dashboard/legal" element={
                <DashboardLayout>
                  <LegalEscalations />
                </DashboardLayout>
              } />
              
              <Route path="/dashboard/refunds" element={
                <DashboardLayout>
                  <Refunds />
                </DashboardLayout>
              } />
              
              <Route path="/dashboard/products" element={
                <DashboardLayout>
                  <ProductManagementPage />
                </DashboardLayout>
              } />

              {/* Payment routes */}
              <Route path="/dashboard/payments/success" element={<PaymentSuccess />} />
              <Route path="/dashboard/payments/cancel" element={<PaymentCancel />} />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
