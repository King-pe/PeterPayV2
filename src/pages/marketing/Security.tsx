import React from 'react';
import { MarketingLayout } from '../../components/marketing/MarketingLayout';
import { SecurityCards } from '../../components/marketing/sections/SecurityCards';
import { Shield, Key, Lock, Eye } from 'lucide-react';
import { useScreenInit } from '../../useScreenInit';
export function Security() {
  useScreenInit();
  return (
    <MarketingLayout>
      <div className="pt-32 pb-20 bg-brand-950 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-brand-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield size={32} className="text-brand-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Trust is our most important product
          </h1>
          <p className="text-xl text-brand-200">
            We employ bank-grade security measures to protect your data, your
            money, and your customers.
          </p>
        </div>
      </div>

      <SecurityCards />

      <div className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <Key className="text-slate-700" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  API Security
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  All API requests must be authenticated via securely hashed API
                  keys. We enforce strict environment separation between Sandbox
                  and Live modes. Merchants can whitelist specific IP addresses
                  for their Live keys, and we support zero-downtime key
                  rotation.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <Lock className="text-slate-700" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Data Protection
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  All data is encrypted in transit using TLS 1.2+ and at rest
                  using AES-256. We are fully aware of PCI-DSS requirements and
                  ensure that raw card numbers never touch our servers—they are
                  tokenized directly by our acquiring partners.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <Eye className="text-slate-700" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Fraud & Risk Engine
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Our automated risk engine monitors transactions in real-time.
                  We employ velocity checks, IP analysis, and historical pattern
                  matching to flag suspicious activity. High-risk transactions
                  are automatically held for manual review to protect merchants
                  from chargebacks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>);

}