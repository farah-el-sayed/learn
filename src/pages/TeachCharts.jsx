export function Bars({ data, color }) {
  const max = Math.max(...data)
  return (
    <div className="flex h-32 items-end gap-1.5">
      {data.map((v, i) => (
        <div key={i} className={`flex-1 ${color}`} style={{ height: `${Math.max(6, (v / max) * 100)}%`, opacity: 0.4 + (i / data.length) * 0.6 }} />
      ))}
    </div>
  )
}
export function Line({ data }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${28 - ((v - min) / Math.max(1, max - min)) * 24}`).join(' ')
  return (
    <svg viewBox="0 0 100 32" className="h-28 w-full" preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke="#294A3A" strokeWidth="1.5" />
      {data.map((v, i) => (
        <circle key={i} cx={(i / (data.length - 1)) * 100} cy={28 - ((v - min) / Math.max(1, max - min)) * 24} r="1.2" fill="#294A3A" />
      ))}
    </svg>
  )
}
export function ChartCard({ title, sub, children, link }) {
  return (
    <div className="border border-line bg-white p-6">
      <div className="flex items-baseline justify-between gap-4">
        <div><p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-faint">{title}</p><p className="mt-1 font-serif text-[24px]">{sub}</p></div>
        {link}
      </div>
      <div className="mt-5">{children}</div>
    </div>
  )
}
