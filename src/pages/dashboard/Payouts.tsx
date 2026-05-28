import React from 'react';
import { PageHeader } from '../../components/dashboard/ui/PageHeader';
import { DataTable } from '../../components/dashboard/ui/DataTable';
import { StatusBadge } from '../../components/dashboard/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Send, Upload, Inbox } from 'lucide-react';
import { usePayouts } from '../../hooks/usePeterPay';
import {
  SkeletonRows,
  ErrorState,
  EmptyState } from
'../../components/ui/States';
export function Payouts() {
  const { data, loading, error, refetch } = usePayouts();
  const payouts = data?.data ?? [];
  return (
    <div>
      <PageHeader
        title="Payouts"
        description="Send money to mobile money wallets or bank accounts."
        actions={
        <>
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="w-4 h-4" />
              Bulk Payout
            </Button>
            <Button size="sm" className="gap-2">
              <Send className="w-4 h-4" />
              New Payout
            </Button>
          </>
        } />
      

      {loading && <SkeletonRows rows={5} cols={6} />}

      {!loading && error && <ErrorState error={error} onRetry={refetch} />}

      {!loading && !error && payouts.length === 0 &&
      <EmptyState
        icon={<Inbox className="w-6 h-6" />}
        title="No payouts yet"
        description="Create your first payout to send money." />

      }

      {!loading && !error && payouts.length > 0 &&
      <DataTable
        data={payouts}
        keyExtractor={(row) => row.id}
        columns={[
        {
          header: 'Amount',
          accessor: (row) =>
          <span className="font-semibold text-slate-900">
                  {row.currency} {row.amount.toLocaleString()}
                </span>

        },
        {
          header: 'Status',
          accessor: (row) => <StatusBadge status={row.status} />
        },
        {
          header: 'Reference',
          accessor: 'reference'
        },
        {
          header: 'Recipient',
          accessor: (row) => row.recipient.name
        },
        {
          header: 'Method',
          accessor: (row) => row.recipient.type
        },
        {
          header: 'Date',
          accessor: (row) => new Date(row.created_at).toLocaleString()
        }]
        } />

      }
    </div>);

}