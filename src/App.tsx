
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CustomerAuthProvider } from "@/hooks/useCustomerAuth";
import { CartProvider } from "@/hooks/useCart";
import { WhatsAppChat } from '@/components/whatsapp/WhatsAppChat';
import { Layout } from "@/components/layout/Layout";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
// Import all pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import { Login } from "./pages/Login";

// New Auth Pages
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";
import AuthForgotPassword from "./pages/auth/ForgotPassword";
import AuthResetPassword from "./pages/auth/ResetPassword";
import AuthVerifyEmail from "./pages/auth/VerifyEmail";
import AuthGuard from "./components/auth/AuthGuard";
import About from "./pages/About";
import Products from "./pages/Products";
import Pricing from "./pages/Pricing";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import TestCheckout from "./pages/TestCheckout";
import TaxCalculator from "./pages/TaxCalculator";
import Mentorship from "./pages/Mentorship";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminServices from "./pages/admin/AdminServices";
import AdminClients from "./pages/admin/AdminClients";
import AdminInvoices from "./pages/admin/AdminInvoices";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminEcommerce from "./pages/admin/AdminEcommerce";
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminAuditLogs from "./pages/admin/AdminAuditLogs";
import AdminAccounting from "./pages/admin/AdminAccounting";

// User portal pages
import UserOverview from "./pages/user/UserOverview";
import UserDocuments from "./pages/user/UserDocuments";
import UserInvoices from "./pages/user/UserInvoices";
import UserServices from "./pages/user/UserServices";
import UserDashboard from "./pages/user/UserDashboard";
import UserNotifications from "./pages/user/UserNotifications";
import UserProfile from "./pages/user/UserProfile";

// Layouts
import { NewAdminLayout } from "./components/admin/NewAdminLayout";
import UserLayout from "./layouts/UserLayout";

// New Admin Pages
import NewAdminSummary from "./pages/admin/NewAdminSummary";
import NewAdminSettings from "./pages/admin/NewAdminSettings";

// Components
import ProtectedRoute from "./components/dashboard/ProtectedRoute";

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
import AdminSupport from "./pages/dashboard/AdminSupport";
import AutomationFlows from "./pages/dashboard/AutomationFlows";
import Notifications from "./pages/dashboard/Notifications";
import UserManagement from "./pages/dashboard/UserManagement";
import AdminClientPortalView from "./pages/dashboard/AdminClientPortalView";
import ContentManagement from "./pages/dashboard/ContentManagement";
import LegalEscalations from "./pages/dashboard/LegalEscalations";
import Refunds from "./pages/dashboard/Refunds";
import ProductManagementPage from "./pages/dashboard/ProductManagement";
import DocumentGeneration from "./pages/dashboard/DocumentGeneration";
import Overview from "./pages/dashboard/Overview";
import MyServices from "./pages/dashboard/MyServices";
import MyInvoices from "./pages/dashboard/MyInvoices";
import Messages from "./pages/dashboard/Messages";
import SecretarialSoftware from "./pages/dashboard/SecretarialSoftware";
import Contracts from "./pages/dashboard/Contracts";
import ContractDetails from "./pages/dashboard/ContractDetails";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import OTPVerification from "./pages/auth/OTPVerification";

// New ERP/Accounting pages
import Summary from "./pages/dashboard/Summary";
import BankCashAccounts from "./pages/dashboard/BankCashAccounts";
import Receipts from "./pages/dashboard/Receipts";
import Payments from "./pages/dashboard/Payments";
import InterAccountTransfers from "./pages/dashboard/InterAccountTransfers";
import BankReconciliations from "./pages/dashboard/BankReconciliations";
import ExpenseClaims from "./pages/dashboard/ExpenseClaims";
import Customers from "./pages/dashboard/Customers";
import SalesQuotes from "./pages/dashboard/SalesQuotes";
import SalesOrders from "./pages/dashboard/SalesOrders";
import SalesInvoices from "./pages/dashboard/SalesInvoices";
import CreditNotes from "./pages/dashboard/CreditNotes";
import LatePaymentFees from "./pages/dashboard/LatePaymentFees";
import DeliveryNotes from "./pages/dashboard/DeliveryNotes";
import BillableTime from "./pages/dashboard/BillableTime";
import WithholdingTaxReceipts from "./pages/dashboard/WithholdingTaxReceipts";
import Suppliers from "./pages/dashboard/Suppliers";
import PurchaseQuotes from "./pages/dashboard/PurchaseQuotes";
import PurchaseOrders from "./pages/dashboard/PurchaseOrders";
import PurchaseInvoices from "./pages/dashboard/PurchaseInvoices";
import DebitNotes from "./pages/dashboard/DebitNotes";
import GoodsReceipts from "./pages/dashboard/GoodsReceipts";
import InventoryItems from "./pages/dashboard/InventoryItems";
import InventoryTransfers from "./pages/dashboard/InventoryTransfers";
import InventoryWriteoffs from "./pages/dashboard/InventoryWriteoffs";
import ProductionOrders from "./pages/dashboard/ProductionOrders";
import Projects from "./pages/dashboard/Projects";
import Employees from "./pages/dashboard/Employees";
import Payslips from "./pages/dashboard/Payslips";
import Investments from "./pages/dashboard/Investments";
import FixedAssets from "./pages/dashboard/FixedAssets";
import DepreciationEntries from "./pages/dashboard/DepreciationEntries";
import IntangibleAssets from "./pages/dashboard/IntangibleAssets";
import AmortizationEntries from "./pages/dashboard/AmortizationEntries";
import CapitalAccounts from "./pages/dashboard/CapitalAccounts";
import SpecialAccounts from "./pages/dashboard/SpecialAccounts";
import Folders from "./pages/dashboard/Folders";
import JournalEntries from "./pages/dashboard/JournalEntries";
import SystemSettings from "./pages/dashboard/SystemSettings";
import SystemMonitoring from "./pages/dashboard/SystemMonitoring";

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
import ServiceCancellation from "./pages/policies/ServiceCancellation";
import ServicesPolicy from "./pages/policies/ServicesPolicy";
import InvoiceQuotePolicy from "./pages/policies/InvoiceQuotePolicy";
import SalesOrderPolicy from "./pages/policies/SalesOrderPolicy";
import ShelfCompaniesPolicy from "./pages/policies/ShelfCompaniesPolicy";
import ExportCustomsPolicy from "./pages/policies/ExportCustomsPolicy";
import ComplianceSummary from "./pages/policies/ComplianceSummary";
import ClientRights from "./pages/policies/ClientRights";
import LegalDisclaimer from "./pages/policies/LegalDisclaimer";

// Service pages
import ServicePage from "./pages/services/ServicePage";
import CompliancePackages from './pages/services/CompliancePackages';
import TaxReturns from './pages/services/TaxReturns';
import BusinessPlans from './pages/services/BusinessPlans';
import OneTimeServices from './pages/services/OneTimeServices';
import AccountingServices from './pages/services/AccountingServices';
import TaxationServices from './pages/services/TaxationServices';
import PayrollServices from './pages/services/PayrollServices';
import SecretarialServices from './pages/services/SecretarialServices';
import SecretarialServicesLanding from './pages/services/SecretarialServicesLanding';
import PayrollServicesLanding from './pages/services/PayrollServicesLanding';
import BookkeepingServicesLanding from './pages/services/BookkeepingServicesLanding';
import TaxationServicesLanding from './pages/services/TaxationServicesLanding';

// Individual Service Pages
import NameReservation from './pages/services/secretarial/NameReservation';
import ExtendNameReservation from './pages/services/secretarial/ExtendNameReservation';
import MemorandumOfIncorporation from './pages/services/secretarial/MemorandumOfIncorporation';
import DirectorChanges from './pages/services/secretarial/DirectorChanges';
import MOIAmendments from './pages/services/secretarial/MOIAmendments';
import RegistrationCertificate from './pages/services/secretarial/RegistrationCertificate';
import CompanyDeregistration from './pages/services/secretarial/CompanyDeregistration';
import EmployerRegistration from './pages/services/payroll/EmployerRegistration';
import TaxDeductionDirective from './pages/services/payroll/TaxDeductionDirective';
import EmployeeTaxCertificates from './pages/services/payroll/EmployeeTaxCertificates';
import EmployeeTaxReconciliation from './pages/services/payroll/EmployeeTaxReconciliation';
import IndividualTaxReturns from './pages/services/taxation/IndividualTaxReturns';
import CompanyTaxReturns from './pages/services/taxation/CompanyTaxReturns';
import NoticeOfObjection from './pages/services/taxation/NoticeOfObjection';
import VATRegistrationService from './pages/services/taxation/VATRegistrationService';
import PayrollAdministrationService from './pages/services/bookkeeping/PayrollAdministration';
import AccountingOfficersCertificate from './pages/services/bookkeeping/AccountingOfficersCertificate';
import EMEQSEAffidavits from './pages/services/bookkeeping/EMEQSEAffidavits';

// ClerkIQ pages
import ClerkIQ from './pages/ClerkIQ';
import ClerkIQPricing from './pages/ClerkIQPricing';
import BankStatements from './pages/clerkiq/BankStatements';
import TeamManagement from './pages/clerkiq/features/TeamManagement';
import BillingCredits from './pages/clerkiq/features/BillingCredits';
import SecurityMFA from './pages/clerkiq/features/SecurityMFA';

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CustomerAuthProvider>
          <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <WhatsAppChat />
              <Routes>
                {/* Public routes with Layout */}
                <Route path="/" element={<Layout><Index /></Layout>} />
                
                {/* New Auth Routes */}
                <Route path="/auth/login" element={<AuthLogin />} />
                <Route path="/auth/register" element={<AuthRegister />} />
                <Route path="/auth/forgot-password" element={<AuthForgotPassword />} />
                <Route path="/auth/reset-password" element={<AuthResetPassword />} />
                <Route path="/auth/verify-email" element={<AuthVerifyEmail />} />
                
                {/* Legacy auth routes - redirect to new */}
                <Route path="/auth" element={<AuthLogin />} />
                <Route path="/login" element={<AuthLogin />} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/services" element={<Layout><Services /></Layout>} />
                <Route path="/services/:category/:service" element={<Layout><Services /></Layout>} />
                <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
                <Route path="/tax-calculator" element={<TaxCalculator />} />
                <Route path="/checkout" element={<Layout><Checkout /></Layout>} />

                {/* Test checkout route */}
                <Route path="/test-checkout" element={<Layout><TestCheckout /></Layout>} />

                {/* Products route */}
                <Route path="/products" element={<Layout><Products /></Layout>} />

                {/* Policy routes with Layout */}
                <Route path="/policies/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
                <Route path="/policies/terms-conditions" element={<Layout><TermsConditions /></Layout>} />
                <Route path="/policies/refund-policy" element={<Layout><RefundPolicy /></Layout>} />
                <Route path="/policies/service-cancellation" element={<Layout><ServiceCancellation /></Layout>} />
                <Route path="/policies/services-policy" element={<Layout><ServicesPolicy /></Layout>} />
                <Route path="/policies/invoice-quote-policy" element={<Layout><InvoiceQuotePolicy /></Layout>} />
                <Route path="/policies/sales-order-policy" element={<Layout><SalesOrderPolicy /></Layout>} />
                <Route path="/policies/shelf-companies-policy" element={<Layout><ShelfCompaniesPolicy /></Layout>} />
                <Route path="/policies/export-customs-policy" element={<Layout><ExportCustomsPolicy /></Layout>} />
                <Route path="/policies/compliance-summary" element={<Layout><ComplianceSummary /></Layout>} />
                <Route path="/policies/client-rights" element={<Layout><ClientRights /></Layout>} />
                <Route path="/policies/legal-disclaimer" element={<Layout><LegalDisclaimer /></Layout>} />
                
                {/* Contact route */}
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                
                {/* Mentorship route */}
                <Route path="/mentorship" element={<Layout><Mentorship /></Layout>} />

                {/* Service routes with Layout */}
                <Route path="/services/:category/:service" element={<Layout><ServicePage /></Layout>} />
                
                {/* New Service Category Pages */}
                <Route path="/services/accounting" element={<Layout><AccountingServices /></Layout>} />
                <Route path="/services/taxation" element={<Layout><TaxationServices /></Layout>} />
                <Route path="/services/payroll" element={<Layout><PayrollServices /></Layout>} />
                <Route path="/services/secretarial" element={<Layout><SecretarialServices /></Layout>} />
                
                {/* New Service Landing Pages */}
                <Route path="/services/secretarial-services" element={<Layout><SecretarialServicesLanding /></Layout>} />
                <Route path="/services/payroll-services" element={<Layout><PayrollServicesLanding /></Layout>} />
                <Route path="/services/bookkeeping-services" element={<Layout><BookkeepingServicesLanding /></Layout>} />
                <Route path="/services/taxation-services" element={<Layout><TaxationServicesLanding /></Layout>} />

                {/* ClerkIQ Routes */}
                <Route path="/clerkiq" element={<Layout><ClerkIQ /></Layout>} />
                <Route path="/clerkiq/pricing" element={<Layout><ClerkIQPricing /></Layout>} />
                <Route path="/clerkiq/bank-statements" element={<Layout><BankStatements /></Layout>} />
                <Route path="/clerkiq/features/bank-statements" element={<Layout><BankStatements /></Layout>} />
                <Route path="/clerkiq/features/team-management" element={<Layout><TeamManagement /></Layout>} />
                <Route path="/clerkiq/features/billing-credits" element={<Layout><BillingCredits /></Layout>} />
                <Route path="/clerkiq/features/security-mfa" element={<Layout><SecurityMFA /></Layout>} />
                
                {/* Service Package Pages */}
                <Route path="/services/compliance-packages" element={<Layout><CompliancePackages /></Layout>} />
                <Route path="/services/tax-returns" element={<Layout><TaxReturns /></Layout>} />
                <Route path="/services/business-plans" element={<Layout><BusinessPlans /></Layout>} />
                <Route path="/services/one-time-services" element={<Layout><OneTimeServices /></Layout>} />
                
                {/* ClerkIQ Bank Statement Processing */}
                <Route path="/clerkiq/bank-statements/:paymentSuccess" element={<Layout><BankStatements /></Layout>} />

                {/* Dashboard routes - main dashboard handles its own layout */}
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
                
                {/* New Individual Service Pages */}
                <Route path="/services/secretarial/name-reservation" element={<Layout><NameReservation /></Layout>} />
                <Route path="/services/secretarial/extend-name-reservation" element={<Layout><ExtendNameReservation /></Layout>} />
                <Route path="/services/secretarial/memorandum-of-incorporation" element={<Layout><MemorandumOfIncorporation /></Layout>} />
                <Route path="/services/secretarial/director-changes" element={<Layout><DirectorChanges /></Layout>} />
                <Route path="/services/secretarial/moi-amendments" element={<Layout><MOIAmendments /></Layout>} />
                <Route path="/services/secretarial/registration-certificate" element={<Layout><RegistrationCertificate /></Layout>} />
                <Route path="/services/secretarial/company-deregistration" element={<Layout><CompanyDeregistration /></Layout>} />
                <Route path="/services/payroll/employer-registration" element={<Layout><EmployerRegistration /></Layout>} />
                <Route path="/services/payroll/tax-deduction-directive" element={<Layout><TaxDeductionDirective /></Layout>} />
                <Route path="/services/payroll/employee-tax-certificates" element={<Layout><EmployeeTaxCertificates /></Layout>} />
                <Route path="/services/payroll/employee-tax-reconciliation" element={<Layout><EmployeeTaxReconciliation /></Layout>} />
                <Route path="/services/taxation/individual-tax-returns" element={<Layout><IndividualTaxReturns /></Layout>} />
                <Route path="/services/taxation/company-tax-returns" element={<Layout><CompanyTaxReturns /></Layout>} />
                <Route path="/services/taxation/notice-of-objection" element={<Layout><NoticeOfObjection /></Layout>} />
                <Route path="/services/taxation/vat-registration-service" element={<Layout><VATRegistrationService /></Layout>} />
                <Route path="/services/bookkeeping/payroll-administration-service" element={<Layout><PayrollAdministrationService /></Layout>} />
                <Route path="/services/bookkeeping/accounting-officers-certificate" element={<Layout><AccountingOfficersCertificate /></Layout>} />
                <Route path="/services/bookkeeping/eme-qse-affidavits" element={<Layout><EMEQSEAffidavits /></Layout>} />
                
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
                
                <Route path="/dashboard/admin-support" element={
                  <DashboardLayout>
                    <AdminSupport />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/automation-flows" element={
                  <DashboardLayout>
                    <AutomationFlows />
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

                <Route path="/dashboard/overview" element={
                  <DashboardLayout>
                    <Overview />
                  </DashboardLayout>
                } />

                <Route path="/dashboard/my-services" element={
                  <DashboardLayout>
                    <MyServices />
                  </DashboardLayout>
                } />

                <Route path="/dashboard/my-invoices" element={
                  <DashboardLayout>
                    <MyInvoices />
                  </DashboardLayout>
                } />

                <Route path="/dashboard/messages" element={
                  <DashboardLayout>
                    <Messages />
                  </DashboardLayout>
                } />

                <Route path="/dashboard/secretarial-software" element={
                  <DashboardLayout>
                    <SecretarialSoftware />
                  </DashboardLayout>
                } />

                <Route path="/dashboard/contracts" element={
                  <DashboardLayout>
                    <Contracts />
                  </DashboardLayout>
                } />

                <Route path="/dashboard/contracts/:id" element={
                  <DashboardLayout>
                    <ContractDetails />
                  </DashboardLayout>
                } />

                <Route path="/dashboard/notifications" element={
                  <DashboardLayout>
                    <NotificationsPage />
                  </DashboardLayout>
                } />

                <Route path="/auth/otp-verification" element={<Layout><OTPVerification /></Layout>} />

                <Route path="/tax-calculator" element={<TaxCalculator />} />

                <Route path="/dashboard/secretarial-software" element={
                  <DashboardLayout>
                    <SecretarialSoftware />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/system-settings" element={
                  <DashboardLayout>
                    <SystemSettings />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/system-monitoring" element={
                  <DashboardLayout>
                    <SystemMonitoring />
                  </DashboardLayout>
                } />

                {/* All Accounting System Routes */}
                <Route path="/dashboard/bank-cash-accounts" element={
                  <DashboardLayout>
                    <BankCashAccounts />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/receipts" element={
                  <DashboardLayout>
                    <Receipts />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/payments" element={
                  <DashboardLayout>
                    <Payments />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/inter-account-transfers" element={
                  <DashboardLayout>
                    <InterAccountTransfers />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/bank-reconciliations" element={
                  <DashboardLayout>
                    <BankReconciliations />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/expense-claims" element={
                  <DashboardLayout>
                    <ExpenseClaims />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/customers" element={
                  <DashboardLayout>
                    <Customers />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/sales-quotes" element={
                  <DashboardLayout>
                    <SalesQuotes />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/sales-orders" element={
                  <DashboardLayout>
                    <SalesOrders />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/sales-invoices" element={
                  <DashboardLayout>
                    <SalesInvoices />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/credit-notes" element={
                  <DashboardLayout>
                    <CreditNotes />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/late-payment-fees" element={
                  <DashboardLayout>
                    <LatePaymentFees />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/delivery-notes" element={
                  <DashboardLayout>
                    <DeliveryNotes />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/billable-time" element={
                  <DashboardLayout>
                    <BillableTime />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/withholding-tax-receipts" element={
                  <DashboardLayout>
                    <WithholdingTaxReceipts />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/suppliers" element={
                  <DashboardLayout>
                    <Suppliers />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/purchase-quotes" element={
                  <DashboardLayout>
                    <PurchaseQuotes />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/purchase-orders" element={
                  <DashboardLayout>
                    <PurchaseOrders />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/purchase-invoices" element={
                  <DashboardLayout>
                    <PurchaseInvoices />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/debit-notes" element={
                  <DashboardLayout>
                    <DebitNotes />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/goods-receipts" element={
                  <DashboardLayout>
                    <GoodsReceipts />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/inventory-items" element={
                  <DashboardLayout>
                    <InventoryItems />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/inventory-transfers" element={
                  <DashboardLayout>
                    <InventoryTransfers />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/inventory-writeoffs" element={
                  <DashboardLayout>
                    <InventoryWriteoffs />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/production-orders" element={
                  <DashboardLayout>
                    <ProductionOrders />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/projects" element={
                  <DashboardLayout>
                    <Projects />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/employees" element={
                  <DashboardLayout>
                    <Employees />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/payslips" element={
                  <DashboardLayout>
                    <Payslips />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/investments" element={
                  <DashboardLayout>
                    <Investments />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/fixed-assets" element={
                  <DashboardLayout>
                    <FixedAssets />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/depreciation-entries" element={
                  <DashboardLayout>
                    <DepreciationEntries />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/intangible-assets" element={
                  <DashboardLayout>
                    <IntangibleAssets />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/amortization-entries" element={
                  <DashboardLayout>
                    <AmortizationEntries />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/capital-accounts" element={
                  <DashboardLayout>
                    <CapitalAccounts />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/special-accounts" element={
                  <DashboardLayout>
                    <SpecialAccounts />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/journal-entries" element={
                  <DashboardLayout>
                    <JournalEntries />
                  </DashboardLayout>
                } />
                
                <Route path="/dashboard/folders" element={
                  <DashboardLayout>
                    <Folders />
                  </DashboardLayout>
                } />

                {/* ClerkIQ Routes */}
                <Route path="/clerkiq" element={<Layout><ClerkIQ /></Layout>} />
                <Route path="/clerkiq/pricing" element={<Layout><ClerkIQPricing /></Layout>} />
                <Route path="/clerkiq/bank-statements" element={<Layout><BankStatements /></Layout>} />
                <Route path="/clerkiq/features/bank-statements" element={<Layout><BankStatements /></Layout>} />
                <Route path="/clerkiq/features/team-management" element={<Layout><TeamManagement /></Layout>} />
                <Route path="/clerkiq/features/billing-credits" element={<Layout><BillingCredits /></Layout>} />
                <Route path="/clerkiq/features/security-mfa" element={<Layout><SecurityMFA /></Layout>} />

                {/* New Admin Dashboard Routes - Protected */}
                <Route path="/admin" element={
                  <AuthGuard requireAdmin>
                    <NewAdminLayout />
                  </AuthGuard>
                }>
                  <Route index element={<Navigate to="/admin/summary" replace />} />
                  <Route path="summary" element={<NewAdminSummary />} />
                  <Route path="settings" element={<NewAdminSettings />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="clients" element={<AdminClients />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="ecommerce" element={<AdminEcommerce />} />
                  <Route path="documents" element={<AdminDocuments />} />
                  <Route path="audit-logs" element={<AdminAuditLogs />} />
                  <Route path="accounting" element={<AdminAccounting />} />
                  <Route path="invoices" element={<AdminInvoices />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="monitoring" element={<NewAdminSummary />} />
                  <Route path="customers" element={<AdminClients />} />
                  <Route path="sales-invoices" element={<AdminInvoices />} />
                  <Route path="sales-orders" element={<AdminOrders />} />
                  <Route path="sales-quotes" element={<NewAdminSummary />} />
                  <Route path="*" element={<NewAdminSummary />} />
                </Route>

                {/* User Portal Routes - Protected */}
                <Route path="/portal" element={
                  <AuthGuard>
                    <UserLayout />
                  </AuthGuard>
                }>
                  <Route index element={<Navigate to="/portal/dashboard" replace />} />
                  <Route path="dashboard" element={<UserDashboard />} />
                  <Route path="overview" element={<UserOverview />} />
                  <Route path="invoices" element={<UserInvoices />} />
                  <Route path="documents" element={<UserDocuments />} />
                  <Route path="services" element={<UserServices />} />
                  <Route path="notifications" element={<UserNotifications />} />
                  <Route path="profile" element={<UserProfile />} />
                </Route>

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
        </CustomerAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
