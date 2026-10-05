import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import Dropdown from './Dropdown.jsx'
import { ROLES, useApp } from '../context/AppContext.jsx'
import { workspaceHome } from './Sidebar.jsx'

// The role control was a wide native <select> sitting in the middle of the bar.
// It is a compact dropdown now: same three roles, a third of the width, and the
// same menu behaviour as the rest of the top bar.
export function RoleSwitcher({ className = '' }) {
  const { role, setRole } = useApp()
  const navigate = useNavigate()
  const current = ROLES.find(item => item.id === role) || ROLES[0]

  // Switching role lands you in that role's own dashboard.
  const choose = value => {
    setRole(value)
    navigate(workspaceHome[value] || '/dashboard')
  }

  return (
    <Dropdown
      className={className}
      align="right"
      width="w-48"
      header={<span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">Viewing as</span>}
      items={ROLES.map(item => ({
        id: item.id,
        label: item.label,
        active: item.id === role,
        onClick: () => choose(item.id),
      }))}
      trigger={({ open, toggle }) => (
        <button
          type="button"
          onClick={toggle}
          className={`flex items-center gap-2 border border-line px-2.5 py-2 text-[12.5px] font-medium transition ${open ? 'text-ink' : 'text-ink-muted hover:text-ink'}`}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label={`Role: ${current.label}`}
          title="Switch role"
        >
          <span className="h-1.5 w-1.5 shrink-0 bg-sage" aria-hidden="true" />
          {current.label}
          <ChevronDown size={14} className={open ? 'rotate-180 transition' : 'transition'} aria-hidden="true" />
        </button>
      )}
    />
  )
}

export default RoleSwitcher