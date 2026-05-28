import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Clock, Inbox } from 'lucide-react';
import { PageHeader } from '../../components/dashboard/ui/PageHeader';
import { DataTable } from '../../components/dashboard/ui/DataTable';
import { useKycQueue } from '../../hooks/usePeterPay';
import {
  SkeletonRows,
  ErrorState,
  EmptyState } from
'../../components/ui/States';
function daysSince(iso: string): number {
  const diff = Date.now() - new Date(iso).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
export function KycQueue() {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useKycQueue();
  const applications = data?.data ?? [];
  const columns = [
  {
    header: 'Business Name',
    accessor: (row: any) =>
    <div>
          <div className="font-medium text-slate-900">{row.business_name}</div>
          <div className="text-xs text-slate-500">{row.id}</div>
        </div>

  },
  {
    header: 'Country',
    accessor: (row: any) => row.country
  },
  {
    header: 'Submitted',
    accessor: (row: any) =>
    new Date(row.submitted_at).toLocaleDateString('en-GB')
  },
  {
    header: 'Wait Time',
    accessor: (row: any) => {
      const days = daysSince(row.submitted_at);
      return (
        <div
          className={`flex items-center gap-1.5 font-medium ${days > 3 ? 'text-red-600' : 'text-slate-700'}`}>
          
            <Clock className="w-4 h-4" />
            {days} day{days === 1 ? '' : 's'}
          </div>);

    }
  },
  {
    header: 'Status',
    accessor: (row: any) =>
    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-xs font-medium capitalize">
          {row.status}
        </span>

  },
  {
    header: 'Action',
    accessor: () =>
    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          Review
        </button>

  }];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="KYC Review Queue"
          description="Review and approve merchant KYC applications." />
        
        {!loading && !error &&
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-lg text-sm font-medium">
            {applications.length} application
            {applications.length === 1 ? '' : 's'} pending
          </div>
        }
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search applications…"
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
          
        </div>
        <div className="flex items-center gap-2">
          <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white">
            <option>Sort by: Oldest First</option>
            <option>Sort by: Newest First</option>
          </select>
          <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading && <SkeletonRows rows={5} cols={6} />}
      {!loading && error && <ErrorState error={error} onRetry={refetch} />}
      {!loading && !error && applications.length === 0 &&
      <EmptyState
        icon={<Inbox className="w-6 h-6" />}
        title="No applications waiting"
        description="Nice work — the KYC queue is empty. New submissions will appear here automatically." />

      }
      {!loading && !error && applications.length > 0 &&
      <DataTable
        data={applications}
        columns={columns}
        keyExtractor={(row) => row.id}
        onRowClick={(row) => navigate(`/admin/kyc/${row.id}`)} />

      }
    </div>);

}