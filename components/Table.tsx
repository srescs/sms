import type { ReactNode } from 'react';

type Column<T> = {
  header: string;
  accessor: keyof T | string;
  render?: (item: T) => ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
};

export default function Table<T extends Record<string, any>>({ data, columns }: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm text-slate-800">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.12em] text-slate-500">
          <tr>
            {columns.map((column) => (
              <th key={String(column.accessor)} className="px-4 py-3">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-slate-50">
              {columns.map((column) => (
                <td key={`${rowIndex}-${String(column.accessor)}`} className="px-4 py-4 align-top">
                  {column.render ? column.render(row) : String((row as any)[column.accessor as string] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
