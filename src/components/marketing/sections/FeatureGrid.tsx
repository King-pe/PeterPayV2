import React from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Send,
  Wallet,
  LayoutDashboard,
  Key,
  Webhook } from
'lucide-react';
const features = [
{
  title: 'Accept payments',
  description:
  'Collect via Mobile Money, Cards, and Bank Transfers with our high-converting hosted checkout or custom API.',
  icon: CreditCard
},
{
  title: 'Send payouts',
  description:
  'Disburse funds instantly to mobile money wallets or bank accounts. Support for single and bulk CSV payouts.',
  icon: Send
},
{
  title: 'Wallet system',
  description:
  'Robust double-entry ledger system. Manage balances, hold funds, and reconcile transactions with confidence.',
  icon: Wallet
},
{
  title: 'Merchant dashboard',
  description:
  'A powerful command center to view transactions, manage team members, and export detailed financial reports.',
  icon: LayoutDashboard
},
{
  title: 'API keys',
  description:
  'Secure, environment-separated keys (Sandbox & Live) with IP whitelisting and automatic rotation capabilities.',
  icon: Key
},
{
  title: 'Webhooks',
  description:
  'Real-time event notifications with cryptographic signatures and automatic retry logic for failed deliveries.',
  icon: Webhook
}];

export function FeatureGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-950 mb-4">
            Everything you need to move money
          </h2>
          <p className="text-lg text-slate-600">
            A complete suite of payment products designed to help African
            businesses build, launch, and scale faster.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) =>
          <motion.div
            key={feature.title}
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true,
              margin: '-100px'
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1
            }}
            className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300 group">
            
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:border-brand-300 group-hover:bg-brand-50 transition-colors">
                <feature.icon className="text-brand-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-brand-950 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}