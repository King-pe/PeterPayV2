import React from 'react';
export function Testimonials() {
  const testimonials = [
  {
    quote:
    'Switching to PeterPay V2 reduced our payment failure rate by 40%. The API is incredibly clean, and the webhook reliability is unmatched in the region.',
    author: 'Sarah Chen',
    role: 'CTO, RetailFlow',
    avatar: 'SC'
  },
  {
    quote:
    'We process thousands of micro-transactions daily. The double-entry ledger system gives our finance team complete peace of mind during reconciliation.',
    author: 'David Osei',
    role: 'Founder, KwikCart',
    avatar: 'DO'
  },
  {
    quote:
    'The payout API allowed us to automate vendor disbursements instantly. What used to take our team 3 days now happens in milliseconds.',
    author: 'Amina Yusuf',
    role: 'Operations Lead, MarketHub',
    avatar: 'AY'
  }];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-950 mb-16">
          Trusted by leading businesses
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) =>
          <div
            key={i}
            className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) =>
              <svg
                key={star}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20">
                
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
              )}
              </div>
              <p className="text-slate-700 mb-8 leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-brand-950">{t.author}</p>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}