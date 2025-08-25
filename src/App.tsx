
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import Pricing from '@/pages/Pricing';
import Products from '@/pages/Products';
import Checkout from '@/pages/Checkout';
import NotFound from '@/pages/NotFound';
import ServicePage from '@/pages/services/ServicePage';
import Clients from '@/pages/dashboard/Clients';
import Orders from '@/pages/dashboard/Orders';
import Invoices from '@/pages/dashboard/Invoices';
import LegalEscalations from '@/pages/dashboard/LegalEscalations';
import Refunds from '@/pages/dashboard/Refunds';
import Reports from '@/pages/dashboard/Reports';
import Services from '@/pages/dashboard/Services';
import ContentManagement from '@/pages/dashboard/ContentManagement';
import Support from '@/pages/dashboard/Support';
import Settings from '@/pages/dashboard/Settings';
import Documents from '@/pages/dashboard/Documents';
import Notifications from '@/pages/dashboard/Notifications';
import Profile from '@/pages/dashboard/Profile';
import Shareholders from '@/pages/dashboard/documents/Shareholders';
import Correspondence from '@/pages/dashboard/documents/Correspondence';
import RefundPolicy from '@/pages/policies/RefundPolicy';
import ServicesPolicy from '@/pages/policies/ServicesPolicy';
import InvoiceQuotePolicy from '@/pages/policies/InvoiceQuotePolicy';
import SalesOrderPolicy from '@/pages/policies/SalesOrderPolicy';
import PrivacyPolicy from '@/pages/policies/PrivacyPolicy';
import TermsConditions from '@/pages/policies/TermsConditions';
import ExportCustomsPolicy from '@/pages/policies/ExportCustomsPolicy';
import ShelfCompaniesPolicy from '@/pages/policies/ShelfCompaniesPolicy';
import { Layout } from '@/components/layout/Layout';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/products" element={<Products />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/services/:serviceId" element={<ServicePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/clients" element={<Clients />} />
            <Route path="/dashboard/orders" element={<Orders />} />
            <Route path="/dashboard/invoices" element={<Invoices />} />
            <Route path="/dashboard/legal" element={<LegalEscalations />} />
            <Route path="/dashboard/refunds" element={<Refunds />} />
            <Route path="/dashboard/reports" element={<Reports />} />
            <Route path="/dashboard/services" element={<Services />} />
            <Route path="/dashboard/content" element={<ContentManagement />} />
            <Route path="/dashboard/support" element={<Support />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/documents" element={<Documents />} />
            <Route path="/dashboard/documents/shareholders" element={<Shareholders />} />
            <Route path="/dashboard/documents/correspondence" element={<Correspondence />} />
            <Route path="/dashboard/notifications" element={<Notifications />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            
            {/* Policy Routes */}
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
        </Layout>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
