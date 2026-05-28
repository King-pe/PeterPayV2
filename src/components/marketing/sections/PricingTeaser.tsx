import React from 'react';
import { Button } from '../../ui/Button';
import { Check } from 'lucide-react';
export function PricingTeaser() {
  return (
    <section className="py-24 bg-brand-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2 mb-12 lg:mb-0 pr-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Simple, transparent pricing.
            </h2>
            <p className="text-brand-200 text-lg mb-8">
              Pay only for what you use. No setup fees, no monthly minimums, and
              no hidden charges. Access all features from day one.
            </p>
            <ul className="space-y-4 mb-8">
              {[
              'Free Sandbox environment',
              'Full API access',
              'Real-time reporting',
              '24/7 technical support'].
              map((item, i) =>
              <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-800 flex items-center justify-center">
                    <Check size={12} className="text-brand-300" />
                  </div>
                  <span className="text-brand-100">{item}</span>
                </li>
              )}
            </ul>
            <Button href="/pricing" variant="white">
              View full pricing details
            </Button>
          </div>

          <div className="lg:w-[45%]">
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-slate-900">
              <h3 className="text-xl font-bold mb-6 border-b border-slate-100 pb-4">
                Standard Rates
              </h3>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Mobile Money</p>
                    <p className="text-sm text-slate-500">Collection</p>
                  </div>
                  <div className="text-xl font-bold text-brand-600">2.5%</div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Bank Transfer</p>
                    <p className="text-sm text-slate-500">Collection</p>
                  </div>
                  <div className="text-xl font-bold text-brand-600">1.5%</div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Card Payments</p>
                    <p className="text-sm text-slate-500">Local cards</p>
                  </div>
                  <div className="text-xl font-bold text-brand-600">
                    3.5%{' '}
                    <span className="text-sm text-slate-500 font-normal">
                      + TZS 500
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}