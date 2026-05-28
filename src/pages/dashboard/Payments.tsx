import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/dashboard/ui/PageHeader';
import { DataTable } from '../../components/dashboard/ui/DataTable';
import { StatusBadge } from '../../components/dashboard/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Search, Filter, Download, Inbox } from 'lucide-react';
import { usePayments } from '../../hooks/usePeterPay';
import {
  SkeletonRows,
  ErrorState,
  EmptyState } from
'../../components/ui/States';
import type { PaymentStatus, PaymentMethod } from '../../types/api';
// Display name for payment methods.
const METHOD_LABELS: Record<PaymentMethod, string> = {
  mpesa: 'M-Pesa',
  airtel_money: 'Airtel Money',
  tigo_pesa: 'Tigo Pesa',
  halopesa: 'Halopesa',
  card: 'Card',
  bank_transfer: 'Bank Transfer',
  qr: 'QR Code',
  ussd: 'USSD'
};
// Format a TZS amount (integer minor or major — adjust based on backend convention).
function formatAmount(amount: number, currency: string) {
  return `${currency} ${amount.toLocaleString()}`;
}
function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}
export function Payments() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<PaymentStatus | ''>('');
  const { data, loading, error, refetch } = usePayments({
    page,
    per_page: 25,
    status: status || undefined,
    search: search || undefined
  });
  const payments = data?.data ?? [];
  const pagination = data?.pagination;
  return (
    <div>
      <PageHeader
        title="Payments"
        description="View and manage all your incoming transactions."
        actions={
        <>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button size="sm">Create Payment</Button>
          </>
        } />
      

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm mb-6 p-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by reference, customer, or email…"
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary" />
          
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as PaymentStatus | '');
              setPage(1);
            }}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none">
            
            <option value="">All Statuses</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>
      </div>

      {loading && <SkeletonRows rows={6} cols={6} />}

      {!loading && error && <ErrorState error={error} onRetry={refetch} />}

      {!loading && !error && payments.length === 0 &&
      <EmptyState
        icon={<Inbox className="w-6 h-6" />}
        title="No payments yet"
        description="Once your customers start paying, they will appear here." />

      }

      {!loading && !error && payments.length > 0 &&
      <DataTable
        data={payments}
        keyExtractor={(row) => row.id}
        onRowClick={(row) => navigate(`/dashboard/payments/${row.id}`)}
        pagination={
        pagination ?
        {
          currentPage: pagination.page,
          totalPages: pagination.total_pages
        } :
        undefined
        }
        columns={[
        {
          header: 'Amount',
          accessor: (row) =>
          <span className="font-semibold text-slate-900">
                  {formatAmount(row.amount, row.currency)}
                </span>

        },
        {
          header: 'Status',
          accessor: (row) => <StatusBadge status={row.status} />
        },
        {
          header: 'Reference',
          accessor: (row) =>
          <div className="flex flex-col">
                  <span className="text-slate-900 font-medium">
                    {row.reference}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {row.id}
                  </span>
                </div>

        },
        {
          header: 'Customer',
          accessor: (row) =>
          <div className="flex flex-col">
                  <span className="text-slate-900">{row.customer.name}</span>
                  <span className="text-xs text-slate-500">
                    {row.customer.email}
                  </span>
                </div>

        },
        {
          header: 'Method',
          accessor: (row) =>
          <span className="text-slate-600">
                  {row.method ? METHOD_LABELS[row.method] : '—'}
                </span>

        },
        {
          header: 'Date',
          accessor: (row) =>
          <span className="text-slate-500 text-sm">
                  {formatDate(row.created_at)}
                </span>

        }]
        } />

      }
    </div>);

}