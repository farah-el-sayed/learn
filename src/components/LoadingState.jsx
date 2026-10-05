const rowSizes = { sm: 'h-2.5', md: 'h-3' }

// Inline "thinking" line (chat replies, searches) and skeleton rows for lists.
export function LoadingState({ variant = 'inline', label = 'Loading…', rows = 3, size = 'md', className = '' }) {
  if (variant === 'rows') {
    return (
      <div className={`border border-line bg-white p-6 ${className}`.trim()} role="status" aria-label={label}>
        <div className="space-y-3">
          {Array.from({ length: rows }).map((_, i) => (
            <div
              key={i}
              className={`animate-pulse bg-cream ${rowSizes[size] || rowSizes.md}`}
              style={{ width: `${100 - i * 8}%` }}
            />
          ))}
        </div>
        <span className="sr-only">{label}</span>
      </div>
    )
  }
  return (
    <p className={`flex items-center gap-2 text-[12.5px] text-ink-faint ${className}`.trim()} role="status">
      <span className="h-1.5 w-1.5 animate-pulse bg-sage" aria-hidden="true" />
      {label}
    </p>
  )
}

export default LoadingState
