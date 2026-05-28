import React from 'react';
import { MarketingLayout } from '../../components/marketing/MarketingLayout';
import { CheckCircle2 } from 'lucide-react';
import { useScreenInit } from '../../useScreenInit';
export function Compliance() {
  useScreenInit();
  return (
    <MarketingLayout>
      <div className="pt-32 pb-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-950 mb-6">
            Compliance & Legal
          </h1>
          <p className="text-xl text-slate-600">
            Operating within the regulatory frameworks of the markets we serve.
          </p>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate prose-lg">
          <p className="lead text-slate-600">
            PeterPay V2 is committed to maintaining the highest standards of
            regulatory compliance, anti-money laundering (AML) practices, and
            data protection.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-12 mb-4">
            KYC & Merchant Onboarding
          </h3>
          <p className="text-slate-600">
            We maintain a strict Know Your Customer (KYC) policy. All merchants
            must complete a verification process before accessing Live API keys
            or receiving settlements. Required documentation includes:
          </p>
          <ul className="list-none pl-0 space-y-2 mt-4">
            {[
            'Business Registration Certificate',
            'Tax Identification Number (TIN)',
            'Director Identification',
            'Proof of Bank Account'].
            map((item, i) =>
            <li key={i} className="flex items-center gap-3 text-slate-700">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                {item}
              </li>
            )}
          </ul>

          <h3 className="text-xl font-bold text-slate-900 mt-12 mb-4">
            Partner Agreements
          </h3>
          <p className="text-slate-600">
            PeterPay operates in partnership with licensed commercial banks and
            mobile network operators (MNOs) across our supported regions. All
            funds are held in safeguarded accounts in accordance with local
            central bank regulations.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-12 mb-4">
            Data Privacy
          </h3>
          <p className="text-slate-600">
            We process personal data in accordance with local data protection
            laws. We only collect information necessary to process payments and
            prevent fraud. For full details, please review our{' '}
            <a href="#" className="text-brand-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </MarketingLayout>);

}