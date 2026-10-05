// Status → tone map. Kept in one place so cards never re-invent status colours.
export const statusTones = {
  Submitted: 'pine',
  Graded: 'pine',
  Published: 'pine',
  Live: 'pine',
  Active: 'pine',
  Completed: 'pine',
  Done: 'pine',
  'On track': 'pine',
  'In progress': 'clay',
  'At risk': 'clay',
  Pending: 'clay',
  Review: 'clay',
  'Not started': 'neutral',
  Draft: 'neutral',
  Invited: 'neutral',
  Ungraded: 'neutral',
  Archived: 'outline',
}

export function badgeToneForStatus(status, fallback = 'neutral') {
  return statusTones[status] || fallback
}

const tones = {
  pine: 'bg-pine-soft text-pine',
  clay: 'bg-clay-soft text-clay-deep',
  neutral: 'bg-cream text-ink-soft',
  sage: 'bg-paper text-pine border border-sage/60',
  outline: 'border border-line text-ink-soft',
  ink: 'bg-ink text-paper',
}

const sizes = {
  sm: 'px-2 py-0.5 text-[11.5px]',
  md: 'px-2.5 py-1 text-[12.5px]',
  lg: 'px-3 py-1.5 text-[13px]',
}

export function Badge({ children, tone = 'neutral', size = 'sm', status, className = '' }) {
  const resolved = status != null ? badgeToneForStatus(status) : tone
  return (
    <span className={`inline-flex w-fit items-center gap-1.5 font-medium ${sizes[size] || sizes.sm} ${tones[resolved] || tones.neutral} ${className}`}>
      {children ?? status}
    </span>
  )
}

export default Badge
