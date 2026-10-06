import { localizeText } from "../i18n.js";import { Menu, X } from 'lucide-react';
import Sidebar, { navForRole } from './Sidebar.jsx';
import { useApp } from '../context/AppContext.jsx';
import Modal from './Modal.jsx';
import { useTranslation } from 'react-i18next';

// Off-canvas drawer for small screens. Controlled by the parent: open + onClose.
// The overlay itself (backdrop, Escape, scroll lock) comes from Modal.
export function MobileNavigation({
  open = false,
  onClose,
  items,
  heading,
  footer = false,
  className = 'w-[272px] max-w-[85vw]'
}) {
  const { role } = useApp();
  const { t, i18n } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={onClose}
      align={i18n.dir() === 'rtl' ? 'right' : 'left'}
      zIndex={40}
      size="none"
      label={t('mobileNavigation.label')}
      showClose={false}
      panelClassName={`${className} flex flex-col`.trim()}
      bodyClassName="flex min-h-0 flex-1 flex-col p-0">
      
      <div className="flex items-center gap-2.5 bg-[#202421] px-5 py-4 text-[#FCFBF8]">
        <Menu size={15} className="text-[#A8BFA8]" />
        <span className="font-serif text-[17px]">{localizeText(t('mobileNavigation.menu'))}</span>
        <button type="button" onClick={onClose} className="ml-auto p-1 text-[#FCFBF8]/70 hover:text-[#FCFBF8]" aria-label={t('mobileNavigation.close')}>
          <X size={17} />
        </button>
      </div>
      <Sidebar
        items={items || navForRole(role)}
        heading={heading}
        footer={footer}
        onNavigate={onClose}
        className="flex min-h-0 flex-1 w-full" />
      
    </Modal>);

}

export default MobileNavigation;
