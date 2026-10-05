import { useState } from 'react'
import { Moon, SlidersHorizontal, Sun } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import useDismiss from '../hooks/useDismiss.js'
import LanguageToggle from './LanguageToggle.jsx'

const themes = [
  { id: 'light', label: 'Light', Icon: Sun },
  { id: 'dark', label: 'Dark', Icon: Moon },
]

// Language and theme used to sit side by side in the top bar, where they took up
// as much room as the primary links. They share one quiet control now: a single
// preferences panel, so the bar keeps its rhythm and the page keeps its calm.
export function SettingsMenu({ className = '' }) {
  const { theme, setTheme } = useApp()
  const [open, setOpen] = useState(false)
  const ref = useDismiss({ open, onClose: () => setOpen(false), outside: true })

  return (
    <div ref={ref} className={`relative ${className}`.trim()}>
      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        className={`border border-line p-2 transition ${open ? 'text-ink' : 'text-ink-muted hover:text-ink'}`}
        aria-label="Display settings"
        aria-haspopup="true"
        aria-expanded={open}
        title="Display settings"
      >
        <SlidersHorizontal size={16} aria-hidden="true" />
      </button>

      {open && (
        <div className="dropdown-enter absolute right-0 z-50 mt-2 w-60 border border-line bg-white p-4 shadow-card" aria-label="Display settings">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[13.5px] text-ink-soft">Language</span>
            <LanguageToggle />
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
            <span className="text-[13.5px] text-ink-soft">Theme</span>
            <div className="flex border border-line" role="group" aria-label="Theme">
              {themes.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTheme(id)}
                  aria-pressed={theme === id}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[12.5px] font-medium transition ${theme === id ? 'bg-paper text-ink' : 'text-ink-muted hover:text-ink'}`}
                >
                  <Icon size={14} aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SettingsMenu