import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  Search,
  Github,
  Moon,
  X,
  ChevronRight,
  ExternalLink } from
'lucide-react';
const NAVIGATION = [
{
  title: 'Getting Started',
  links: [
  {
    title: 'Introduction',
    href: '/docs'
  },
  {
    title: 'Quickstart',
    href: '/docs/quickstart'
  },
  {
    title: 'Authentication',
    href: '/docs/authentication'
  },
  {
    title: 'Environments',
    href: '/docs/environments'
  },
  {
    title: 'API Keys',
    href: '/docs/api-keys'
  }]

},
{
  title: 'Payments',
  links: [
  {
    title: 'Create Payment',
    href: '/docs/payments/create'
  },
  {
    title: 'Verify Payment',
    href: '/docs/payments/verify'
  },
  {
    title: 'Payment Status',
    href: '/docs/payments/status'
  },
  {
    title: 'Hosted Checkout',
    href: '/docs/payments/checkout'
  }]

},
{
  title: 'Payouts',
  links: [
  {
    title: 'Create Payout',
    href: '/docs/payouts/create'
  },
  {
    title: 'Bulk Payouts',
    href: '/docs/payouts/bulk'
  },
  {
    title: 'Payout Status',
    href: '/docs/payouts/status'
  }]

},
{
  title: 'Products',
  links: [
  {
    title: 'Payment Links',
    href: '/docs/payment-links/create'
  },
  {
    title: 'Invoices',
    href: '/docs/invoices/create'
  },
  {
    title: 'Refunds',
    href: '/docs/refunds/create'
  }]

},
{
  title: 'Webhooks',
  links: [
  {
    title: 'Overview',
    href: '/docs/webhooks/overview'
  },
  {
    title: 'Signatures',
    href: '/docs/webhooks/signatures'
  },
  {
    title: 'Events',
    href: '/docs/webhooks/events'
  },
  {
    title: 'Retries',
    href: '/docs/webhooks/retries'
  }]

},
{
  title: 'Resources',
  links: [
  {
    title: 'Errors',
    href: '/docs/errors'
  },
  {
    title: 'Rate Limits',
    href: '/docs/rate-limits'
  },
  {
    title: 'Testing',
    href: '/docs/testing'
  },
  {
    title: 'Go-Live Checklist',
    href: '/docs/go-live'
  },
  {
    title: 'SDKs',
    href: '/docs/sdks/javascript'
  },
  {
    title: 'Changelog',
    href: '/docs/changelog'
  }]

}];

export function DocsLayout({ children }: {children: React.ReactNode;}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-6">
          <button
            className="lg:hidden p-2 -ml-2 text-slate-600"
            onClick={() => setMobileMenuOpen(true)}>
            
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-950 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg leading-none">
                P
              </span>
            </div>
            <span className="font-bold text-xl tracking-tight text-indigo-950 hidden sm:block">
              PeterPay Docs
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-4 text-sm font-medium text-slate-600">
            <Link to="/docs" className="text-indigo-600">
              Documentation
            </Link>
            <Link
              to="/docs/payments/create"
              className="hover:text-slate-900 transition-colors">
              
              API Reference
            </Link>
            <Link
              to="/docs/sdks/javascript"
              className="hover:text-slate-900 transition-colors">
              
              SDKs
            </Link>
            <Link
              to="/docs/changelog"
              className="hover:text-slate-900 transition-colors">
              
              Changelog
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-md text-sm text-slate-500 w-64 border border-slate-200 hover:border-slate-300 transition-colors cursor-text">
            <Search className="w-4 h-4" />
            <span>Search docs...</span>
            <span className="ml-auto text-xs border border-slate-300 rounded px-1.5 py-0.5">
              ⌘K
            </span>
          </div>
          <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <Moon className="w-5 h-5" />
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-slate-600 transition-colors">
              
              <Github className="w-5 h-5" />
            </a>
            <Link
              to="/dashboard"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md transition-colors">
              
              Dashboard <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-[90rem] mx-auto w-full flex">
        {/* Left Sidebar */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 pt-16 pb-10 overflow-y-auto
          lg:static lg:block transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          
          <div className="p-6">
            {mobileMenuOpen &&
            <button
              className="lg:hidden absolute top-4 right-4 p-2 text-slate-500"
              onClick={() => setMobileMenuOpen(false)}>
              
                <X className="w-5 h-5" />
              </button>
            }
            <nav className="space-y-8">
              {NAVIGATION.map((section, i) =>
              <div key={i}>
                  <h4 className="font-semibold text-slate-900 mb-3 text-sm">
                    {section.title}
                  </h4>
                  <ul className="space-y-2">
                    {section.links.map((link, j) => {
                    const isActive = location.pathname === link.href;
                    return (
                      <li key={j}>
                          <Link
                          to={link.href}
                          className={`block text-sm py-1 px-2 -mx-2 rounded-md transition-colors ${isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                          
                            {link.title}
                          </Link>
                        </li>);

                  })}
                  </ul>
                </div>
              )}
            </nav>
          </div>
        </aside>

        {/* Mobile menu overlay */}
        {mobileMenuOpen &&
        <div
          className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)} />

        }

        {/* Main Content */}
        <main className="flex-1 min-w-0 py-10 px-6 lg:px-12 xl:px-16">
          <div className="max-w-3xl mx-auto xl:mx-0">
            {children}

            {/* Footer Navigation */}
            <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between items-center">
              <div className="text-sm text-slate-500">
                Was this page helpful?{' '}
                <button className="text-blue-600 hover:underline ml-2">
                  Yes
                </button>{' '}
                / <button className="text-blue-600 hover:underline">No</button>
              </div>
              <div className="text-sm text-slate-500">© 2026 PeterPay V2</div>
            </div>
          </div>
        </main>

        {/* Right Sidebar (TOC) - Hidden on smaller screens */}
        <aside className="hidden xl:block w-64 shrink-0 py-10 pr-8">
          <div className="sticky top-24">
            <h4 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wider">
              On this page
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 border-l border-slate-200 pl-4">
              <li>
                <a href="#" className="text-blue-600 hover:text-blue-700 block">
                  Overview
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900 block">
                  Authentication
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900 block">
                  Parameters
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900 block">
                  Example Request
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900 block">
                  Example Response
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>);

}