import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useScreenInit } from './useScreenInit';
import { Home } from './pages/marketing/Home';
import { Products } from './pages/marketing/Products';
import { Pricing } from './pages/marketing/Pricing';
import { Developers } from './pages/marketing/Developers';
import { About } from './pages/marketing/About';
import { Contact } from './pages/marketing/Contact';
import { Security } from './pages/marketing/Security';
import { Compliance } from './pages/marketing/Compliance';
import { Status } from './pages/marketing/Status';
import { Login } from './pages/marketing/Login';
import { Register } from './pages/marketing/Register';
// Dashboard Imports
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { Overview } from './pages/dashboard/Overview';
import { Payments } from './pages/dashboard/Payments';
import { PaymentDetail } from './pages/dashboard/PaymentDetail';
import { Wallet } from './pages/dashboard/Wallet';
import { ApiKeys } from './pages/dashboard/ApiKeys';
import { Webhooks } from './pages/dashboard/Webhooks';
import { Settings } from './pages/dashboard/Settings';
import { Payouts } from './pages/dashboard/Payouts';
import { PaymentLinks } from './pages/dashboard/PaymentLinks';
import { Invoices } from './pages/dashboard/Invoices';
import { Settlements } from './pages/dashboard/Settlements';
// Admin Imports
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminOverview } from './pages/admin/AdminOverview';
import { Merchants } from './pages/admin/Merchants';
import { MerchantDetail } from './pages/admin/MerchantDetail';
import { KycQueue } from './pages/admin/KycQueue';
import { KycDetail } from './pages/admin/KycDetail';
import {
  AdminUsers,
  AdminTransactions,
  AdminPayments,
  AdminPayouts,
  AdminSettlements,
  AdminDisputes,
  AdminRisk,
  AdminWebhooks,
  AdminProviders,
  AdminFees,
  AdminReports,
  AdminAuditLogs,
  AdminSettings } from
'./pages/admin/AdminListPages';
// Docs imports
import { DocsLayout } from './components/docs/DocsLayout';
import { DocsHome } from './pages/docs/DocsHome';
import {
  Quickstart,
  Authentication,
  GenericDocPage } from
'./pages/docs/GuidePages';
import { PaymentsCreate, PaymentsVerify } from './pages/docs/PaymentDocs';
import { WebhooksOverview, WebhooksSignatures } from './pages/docs/WebhookDocs';
import {
  PayoutsCreate,
  PaymentLinksCreate,
  StandardDocPage } from
'./pages/docs/MiscDocs';
export function App() {
  useScreenInit();
  return (
    <BrowserRouter>
      <Routes>
        {/* Marketing Routes — each page self-wraps with MarketingLayout */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/security" element={<Security />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/status" element={<Status />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="payments" element={<Payments />} />
          <Route path="payments/:id" element={<PaymentDetail />} />
          <Route path="payouts" element={<Payouts />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="payment-links" element={<PaymentLinks />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="settlements" element={<Settlements />} />
          <Route path="developers/api-keys" element={<ApiKeys />} />
          <Route path="developers/webhooks" element={<Webhooks />} />
          <Route path="settings/*" element={<Settings />} />

          {/* Fallbacks for unbuilt pages */}
          <Route
            path="customers"
            element={
            <div className="p-8 text-center text-slate-500">
                Customers module coming soon
              </div>
            } />
          
          <Route
            path="reports"
            element={
            <div className="p-8 text-center text-slate-500">
                Reports module coming soon
              </div>
            } />
          
          <Route
            path="developers/logs"
            element={
            <div className="p-8 text-center text-slate-500">
                API Logs coming soon
              </div>
            } />
          
          <Route
            path="support"
            element={
            <div className="p-8 text-center text-slate-500">
                Support module coming soon
              </div>
            } />
          
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="merchants" element={<Merchants />} />
          <Route path="merchants/:id" element={<MerchantDetail />} />
          <Route path="kyc" element={<KycQueue />} />
          <Route path="kyc/:id" element={<KycDetail />} />
          <Route path="transactions" element={<AdminTransactions />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="payouts" element={<AdminPayouts />} />
          <Route path="settlements" element={<AdminSettlements />} />
          <Route path="disputes" element={<AdminDisputes />} />
          <Route path="risk" element={<AdminRisk />} />
          <Route path="webhooks" element={<AdminWebhooks />} />
          <Route path="providers" element={<AdminProviders />} />
          <Route path="fees" element={<AdminFees />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="audit-logs" element={<AdminAuditLogs />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Phase 4: Developer Docs Portal */}
        <Route
          path="/docs"
          element={
          <DocsLayout>
              <DocsHome />
            </DocsLayout>
          } />
        
        <Route
          path="/docs/quickstart"
          element={
          <DocsLayout>
              <Quickstart />
            </DocsLayout>
          } />
        
        <Route
          path="/docs/authentication"
          element={
          <DocsLayout>
              <Authentication />
            </DocsLayout>
          } />
        

        {/* Guides & Resources */}
        <Route
          path="/docs/environments"
          element={
          <DocsLayout>
              <StandardDocPage
              section="Getting Started"
              title="Environments"
              description="Learn about the Sandbox and Live environments." />
            
            </DocsLayout>
          } />
        
        <Route
          path="/docs/api-keys"
          element={
          <DocsLayout>
              <StandardDocPage
              section="Getting Started"
              title="API Keys"
              description="Manage your public and secret API keys." />
            
            </DocsLayout>
          } />
        
        <Route
          path="/docs/errors"
          element={
          <DocsLayout>
              <StandardDocPage
              section="Resources"
              title="Errors"
              description="Understanding API error codes and responses." />
            
            </DocsLayout>
          } />
        
        <Route
          path="/docs/rate-limits"
          element={
          <DocsLayout>
              <StandardDocPage
              section="Resources"
              title="Rate Limits"
              description="API rate limits and how to handle 429 responses." />
            
            </DocsLayout>
          } />
        
        <Route
          path="/docs/testing"
          element={
          <DocsLayout>
              <StandardDocPage
              section="Resources"
              title="Testing"
              description="Sandbox testing guide with test phone numbers and cards." />
            
            </DocsLayout>
          } />
        
        <Route
          path="/docs/go-live"
          element={
          <DocsLayout>
              <StandardDocPage
              section="Resources"
              title="Go-Live Checklist"
              description="Everything you need to check before switching to production." />
            
            </DocsLayout>
          } />
        
        <Route
          path="/docs/changelog"
          element={
          <DocsLayout>
              <StandardDocPage
              section="Resources"
              title="Changelog"
              description="Latest updates and API version history." />
            
            </DocsLayout>
          } />
        

        {/* SDKs */}
        <Route
          path="/docs/sdks/javascript"
          element={
          <DocsLayout>
              <StandardDocPage
              section="SDKs"
              title="JavaScript / Node.js"
              description="Official Node.js library for PeterPay." />
            
            </DocsLayout>
          } />
        
        <Route
          path="/docs/sdks/php"
          element={
          <DocsLayout>
              <StandardDocPage
              section="SDKs"
              title="PHP"
              description="Official PHP SDK for PeterPay." />
            
            </DocsLayout>
          } />
        
        <Route
          path="/docs/sdks/python"
          element={
          <DocsLayout>
              <StandardDocPage
              section="SDKs"
              title="Python"
              description="Official Python SDK for PeterPay." />
            
            </DocsLayout>
          } />
        

        {/* Payments */}
        <Route
          path="/docs/payments/create"
          element={
          <DocsLayout>
              <PaymentsCreate />
            </DocsLayout>
          } />
        
        <Route
          path="/docs/payments/verify"
          element={
          <DocsLayout>
              <PaymentsVerify />
            </DocsLayout>
          } />
        
        <Route
          path="/docs/payments/status"
          element={
          <DocsLayout>
              <StandardDocPage
              section="Payments"
              title="Payment Status"
              description="Understanding payment lifecycle states." />
            
            </DocsLayout>
          } />
        
        <Route
          path="/docs/payments/checkout"
          element={
          <DocsLayout>
              <StandardDocPage
              section="Payments"
              title="Hosted Checkout"
              description="Integrating the PeterPay hosted checkout page." />
            
            </DocsLayout>
          } />
        

        {/* Payouts & Products */}
        <Route
          path="/docs/payouts/create"
          element={
          <DocsLayout>
              <PayoutsCreate />
            </DocsLayout>
          } />
        
        <Route
          path="/docs/payouts/bulk"
          element={
          <DocsLayout>
              <StandardDocPage
              section="Payouts"
              title="Bulk Payouts"
              description="Send multiple payouts in a single request." />
            
            </DocsLayout>
          } />
        
        <Route
          path="/docs/payouts/status"
          element={
          <DocsLayout>
              <StandardDocPage
              section="Payouts"
              title="Payout Status"
              description="Understanding payout lifecycle states." />
            
            </DocsLayout>
          } />
        
        <Route
          path="/docs/payment-links/create"
          element={
          <DocsLayout>
              <PaymentLinksCreate />
            </DocsLayout>
          } />
        
        <Route
          path="/docs/payment-links/status"
          element={
          <DocsLayout>
              <StandardDocPage
              section="Products"
              title="Payment Links Status"
              description="Manage payment link states." />
            
            </DocsLayout>
          } />
        
        <Route
          path="/docs/invoices/create"
          element={
          <DocsLayout>
              <StandardDocPage
              section="Products"
              title="Create Invoice"
              description="Generate and send invoices via API." />
            
            </DocsLayout>
          } />
        
        <Route
          path="/docs/invoices/status"
          element={
          <DocsLayout>
              <StandardDocPage
              section="Products"
              title="Invoice Status"
              description="Track invoice payments." />
            
            </DocsLayout>
          } />
        
        <Route
          path="/docs/refunds/create"
          element={
          <DocsLayout>
              <StandardDocPage
              section="Products"
              title="Create Refund"
              description="Refund a successful payment." />
            
            </DocsLayout>
          } />
        
        <Route
          path="/docs/refunds/status"
          element={
          <DocsLayout>
              <StandardDocPage
              section="Products"
              title="Refund Status"
              description="Track refund progress." />
            
            </DocsLayout>
          } />
        

        {/* Webhooks */}
        <Route
          path="/docs/webhooks/overview"
          element={
          <DocsLayout>
              <WebhooksOverview />
            </DocsLayout>
          } />
        
        <Route
          path="/docs/webhooks/signatures"
          element={
          <DocsLayout>
              <WebhooksSignatures />
            </DocsLayout>
          } />
        
        <Route
          path="/docs/webhooks/events"
          element={
          <DocsLayout>
              <StandardDocPage
              section="Webhooks"
              title="Events"
              description="Full list of supported webhook events." />
            
            </DocsLayout>
          } />
        
        <Route
          path="/docs/webhooks/retries"
          element={
          <DocsLayout>
              <StandardDocPage
              section="Webhooks"
              title="Retries"
              description="How PeterPay handles failed webhook deliveries." />
            
            </DocsLayout>
          } />
        
      </Routes>
    </BrowserRouter>);

}