// Single source of truth for the thin editorial progress rule used across the project.
const tones = {
  pine: 'bg-pine',
  clay: 'bg-clay',
  sage: 'bg-sage',
  ink: 'bg-ink',
}

const trackTones = {
  cream: 'bg-cream',
  paper: 'bg-paper',
  line: 'bg-line',
}

export function ProgressBar({ value = 0, tone = 'pine', track = 'cream', thickness = 3, label, animate = true, className = '' }) {
  const pct = Math.max(0, Math.min(100, Number(value) || 0))
  return (
    <div className={className}>
      <div
        className={`w-full ${trackTones[track] || trackTones.cream}`}
        style={{ height: `${thickness}px` }}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={`h-full ${tones[tone] || tones.pine} transition-all duration-500 ease-out ${animate ? 'animate-progress' : ''}`} style={{ width: `${pct}%` }} />
      </div>
      {label != null && <p className="mt-1.5 text-[11.5px] text-ink-faint">{label}</p>}
    </div>
  )
}

export default ProgressBar
