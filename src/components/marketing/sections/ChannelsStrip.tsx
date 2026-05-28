import React from 'react';
const channels = [
'M-Pesa',
'Airtel Money',
'Tigo Pesa',
'Halopesa',
'MTN Mobile Money',
'Visa',
'Mastercard',
'Bank Transfer',
'QR Payments',
'USSD'];

export function ChannelsStrip() {
  return (
    <section className="py-12 border-y border-slate-200 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          Supported Payment Channels
        </p>
      </div>

      {/* Infinite scroll container */}
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-scroll flex whitespace-nowrap items-center gap-8 px-4">
          {/* First set */}
          {channels.map((channel, i) =>
          <div
            key={`set1-${i}`}
            className="flex items-center justify-center px-6 py-3 bg-white border border-slate-200 rounded-lg shadow-sm min-w-[160px]">
            
              <span className="font-semibold text-slate-700">{channel}</span>
            </div>
          )}
          {/* Duplicate set for seamless loop */}
          {channels.map((channel, i) =>
          <div
            key={`set2-${i}`}
            className="flex items-center justify-center px-6 py-3 bg-white border border-slate-200 rounded-lg shadow-sm min-w-[160px]">
            
              <span className="font-semibold text-slate-700">{channel}</span>
            </div>
          )}
        </div>
      </div>
    </section>);

}