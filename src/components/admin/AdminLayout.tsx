import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  ShieldAlert,
  LayoutDashboard,
  Users,
  Building2,
  FileCheck,
  Activity,
  CreditCard,
  Send,
  Landmark,
  AlertTriangle,
  Shield,
  Webhook,
  Server,
  Receipt,
  BarChart3,
  History,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  LogOut } from
'lucide-react';
const navItems = [
{
  name: 'Overview',
  path: '/admin',
  icon: LayoutDashboard
},
{
  name: 'Users',
  path: '/admin/users',
  icon: Users
},
{
  name: 'Merchants',
  path: '/admin/merchants',
  icon: Building2
},
{
  name: 'KYC Queue',
  path: '/admin/kyc',
  icon: FileCheck
},
{
  name: 'Transactions',
  path: '/admin/transactions',
  icon: Activity
},
{
  name: 'Payments',
  path: '/admin/payments',
  icon: CreditCard
},
{
  name: 'Payouts',
  path: '/admin/payouts',
  icon: Send
},
{
  name: 'Settlements',
  path: '/admin/settlements',
  icon: Landmark
},
{
  name: 'Disputes',
  path: '/admin/disputes',
  icon: AlertTriangle
},
{
  name: 'Risk & Fraud',
  path: '/admin/risk',
  icon: Shield
},
{
  name: 'Webhooks',
  path: '/admin/webhooks',
  icon: Webhook
},
{
  name: 'Providers',
  path: '/admin/providers',
  icon: Server
},
{
  name: 'Fees',
  path: '/admin/fees',
  icon: Receipt
},
{
  name: 'Reports',
  path: '/admin/reports',
  icon: BarChart3
},
{
  name: 'Audit Logs',
  path: '/admin/audit-logs',
  icon: History
},
{
  name: 'Settings',
  path: '/admin/settings',
  icon: Settings
}];

export function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen &&
      <div
        className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
        onClick={() => setIsMobileMenuOpen(false)} />

      }

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-slate-900 text-slate-300
        transform transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
          <Link
            to="/admin"
            className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
            
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">P</span>
            </div>
            PeterPay
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
          <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Super Admin
          </div>
          {navItems.map((item) => {
            const isActive =
            location.pathname === item.path ||
            item.path !== '/admin' &&
            location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'}
                `}>
                
                <item.icon
                  className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                
                {item.name}
              </Link>);

          })}
        </div>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
              onClick={() => setIsMobileMenuOpen(true)}>
              
              <Menu className="w-5 h-5" />
            </button>

            {/* ADMIN MODE INDICATOR */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-100 rounded-md text-red-700 text-xs font-bold tracking-wide">
              <ShieldAlert className="w-4 h-4" />
              ADMIN MODE
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search merchants, txns..."
                className="pl-9 pr-4 py-2 w-64 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              
            </div>

            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>

            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-medium">
              SA
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>);

}