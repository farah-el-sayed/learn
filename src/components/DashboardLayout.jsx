import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar.jsx';
import MobileNavigation from './MobileNavigation.jsx';
import Button from './Button.jsx';
import { PageHead } from './PageHead.jsx';

// Editorial workspace shell: sidebar + page head + content. Sidebar can be replaced via `sidebar`.
export function DashboardLayout({
  kicker,
  title,
  lede,
  actions,
  sidebar,
  showMenuButton = true,
  showSidebar = true,
  className = '',
  contentClassName = '',
  children
}) {useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={`mx-auto flex max-w-shell items-start gap-8 px-4 py-8 sm:px-5 sm:py-10 ${className}`}>
      {localizeText(showSidebar && (sidebar !== undefined ? sidebar : <Sidebar />))}

      <div className={`min-w-0 flex-1 ${contentClassName}`}>
        {localizeText(showMenuButton &&
        <Button
          variant="outline"
          size="sm"
          icon={Menu}
          className="mb-6 px-3 py-2 md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label={localizeText("Open navigation")}
          aria-expanded={menuOpen}>{localizeText("Menu")}


        </Button>)
        }

        <PageHead kicker={kicker} title={title} lede={lede} actions={actions} />

        {localizeText(children)}
      </div>

      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>);

}

export default DashboardLayout;
