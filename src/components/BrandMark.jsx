import { BookOpenCheck } from 'lucide-react'

const dimensions = {
  sm: { box: 'h-7 w-7', icon: 15 },
  md: { box: 'h-8 w-8', icon: 17 },
  lg: { box: 'h-12 w-12', icon: 25 },
}

export default function BrandMark({ size = 'md', className = '' }) {
  const dimension = dimensions[size] || dimensions.md

  return (
    <span className={`inline-flex shrink-0 items-center justify-center bg-pine text-paper ${dimension.box} ${className}`.trim()} aria-hidden="true">
      <BookOpenCheck size={dimension.icon} strokeWidth={1.75} />
    </span>
  )
}