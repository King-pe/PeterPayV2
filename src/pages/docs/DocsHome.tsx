import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Code2,
  Terminal,
  BookOpen,
  ShieldCheck,
  Zap,
  Globe } from
'lucide-react';
import { CodeTabs } from '../../components/docs/DocsComponents';
export function DocsHome() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
          PeterPay API Reference
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Build payment experiences for Africa in minutes. The developer-first
          payment OS for businesses of all sizes.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-16">
        <Link
          to="/docs/quickstart"
          className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-md transition-all">
          
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Quickstart
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Integrate PeterPay in under 5 minutes with our step-by-step guide.
          </p>
          <span className="text-sm font-medium text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
            Get started <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          to="/docs/payments/create"
          className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-500 hover:shadow-md transition-all">
          
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
            <Terminal className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            API Reference
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Explore our REST API endpoints for payments, payouts, and more.
          </p>
          <span className="text-sm font-medium text-indigo-600 flex items-center gap-1 group-hover:gap-2 transition-all">
            View endpoints <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          to="/docs/sdks/javascript"
          className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-md transition-all">
          
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
            <Code2 className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            SDKs & Libraries
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Official libraries for JavaScript, PHP, Python, and more.
          </p>
          <span className="text-sm font-medium text-emerald-600 flex items-center gap-1 group-hover:gap-2 transition-all">
            Browse SDKs <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Make your first request
        </h2>
        <p className="text-slate-600 mb-6">
          Authenticate your API requests using your secret key. You can find
          your API keys in the{' '}
          <Link to="/dashboard" className="text-blue-600 hover:underline">
            Developer Dashboard
          </Link>
          .
        </p>
        <CodeTabs
          tabs={[
          {
            name: 'cURL',
            language: 'bash',
            code: `curl -X POST https://api.peterpay.com/v1/payments \\
  -H "Authorization: Bearer PETERPAY_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 50000,
    "currency": "TZS",
    "reference": "ORDER-1001",
    "customer": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "255740000000"
    }
  }'`
          },
          {
            name: 'Node.js',
            language: 'javascript',
            code: `import { PeterPay } from 'peterpay-node';

const peterpay = new PeterPay('PETERPAY_SECRET_KEY');

const payment = await peterpay.payments.create({
  amount: 50000,
  currency: 'TZS',
  reference: 'ORDER-1001',
  customer: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '255740000000'
  }
});

console.log(payment.data.checkout_url);`
          }]
          } />
        
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Popular Guides
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
          {
            title: 'Accepting your first payment',
            icon: <Zap className="w-5 h-5 text-blue-500" />,
            href: '/docs/payments/create'
          },
          {
            title: 'Sending a bulk payout',
            icon: <Globe className="w-5 h-5 text-emerald-500" />,
            href: '/docs/payouts/bulk'
          },
          {
            title: 'Verifying webhooks securely',
            icon: <ShieldCheck className="w-5 h-5 text-indigo-500" />,
            href: '/docs/webhooks/signatures'
          },
          {
            title: 'Going live checklist',
            icon: <CheckCircle2 className="w-5 h-5 text-amber-500" />,
            href: '/docs/go-live'
          }].
          map((guide, i) =>
          <Link
            key={i}
            to={guide.href}
            className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
            
              <div className="shrink-0">{guide.icon}</div>
              <span className="font-medium text-slate-900">{guide.title}</span>
              <ArrowRight className="w-4 h-4 text-slate-400 ml-auto" />
            </Link>
          )}
        </div>
      </div>
    </div>);

}