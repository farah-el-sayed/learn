import { localizeText } from "../i18n.js";import { useTranslation } from "react-i18next";import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import useDismiss from '../hooks/useDismiss.js';

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  full: 'max-w-none',
  none: ''
};

const zLevels = { 30: 'z-30', 40: 'z-40', 50: 'z-50' };

// Where the panel sits: a centred dialog, or a left/right/bottom sheet.
// Sheets take their width from panelClassName so nothing fights in the class list.
const layouts = {
  center: { overlay: 'items-center justify-center p-4', panel: 'w-full' },
  left: { overlay: 'items-stretch justify-start', panel: 'h-full border-r' },
  right: { overlay: 'items-stretch justify-end', panel: 'h-full border-l' },
  bottom: { overlay: 'items-end justify-center', panel: 'w-full max-h-[85vh] border-t' }
};

// One overlay primitive for every floating layer: backdrop, Escape, scroll lock.
export function Modal({
  open = false,
  onClose,
  title,
  kicker,
  description,
  footer,
  children,
  size = 'md',
  align = 'center',
  zIndex = 50,
  label = 'Dialog',
  closeLabel = 'Close',
  showClose = true,
  className = '',
  panelClassName = '',
  bodyClassName = 'px-6 py-5',
  footerClassName = 'px-6 py-4'
}) {useTranslation();
  const ref = useDismiss({ open, onClose, lockScroll: true });
  const layout = layouts[align] || layouts.center;
  if (!open) return null;

  return createPortal(
    <div
      className={`fixed inset-0 flex ${zLevels[zIndex] || zLevels[50]} ${layout.overlay} ${className} modal-backdrop`.trim()}
      role="dialog"
      aria-modal="true"
      aria-label={label}>
      
      <button type="button" onClick={onClose} className="absolute inset-0 bg-ink/40 transition-normal hover:bg-ink/50" aria-label={closeLabel} />

      <div
        ref={ref}
        className={`relative flex flex-col border border-line bg-white shadow-subtle ${align === 'center' ? sizes[size] || sizes.md : ''} ${layout.panel} ${panelClassName} modal-content`.trim()}>
        
        {localizeText((title || kicker || showClose) &&
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-4">
            <div className="min-w-0">
              {localizeText(kicker && <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-clay">{localizeText(kicker)}</p>)}
              {localizeText(title && <p className="mt-1 font-serif text-[22px] leading-snug">{localizeText(title)}</p>)}
            </div>
            {localizeText(showClose &&
          <button
            type="button"
            onClick={onClose}
            className="-mr-1 shrink-0 border border-line p-1.5 text-ink-muted hover:text-ink"
            aria-label={closeLabel}>
            
                <X size={14} />
              </button>)
          }
          </div>)
        }

        {localizeText(description && <p className="px-6 pt-4 text-[14px] leading-relaxed text-ink-muted">{localizeText(description)}</p>)}

        <div className={`flex-1 overflow-y-auto ${bodyClassName}`.trim()}>{localizeText(children)}</div>

        {localizeText(footer && <div className={`flex flex-wrap items-center justify-end gap-2 border-t border-line ${footerClassName}`.trim()}>{localizeText(footer)}</div>)}
      </div>
    </div>,
    document.body);

}

export default Modal;
