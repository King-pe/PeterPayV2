import React from 'react';
import { MarketingLayout } from '../../components/marketing/MarketingLayout';
import {
  CreditCard,
  Send,
  Wallet,
  Link as LinkIcon,
  FileText,
  Code } from
'lucide-react';
import { FinalCTA } from '../../components/marketing/sections/FinalCTA';
import { useScreenInit } from '../../useScreenInit';
export function Products() {
  useScreenInit();
  const products = [
  {
    id: 'collection',
    title: 'Payment Collection',
    desc: 'Accept payments seamlessly across Africa via Mobile Money, Cards, and Bank Transfers. Use our high-converting hosted checkout page or build a custom experience with our APIs.',
    icon: CreditCard,
    features: [
    'Hosted Checkout',
    'Custom API Integration',
    'Multi-currency support',
    'Automated retries']

  },
  {
    id: 'payouts',
    title: 'Payouts & Disbursements',
    desc: 'Send money to any mobile money wallet or bank account instantly. Perfect for vendor payments, salary disbursements, and customer refunds.',
    icon: Send,
    features: [
    'Single API endpoint',
    'Bulk CSV uploads',
    'Approval workflows',
    'Real-time status tracking']

  },
  {
    id: 'wallet',
    title: 'Wallet & Ledger',
    desc: 'A robust double-entry ledger system built into your account. Manage balances, hold funds in escrow, and reconcile every cent with confidence.',
    icon: Wallet,
    features: [
    'Double-entry accounting',
    'Multiple currency wallets',
    'Balance freezing',
    'Detailed statements']

  },
  {
    id: 'links',
    title: 'Payment Links',
    desc: 'No website? No problem. Generate secure payment links from your dashboard and share them via WhatsApp, SMS, or email to get paid instantly.',
    icon: LinkIcon,
    features: [
    'Customizable amounts',
    'Expiry dates',
    'Reusable links',
    'QR code generation']

  },
  {
    id: 'invoices',
    title: 'Smart Invoices',
    desc: 'Create professional invoices, send them directly to clients, and track their payment status automatically. Includes built-in tax calculations.',
    icon: FileText,
    features: [
    'PDF generation',
    'Automated reminders',
    'Partial payments',
    'Tax & VAT support']

  },
  {
    id: 'api',
    title: 'Developer API',
    desc: 'A modern, RESTful API designed for developer happiness. Complete with comprehensive documentation, SDKs, and a fully functional sandbox environment.',
    icon: Code,
    features: [
    'Sandbox environment',
    'Signed webhooks',
    'Idempotency keys',
    'Detailed error messages']

  }];

  return (
    <MarketingLayout>
      <div className="pt-32 pb-20 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-950 mb-6">
            A unified platform for money movement
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Everything you need to accept payments, send payouts, and manage
            your business finances in one place.
          </p>
        </div>
      </div>

      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {products.map((product, index) =>
            <div
              key={product.id}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
              
                <div className="lg:w-1/2">
                  <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mb-6 border border-brand-100">
                    <product.icon className="text-brand-600" size={32} />
                  </div>
                  <h2 className="text-3xl font-bold text-brand-950 mb-4">
                    {product.title}
                  </h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    {product.desc}
                  </p>
                  <ul className="grid grid-cols-2 gap-4">
                    {product.features.map((feature, i) =>
                  <li
                    key={i}
                    className="flex items-center gap-2 text-slate-700 font-medium">
                    
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-500"></div>
                        {feature}
                      </li>
                  )}
                  </ul>
                </div>
                <div className="lg:w-1/2 w-full">
                  <div className="aspect-[4/3] rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center p-8 shadow-inner">
                    {/* Placeholder for actual product screenshots */}
                    <div className="text-slate-400 font-medium text-lg flex flex-col items-center gap-4">
                      <product.icon size={48} className="opacity-20" />
                      {product.title} Interface
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <FinalCTA />
    </MarketingLayout>);

}