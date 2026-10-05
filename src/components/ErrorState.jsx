import { AlertCircle, RefreshCw } from 'lucide-react'
import Button from './Button.jsx'

const sizes = {
  sm: 'px-5 py-8',
  md: 'px-6 py-12',
  lg: 'px-6 py-16'
}

// Error state component for displaying errors with retry option
export function ErrorState({
  icon: Icon = AlertCircle,
  title = 'Something went wrong',
  message = 'An error occurred while loading this content.',
  action,
  actionLabel = 'Try again',
  onRetry,
  size = 'md',
  className = ''
}) {
  return (
    <div className={`border border-clay/30 bg-clay-soft text-center ${sizes[size] || sizes.md} ${className}`.trim()}>
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-clay/10 text-clay" aria-hidden="true">
        <Icon size={24} />
      </span>
      <p className={`font-serif text-[19px] leading-snug text-clay-deep mt-4`}>{title}</p>
      <p className="text-[13.5px] leading-relaxed text-clay mt-2">{message}</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {action}
        {onRetry && (
          <Button variant="outline" size="sm" icon={RefreshCw} onClick={onRetry}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

export default ErrorState
