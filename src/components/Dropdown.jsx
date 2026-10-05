import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import useDismiss from '../hooks/useDismiss.js'

// Reusable menu: a trigger plus a floating panel. Handles outside-click and Escape.
// `trigger` may be a node or a function ({ open, toggle }) => node.
export function Dropdown({
  trigger,
  items = [],
  label = 'Menu',
  align = 'right',
  width = 'w-64',
  buttonClassName = 'flex items-center gap-2 border border-line bg-white px-3 py-2 text-[13px] text-ink-muted hover:text-ink',
  menuClassName = '',
  header,
  footer,
  onSelect,
  className = '',
}) {
  const [open, setOpen] = useState(false)
  const ref = useDismiss({ open, onClose: () => setOpen(false), outside: true })
  const close = () => setOpen(false)

  const button = typeof trigger === 'function'
    ? trigger({ open, toggle: () => setOpen(o => !o), close })
    : trigger || (
      <button type="button" onClick={() => setOpen(o => !o)} className={buttonClassName} aria-haspopup="menu" aria-expanded={open}>
        {label}
        <ChevronDown size={14} className={open ? 'rotate-180 transition' : 'transition'} />
      </button>
    )

  return (
    <div ref={ref} className={`relative ${className}`.trim()}>
      {button}
      {open && (
        <div
          role="menu"
          className={`absolute ${align === 'left' ? 'left-0' : 'right-0'} z-50 mt-1.5 border border-line bg-white shadow-subtle ${width} ${menuClassName} dropdown-enter`.trim()}
        >
          {header && <div className="border-b border-line px-4 py-2.5">{header}</div>}
          {items.map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.id ?? item.label}
                type="button"
                role="menuitem"
                onClick={() => {
                  close()
                  item.onClick?.(item)
                  onSelect?.(item)
                }}
                className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[13.5px] transition ${item.active ? 'bg-paper font-medium text-ink' : 'text-ink-soft hover:bg-paper hover:text-ink'}`}
              >
                {Icon && <Icon size={15} className="shrink-0 text-ink-faint" />}
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                {item.meta && <span className="shrink-0 text-[11.5px] text-ink-faint">{item.meta}</span>}
                {item.active && <Check size={14} className="shrink-0 text-pine" />}
              </button>
            )
          })}
          {footer && <div className="border-t border-line px-4 py-2.5">{footer}</div>}
        </div>
      )}
    </div>
  )
}

export default Dropdown
