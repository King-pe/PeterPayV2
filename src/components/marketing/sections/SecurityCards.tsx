import React from 'react';
import { ShieldCheck, Lock, Activity, FileText } from 'lucide-react';
export function SecurityCards() {
  const items = [
  {
    icon: ShieldCheck,
    title: 'PCI-DSS Aware',
    desc: 'We handle sensitive data securely. Card details are never stored raw on our servers.'
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    desc: '2FA for admins, API key hashing, and role-based access control (RBAC) built-in.'
  },
  {
    icon: Activity,
    title: 'Fraud Monitoring',
    desc: 'Real-time velocity checks, IP analysis, and automated risk flags protect your revenue.'
  },
  {
    icon: FileText,
    title: 'Audit Logs',
    desc: 'Every critical action is logged immutably for compliance and internal reconciliation.'
  }];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-950 mb-4">
            Bank-grade security, standard.
          </h2>
          <p className="text-lg text-slate-600">
            Trust is our most important product. We invest heavily in compliance
            and security so you don't have to.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) =>
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-4">
                <item.icon className="text-emerald-600" size={20} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

}