import React from 'react';
export function MetricsStrip() {
  const metrics = [
  {
    label: 'Transactions Processed',
    value: '10M+'
  },
  {
    label: 'Active Merchants',
    value: '5,000+'
  },
  {
    label: 'Developers Building',
    value: '12,000+'
  },
  {
    label: 'System Uptime',
    value: '99.99%'
  }];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
          {metrics.map((metric) =>
          <div key={metric.label} className="px-4">
              <div className="text-3xl md:text-4xl font-bold text-brand-950 mb-2">
                {metric.value}
              </div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                {metric.label}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}