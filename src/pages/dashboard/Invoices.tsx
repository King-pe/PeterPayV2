import React from 'react';
import { PageHeader } from '../../components/dashboard/ui/PageHeader';
import { DataTable } from '../../components/dashboard/ui/DataTable';
import { StatusBadge } from '../../components/dashboard/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Plus, Download, Inbox } from 'lucide-react';
import { useInvoices } from '../../hooks/usePeterPay';
import {
  SkeletonRows,
  ErrorState,
  EmptyState } from
'../../components/ui/States';
export function Invoices() {
  const { data, loading, error, refetch } = useInvoices();
  const invoices = data?.data ?? [];
  return (
    <div>
      <PageHeader
        title="Invoices"
        description="Create and send professional invoices to your customers."
        actions={
        <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Create Invoice
          </Button>
        } />
      

      {loading && <SkeletonRows rows={5} cols={7} />}

      {!loading && error && <ErrorState error={error} onRetry={refetch} />}

      {!loading && !error && invoices.length === 0 &&
      <EmptyState
        icon={<Inbox className="w-6 h-6" />}
        title="No invoices"
        description="Create your first invoice to bill your customers." />

      }

      {!loading && !error && invoices.length > 0 &&
      <DataTable
        data={invoices}
        keyExtractor={(row) => row.id}
        columns={[
        {
          header: 'Invoice',
          accessor: (row) =>
          <span className="font-medium text-slate-900">{row.number}</span>

        },
        {
          header: 'Customer',
          accessor: (row) => row.customer.name
        },
        {
          header: 'Amount',
          accessor: (row) =>
          <span className="text-slate-600">
                  {row.currency} {row.total.toLocaleString()}
                </span>

        },
        {
          header: 'Status',
          accessor: (row) =>
          <StatusBadge
            status={
            row.status === 'overdue' ? 'expired' : row.status as any
            } />


        },
        {
          header: 'Issued',
          accessor: (row) => new Date(row.issued_at).toLocaleDateString()
        },
        {
          header: 'Due',
          accessor: (row) => new Date(row.due_at).toLocaleDateString()
        },
        {
          header: '',
          accessor: () =>
          <button className="text-slate-400 hover:text-slate-600">
                  <Download className="w-4 h-4" />
                </button>,

          className: 'text-right'
        }]
        } />

      }
    </div>);

}