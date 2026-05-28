import React from 'react';
import { AlertCircle, Inbox, Loader2 } from 'lucide-react';
import type { ApiRequestError } from '../../lib/apiClient';
// ---------- Loading Spinner ----------
export function Spinner({
  size = 'md',
  className = ''



}: {size?: 'sm' | 'md' | 'lg';className?: string;}) {
  const sizeClass =
  size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-5 h-5';
  return (
    <Loader2
      className={`${sizeClass} animate-spin text-slate-400 ${className}`} />);


}
// ---------- Full-section loading ----------
export function LoadingState({ label = 'Loading…' }: {label?: string;}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-500">
      <Spinner size="lg" />
      <p className="mt-3 text-sm">{label}</p>
    </div>);

}
// ---------- Skeleton row (for tables) ----------
export function SkeletonRows({
  rows = 5,
  cols = 4



}: {rows?: number;cols?: number;}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="divide-y divide-slate-100">
        {Array.from({
          length: rows
        }).map((_, r) =>
        <div key={r} className="px-6 py-4 flex gap-6 animate-pulse">
            {Array.from({
            length: cols
          }).map((_, c) =>
          <div
            key={c}
            className={`h-4 bg-slate-100 rounded ${c === 0 ? 'w-32' : c === cols - 1 ? 'w-20' : 'flex-1'}`} />

          )}
          </div>
        )}
      </div>
    </div>);

}
// ---------- Skeleton card grid (for KPIs) ----------
export function SkeletonCards({ count = 4 }: {count?: number;}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({
        length: count
      }).map((_, i) =>
      <div
        key={i}
        className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-pulse">
        
          <div className="h-4 bg-slate-100 rounded w-24 mb-4" />
          <div className="h-8 bg-slate-100 rounded w-32" />
        </div>
      )}
    </div>);

}
// ---------- Error state ----------
export function ErrorState({
  error,
  onRetry,
  className = ''




}: {error: ApiRequestError | null | string;onRetry?: () => void;className?: string;}) {
  const message =
  typeof error === 'string' ?
  error :
  error?.message || 'Something went wrong.';
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 text-center ${className}`}>
      
      <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-1">
        Could not load data
      </h3>
      <p className="text-sm text-slate-500 max-w-md mb-4">{message}</p>
      {onRetry &&
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
        
          Try again
        </button>
      }
    </div>);

}
// ---------- Empty state ----------
export function EmptyState({
  title,
  description,
  action,
  icon





}: {title: string;description?: string;action?: React.ReactNode;icon?: React.ReactNode;}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
        {icon || <Inbox className="w-6 h-6" />}
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-1">{title}</h3>
      {description &&
      <p className="text-sm text-slate-500 max-w-md mb-4">{description}</p>
      }
      {action}
    </div>);

}