import React from 'react';
import { PageHeader } from '../../components/dashboard/ui/PageHeader';
import { DataTable } from '../../components/dashboard/ui/DataTable';
import { StatusBadge } from '../../components/dashboard/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Landmark, Settings, Inbox } from 'lucide-react';
import { useSettlements } from '../../hooks/usePeterPay';
import {
  SkeletonRows,
  ErrorState,
  EmptyState } from
'../../components/ui/States';
export function Settlements() {
  const { data, loading, error, refetch } = useSettlements();
  const settlements = data?.data ?? [];
  return (
    <div>
      <PageHeader
        title="Settlements"
        description="View your payouts from PeterPay to your bank account."
        actions={
        <>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            <Button size="sm" className="gap-2">
              <Landmark className="w-4 h-4" />
              Request Settlement
            </Button>
          </>
        } />
      

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-900">
            Next Scheduled Settlement
          </p>
          <p className="text-sm text-slate-500">
            Tomorrow at 09:00 AM (TZS 1,548,750)
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-slate-900">
            Settlement Account
          </p>
          <p className="text-sm text-slate-500">CRDB Bank ****1234</p>
        </div>
      </div>

      {loading && <SkeletonRows rows={5} cols={5} />}

      {!loading && error && <ErrorState error={error} onRetry={refetch} />}

      {!loading && !error && settlements.length === 0 &&
      <EmptyState
        icon={<Inbox className="w-6 h-6" />}
        title="No settlements yet"
        description="Your settlements will appear here once processed." />

      }

      {!loading && !error && settlements.length > 0 &&
      <DataTable
        data={settlements}
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
          accessor: (row) => <StatusBadge status={row.status as any} />
        },
        {
          header: 'Reference',
          accessor: 'reference'
        },
        {
          header: 'Account',
          accessor: (row) =>
          `${row.destination.bank_name} ${row.destination.account_number_masked}`
        },
        {
          header: 'Date',
          accessor: (row) => new Date(row.created_at).toLocaleString()
        }]
        } />

      }
    </div>);

}