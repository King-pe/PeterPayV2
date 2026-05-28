import React from 'react';
import { BoxIcon } from 'lucide-react';
interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
  icon: BoxIcon;
}
export function StatCard({ title, value, change, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className="p-2 bg-slate-50 rounded-lg">
          <Icon className="w-5 h-5 text-brand-primary" />
        </div>
      </div>
      <div className="flex items-baseline gap-3">
        <p className="text-2xl font-semibold text-slate-900">{value}</p>
        {change &&
        <span
          className={`text-sm font-medium ${change.trend === 'up' ? 'text-emerald-600' : change.trend === 'down' ? 'text-rose-600' : 'text-slate-500'}`}>
          
            {change.trend === 'up' ? '+' : change.trend === 'down' ? '-' : ''}
            {change.value}
          </span>
        }
      </div>
    </div>);

}