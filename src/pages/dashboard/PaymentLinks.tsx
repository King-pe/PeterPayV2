import React from 'react';
import { PageHeader } from '../../components/dashboard/ui/PageHeader';
import { DataTable } from '../../components/dashboard/ui/DataTable';
import { StatusBadge } from '../../components/dashboard/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Plus, Copy, ExternalLink, Inbox } from 'lucide-react';
import { usePaymentLinks } from '../../hooks/usePeterPay';
import {
  SkeletonRows,
  ErrorState,
  EmptyState } from
'../../components/ui/States';
export function PaymentLinks() {
  const { data, loading, error, refetch } = usePaymentLinks();
  const links = data?.data ?? [];
  return (
    <div>
      <PageHeader
        title="Payment Links"
        description="Create shareable links to collect payments without writing code."
        actions={
        <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Create Link
          </Button>
        } />
      

      {loading && <SkeletonRows rows={5} cols={5} />}

      {!loading && error && <ErrorState error={error} onRetry={refetch} />}

      {!loading && !error && links.length === 0 &&
      <EmptyState
        icon={<Inbox className="w-6 h-6" />}
        title="No payment links"
        description="Create a payment link to start collecting payments." />

      }

      {!loading && !error && links.length > 0 &&
      <DataTable
        data={links}
        keyExtractor={(row) => row.id}
        columns={[
        {
          header: 'Title',
          accessor: (row) =>
          <span className="font-medium text-slate-900">{row.title}</span>

        },
        {
          header: 'Amount',
          accessor: (row) =>
          <span className="text-slate-600">
                  {row.amount ?
            `${row.currency} ${row.amount.toLocaleString()}` :
            'Any amount'}
                </span>

        },
        {
          header: 'Status',
          accessor: (row) => <StatusBadge status={row.status} />
        },
        {
          header: 'Performance',
          accessor: (row) =>
          <span className="text-sm text-slate-500">
                  {row.payments} payments / {row.views} views
                </span>

        },
        {
          header: 'Link',
          accessor: (row) =>
          <div className="flex items-center gap-2">
                  <span className="text-sm text-brand-primary truncate max-w-[150px]">
                    {row.url}
                  </span>
                  <button className="text-slate-400 hover:text-slate-600">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button className="text-slate-400 hover:text-slate-600">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

        }]
        } />

      }
    </div>);

}