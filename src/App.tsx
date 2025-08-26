
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { Layout } from "@/components/layout/Layout";
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
              {/* Public routes with Layout */}
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/auth" element={<Layout><Auth /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/products" element={<Layout><Products /></Layout>} />
              <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
              <Route path="/checkout" element={<Layout><Checkout /></Layout>} />

              {/* Policy routes with Layout */}
              <Route path="/policies/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
              <Route path="/policies/terms" element={<Layout><TermsConditions /></Layout>} />
              <Route path="/policies/refund" element={<Layout><RefundPolicy /></Layout>} />
              <Route path="/policies/services" element={<Layout><ServicesPolicy /></Layout>} />
              <Route path="/policies/invoice-quote" element={<Layout><InvoiceQuotePolicy /></Layout>} />
              <Route path="/policies/sales-order" element={<Layout><SalesOrderPolicy /></Layout>} />
              <Route path="/policies/shelf-companies" element={<Layout><ShelfCompaniesPolicy /></Layout>} />
              <Route path="/policies/export-customs" element={<Layout><ExportCustomsPolicy /></Layout>} />

              {/* Service routes with Layout */}
              <Route path="/services/:serviceSlug" element={<Layout><ServicePage /></Layout>} />

              {/* Dashboard routes with DashboardLayout (which includes Layout) */}
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

              {/* Payment routes with Layout */}
              <Route path="/dashboard/payments/success" element={<Layout><PaymentSuccess /></Layout>} />
              <Route path="/dashboard/payments/cancel" element={<Layout><PaymentCancel /></Layout>} />

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
