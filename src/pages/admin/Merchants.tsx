import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Download, Inbox } from 'lucide-react';
import { PageHeader } from '../../components/dashboard/ui/PageHeader';
import { DataTable } from '../../components/dashboard/ui/DataTable';
import { StatusBadge } from '../../components/dashboard/ui/StatusBadge';
import { useMerchants } from '../../hooks/usePeterPay';
import {
  SkeletonRows,
  ErrorState,
  EmptyState } from
'../../components/ui/States';
function formatVolume(amount: number, currency: string) {
  if (amount >= 1000000) return `${currency} ${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `${currency} ${(amount / 1000).toFixed(1)}K`;
  return `${currency} ${amount.toLocaleString()}`;
}
export function Merchants() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useMerchants({
    page
  });
  const merchants = data?.data ?? [];
  const pagination = data?.pagination;
  const columns = [
  {
    header: 'Business Name',
    accessor: (row: any) =>
    <div>
          <div className="font-medium text-slate-900">
            {row.trading_name || row.legal_name}
          </div>
          <div className="text-xs text-slate-500">{row.id}</div>
        </div>

  },
  {
    header: 'Country',
    accessor: (row: any) => row.country
  },
  {
    header: 'KYC Status',
    accessor: (row: any) => {
      const styles: Record<string, string> = {
        verified: 'bg-emerald-100 text-emerald-700',
        pending: 'bg-amber-100 text-amber-700',
        submitted: 'bg-blue-100 text-blue-700',
        rejected: 'bg-rose-100 text-rose-700'
      };
      return (
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${styles[row.kyc_status] || 'bg-slate-100 text-slate-700'}`}>
          
            {row.kyc_status}
          </span>);

    }
  },
  {
    header: 'Account Status',
    accessor: (row: any) => <StatusBadge status={row.status} />
  },
  {
    header: 'Monthly Vol.',
    accessor: (row: any) =>
    formatVolume(row.monthly_volume, row.monthly_volume_currency)
  },
  {
    header: 'Joined',
    accessor: (row: any) =>
    new Date(row.created_at).toLocaleDateString('en-GB')
  }];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Merchants"
          description="Manage all merchant accounts across the platform." />
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by business name, ID, or owner…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
          
        </div>
        <div className="flex items-center gap-2">
          <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white">
            <option value="">All KYC Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white">
            <option value="">All Account Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="inactive">Inactive</option>
          </select>
          <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading && <SkeletonRows rows={6} cols={6} />}
      {!loading && error && <ErrorState error={error} onRetry={refetch} />}
      {!loading && !error && merchants.length === 0 &&
      <EmptyState
        icon={<Inbox className="w-6 h-6" />}
        title="No merchants yet"
        description="Merchant accounts will appear here once they register on the platform." />

      }
      {!loading && !error && merchants.length > 0 &&
      <DataTable
        data={merchants}
        columns={columns}
        keyExtractor={(row) => row.id}
        onRowClick={(row) => navigate(`/admin/merchants/${row.id}`)}
        pagination={
        pagination ?
        {
          currentPage: pagination.page,
          totalPages: pagination.total_pages
        } :
        undefined
        } />

      }
    </div>);

}