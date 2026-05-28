import React from 'react';
import { PageHeader } from '../../components/dashboard/ui/PageHeader';
import { StatCard } from '../../components/dashboard/ui/StatCard';
import { DataTable } from '../../components/dashboard/ui/DataTable';
import { StatusBadge } from '../../components/dashboard/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Users,
  Activity,
  CreditCard,
  Download,
  Inbox } from
'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from
'recharts';
import { useDashboardStats, usePayments } from '../../hooks/usePeterPay';
import {
  SkeletonCards,
  SkeletonRows,
  ErrorState,
  EmptyState } from
'../../components/ui/States';
function formatMoney(amount: number) {
  if (amount >= 1000000) return `TZS ${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `TZS ${(amount / 1000).toFixed(1)}K`;
  return `TZS ${amount.toLocaleString()}`;
}
function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
export function Overview() {
  const {
    data: stats,
    loading: statsLoading,
    error: statsError,
    refetch: refetchStats
  } = useDashboardStats();
  const {
    data: paymentsData,
    loading: paymentsLoading,
    error: paymentsError,
    refetch: refetchPayments
  } = usePayments({
    per_page: 5
  });
  const recentActivity = paymentsData?.data ?? [];
  return (
    <div>
      <PageHeader
        title="Overview"
        description="Here's what's happening with your business today."
        actions={
        <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        } />
      

      {statsLoading &&
      <div className="mb-8">
          <SkeletonCards count={4} />
        </div>
      }

      {!statsLoading && statsError &&
      <div className="mb-8">
          <ErrorState error={statsError} onRetry={refetchStats} />
        </div>
      }

      {!statsLoading && !statsError && stats &&
      <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
            title="Gross Volume"
            value={formatMoney(stats.gross_volume)}
            change={{
              value: '12.5%',
              trend: 'up'
            }}
            icon={Activity} />
          
            <StatCard
            title="Net Revenue"
            value={formatMoney(stats.net_revenue)}
            change={{
              value: '11.2%',
              trend: 'up'
            }}
            icon={Wallet} />
          
            <StatCard
            title="Active Customers"
            value={stats.active_customers.toLocaleString()}
            change={{
              value: '4.3%',
              trend: 'up'
            }}
            icon={Users} />
          
            <StatCard
            title="Success Rate"
            value={`${stats.success_rate}%`}
            change={{
              value: '0.5%',
              trend: 'down'
            }}
            icon={CreditCard} />
          
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Volume (Last 7 Days)
                </h3>
                <select className="text-sm border-slate-200 rounded-md text-slate-600">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>This month</option>
                </select>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                  data={stats.volume_chart}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0
                  }}>
                  
                    <defs>
                      <linearGradient
                      id="colorVolume"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1">
                      
                        <stop
                        offset="5%"
                        stopColor="#2563EB"
                        stopOpacity={0.1} />
                      
                        <stop
                        offset="95%"
                        stopColor="#2563EB"
                        stopOpacity={0} />
                      
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
                    tickFormatter={(value) => `TZS ${value / 1000000}M`}
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

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">
                Payment Methods
              </h3>
              <div className="flex-1 flex flex-col justify-center gap-6">
                {stats.method_breakdown.map((item, i) => {
                const colors = [
                'bg-brand-primary',
                'bg-brand-accent',
                'bg-slate-400'];

                const colorClass = colors[i % colors.length];
                return (
                  <div key={item.method}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-slate-700">
                          {item.method}
                        </span>
                        <span className="text-slate-500">
                          {item.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                        className={`${colorClass} h-2 rounded-full`}
                        style={{
                          width: `${item.percentage}%`
                        }}>
                      </div>
                      </div>
                    </div>);

              })}
              </div>
            </div>
          </div>
        </>
      }

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            Recent Activity
          </h3>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

        {paymentsLoading && <SkeletonRows rows={5} cols={5} />}

        {!paymentsLoading && paymentsError &&
        <ErrorState error={paymentsError} onRetry={refetchPayments} />
        }

        {!paymentsLoading && !paymentsError && recentActivity.length === 0 &&
        <EmptyState
          icon={<Inbox className="w-6 h-6" />}
          title="No recent activity"
          description="Your latest transactions will appear here." />

        }

        {!paymentsLoading && !paymentsError && recentActivity.length > 0 &&
        <DataTable
          data={recentActivity}
          keyExtractor={(row) => row.id}
          columns={[
          {
            header: 'Amount',
            accessor: (row) =>
            <span className="font-medium text-slate-900">
                    TZS {row.amount.toLocaleString()}
                  </span>

          },
          {
            header: 'Customer',
            accessor: (row) => row.customer.name
          },
          {
            header: 'Method',
            accessor: (row) =>
            <span className="text-slate-500">{row.method || '—'}</span>

          },
          {
            header: 'Date',
            accessor: (row) =>
            <span className="text-slate-500">
                    {formatDate(row.created_at)}
                  </span>

          },
          {
            header: 'Status',
            accessor: (row) => <StatusBadge status={row.status} />,
            className: 'text-right'
          }]
          } />

        }
      </div>
    </div>);

}