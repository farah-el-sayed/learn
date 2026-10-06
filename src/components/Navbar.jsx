import { localizeText } from "../i18n.js";import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BookOpen, ClipboardList, Compass, LayoutDashboard, Menu, PanelLeft, PanelLeftClose, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import BrandMark from './BrandMark.jsx';
import Button from './Button.jsx';
import CourseSearch from './CourseSearch.jsx';
import MobileNavigation from './MobileNavigation.jsx';
import NotificationPanel from './NotificationPanel.jsx';
import SettingsMenu from './SettingsMenu.jsx';
import { navForRole, roleSectionLabel, workspaceHome } from './Sidebar.jsx';
import { useTranslation } from 'react-i18next';

export const publicNav = [
{ to: '/courses', label: 'Courses', icon: BookOpen },
{ to: '/paths', label: 'Paths', icon: Compass },
{ to: '/assistant', label: 'AI Tutor', icon: Sparkles, sage: true }];


// `primary` marks the one link that should read as an action. Sign in stays a
// quiet text link so the pair never competes, and never stacks on two lines.
export const authNav = [
{ to: '/login', label: 'Sign in', icon: LogIn },
{ to: '/register', label: 'Create account', icon: UserPlus, primary: true }];


// Where each role lands inside the workspace (re-exported: Navbar is the public
// entry point for it).
export { workspaceHome };

// One top bar for the whole product: marketing pages use variant="public",
// the workspace uses variant="workspace" (sidebar toggle + app navigation).
// The row reads start -> centre -> end: who we are, one quiet search field,
// then the tools and the single action worth taking.
export function Navbar({
  variant = 'public',
  items = publicNav,
  showSearch = true,
  showCompanion = true,
  showWorkspaceLink = true,
  showNotifications = true,
  showMenuButton = true,
  showSidebarToggle = false,
  showAuth = false,
  heading,
  sticky = true,
  className = ''
}) {
  const { role, setAssistantOpen, assistantOpen, sidebarOpen, setSidebarOpen, assignments } = useApp();
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const workspace = variant === 'workspace';
  const home = workspaceHome[role] || '/dashboard';

  const drawerItems = workspace ?
  navForRole(role) :
  [
  ...(showWorkspaceLink ? [...items, { to: home, label: 'My workspace', icon: LayoutDashboard }] : items),
  ...(showAuth ? authNav : [])];


  // Students hear about anything still owed; other roles stay quiet.
  const notifications = role === 'student' ?
  assignments.
  filter((a) => a.status !== 'Submitted').
  map((a) => ({ id: a.id, label: a.title, meta: `Due ${a.due}`, icon: ClipboardList })) :
  [];

  return (
    <header className={`${sticky ? 'sticky top-0 z-30' : ''} border-b border-line bg-paper/95 backdrop-blur ${className}`.trim()}>
      <div className="mx-auto flex h-20 max-w-shell items-center gap-3 px-4 sm:gap-4 sm:px-5">
        {/* Start: identity, then where you can go. */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          {localizeText(showMenuButton &&
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="border border-line p-2 text-ink-muted transition hover:text-ink md:hidden"
            aria-label={t('navigation.open')}
            aria-expanded={menuOpen}>
            
              <Menu size={16} />
            </button>)
          }

          {localizeText(showSidebarToggle &&
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden border border-line p-2 text-ink-muted transition hover:text-ink md:inline-flex lg:hidden"
            aria-label={t(sidebarOpen ? 'navigation.collapseSidebar' : 'navigation.expandSidebar')}
            aria-expanded={sidebarOpen}>
            
              {localizeText(sidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeft size={16} />)}
            </button>)
          }

          <Link to="/" className="group flex items-center gap-3" aria-label={t('navigation.home')}>
            <BrandMark size="lg" className="transition-transform rounded-full duration-200 group-hover:-translate-y-px" />
           
          </Link>

          {localizeText(!workspace &&
          <nav className="hidden items-center gap-6 md:flex" aria-label={t('navigation.primary')}>
              {localizeText(items.map(({ to, label, sage }) =>
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `text-[13.5px] font-medium transition ${isActive ? 'text-ink underline underline-offset-8 decoration-pine decoration-2' : 'text-ink-muted hover:text-ink'}`}>
              
                  <span className="flex items-center gap-1.5">
                    {localizeText(sage && <span className="h-1.5 w-1.5 bg-sage" aria-hidden="true" />)}
                    {localizeText(t(`navigation.${label}`, label))}
                  </span>
                </NavLink>
            ))}
            </nav>)
          }
        </div>

        {/* Centre: one search field, optically centred between the two clusters. */}
        {localizeText(showSearch &&
        <div className="flex flex-1 justify-end md:justify-center">
            <CourseSearch />
          </div>)
        }

        {/* End: quiet tools first, the call to action last. */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {localizeText(showCompanion && role === 'student' &&
          <Button
            variant="ghost"
            size="plain"
            className="gap-2 whitespace-nowrap border border-sage bg-sage/15 px-2.5 py-2 text-[13px] text-ink transition hover:bg-sage/25 sm:px-3.5"
            onClick={() => setAssistantOpen(!assistantOpen)}
            aria-label={t('navigation.aiTutor')}
            aria-expanded={assistantOpen}>
            
              <span className="h-1.5 w-1.5 shrink-0 bg-sage" aria-hidden="true" />
              <span className="hidden sm:inline">{localizeText(t('navigation.companion'))}</span>
            </Button>)
          }

          {localizeText(showNotifications &&
          <div className="hidden sm:block">
              <NotificationPanel items={notifications} />
            </div>)
          }

          <SettingsMenu />

          {localizeText(!workspace && showWorkspaceLink &&
          <Button
            variant="ghost"
            size="plain"
            to={home}
            className="hidden whitespace-nowrap px-2.5 py-2 text-[13px] text-ink-muted transition hover:text-ink lg:inline-flex">
            
              <LayoutDashboard size={15} aria-hidden="true" />
              {localizeText(t('navigation.Workspace'))}
            </Button>)
          }

          {localizeText(showAuth && authNav.map((link) =>
          <Button
            key={link.to}
            to={link.to}
            variant={link.primary ? 'primary' : 'ghost'}
            size="plain"
            icon={link.icon}
            className={`hidden whitespace-nowrap py-2 text-[13px] sm:inline-flex ${link.primary ? 'px-3.5' : 'px-2.5 text-ink-muted hover:text-ink'}`}>
            
              {localizeText(t(`navigation.${link.label}`, link.label))}
            </Button>
          ))}
        </div>
      </div>

      <MobileNavigation
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={drawerItems}
        heading={t(`navigation.${heading ?? (workspace ? roleSectionLabel(role) : 'Learn')}`, heading ?? (workspace ? roleSectionLabel(role) : 'Learn'))} />
      
    </header>);

}

export default Navbar;
