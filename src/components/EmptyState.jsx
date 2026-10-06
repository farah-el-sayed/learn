import { localizeText } from "../i18n.js";import { useTranslation } from "react-i18next";const sizes = {
  sm: 'px-5 py-8',
  md: 'px-6 py-12',
  lg: 'px-6 py-16'
};

// Quiet, editorial "nothing here yet" block. Used inside lists, grids and menus.
export function EmptyState({ icon: Icon, title, lede, action, size = 'md', framed = true, className = '' }) {useTranslation();
  return (
    <div className={`${framed ? 'border border-line bg-white' : ''} text-center ${sizes[size] || sizes.md} ${className}`.trim()}>
      {localizeText(Icon &&
      <span className="mx-auto flex h-10 w-10 items-center justify-center border border-line text-ink-faint" aria-hidden="true">
          <Icon size={16} />
        </span>)
      }
      {localizeText(title && <p className={`font-serif text-[19px] leading-snug ${Icon ? 'mt-4' : ''}`.trim()}>{localizeText(title)}</p>)}
      {localizeText(lede && <p className={`text-[13.5px] leading-relaxed text-ink-muted ${title ? 'mt-2' : ''}`.trim()}>{localizeText(lede)}</p>)}
      {localizeText(action && <div className="mt-5 flex flex-wrap justify-center gap-2">{localizeText(action)}</div>)}
    </div>);

}

export default EmptyState;
