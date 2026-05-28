import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/dashboard/ui/PageHeader';
import { StatusBadge } from '../../components/dashboard/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import {
  ArrowLeft,
  Copy,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle } from
'lucide-react';
import { usePayment } from '../../hooks/usePeterPay';
import { LoadingState, ErrorState } from '../../components/ui/States';
export function PaymentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: payment, loading, error, refetch } = usePayment(id);
  if (loading) {
    return <LoadingState label="Loading payment details..." />;
  }
  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }
  if (!payment) {
    return (
      <div className="text-center py-12 text-slate-500">Payment not found.</div>);

  }
  // Mock timeline since the API type doesn't include it yet, but we want to keep the UI
  const timeline = [
  {
    status: 'created',
    time: new Date(payment.created_at).toLocaleString(),
    description: 'Payment intent created via API'
  },
  ...(payment.paid_at ?
  [
  {
    status: 'success',
    time: new Date(payment.paid_at).toLocaleString(),
    description: 'Payment confirmed by provider'
  }] :

  [])];

  return (
    <div>
      <button
        onClick={() => navigate('/dashboard/payments')}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors">
        
        <ArrowLeft className="w-4 h-4" />
        Back to Payments
      </button>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold text-slate-900">
              {payment.currency} {payment.amount.toLocaleString()}
            </h1>
            <StatusBadge status={payment.status} />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 font-mono">
            {payment.id}
            <button className="hover:text-slate-900">
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Refund</Button>
          <Button variant="outline">Send Receipt</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
              <h3 className="font-semibold text-slate-900">Payment Details</h3>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-sm text-slate-500 mb-1">Reference</p>
                <p className="font-medium text-slate-900">
                  {payment.reference}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Payment Method</p>
                <p className="font-medium text-slate-900">
                  {payment.method || '—'}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Gross Amount</p>
                <p className="font-medium text-slate-900">
                  {payment.currency} {payment.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">PeterPay Fee</p>
                <p className="font-medium text-slate-900 text-rose-600">
                  - {payment.currency} {payment.fee.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Net Amount</p>
                <p className="font-medium text-emerald-600">
                  {payment.currency} {payment.net_amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Date</p>
                <p className="font-medium text-slate-900">
                  {new Date(payment.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
              <h3 className="font-semibold text-slate-900">Customer</h3>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-sm text-slate-500 mb-1">Name</p>
                <p className="font-medium text-slate-900">
                  {payment.customer.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Email</p>
                <p className="font-medium text-brand-primary hover:underline cursor-pointer">
                  {payment.customer.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Phone</p>
                <p className="font-medium text-slate-900">
                  {payment.customer.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-semibold text-slate-900">Metadata</h3>
            </div>
            <div className="p-6 bg-slate-900 text-slate-300 font-mono text-sm overflow-x-auto rounded-b-xl">
              <pre>{JSON.stringify(payment.metadata || {}, null, 2)}</pre>
            </div>
          </div>
        </div>

        {/* Right Column: Timeline */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
              <h3 className="font-semibold text-slate-900">Timeline</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                {timeline.map((event, i) =>
                <div
                  key={i}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      {event.status === 'success' ?
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" /> :
                    event.status === 'webhook_sent' ?
                    <ExternalLink className="w-4 h-4 text-brand-primary" /> :

                    <Clock className="w-4 h-4" />
                    }
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-slate-900 text-sm capitalize">
                          {event.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-2">
                        {event.time}
                      </p>
                      <p className="text-sm text-slate-600">
                        {event.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}