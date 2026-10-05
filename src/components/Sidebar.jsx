import { NavLink, useLocation } from 'react-router-dom'
import { Home, LayoutDashboard, BookOpen, LineChart, ClipboardList, PenSquare, Award, Sparkles, Settings } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

// Single source of truth for workspace navigation — reused by Navbar, MobileNavigation and DashboardLayout.
export const studentNav = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/my-courses', label: 'My Courses', icon: BookOpen },
  { to: '/progress', label: 'Progress', icon: LineChart },
  { to: '/assignments', label: 'Assignments', icon: ClipboardList },
  { to: '/quizzes', label: 'Quizzes', icon: PenSquare },
  { to: '/certificates', label: 'Certificates', icon: Award },
  { to: '/assistant', label: 'AI Tutor', icon: Sparkles, sage: true },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export const instructorNav = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/teach', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/teach/courses', label: 'My Courses', icon: BookOpen },
  { to: '/teach/students', label: 'Students', icon: ClipboardList },
  { to: '/teach/analytics', label: 'Analytics', icon: LineChart },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export const adminNav = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/admin', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/users', label: 'Users', icon: BookOpen },
  { to: '/admin/students', label: 'Students', icon: ClipboardList },
  { to: '/admin/instructors', label: 'Instructors', icon: PenSquare },
  { to: '/admin/courses', label: 'Courses', icon: BookOpen },
  { to: '/admin/analytics', label: 'Analytics', icon: LineChart },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

// Where each role lands inside the workspace.
export const workspaceHome = { student: '/dashboard', instructor: '/teach', admin: '/admin' }

export function navForRole(role) {
  return role === 'instructor' ? instructorNav : role === 'admin' ? adminNav : studentNav
}

export function roleSectionLabel(role) {
  return role === 'instructor' ? 'Teach' : role === 'admin' ? 'Admin' : 'Learn'
}

// Same matching rule the workspace uses: exact for dashboard, prefix for nested screens.
function isOn(pathname, to) {
  if (to === '/') return pathname === '/'
  if (to === '/dashboard') return pathname === '/dashboard'
  return pathname === to || pathname.startsWith(to)
}

export function Sidebar({
  items,
  heading,
  footer = true,
  onNavigate,
  className = 'sticky top-16 hidden h-[calc(100vh-4rem)] w-60 md:flex sidebar-transition',
}) {
  const { role } = useApp()
  const loc = useLocation()
  const list = items || navForRole(role)
  return (
    <aside className={`shrink-0 flex-col bg-[#202421] text-[#FCFBF8]/80 ${className}`} aria-label="Workspace">
      <p className="px-6 pb-2 pt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FCFBF8]/55">
        {heading ?? roleSectionLabel(role)}
      </p>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3">
        {list.map(({ to, label, icon: Icon, sage }) => {
          const on = isOn(loc.pathname, to)
          return (
            <NavLink
              key={to}
              to={to}
              onClick={onNavigate}
              className={`flex items-center gap-3 border-l-2 px-3.5 py-2.5 text-[13.5px] font-medium transition ${on ? 'border-[#A8BFA8] bg-[#294A3A] text-[#FCFBF8]' : 'border-transparent hover:bg-white/5 hover:text-[#FCFBF8]'}`}
            >
              <Icon size={16} className={on || sage ? 'text-[#A8BFA8]' : 'text-[#FCFBF8]/60'} />
              {label}
              {sage && <span className="ml-auto h-1.5 w-1.5 bg-[#A8BFA8]" />}
            </NavLink>
          )
        })}
      </nav>
      {footer && (
        <div className="border-t border-white/10 p-5">
          <p className="font-serif text-[15px] text-[#FCFBF8]">Thirty calm minutes.</p>
          <p className="mt-1 text-[12px] text-[#FCFBF8]/60">One lesson a day is plenty.</p>
        </div>
      )}
    </aside>
  )
}

export default Sidebar
