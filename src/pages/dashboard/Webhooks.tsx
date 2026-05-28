import React from 'react';
import { PageHeader } from '../../components/dashboard/ui/PageHeader';
import { DataTable } from '../../components/dashboard/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { Plus, Activity, CheckCircle2, XCircle, Inbox } from 'lucide-react';
import {
  useWebhookEndpoints,
  useWebhookDeliveries } from
'../../hooks/usePeterPay';
import {
  SkeletonRows,
  ErrorState,
  EmptyState } from
'../../components/ui/States';
function formatDate(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-GB', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
export function Webhooks() {
  const {
    data: endpoints,
    loading: endpointsLoading,
    error: endpointsError,
    refetch: refetchEndpoints
  } = useWebhookEndpoints();
  const {
    data: deliveriesData,
    loading: deliveriesLoading,
    error: deliveriesError,
    refetch: refetchDeliveries
  } = useWebhookDeliveries();
  const deliveries = deliveriesData?.data ?? [];
  return (
    <div>
      <PageHeader
        title="Webhooks"
        description="Receive real-time HTTP notifications when events happen in your account."
        actions={
        <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Endpoint
          </Button>
        } />
      

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <h3 className="font-semibold text-slate-900">Endpoints</h3>
        </div>

        {endpointsLoading && <SkeletonRows rows={3} cols={4} />}

        {!endpointsLoading && endpointsError &&
        <ErrorState error={endpointsError} onRetry={refetchEndpoints} />
        }

        {!endpointsLoading &&
        !endpointsError &&
        (endpoints?.length ?? 0) === 0 &&
        <EmptyState
          icon={<Inbox className="w-6 h-6" />}
          title="No endpoints configured"
          description="Add an endpoint to start receiving webhook events." />

        }

        {!endpointsLoading &&
        !endpointsError &&
        (endpoints?.length ?? 0) > 0 &&
        <DataTable
          data={endpoints!}
          keyExtractor={(row) => row.id}
          columns={[
          {
            header: 'URL',
            accessor: (row) =>
            <div className="flex items-center gap-2">
                      <div
                className={`w-2 h-2 rounded-full ${row.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'}`}>
              </div>
                      <span className="font-medium text-slate-900">
                        {row.url}
                      </span>
                    </div>

          },
          {
            header: 'Events',
            accessor: (row) => row.events.join(', ')
          },
          {
            header: 'Signing Secret',
            accessor: (row) =>
            <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 font-mono">
                      {row.signing_secret}
                    </code>

          },
          {
            header: '',
            accessor: () =>
            <Button variant="outline" size="sm">
                      Edit
                    </Button>,

            className: 'text-right'
          }]
          } />

        }
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-900">Recent Deliveries</h3>
          <Button variant="outline" size="sm" className="gap-2">
            <Activity className="w-4 h-4" />
            View All Logs
          </Button>
        </div>

        {deliveriesLoading && <SkeletonRows rows={5} cols={5} />}

        {!deliveriesLoading && deliveriesError &&
        <ErrorState error={deliveriesError} onRetry={refetchDeliveries} />
        }

        {!deliveriesLoading && !deliveriesError && deliveries.length === 0 &&
        <EmptyState
          icon={<Inbox className="w-6 h-6" />}
          title="No recent deliveries"
          description="Webhook delivery logs will appear here." />

        }

        {!deliveriesLoading && !deliveriesError && deliveries.length > 0 &&
        <DataTable
          data={deliveries}
          keyExtractor={(row) => row.id}
          columns={[
          {
            header: 'Status',
            accessor: (row) =>
            <div className="flex items-center gap-2">
                    {row.http_status >= 200 && row.http_status < 300 ?
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> :

              <XCircle className="w-4 h-4 text-rose-500" />
              }
                    <span
                className={`text-sm font-medium ${row.http_status >= 200 && row.http_status < 300 ? 'text-emerald-700' : 'text-rose-700'}`}>
                
                      {row.http_status}
                    </span>
                  </div>

          },
          {
            header: 'Event',
            accessor: (row) =>
            <span className="font-mono text-sm text-slate-700">
                    {row.event}
                  </span>

          },
          {
            header: 'Endpoint',
            accessor: (row) => {
              const endpoint = endpoints?.find(
                (e) => e.id === row.endpoint_id
              );
              return (
                <span className="text-slate-500 text-sm truncate max-w-[200px] block">
                      {endpoint?.url || row.endpoint_id}
                    </span>);

            }
          },
          {
            header: 'Date',
            accessor: (row) => formatDate(row.delivered_at)
          },
          {
            header: '',
            accessor: () =>
            <Button variant="outline" size="sm">
                    View Payload
                  </Button>,

            className: 'text-right'
          }]
          } />

        }
      </div>
    </div>);

}