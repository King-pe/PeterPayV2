import React, { useState } from 'react';
import {
  Check,
  Copy,
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle2 } from
'lucide-react';
export function Callout({
  type = 'info',
  title,
  children




}: {type?: 'info' | 'warning' | 'danger' | 'success';title?: string;children: React.ReactNode;}) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    danger: 'bg-red-50 border-red-200 text-red-900',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900'
  };
  const icons = {
    info: <Info className="w-5 h-5 text-blue-600 mt-0.5" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />,
    danger: <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
  };
  return (
    <div className={`flex gap-3 p-4 my-6 border rounded-lg ${styles[type]}`}>
      <div className="shrink-0">{icons[type]}</div>
      <div>
        {title && <h5 className="font-semibold mb-1">{title}</h5>}
        <div className="text-sm leading-relaxed opacity-90">{children}</div>
      </div>
    </div>);

}
export function Endpoint({
  method,
  path



}: {method: 'GET' | 'POST' | 'PUT' | 'DELETE';path: string;}) {
  const colors = {
    GET: 'bg-blue-100 text-blue-700',
    POST: 'bg-emerald-100 text-emerald-700',
    PUT: 'bg-amber-100 text-amber-700',
    DELETE: 'bg-red-100 text-red-700'
  };
  return (
    <div className="flex items-center gap-3 p-3 my-6 bg-slate-50 border border-slate-200 rounded-lg font-mono text-sm">
      <span className={`px-2 py-0.5 rounded font-bold ${colors[method]}`}>
        {method}
      </span>
      <span className="text-slate-700">{path}</span>
    </div>);

}
export function ParamTable({
  params







}: {params: {name: string;type: string;required?: boolean;description: React.ReactNode;}[];}) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="py-3 font-semibold text-slate-900">Parameter</th>
            <th className="py-3 font-semibold text-slate-900">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {params.map((p, i) =>
          <tr key={i}>
              <td className="py-4 align-top pr-4 w-1/3">
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-indigo-600 font-semibold bg-indigo-50 px-1.5 py-0.5 rounded">
                    {p.name}
                  </code>
                  {p.required &&
                <span className="text-[10px] uppercase tracking-wider font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                      Required
                    </span>
                }
                </div>
                <div className="text-slate-500 font-mono text-xs">{p.type}</div>
              </td>
              <td className="py-4 align-top text-slate-600 leading-relaxed">
                {p.description}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>);

}
export function CodeTabs({
  tabs






}: {tabs: {name: string;language: string;code: string;}[];}) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(tabs[active].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="my-6 rounded-xl overflow-hidden bg-[#0d1117] border border-slate-800">
      <div className="flex items-center justify-between px-4 bg-[#161b22] border-b border-slate-800">
        <div className="flex gap-1">
          {tabs.map((tab, i) =>
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${active === i ? 'border-blue-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
            
              {tab.name}
            </button>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-800">
          
          {copied ?
          <Check className="w-4 h-4 text-emerald-500" /> :

          <Copy className="w-4 h-4" />
          }
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-slate-300 leading-relaxed">
          <code>{tabs[active].code}</code>
        </pre>
      </div>
    </div>);

}
export function DocSection({
  id,
  title,
  children




}: {id: string;title: string;children: React.ReactNode;}) {
  return (
    <section id={id} className="scroll-mt-24 mb-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
        {title}
      </h2>
      <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
        {children}
      </div>
    </section>);

}