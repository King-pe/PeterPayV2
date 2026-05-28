import React from 'react';
import { MarketingLayout } from '../../components/marketing/MarketingLayout';
import { Button } from '../../components/ui/Button';
import { FinalCTA } from '../../components/marketing/sections/FinalCTA';
import { useScreenInit } from '../../useScreenInit';
export function Pricing() {
  useScreenInit();
  const faqs = [
  {
    q: 'Are there any setup fees?',
    a: 'No, there are absolutely no setup fees or monthly minimums. You only pay when you successfully process a transaction.'
  },
  {
    q: 'When do I get my money?',
    a: 'Settlements are processed automatically. Mobile money transactions can be settled instantly to your wallet, while card and bank transfers typically settle T+1 (next business day).'
  },
  {
    q: 'Do you charge for failed transactions?',
    a: 'No. We only charge our fee on successful transactions. Failed or declined payments incur no cost.'
  },
  {
    q: 'Can I negotiate rates for high volume?',
    a: 'Yes. If your business processes more than TZS 50M per month, please contact our sales team for custom Enterprise pricing.'
  }];

  return (
    <MarketingLayout>
      <div className="pt-32 pb-20 bg-brand-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-brand-200 max-w-2xl mx-auto">
            Pay only for what you use. No setup fees, no monthly minimums, and
            no hidden charges.
          </p>
        </div>
      </div>

      <div className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Collection Pricing */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12">
            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-2xl font-bold text-brand-950">
                Payment Collection
              </h2>
              <p className="text-slate-500 mt-1">
                Fees for receiving money from your customers.
              </p>
            </div>
            <div className="divide-y divide-slate-100">
              <div className="px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Mobile Money
                  </h3>
                  <p className="text-slate-500 text-sm">
                    M-Pesa, Tigo Pesa, Airtel Money, Halopesa
                  </p>
                </div>
                <div className="text-2xl font-bold text-brand-600">2.5%</div>
              </div>
              <div className="px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Bank Transfer
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Direct bank deposits and push payments
                  </p>
                </div>
                <div className="text-2xl font-bold text-brand-600">1.5%</div>
              </div>
              <div className="px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Local Cards
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Visa & Mastercard issued in Tanzania
                  </p>
                </div>
                <div className="text-2xl font-bold text-brand-600">
                  3.5%{' '}
                  <span className="text-base text-slate-500 font-normal">
                    + TZS 500
                  </span>
                </div>
              </div>
              <div className="px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    International Cards
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Visa & Mastercard issued outside Tanzania
                  </p>
                </div>
                <div className="text-2xl font-bold text-brand-600">
                  4.5%{' '}
                  <span className="text-base text-slate-500 font-normal">
                    + TZS 1,000
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payout Pricing */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-16">
            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-2xl font-bold text-brand-950">
                Transfers & Payouts
              </h2>
              <p className="text-slate-500 mt-1">
                Fees for sending money out of your PeterPay wallet.
              </p>
            </div>
            <div className="divide-y divide-slate-100">
              <div className="px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    To Mobile Money
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Single or bulk transfers
                  </p>
                </div>
                <div className="text-2xl font-bold text-brand-600">
                  TZS 500{' '}
                  <span className="text-base text-slate-500 font-normal">
                    flat
                  </span>
                </div>
              </div>
              <div className="px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    To Bank Account
                  </h3>
                  <p className="text-slate-500 text-sm">Local bank transfers</p>
                </div>
                <div className="text-2xl font-bold text-brand-600">
                  TZS 1,000{' '}
                  <span className="text-base text-slate-500 font-normal">
                    flat
                  </span>
                </div>
              </div>
              <div className="px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    To PeterPay Wallet
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Transfers between PeterPay merchants
                  </p>
                </div>
                <div className="text-2xl font-bold text-emerald-600">Free</div>
              </div>
            </div>
          </div>

          {/* Enterprise CTA */}
          <div className="bg-brand-50 rounded-2xl p-8 border border-brand-100 text-center mb-24">
            <h3 className="text-xl font-bold text-brand-950 mb-2">
              High volume business?
            </h3>
            <p className="text-slate-600 mb-6">
              Get custom pricing if you process more than TZS 50M per month.
            </p>
            <Button href="/contact" variant="primary">
              Contact Sales
            </Button>
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-3xl font-bold text-brand-950 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) =>
              <div
                key={i}
                className="bg-white p-6 rounded-xl border border-slate-200">
                
                  <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <FinalCTA />
    </MarketingLayout>);

}