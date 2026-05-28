import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileCheck,
  AlertTriangle,
  ShieldAlert,
  Webhook,
  Landmark,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  CheckCircle2,
  XCircle } from
'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar } from
'recharts';
import { PageHeader } from '../../components/dashboard/ui/PageHeader';
import { useAdminStats } from '../../hooks/usePeterPay';
import { SkeletonCards, ErrorState } from '../../components/ui/States';
export function AdminOverview() {
  const { data: stats, loading, error, refetch } = useAdminStats();
  if (loading) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        <PageHeader
          title="Operating PeterPay"
          description={`Today is ${new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}`} />
        
        <SkeletonCards count={5} />
        <SkeletonCards count={4} />
      </div>);

  }
  if (error) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        <PageHeader
          title="Operating PeterPay"
          description="Failed to load admin statistics." />
        
        <ErrorState error={error} onRetry={refetch} />
      </div>);

  }
  if (!stats) return null;
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      <PageHeader
        title="Operating PeterPay"
        description={`Today is ${new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })}`} />
      

      {/* Urgent Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Link
          to="/admin/kyc"
          className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-shadow group">
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
              <FileCheck className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-slate-600">
              KYC Pending
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
            {stats.kyc_pending}
          </div>
        </Link>

        <Link
          to="/admin/disputes"
          className="bg-white p-4 rounded-xl border border-red-200 shadow-sm hover:shadow-md transition-shadow group">
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 text-red-700 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-slate-600">
              Open Disputes
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 group-hover:text-red-700 transition-colors">
            {stats.open_disputes}
          </div>
        </Link>

        <Link
          to="/admin/risk"
          className="bg-white p-4 rounded-xl border border-red-200 shadow-sm hover:shadow-md transition-shadow group">
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 text-red-700 rounded-lg">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-slate-600">
              High Risk Txns
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 group-hover:text-red-700 transition-colors">
            {stats.high_risk_txns}
          </div>
        </Link>

        <Link
          to="/admin/webhooks"
          className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-shadow group">
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
              <Webhook className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-slate-600">
              Failed Webhooks
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
            {stats.failed_webhooks}
          </div>
        </Link>

        <Link
          to="/admin/settlements"
          className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow group">
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
              <Landmark className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-slate-600">
              Pending Settlements
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
            {stats.pending_settlements}
          </div>
        </Link>
      </div>

      {/* Platform Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-sm font-medium text-slate-500 mb-1">
            Total Gross Volume (24h)
          </div>
          <div className="flex items-end gap-2">
            <div className="text-2xl font-bold text-slate-900">
              TZS {(stats.total_gross_volume_24h / 1000000).toFixed(1)}M
            </div>
            <div
              className={`flex items-center text-sm font-medium mb-1 ${stats.volume_change_24h >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              
              {stats.volume_change_24h >= 0 ?
              <ArrowUpRight className="w-4 h-4" /> :

              <ArrowDownRight className="w-4 h-4" />
              }
              {Math.abs(stats.volume_change_24h)}%
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-sm font-medium text-slate-500 mb-1">
            Active Merchants Today
          </div>
          <div className="flex items-end gap-2">
            <div className="text-2xl font-bold text-slate-900">
              {stats.active_merchants_today}
            </div>
            <div
              className={`flex items-center text-sm font-medium mb-1 ${stats.merchants_change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              
              {stats.merchants_change >= 0 ?
              <ArrowUpRight className="w-4 h-4" /> :

              <ArrowDownRight className="w-4 h-4" />
              }
              {Math.abs(stats.merchants_change)}%
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-sm font-medium text-slate-500 mb-1">
            Total Transactions (24h)
          </div>
          <div className="flex items-end gap-2">
            <div className="text-2xl font-bold text-slate-900">
              {stats.total_txns_24h.toLocaleString()}
            </div>
            <div
              className={`flex items-center text-sm font-medium mb-1 ${stats.txns_change_24h >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              
              {stats.txns_change_24h >= 0 ?
              <ArrowUpRight className="w-4 h-4" /> :

              <ArrowDownRight className="w-4 h-4" />
              }
              {Math.abs(stats.txns_change_24h)}%
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-sm font-medium text-slate-500 mb-1">
            System Uptime
          </div>
          <div className="flex items-end gap-2">
            <div className="text-2xl font-bold text-slate-900">
              {stats.system_uptime}%
            </div>
            <div className="flex items-center text-sm font-medium text-slate-400 mb-1">
              <Activity className="w-4 h-4 mr-1" />
              Live
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900 mb-6">
            Transaction Volume (30 Days)
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={stats.volume_chart}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0
                }}>
                
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0" />
                
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#64748B',
                    fontSize: 12
                  }}
                  dy={10} />
                
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#64748B',
                    fontSize: 12
                  }}
                  tickFormatter={(value) =>
                  `TZS ${(value / 1000000).toFixed(0)}M`
                  }
                  dx={-10} />
                
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value: number) => [
                  `TZS ${value.toLocaleString()}`,
                  'Volume']
                  } />
                
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#2563EB"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorVolume)" />
                
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900 mb-6">
            Success Rate by Method
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.method_breakdown}
                layout="vertical"
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0
                }}>
                
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#E2E8F0" />
                
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#64748B',
                    fontSize: 12
                  }}
                  width={60} />
                
                <Tooltip
                  cursor={{
                    fill: '#F8FAFC'
                  }}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0'
                  }} />
                
                <Bar
                  dataKey="success"
                  stackId="a"
                  fill="#10B981"
                  radius={[0, 0, 0, 0]}
                  name="Success %" />
                
                <Bar
                  dataKey="failed"
                  stackId="a"
                  fill="#EF4444"
                  radius={[0, 4, 4, 0]}
                  name="Failed %" />
                
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Provider Health Strip */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">
          Provider Health
        </h3>
        <div className="flex flex-wrap gap-3">
          {stats.providers.map((provider) =>
          <div
            key={provider.name}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm font-medium
                ${provider.status === 'operational' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : provider.status === 'degraded' ? 'bg-amber-50 border-amber-100 text-amber-700' : 'bg-rose-50 border-rose-100 text-rose-700'}
              `}>
            
              {provider.status === 'operational' ?
            <CheckCircle2 className="w-4 h-4" /> :
            provider.status === 'degraded' ?
            <AlertTriangle className="w-4 h-4" /> :

            <XCircle className="w-4 h-4" />
            }
              {provider.name}
            </div>
          )}
        </div>
      </div>
    </div>);

}