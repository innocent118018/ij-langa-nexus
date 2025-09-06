
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
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
import Contact from "./pages/Contact";
import TestCheckout from "./pages/TestCheckout";

// Dashboard pages
import Clients from "./pages/dashboard/Clients";
import Orders from "./pages/dashboard/Orders";
import Invoices from "./pages/dashboard/Invoices";
import Reports from "./pages/dashboard/Reports";
import DashboardServices from "./pages/dashboard/Services";
import Documents from "./pages/dashboard/Documents";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";
import Support from "./pages/dashboard/Support";
import Notifications from "./pages/dashboard/Notifications";
import UserManagement from "./pages/dashboard/UserManagement";
import AdminClientPortalView from "./pages/dashboard/AdminClientPortalView";
import ContentManagement from "./pages/dashboard/ContentManagement";
import LegalEscalations from "./pages/dashboard/LegalEscalations";
import Refunds from "./pages/dashboard/Refunds";
import ProductManagementPage from "./pages/dashboard/ProductManagement";
import DocumentGeneration from "./pages/dashboard/DocumentGeneration";

// Individual Service Pages
import Services from "./pages/Services";
import BookkeepingTrialBalance from "./pages/services/accounting/BookkeepingTrialBalance";
import MonthlyManagementAccounts from "./pages/services/accounting/MonthlyManagementAccounts";
import AnnualFinancialStatements from "./pages/services/accounting/AnnualFinancialStatements";
import IndependentReview from "./pages/services/accounting/IndependentReview";
import EfilingRegistration from "./pages/services/taxation/EfilingRegistration";
import PersonalIncomeTax from "./pages/services/taxation/PersonalIncomeTax";
import CompanyTax from "./pages/services/taxation/CompanyTax";
import ProvisionalTax from "./pages/services/taxation/ProvisionalTax";
import TaxClearanceCertificates from "./pages/services/taxation/TaxClearanceCertificates";
import VATRegistration from "./pages/services/taxation/VATRegistration";
import PAYERegistration from "./pages/services/taxation/PAYERegistration";
import SARSReturnsEMP201 from "./pages/services/hr-payroll/SARSReturnsEMP201";
import IRP5ReconciliationEMP501 from "./pages/services/hr-payroll/IRP5ReconciliationEMP501";
import UIFRegistrationReturns from "./pages/services/hr-payroll/UIFRegistrationReturns";
import PayrollAdministration from "./pages/services/hr-payroll/PayrollAdministration";
import WorkmensCompensation from "./pages/services/hr-payroll/WorkmensCompensation";
import CompanyRegistrations from "./pages/services/secretarial/CompanyRegistrations";
import CIPCAnnualReturns from "./pages/services/secretarial/CIPCAnnualReturns";
import ChangeCompanyDetails from "./pages/services/secretarial/ChangeCompanyDetails";
import BeneficialOwnershipSubmissions from "./pages/services/secretarial/BeneficialOwnershipSubmissions";
import BBBEECertificates from "./pages/services/secretarial/BBBEECertificates";
import CreditChecks from "./pages/services/secretarial/CreditChecks";
import CriminalRecordCheck from "./pages/services/secretarial/CriminalRecordCheck";

// Document sub-pages
import Correspondence from "./pages/dashboard/documents/Correspondence";
import Shareholders from "./pages/dashboard/documents/Shareholders";

// Payment pages
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";

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
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes with Layout */}
                <Route path="/" element={<Layout><Index /></Layout>} />
                <Route path="/auth" element={<Layout><Auth /></Layout>} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/services" element={<Layout><Services /></Layout>} />
                <Route path="/services/:category/:service" element={<Layout><Services /></Layout>} />
                <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
                <Route path="/checkout" element={<Layout><Checkout /></Layout>} />

                {/* Test checkout route */}
                <Route path="/test-checkout" element={<Layout><TestCheckout /></Layout>} />

                {/* Products route */}
                <Route path="/products" element={<Layout><Products /></Layout>} />

                {/* Policy routes with Layout */}
                <Route path="/policies/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
                <Route path="/policies/terms-conditions" element={<Layout><TermsConditions /></Layout>} />
                <Route path="/policies/refund-policy" element={<Layout><RefundPolicy /></Layout>} />
                <Route path="/policies/services-policy" element={<Layout><ServicesPolicy /></Layout>} />
                <Route path="/policies/invoice-quote-policy" element={<Layout><InvoiceQuotePolicy /></Layout>} />
                <Route path="/policies/sales-order-policy" element={<Layout><SalesOrderPolicy /></Layout>} />
                <Route path="/policies/shelf-companies-policy" element={<Layout><ShelfCompaniesPolicy /></Layout>} />
                <Route path="/policies/export-customs-policy" element={<Layout><ExportCustomsPolicy /></Layout>} />
                
                {/* Contact route */}
                <Route path="/contact" element={<Layout><Contact /></Layout>} />

                {/* Service routes with Layout */}
                <Route path="/services/:category/:service" element={<Layout><ServicePage /></Layout>} />

                {/* Dashboard routes with DashboardLayout only (no Layout wrapper) */}
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
                
                <Route path="/dashboard/users" element={
                  <DashboardLayout>
                    <UserManagement />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/clients/:clientId" element={
                  <DashboardLayout>
                    <AdminClientPortalView />
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
                    <DashboardServices />
                  </DashboardLayout>
                } />
                
                {/* Individual Service Routes */}
                <Route path="/services/accounting/bookkeeping-trial-balance" element={<Layout><BookkeepingTrialBalance /></Layout>} />
                <Route path="/services/accounting/monthly-management-accounts" element={<Layout><MonthlyManagementAccounts /></Layout>} />
                <Route path="/services/accounting/annual-financial-statements" element={<Layout><AnnualFinancialStatements /></Layout>} />
                <Route path="/services/accounting/independent-review" element={<Layout><IndependentReview /></Layout>} />
                <Route path="/services/taxation/efiling-registration" element={<Layout><EfilingRegistration /></Layout>} />
                <Route path="/services/taxation/personal-income-tax" element={<Layout><PersonalIncomeTax /></Layout>} />
                <Route path="/services/taxation/company-tax" element={<Layout><CompanyTax /></Layout>} />
                <Route path="/services/taxation/provisional-tax" element={<Layout><ProvisionalTax /></Layout>} />
                <Route path="/services/taxation/tax-clearance-certificates" element={<Layout><TaxClearanceCertificates /></Layout>} />
                <Route path="/services/taxation/vat-registration" element={<Layout><VATRegistration /></Layout>} />
                <Route path="/services/taxation/paye-registration" element={<Layout><PAYERegistration /></Layout>} />
                <Route path="/services/hr-payroll/sars-returns-emp201" element={<Layout><SARSReturnsEMP201 /></Layout>} />
                <Route path="/services/hr-payroll/irp5-reconciliation-emp501" element={<Layout><IRP5ReconciliationEMP501 /></Layout>} />
                <Route path="/services/hr-payroll/uif-registration-returns" element={<Layout><UIFRegistrationReturns /></Layout>} />
                <Route path="/services/hr-payroll/payroll-administration" element={<Layout><PayrollAdministration /></Layout>} />
                <Route path="/services/hr-payroll/workmens-compensation" element={<Layout><WorkmensCompensation /></Layout>} />
                <Route path="/services/secretarial/company-registrations" element={<Layout><CompanyRegistrations /></Layout>} />
                <Route path="/services/secretarial/cipc-annual-returns" element={<Layout><CIPCAnnualReturns /></Layout>} />
                <Route path="/services/secretarial/change-company-details" element={<Layout><ChangeCompanyDetails /></Layout>} />
                <Route path="/services/secretarial/beneficial-ownership-submissions" element={<Layout><BeneficialOwnershipSubmissions /></Layout>} />
                <Route path="/services/secretarial/bbbee-certificates" element={<Layout><BBBEECertificates /></Layout>} />
                <Route path="/services/secretarial/credit-checks" element={<Layout><CreditChecks /></Layout>} />
                <Route path="/services/secretarial/criminal-record-check" element={<Layout><CriminalRecordCheck /></Layout>} />
                
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
                
                <Route path="/dashboard/notifications" element={
                  <DashboardLayout>
                    <Notifications />
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
                
                <Route path="/dashboard/document-generation" element={
                  <DashboardLayout>
                    <DocumentGeneration />
                  </DashboardLayout>
                } />

                {/* Payment routes with Layout */}
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-cancel" element={<PaymentCancel />} />
                <Route path="/dashboard/payments/success" element={<PaymentSuccess />} />
                <Route path="/dashboard/payments/cancel" element={<PaymentCancel />} />

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
