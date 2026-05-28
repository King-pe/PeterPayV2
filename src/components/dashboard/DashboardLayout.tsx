import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Send,
  Wallet,
  Users,
  Link as LinkIcon,
  FileText,
  Landmark,
  BarChart3,
  Key,
  Webhook,
  TerminalSquare,
  Building2,
  ShieldCheck,
  LifeBuoy,
  Search,
  Bell,
  Menu,
  X,
  ChevronDown } from
'react-rotate-icons'; // I'll use lucide-react instead
import {
  LayoutDashboard as LayoutDashboardIcon,
  ArrowLeftRight as ArrowLeftRightIcon,
  Send as SendIcon,
  Wallet as WalletIcon,
  Users as UsersIcon,
  Link as LinkIconLucide,
  FileText as FileTextIcon,
  Landmark as LandmarkIcon,
  BarChart3 as BarChart3Icon,
  Key as KeyIcon,
  Webhook as WebhookIcon,
  TerminalSquare as TerminalSquareIcon,
  Building2 as Building2Icon,
  ShieldCheck as ShieldCheckIcon,
  LifeBuoy as LifeBuoyIcon,
  Search as SearchIcon,
  Bell as BellIcon,
  Menu as MenuIcon,
  X as XIcon,
  ChevronDown as ChevronDownIcon } from
'lucide-react';
const navGroups = [
{
  label: 'Core',
  items: [
  {
    name: 'Overview',
    path: '/dashboard',
    icon: LayoutDashboardIcon,
    exact: true
  },
  {
    name: 'Payments',
    path: '/dashboard/payments',
    icon: ArrowLeftRightIcon
  },
  {
    name: 'Payouts',
    path: '/dashboard/payouts',
    icon: SendIcon
  },
  {
    name: 'Wallet',
    path: '/dashboard/wallet',
    icon: WalletIcon
  },
  {
    name: 'Customers',
    path: '/dashboard/customers',
    icon: UsersIcon
  }]

},
{
  label: 'Tools',
  items: [
  {
    name: 'Payment Links',
    path: '/dashboard/payment-links',
    icon: LinkIconLucide
  },
  {
    name: 'Invoices',
    path: '/dashboard/invoices',
    icon: FileTextIcon
  },
  {
    name: 'Settlements',
    path: '/dashboard/settlements',
    icon: LandmarkIcon
  },
  {
    name: 'Reports',
    path: '/dashboard/reports',
    icon: BarChart3Icon
  }]

},
{
  label: 'Developers',
  items: [
  {
    name: 'API Keys',
    path: '/dashboard/developers/api-keys',
    icon: KeyIcon
  },
  {
    name: 'Webhooks',
    path: '/dashboard/developers/webhooks',
    icon: WebhookIcon
  },
  {
    name: 'Logs',
    path: '/dashboard/developers/logs',
    icon: TerminalSquareIcon
  }]

},
{
  label: 'Settings',
  items: [
  {
    name: 'Business',
    path: '/dashboard/settings/business',
    icon: Building2Icon
  },
  {
    name: 'Security',
    path: '/dashboard/settings/security',
    icon: ShieldCheckIcon
  }]

}];

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const location = useLocation();
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen &&
      <div
        className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
        onClick={() => setSidebarOpen(false)} />

      }

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Logo & Env Toggle */}
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg leading-none">
                  P
                </span>
              </div>
              <span className="font-bold text-slate-900 text-lg tracking-tight">
                PeterPay
              </span>
            </div>
            <button
              className="lg:hidden text-slate-500"
              onClick={() => setSidebarOpen(false)}>
              
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
            <p className="text-xs font-medium text-slate-500 mb-2 px-1">
              Acme Corp Tanzania
            </p>
            <div className="flex bg-slate-200/50 rounded-md p-1">
              <button
                onClick={() => setIsLive(false)}
                className={`flex-1 text-xs font-medium py-1.5 rounded-sm transition-colors ${!isLive ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                
                Sandbox
              </button>
              <button
                onClick={() => setIsLive(true)}
                className={`flex-1 text-xs font-medium py-1.5 rounded-sm transition-colors ${isLive ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                
                Live
              </button>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navGroups.map((group, i) =>
          <div key={i}>
              <h4 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {group.label}
              </h4>
              <div className="space-y-0.5">
                {group.items.map((item, j) => {
                const isActive = item.exact ?
                location.pathname === item.path :
                location.pathname.startsWith(item.path);
                return (
                  <NavLink
                    key={j}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                        flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                        ${isActive ? 'bg-brand-primary/5 text-brand-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                      `}>
                    
                      <item.icon
                      className={`w-4 h-4 ${isActive ? 'text-brand-primary' : 'text-slate-400'}`} />
                    
                      {item.name}
                    </NavLink>);

              })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Support */}
        <div className="p-4 border-t border-slate-200">
          <NavLink
            to="/dashboard/support"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            
            <LifeBuoyIcon className="w-4 h-4 text-slate-400" />
            Support
          </NavLink>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            <button
              className="lg:hidden text-slate-500 hover:text-slate-700"
              onClick={() => setSidebarOpen(true)}>
              
              <MenuIcon className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-slate-400 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 w-full max-w-md focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary transition-all">
              <SearchIcon className="w-4 h-4" />
              <input
                type="text"
                placeholder="Search payments, customers, or references..."
                className="bg-transparent border-none outline-none text-sm text-slate-900 w-full placeholder:text-slate-400" />
              
              <div className="flex items-center gap-1">
                <kbd className="hidden lg:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-white border border-slate-200 rounded">
                  ⌘
                </kbd>
                <kbd className="hidden lg:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-white border border-slate-200 rounded">
                  K
                </kbd>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <button className="flex items-center gap-2 hover:bg-slate-50 p-1 pr-2 rounded-full transition-colors">
              <div className="w-8 h-8 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center font-medium text-sm">
                PJ
              </div>
              <ChevronDownIcon className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>);

}