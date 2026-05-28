import React from 'react';
import { PageHeader } from '../../components/dashboard/ui/PageHeader';
import { DataTable } from '../../components/dashboard/ui/DataTable';
import { StatusBadge } from '../../components/dashboard/ui/StatusBadge';
import {
  SkeletonRows,
  ErrorState,
  EmptyState } from
'../../components/ui/States';
import {
  useAdminUsers,
  useAdminTransactions,
  useAdminPayments,
  useAdminPayouts,
  useAdminSettlements,
  useAdminDisputes,
  useAdminRisk,
  useAdminWebhooks,
  useAdminProviders,
  useAdminFees,
  useAdminReports,
  useAdminAuditLogs } from
'../../hooks/usePeterPay';
function GenericListPage({ title, description, columns, query }: any) {
  const { data, isLoading, error, refetch } = query;
  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        <PageHeader title={title} description={description} />
        <SkeletonRows rows={5} />
      </div>);

  }
  if (error) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        <PageHeader title={title} description={description} />
        <ErrorState error={error} onRetry={refetch} />
      </div>);

  }
  if (!data?.data || data.data.length === 0) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        <PageHeader title={title} description={description} />
        <EmptyState
          title="No data found"
          description={`There are no ${title.toLowerCase()} to display.`} />
        
      </div>);

  }
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <PageHeader title={title} description={description} />
      <DataTable
        data={data.data}
        columns={columns}
        keyExtractor={(row: any) => row.id}
        pagination={{
          currentPage: data.pagination.page,
          totalPages: data.pagination.total_pages
        }} />
      
    </div>);

}
export function AdminUsers() {
  const query = useAdminUsers();
  return (
    <GenericListPage
      title="Users"
      description="Manage all platform users."
      query={query}
      columns={[
      {
        header: 'ID',
        accessor: 'id'
      },
      {
        header: 'Name',
        accessor: (row: any) => `${row.first_name} ${row.last_name}`
      },
      {
        header: 'Email',
        accessor: 'email'
      },
      {
        header: 'Role',
        accessor: (row: any) =>
        <span className="capitalize">{row.role.replace('_', ' ')}</span>

      },
      {
        header: 'Created',
        accessor: (row: any) => new Date(row.created_at).toLocaleDateString()
      }]
      } />);


}
export function AdminTransactions() {
  const query = useAdminTransactions();
  return (
    <GenericListPage
      title="Transactions"
      description="Global transaction explorer."
      query={query}
      columns={[
      {
        header: 'ID',
        accessor: 'id'
      },
      {
        header: 'Amount',
        accessor: (row: any) =>
        `${row.currency} ${row.amount.toLocaleString()}`
      },
      {
        header: 'Status',
        accessor: (row: any) => <StatusBadge status={row.status} />
      },
      {
        header: 'Date',
        accessor: (row: any) => new Date(row.created_at).toLocaleDateString()
      }]
      } />);


}
export function AdminPayments() {
  const query = useAdminPayments();
  return (
    <GenericListPage
      title="Payments"
      description="All payments across the platform."
      query={query}
      columns={[
      {
        header: 'ID',
        accessor: 'id'
      },
      {
        header: 'Reference',
        accessor: 'reference'
      },
      {
        header: 'Amount',
        accessor: (row: any) =>
        `${row.currency} ${row.amount.toLocaleString()}`
      },
      {
        header: 'Status',
        accessor: (row: any) => <StatusBadge status={row.status} />
      },
      {
        header: 'Date',
        accessor: (row: any) => new Date(row.created_at).toLocaleDateString()
      }]
      } />);


}
export function AdminPayouts() {
  const query = useAdminPayouts();
  return (
    <GenericListPage
      title="Payouts"
      description="All payouts across the platform."
      query={query}
      columns={[
      {
        header: 'ID',
        accessor: 'id'
      },
      {
        header: 'Reference',
        accessor: 'reference'
      },
      {
        header: 'Amount',
        accessor: (row: any) =>
        `${row.currency} ${row.amount.toLocaleString()}`
      },
      {
        header: 'Status',
        accessor: (row: any) => <StatusBadge status={row.status} />
      },
      {
        header: 'Date',
        accessor: (row: any) => new Date(row.created_at).toLocaleDateString()
      }]
      } />);


}
export function AdminSettlements() {
  const query = useAdminSettlements();
  return (
    <GenericListPage
      title="Settlements"
      description="Settlement management and approval."
      query={query}
      columns={[
      {
        header: 'ID',
        accessor: 'id'
      },
      {
        header: 'Merchant ID',
        accessor: 'merchant_id'
      },
      {
        header: 'Amount',
        accessor: (row: any) =>
        `${row.currency} ${row.amount.toLocaleString()}`
      },
      {
        header: 'Status',
        accessor: (row: any) => <StatusBadge status={row.status} />
      },
      {
        header: 'Date',
        accessor: (row: any) => new Date(row.created_at).toLocaleDateString()
      }]
      } />);


}
export function AdminDisputes() {
  const query = useAdminDisputes();
  return (
    <GenericListPage
      title="Disputes"
      description="Dispute and chargeback queue."
      query={query}
      columns={[
      {
        header: 'ID',
        accessor: 'id'
      },
      {
        header: 'Payment ID',
        accessor: 'payment_id'
      },
      {
        header: 'Reason',
        accessor: 'reason'
      },
      {
        header: 'Amount',
        accessor: (row: any) =>
        `${row.currency} ${row.amount.toLocaleString()}`
      },
      {
        header: 'Status',
        accessor: (row: any) => <StatusBadge status={row.status} />
      }]
      } />);


}
export function AdminRisk() {
  const query = useAdminRisk();
  return (
    <GenericListPage
      title="Risk & Fraud"
      description="Fraud and risk monitoring."
      query={query}
      columns={[
      {
        header: 'Rule',
        accessor: 'name'
      },
      {
        header: 'Description',
        accessor: 'description'
      },
      {
        header: 'Action',
        accessor: (row: any) =>
        <span className="capitalize">{row.action}</span>

      },
      {
        header: 'Status',
        accessor: (row: any) => <StatusBadge status={row.status} />
      }]
      } />);


}
export function AdminWebhooks() {
  const query = useAdminWebhooks();
  return (
    <GenericListPage
      title="Webhooks"
      description="Global webhook delivery monitoring."
      query={query}
      columns={[
      {
        header: 'ID',
        accessor: 'id'
      },
      {
        header: 'Event',
        accessor: 'event'
      },
      {
        header: 'Status',
        accessor: (row: any) =>
        <StatusBadge
          status={
          row.http_status >= 200 && row.http_status < 300 ?
          'success' :
          'failed'
          } />


      },
      {
        header: 'Attempts',
        accessor: 'attempts'
      },
      {
        header: 'Date',
        accessor: (row: any) =>
        row.delivered_at ?
        new Date(row.delivered_at).toLocaleString() :
        'Pending'
      }]
      } />);


}
export function AdminProviders() {
  const query = useAdminProviders();
  return (
    <GenericListPage
      title="Providers"
      description="Payment provider configuration."
      query={query}
      columns={[
      {
        header: 'Provider',
        accessor: 'name'
      },
      {
        header: 'Type',
        accessor: (row: any) =>
        <span className="capitalize">{row.type.replace('_', ' ')}</span>

      },
      {
        header: 'Status',
        accessor: (row: any) =>
        <StatusBadge
          status={
          row.status === 'operational' ?
          'success' :
          row.status === 'degraded' ?
          'warning' :
          'failed'
          } />


      },
      {
        header: 'Success Rate',
        accessor: (row: any) => `${row.success_rate}%`
      }]
      } />);


}
export function AdminFees() {
  const query = useAdminFees();
  return (
    <GenericListPage
      title="Fees"
      description="Fee and pricing rule management."
      query={query}
      columns={[
      {
        header: 'Method',
        accessor: (row: any) =>
        <span className="capitalize">{row.method.replace('_', ' ')}</span>

      },
      {
        header: 'Percentage',
        accessor: (row: any) => `${row.percentage}%`
      },
      {
        header: 'Fixed Amount',
        accessor: (row: any) => `${row.currency} ${row.fixed_amount}`
      },
      {
        header: 'Status',
        accessor: (row: any) => <StatusBadge status={row.status} />
      }]
      } />);


}
export function AdminReports() {
  const query = useAdminReports();
  return (
    <GenericListPage
      title="Reports"
      description="System-wide reports."
      query={query}
      columns={[
      {
        header: 'Report Name',
        accessor: 'name'
      },
      {
        header: 'Type',
        accessor: (row: any) =>
        <span className="capitalize">{row.type}</span>

      },
      {
        header: 'Status',
        accessor: (row: any) => <StatusBadge status={row.status} />
      },
      {
        header: 'Generated',
        accessor: (row: any) => new Date(row.created_at).toLocaleDateString()
      }]
      } />);


}
export function AdminAuditLogs() {
  const query = useAdminAuditLogs();
  return (
    <GenericListPage
      title="Audit Logs"
      description="Admin action audit trail."
      query={query}
      columns={[
      {
        header: 'Admin',
        accessor: 'admin_name'
      },
      {
        header: 'Action',
        accessor: 'action'
      },
      {
        header: 'Resource',
        accessor: 'resource'
      },
      {
        header: 'IP Address',
        accessor: 'ip_address'
      },
      {
        header: 'Time',
        accessor: (row: any) => new Date(row.created_at).toLocaleString()
      }]
      } />);


}
export function AdminSettings() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="System Settings"
        description="Platform configuration and maintenance." />
      
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-slate-500">
          Settings configuration form would go here.
        </p>
      </div>
    </div>);

}