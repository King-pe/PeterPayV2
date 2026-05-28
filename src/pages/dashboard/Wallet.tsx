import React from 'react';
import { PageHeader } from '../../components/dashboard/ui/PageHeader';
import { DataTable } from '../../components/dashboard/ui/DataTable';
import { Button } from '../../components/ui/Button';
import {
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Landmark,
  Inbox } from
'lucide-react';
import { useWalletBalances, useLedgerEntries } from '../../hooks/usePeterPay';
import {
  SkeletonCards,
  SkeletonRows,
  ErrorState,
  EmptyState } from
'../../components/ui/States';
function formatMoney(amount: number, currency: string) {
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
export function Wallet() {
  const balances = useWalletBalances();
  const ledger = useLedgerEntries({
    per_page: 25
  });
  // Default to the primary balance (first returned by API, usually TZS).
  const primary = balances.data?.[0];
  return (
    <div>
      <PageHeader
        title="Wallet & Ledger"
        description="Manage your balances and view your double-entry ledger."
        actions={
        <>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Statement
            </Button>
            <Button size="sm" className="gap-2">
              <Landmark className="w-4 h-4" />
              Request Settlement
            </Button>
          </>
        } />
      

      {/* Balance Cards */}
      {balances.loading &&
      <div className="mb-8">
          <SkeletonCards count={3} />
        </div>
      }

      {!balances.loading && balances.error &&
      <div className="mb-8">
          <ErrorState error={balances.error} onRetry={balances.refetch} />
        </div>
      }

      {!balances.loading && !balances.error && primary &&
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-brand-primary text-white p-6 rounded-xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Landmark className="w-24 h-24" />
            </div>
            <h3 className="text-brand-primary-100 font-medium mb-2 relative z-10">
              Available Balance
            </h3>
            <p className="text-3xl font-bold mb-1 relative z-10">
              {formatMoney(primary.available, primary.currency)}
            </p>
            <p className="text-sm text-brand-primary-200 relative z-10">
              Ready for settlement or payout
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-slate-500 font-medium mb-2">Pending Balance</h3>
            <p className="text-3xl font-bold text-slate-900 mb-1">
              {formatMoney(primary.pending, primary.currency)}
            </p>
            <p className="text-sm text-slate-500">
              Clearing from card networks
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-slate-500 font-medium mb-2">Held Balance</h3>
            <p className="text-3xl font-bold text-slate-900 mb-1">
              {formatMoney(primary.held, primary.currency)}
            </p>
            <p className="text-sm text-slate-500">
              Reserved for disputes/refunds
            </p>
          </div>
        </div>
      }

      {/* Ledger */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            Ledger Entries
          </h3>
          <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none">
            <option>All Entries</option>
            <option>Credits Only</option>
            <option>Debits Only</option>
          </select>
        </div>

        {ledger.loading && <SkeletonRows rows={5} cols={4} />}
        {!ledger.loading && ledger.error &&
        <ErrorState error={ledger.error} onRetry={ledger.refetch} />
        }
        {!ledger.loading &&
        !ledger.error &&
        (ledger.data?.data.length ?? 0) === 0 &&
        <EmptyState
          icon={<Inbox className="w-6 h-6" />}
          title="No ledger entries yet"
          description="Your transaction history will appear here once payments start flowing." />

        }

        {!ledger.loading &&
        !ledger.error &&
        (ledger.data?.data.length ?? 0) > 0 &&
        <DataTable
          data={ledger.data!.data}
          keyExtractor={(row) => row.id}
          columns={[
          {
            header: 'Date',
            accessor: (row) => formatDate(row.date)
          },
          {
            header: 'Description',
            accessor: 'description'
          },
          {
            header: 'Debit/Credit',
            accessor: (row) =>
            <div
              className={`flex items-center gap-1.5 font-medium ${row.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
              
                      {row.type === 'credit' ?
              <ArrowDownRight className="w-4 h-4" /> :

              <ArrowUpRight className="w-4 h-4" />
              }
                      {row.type === 'credit' ? '+' : '-'}{' '}
                      {formatMoney(row.amount, row.currency)}
                    </div>

          },
          {
            header: 'Running Balance',
            accessor: (row) =>
            <span className="font-semibold text-slate-900">
                      {formatMoney(row.running_balance, row.currency)}
                    </span>,

            className: 'text-right'
          }]
          } />

        }
      </div>
    </div>);

}