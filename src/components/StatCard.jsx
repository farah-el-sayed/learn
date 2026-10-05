import { ProgressBar } from './ProgressBar.jsx'

// "Label over a big serif number" tiles, in the three flavours the project already used:
// divided (workspace rows), plain (spaced columns), boxed (bordered meta grid), ruled (stacked).
const gridCols = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' }
const plainCols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4' }

function normalise(item) {
  if (Array.isArray(item)) return { label: item[0], value: item[1] }
  return item || {}
}

export function StatCard({
  items,
  label,
  value,
  hint,
  icon,
  progress,
  cols = 4,
  variant = 'divided',
  valueClassName,
  itemClassName = '',
  className = '',
}) {
  const list = (Array.isArray(items) ? items : [{ label, value, hint, icon, progress }]).map(normalise)

  const tile = (stat, i) => {
    const Icon = stat.icon
    const val = (
      <span className={`${valueClassName || ''}`.trim()}>
        {Icon && <Icon size={15} className="mr-1.5 inline-block align-middle" />}
        {stat.value}
      </span>
    )

    if (variant === 'boxed') {
      return (
        <div
          key={stat.label}
          className={`px-5 py-4 ${i % 2 === 1 ? 'border-l border-line' : ''} ${i > 1 ? 'border-t border-line' : ''} ${itemClassName}`.trim()}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-faint">{stat.label}</p>
          <p className={`mt-1.5 flex items-center gap-1.5 font-serif text-[20px] ${itemClassName}`.trim()}>{val}</p>
        </div>
      )
    }

    if (variant === 'plain' || variant === 'ruled') {
      return (
        <div key={stat.label} className={`${variant === 'ruled' ? 'border-t border-ink/20 pt-4' : ''} ${itemClassName}`.trim()}>
          <p className={`${variant === 'ruled' ? 'text-[11.5px] uppercase tracking-widest' : 'text-[12px] uppercase tracking-widest'} text-ink-faint`}>
            {stat.label}
          </p>
          <p className={`mt-1 font-serif ${valueClassName || 'text-[32px]'}`.trim()}>{val}</p>
        </div>
      )
    }

    return (
      <div
        key={stat.label}
        className={`px-6 py-6 ${i > 0 ? 'md:border-l md:border-line' : ''} ${i % 2 === 1 ? 'border-l border-line md:border-l' : ''} ${i > 1 ? 'border-t border-line md:border-t-0' : ''} ${itemClassName}`.trim()}
      >
        <p className="text-[11.5px] font-medium uppercase tracking-[0.12em] text-ink-faint">{stat.label}</p>
        <p className={`mt-2 font-serif ${valueClassName || 'text-[32px] leading-none'}`.trim()}>{val}</p>
        {stat.hint && <p className="mt-2 text-[12px] text-ink-muted">{stat.hint}</p>}
        {stat.progress != null && <ProgressBar value={stat.progress} className="mt-3" />}
      </div>
    )
  }

  if (variant === 'boxed') {
    return <dl className={`grid grid-cols-2 border border-line bg-white ${className}`.trim()}>{list.map(tile)}</dl>
  }
  if (variant === 'plain') {
    return (
      <dl className={`grid gap-8 border-y border-line py-8 ${plainCols[cols] || plainCols[4]} ${className}`.trim()}>
        {list.map(tile)}
      </dl>
    )
  }
  if (variant === 'ruled') {
    return <dl className={`grid content-start gap-6 ${className}`.trim()}>{list.map(tile)}</dl>
  }  if (variant === 'centered') {
    return (
      <dl className={`grid gap-px border border-line bg-line sm:grid-cols-4 ${className}`.trim()}>
        {list.map(stat => (
          <div key={stat.label} className="bg-paper px-6 py-8 text-center">
            <p className={`font-serif ${valueClassName || 'text-[34px]'}`.trim()}>{stat.value}</p>
            <p className="mt-1 text-[12px] uppercase tracking-widest text-ink-faint">{stat.label}</p>
          </div>
        ))}
      </dl>
    )
  }
  return (
    <dl className={`grid grid-cols-2 border-y border-line ${gridCols[cols] || gridCols[4]} ${className}`.trim()}>{list.map(tile)}</dl>
  )
}

export default StatCard
