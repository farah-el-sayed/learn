import { useTranslation } from "react-i18next";import Navbar from './Navbar.jsx';
import { useLocation } from 'react-router-dom';

// One navbar everywhere: same as the homepage (public links + search +
// actions) on every page, so moving around the site never changes the top bar.
export default function Topbar(props) {useTranslation();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return <Navbar
    variant="public"
    showAuth
    showSidebarToggle={!isLanding}
    {...props} />;

}

export { Sidebar } from './Sidebar.jsx';
