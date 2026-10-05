import Navbar from './Navbar.jsx'
import { useLocation } from 'react-router-dom'

// Workspace top bar: the shared Navbar preset, kept so the app shell has one entry point.
export default function Topbar(props) {
  const location = useLocation()
  const isLanding = location.pathname === '/'
  
  return <Navbar 
    variant={isLanding ? 'public' : 'workspace'} 
    showAuth={isLanding}
    showSidebarToggle={!isLanding}
    {...props} 
  />
}

export { Sidebar } from './Sidebar.jsx'
