import React from 'react';
import { MarketingLayout } from '../../components/marketing/MarketingLayout';
import { CheckCircle2 } from 'lucide-react';
import { useScreenInit } from '../../useScreenInit';
export function Status() {
  useScreenInit();
  const services = [
  {
    name: 'API & Core Systems',
    status: 'operational',
    uptime: '99.99%'
  },
  {
    name: 'Hosted Checkout',
    status: 'operational',
    uptime: '99.99%'
  },
  {
    name: 'Merchant Dashboard',
    status: 'operational',
    uptime: '100%'
  },
  {
    name: 'Webhooks Delivery',
    status: 'operational',
    uptime: '99.98%'
  },
  {
    name: 'Mobile Money Providers',
    status: 'operational',
    uptime: '99.95%'
  },
  {
    name: 'Card Processing',
    status: 'operational',
    uptime: '99.99%'
  }];

  // Generate mock 90-day history bars
  const generateBars = () => {
    return Array.from({
      length: 60
    }).map((_, i) =>
    <div
      key={i}
      className="h-8 w-1.5 rounded-sm bg-emerald-400"
      title="No downtime recorded">
    </div>
    );
  };
  return (
    <MarketingLayout>
      <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overall Status Banner */}
          <div className="bg-emerald-500 text-white rounded-xl p-6 flex items-center gap-4 mb-12 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 size={32} />
            <div>
              <h1 className="text-2xl font-bold">All Systems Operational</h1>
              <p className="text-emerald-100">Last updated: Just now</p>
            </div>
          </div>

          {/* Services List */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-12">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h2 className="font-semibold text-slate-900">
                Uptime over the past 60 days
              </h2>
              <span className="text-sm text-slate-500">?</span>
            </div>
            <div className="divide-y divide-slate-100">
              {services.map((service, i) =>
              <div key={i} className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-slate-900">
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-slate-500">
                        {service.uptime}
                      </span>
                      <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                        Operational
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 justify-between">
                    {generateBars()}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Past Incidents */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Past Incidents
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Delayed Webhook Deliveries
                </h3>
                <p className="text-sm text-slate-500 mb-4">May 15, 2026</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Resolved
                    </p>
                    <p className="text-sm text-slate-600">
                      The backlog has been cleared and webhooks are delivering
                      normally.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Investigating
                    </p>
                    <p className="text-sm text-slate-600">
                      We are experiencing delays in webhook delivery. Payments
                      are processing normally, but status updates to merchant
                      endpoints are delayed by up to 5 minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>);

}