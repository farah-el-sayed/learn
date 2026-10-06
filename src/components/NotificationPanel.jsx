import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { Bell } from 'lucide-react';
import Dropdown from './Dropdown.jsx';
import EmptyState from './EmptyState.jsx';

// Bell + menu used in the top bar. Items come from the caller:
// { id, label, meta, icon, onClick }.
export function NotificationPanel({
  items = [],
  label = 'Notifications',
  emptyTitle = 'You are all caught up',
  emptyLede = 'Nothing needs your attention today.',
  className = '',
  buttonClassName = '',
  width = 'w-80'
}) {useTranslation();
  return (
    <Dropdown
      className={className}
      width={width}
      items={items}
      menuClassName="max-h-[70vh] overflow-y-auto"
      header={
      <div className="flex items-baseline justify-between gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">{localizeText(label)}</span>
          {localizeText(items.length > 0 && <span className="text-[12px] text-ink-faint">{localizeText(items.length)}{localizeText(" ")}{localizeText("new")}</span>)}
        </div>
      }
      trigger={({ open, toggle }) =>
      <button
        type="button"
        onClick={toggle}
        className={buttonClassName || `relative border border-line p-2 hover:text-ink ${open ? 'text-ink' : 'text-ink-muted'}`.trim()}
        aria-label={label}
        aria-expanded={open}>
        
          <Bell size={16} />
          {localizeText(items.length > 0 && <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 bg-clay" aria-hidden="true" />)}
        </button>
      }>
      
      {localizeText(items.length === 0 && <EmptyState size="sm" framed={false} title={emptyTitle} lede={emptyLede} />)}
    </Dropdown>);

}

export default NotificationPanel;
