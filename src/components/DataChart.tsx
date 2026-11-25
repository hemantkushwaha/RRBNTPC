import { ChartVisualSpec } from '../data/types';

interface DataChartProps {
  chart: ChartVisualSpec;
}

export function DataChart({ chart }: DataChartProps) {
  if (chart.type === 'grouped-bar' && chart.labels && chart.series) {
    const maxVal = Math.max(...chart.series.flatMap((s) => s.values), 10);
    const yMax = Math.ceil(maxVal / 20) * 20;
    const width = 460;
    const height = 220;
    const pad = { top: 20, right: 20, bottom: 36, left: 42 };
    const plotW = width - pad.left - pad.right;
    const plotH = height - pad.top - pad.bottom;
    const groupW = plotW / chart.labels.length;
    const barW = Math.min(24, (groupW - 14) / chart.series.length);

    return (
      <div className="border border-slate-200 rounded-lg bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold text-slate-800">{chart.title}</span>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            {chart.series.map((s) => (
              <span key={s.name} className="inline-flex items-center gap-1.5">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-xs"
                  style={{ backgroundColor: s.color }}
                />
                {s.name}
              </span>
            ))}
          </div>
        </div>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-60">
          {[0, 0.25, 0.5, 0.75, 1].map((t) => {
            const y = pad.top + plotH * (1 - t);
            const val = Math.round(yMax * t);
            return (
              <g key={t}>
                <line
                  x1={pad.left}
                  y1={y}
                  x2={width - pad.right}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeWidth="1"
                />
                <text
                  x={pad.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-slate-500 text-[10px] font-mono"
                >
                  {val}
                </text>
              </g>
            );
          })}
          {chart.labels.map((label, i) => {
            const centerX = pad.left + i * groupW + groupW / 2;
            const totalBarsW = chart.series!.length * barW + (chart.series!.length - 1) * 4;
            const startX = centerX - totalBarsW / 2;
            return (
              <g key={label}>
                {chart.series!.map((s, sIdx) => {
                  const v = s.values[i];
                  const bh = (v / yMax) * plotH;
                  const x = startX + sIdx * (barW + 4);
                  const y = pad.top + plotH - bh;
                  return (
                    <g key={s.name}>
                      <rect
                        x={x}
                        y={y}
                        width={barW}
                        height={bh}
                        rx={2}
                        fill={s.color}
                      />
                      <text
                        x={x + barW / 2}
                        y={y - 4}
                        textAnchor="middle"
                        className="fill-slate-700 text-[9px] font-mono font-medium"
                      >
                        {v}
                      </text>
                    </g>
                  );
                })}
                <text
                  x={centerX}
                  y={height - 12}
                  textAnchor="middle"
                  className="fill-slate-600 text-[11px] font-medium"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  if (chart.type === 'pie' && chart.pieSlices) {
    const total = chart.pieSlices.reduce((acc, s) => acc + s.value, 0);
    let cumulative = 0;
    const cx = 105;
    const cy = 105;
    const r = 82;

    return (
      <div className="border border-slate-200 rounded-lg bg-white p-4">
        <div className="text-xs font-semibold text-slate-800 mb-3">{chart.title}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <svg viewBox="0 0 210 210" className="w-44 h-44 mx-auto">
            {chart.pieSlices.map((slice) => {
              const startAngle = (cumulative / total) * Math.PI * 2 - Math.PI / 2;
              cumulative += slice.value;
              const endAngle = (cumulative / total) * Math.PI * 2 - Math.PI / 2;
              const largeArc = slice.value / total > 0.5 ? 1 : 0;
              const x1 = cx + r * Math.cos(startAngle);
              const y1 = cy + r * Math.sin(startAngle);
              const x2 = cx + r * Math.cos(endAngle);
              const y2 = cy + r * Math.sin(endAngle);
              const midAngle = (startAngle + endAngle) / 2;
              const lx = cx + r * 0.62 * Math.cos(midAngle);
              const ly = cy + r * 0.62 * Math.sin(midAngle);
              const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
              return (
                <g key={slice.label}>
                  <path d={pathData} fill={slice.color} stroke="#FFFFFF" strokeWidth="1.5" />
                  <text
                    x={lx}
                    y={ly + 4}
                    textAnchor="middle"
                    className="fill-white text-[10px] font-mono font-semibold"
                  >
                    {slice.value}%
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="space-y-2">
            {chart.pieSlices.map((slice) => (
              <div
                key={slice.label}
                className="flex items-center justify-between text-xs text-slate-700"
              >
                <span className="inline-flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-xs shrink-0"
                    style={{ backgroundColor: slice.color }}
                  />
                  <span>{slice.label}</span>
                </span>
                <span className="font-mono tabular-nums font-semibold text-slate-900">
                  {slice.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (chart.type === 'line' && chart.labels && chart.series && chart.series[0]) {
    const s = chart.series[0];
    const minVal = 75;
    const maxVal = 95;
    const width = 460;
    const height = 210;
    const pad = { top: 22, right: 24, bottom: 34, left: 42 };
    const plotW = width - pad.left - pad.right;
    const plotH = height - pad.top - pad.bottom;

    const points = s.values.map((v, idx) => {
      const x = pad.left + (idx / (s.values.length - 1)) * plotW;
      const y = pad.top + ((maxVal - v) / (maxVal - minVal)) * plotH;
      return { x, y, v, label: chart.labels![idx] };
    });

    const polyline = points.map((p) => `${p.x},${p.y}`).join(' ');

    return (
      <div className="border border-slate-200 rounded-lg bg-white p-4">
        <div className="text-xs font-semibold text-slate-800 mb-3">{chart.title}</div>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-56">
          {[75, 80, 85, 90, 95].map((tick) => {
            const y = pad.top + ((maxVal - tick) / (maxVal - minVal)) * plotH;
            return (
              <g key={tick}>
                <line
                  x1={pad.left}
                  y1={y}
                  x2={width - pad.right}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeWidth="1"
                />
                <text
                  x={pad.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-slate-500 text-[10px] font-mono"
                >
                  {tick}%
                </text>
              </g>
            );
          })}
          <polyline
            fill="none"
            stroke={s.color}
            strokeWidth="2.5"
            points={polyline}
          />
          {points.map((p) => (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r="4" fill="#FFFFFF" stroke={s.color} strokeWidth="2.5" />
              <text
                x={p.x}
                y={p.y - 9}
                textAnchor="middle"
                className="fill-slate-800 text-[10px] font-mono font-semibold"
              >
                {p.v}%
              </text>
              <text
                x={p.x}
                y={height - 10}
                textAnchor="middle"
                className="fill-slate-600 text-[11px] font-medium"
              >
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (chart.type === 'venn' && chart.vennData) {
    const d = chart.vennData;
    return (
      <div className="border border-slate-200 rounded-lg bg-white p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold text-slate-800">{chart.title}</span>
          <span className="text-xs text-slate-500 font-mono tabular-nums">
            N = {d.total} (Outside = 0)
          </span>
        </div>
        <svg viewBox="0 0 360 245" className="w-full max-w-sm mx-auto h-auto">
          <circle cx="145" cy="100" r="68" fill="#1D4ED8" fillOpacity="0.10" stroke="#1D4ED8" strokeWidth="1.5" />
          <circle cx="215" cy="100" r="68" fill="#0284C7" fillOpacity="0.10" stroke="#0284C7" strokeWidth="1.5" />
          <circle cx="180" cy="158" r="68" fill="#0D9488" fillOpacity="0.10" stroke="#0D9488" strokeWidth="1.5" />

          <text x="86" y="30" className="fill-blue-800 text-[11px] font-semibold">
            {d.setA}
          </text>
          <text x="274" y="30" textAnchor="end" className="fill-sky-800 text-[11px] font-semibold">
            {d.setB}
          </text>
          <text x="180" y="238" textAnchor="middle" className="fill-teal-800 text-[11px] font-semibold">
            {d.setC}
          </text>

          {/* Regions shown as '?' placeholders so the student solves them during CBT */}
          <text x="115" y="92" textAnchor="middle" className="fill-slate-700 text-[11px] font-mono">
            Only A
          </text>
          <text x="245" y="92" textAnchor="middle" className="fill-slate-700 text-[11px] font-mono">
            Only B
          </text>
          <text x="180" y="192" textAnchor="middle" className="fill-slate-700 text-[11px] font-mono">
            Only C
          </text>
          <text x="180" y="78" textAnchor="middle" className="fill-slate-600 text-[10px] font-mono">
            A∩B
          </text>
          <text x="143" y="142" textAnchor="middle" className="fill-slate-600 text-[10px] font-mono">
            A∩C
          </text>
          <text x="217" y="142" textAnchor="middle" className="fill-slate-600 text-[10px] font-mono">
            B∩C
          </text>
          <text x="180" y="122" textAnchor="middle" className="fill-slate-900 text-[12px] font-mono font-semibold">
            x
          </text>
        </svg>
      </div>
    );
  }

  if (chart.type === 'scatter' && chart.scatterPoints) {
    const width = 460;
    const height = 210;
    const pad = { top: 20, right: 24, bottom: 36, left: 48 };
    const plotW = width - pad.left - pad.right;
    const plotH = height - pad.top - pad.bottom;
    const xMax = 120;
    const yMax = 350;

    return (
      <div className="border border-slate-200 rounded-lg bg-white p-4">
        <div className="text-xs font-semibold text-slate-800 mb-3">{chart.title}</div>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-56">
          {[0, 100, 200, 300].map((yt) => {
            const y = pad.top + ((yMax - yt) / yMax) * plotH;
            return (
              <g key={yt}>
                <line x1={pad.left} y1={y} x2={width - pad.right} y2={y} stroke="#E2E8F0" strokeWidth="1" />
                <text x={pad.left - 8} y={y + 4} textAnchor="end" className="fill-slate-500 text-[10px] font-mono">
                  {yt}
                </text>
              </g>
            );
          })}
          {[20, 40, 60, 80, 100, 120].map((xt) => {
            const x = pad.left + (xt / xMax) * plotW;
            return (
              <g key={xt}>
                <line x1={x} y1={pad.top} x2={x} y2={pad.top + plotH} stroke="#F1F5F9" strokeWidth="1" />
                <text x={x} y={height - 12} textAnchor="middle" className="fill-slate-600 text-[10px] font-mono">
                  {xt}
                </text>
              </g>
            );
          })}
          {chart.scatterPoints.map((pt) => {
            const x = pad.left + (pt.x / xMax) * plotW;
            const y = pad.top + ((yMax - pt.y) / yMax) * plotH;
            return (
              <g key={`${pt.x}-${pt.y}`}>
                <circle cx={x} cy={y} r="4.5" fill="#1D4ED8" />
                <text x={x} y={y - 8} textAnchor="middle" className="fill-slate-700 text-[9px] font-mono">
                  ({pt.x},{pt.y})
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  if (chart.type === 'histogram' && chart.labels && chart.series && chart.series[0]) {
    const s = chart.series[0];
    const yMax = 24;
    const width = 460;
    const height = 210;
    const pad = { top: 20, right: 20, bottom: 34, left: 40 };
    const plotW = width - pad.left - pad.right;
    const plotH = height - pad.top - pad.bottom;
    const colW = plotW / chart.labels.length;

    return (
      <div className="border border-slate-200 rounded-lg bg-white p-4">
        <div className="text-xs font-semibold text-slate-800 mb-3">{chart.title}</div>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-56">
          {[0, 6, 12, 18, 24].map((yt) => {
            const y = pad.top + ((yMax - yt) / yMax) * plotH;
            return (
              <g key={yt}>
                <line x1={pad.left} y1={y} x2={width - pad.right} y2={y} stroke="#E2E8F0" strokeWidth="1" />
                <text x={pad.left - 8} y={y + 4} textAnchor="end" className="fill-slate-500 text-[10px] font-mono">
                  {yt}
                </text>
              </g>
            );
          })}
          {chart.labels.map((label, idx) => {
            const v = s.values[idx];
            const bh = (v / yMax) * plotH;
            const x = pad.left + idx * colW;
            const y = pad.top + plotH - bh;
            return (
              <g key={label}>
                <rect
                  x={x + 2}
                  y={y}
                  width={colW - 4}
                  height={bh}
                  fill={s.color}
                  fillOpacity="0.88"
                />
                <text
                  x={x + colW / 2}
                  y={y - 5}
                  textAnchor="middle"
                  className="fill-slate-800 text-[10px] font-mono font-semibold"
                >
                  {v}
                </text>
                <text
                  x={x + colW / 2}
                  y={height - 10}
                  textAnchor="middle"
                  className="fill-slate-600 text-[10px] font-mono"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  return null;
}
