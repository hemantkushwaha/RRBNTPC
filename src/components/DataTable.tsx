import { DataTableBlock } from '../data/types';

interface DataTableProps {
  table: DataTableBlock;
  compact?: boolean;
}

export function DataTable({ table, compact = false }: DataTableProps) {
  return (
    <div className="border border-slate-200 rounded-lg bg-white overflow-hidden">
      <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4">
        <span className="text-xs font-semibold text-slate-800">
          {table.title}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/60">
              {table.headers.map((header, idx) => (
                <th
                  key={header}
                  className={`${
                    compact ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-xs'
                  } font-semibold text-slate-700 whitespace-nowrap ${
                    idx > 0 ? 'text-right' : 'text-left'
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {table.rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className={`${
                      compact ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-sm'
                    } whitespace-nowrap ${
                      cIdx === 0
                        ? 'font-medium text-slate-900 text-left'
                        : 'font-mono tabular-nums text-slate-700 text-right'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note && (
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 text-xs text-slate-600">
          {table.note}
        </div>
      )}
    </div>
  );
}
