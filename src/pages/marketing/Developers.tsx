import React from 'react';
import { MarketingLayout } from '../../components/marketing/MarketingLayout';
import { Button } from '../../components/ui/Button';
import { CodeBlock } from '../../components/marketing/visuals/CodeBlock';
import { BookOpen, Webhook, Terminal, FileJson, BoxIcon } from 'lucide-react';
import { useScreenInit } from '../../useScreenInit';
export function Developers() {
  useScreenInit();
  const resources = [
  {
    title: 'API Reference',
    desc: 'Complete documentation of all REST endpoints, parameters, and responses.',
    icon: BookOpen,
    link: '/docs'
  },
  {
    title: 'Webhooks Guide',
    desc: 'Learn how to receive and verify real-time event notifications securely.',
    icon: Webhook,
    link: '/docs'
  },
  {
    title: 'SDKs & Libraries',
    desc: 'Official wrappers for JavaScript, PHP, and Python to speed up integration.',
    icon: BoxIcon,
    link: '/docs'
  },
  {
    title: 'Postman Collection',
    desc: 'Download our complete Postman collection to start testing immediately.',
    icon: FileJson,
    link: '/docs'
  }];

  return (
    <MarketingLayout>
      <div className="pt-32 pb-20 bg-brand-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-brand-600/20 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Build with PeterPay
              </h1>
              <p className="text-xl text-brand-200 mb-8 leading-relaxed">
                A modern, predictable API designed to help you integrate
                payments into your application in hours, not weeks.
              </p>
              <div className="flex gap-4">
                <Button href="/docs" variant="white">
                  Read the Docs
                </Button>
                <Button
                  href="/register"
                  variant="outline"
                  className="border-brand-700 text-white hover:bg-brand-800">
                  
                  Get API Keys
                </Button>
              </div>
            </div>
            <div className="relative">
              <CodeBlock />
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-950 mb-4">
              Developer Resources
            </h2>
            <p className="text-slate-600">
              Everything you need to build a robust payment integration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {resources.map((res, i) =>
            <a
              key={i}
              href={res.link}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all group block">
              
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-6 group-hover:bg-brand-100 transition-colors">
                  <res.icon className="text-brand-600" size={24} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                  {res.title}
                </h3>
                <p className="text-sm text-slate-600">{res.desc}</p>
              </a>
            )}
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 text-center max-w-4xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-6">
              <Terminal className="text-slate-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-brand-950 mb-4">
              Ready to test?
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Create an account to get instant access to your Sandbox API keys.
              You can test all endpoints, simulate successful and failed
              payments, and trigger webhooks without writing any real money.
            </p>
            <Button href="/register" variant="primary" size="lg">
              Start Testing in Sandbox
            </Button>
          </div>
        </div>
      </div>
    </MarketingLayout>);

}