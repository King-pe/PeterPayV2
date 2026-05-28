import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string;
  onRowClick?: (row: T) => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
  };
}
export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  pagination
}: DataTableProps<T>) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
            <tr>
              {columns.map((col, i) =>
              <th
                key={i}
                className={`px-6 py-3 font-medium ${col.className || ''}`}>
                
                  {col.header}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row) =>
            <tr
              key={keyExtractor(row)}
              onClick={() => onRowClick?.(row)}
              className={`group transition-colors ${onRowClick ? 'cursor-pointer hover:bg-slate-50' : ''}`}>
              
                {columns.map((col, i) =>
              <td
                key={i}
                className={`px-6 py-4 text-slate-700 ${col.className || ''}`}>
                
                    {typeof col.accessor === 'function' ?
                col.accessor(row) :
                row[col.accessor] as React.ReactNode}
                  </td>
              )}
              </tr>
            )}
            {data.length === 0 &&
            <tr>
                <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-slate-500">
                
                  No data available
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      {pagination &&
      <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
          <span className="text-sm text-slate-500">
            Showing page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <div className="flex gap-2">
            <button
            disabled={pagination.currentPage === 1}
            className="p-1.5 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
            
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
            disabled={pagination.currentPage === pagination.totalPages}
            className="p-1.5 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
            
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      }
    </div>);

}