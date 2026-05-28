import React from 'react';
type Status =
'success' |
'pending' |
'failed' |
'refunded' |
'processing' |
'active' |
'inactive';
interface StatusBadgeProps {
  status: Status | string;
}
export function StatusBadge({ status }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();
  let bg = 'bg-slate-100';
  let text = 'text-slate-700';
  let dot = 'bg-slate-400';
  switch (normalizedStatus) {
    case 'success':
    case 'active':
    case 'paid':
      bg = 'bg-emerald-50';
      text = 'text-emerald-700';
      dot = 'bg-emerald-500';
      break;
    case 'pending':
    case 'processing':
      bg = 'bg-amber-50';
      text = 'text-amber-700';
      dot = 'bg-amber-500';
      break;
    case 'failed':
    case 'inactive':
    case 'expired':
      bg = 'bg-rose-50';
      text = 'text-rose-700';
      dot = 'bg-rose-500';
      break;
    case 'refunded':
      bg = 'bg-slate-100';
      text = 'text-slate-700';
      dot = 'bg-slate-500';
      break;
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${bg} ${text}`}>
      
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      <span className="capitalize">{status}</span>
    </span>);

}