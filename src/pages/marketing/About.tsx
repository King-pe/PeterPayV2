import React from 'react';
import { MarketingLayout } from '../../components/marketing/MarketingLayout';
import { FinalCTA } from '../../components/marketing/sections/FinalCTA';
import { useScreenInit } from '../../useScreenInit';
export function About() {
  useScreenInit();
  return (
    <MarketingLayout>
      <div className="pt-32 pb-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-950 mb-6">
            Powering the next generation of African commerce
          </h1>
          <p className="text-xl text-slate-600">
            We are building the financial infrastructure to help businesses
            scale across the continent.
          </p>
        </div>
      </div>

      <div className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate prose-lg">
          <h2 className="text-2xl font-bold text-brand-950 mb-4">
            Our Mission
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Digital payments in Africa have historically been fragmented,
            unreliable, and difficult to integrate. Developers spend weeks
            wrestling with poorly documented APIs, while finance teams struggle
            to reconcile transactions across multiple providers.
          </p>
          <p className="text-slate-600 mb-12 leading-relaxed">
            PeterPay V2 was built to solve this. Founded by Peter Joram, our
            mission is to provide a unified, developer-first payment operating
            system that abstracts away the complexity of money movement. We
            believe that by providing world-class infrastructure, we can unlock
            tremendous economic growth for African businesses.
          </p>

          <h2 className="text-2xl font-bold text-brand-950 mb-4">The Team</h2>
          <div className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-slate-200 mt-6">
            <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-2xl">
              PJ
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 m-0">
                Peter Joram
              </h3>
              <p className="text-brand-600 font-medium m-0">
                Founder & Lead Developer
              </p>
              <p className="text-sm text-slate-500 mt-2 m-0">
                Building PeterPay to solve the exact payment challenges he faced
                while scaling digital products in the region.
              </p>
            </div>
          </div>
        </div>
      </div>

      <FinalCTA />
    </MarketingLayout>);

}