import { localizeText } from "../i18n.js";import { useTranslation } from "react-i18next"; // The single editorial heading used for page titles and section headers.
// Cards.jsx (SectionHead) and DashboardLayout both build on this — no page should
// hand-write a kicker + serif title + lede again.
const sizes = {
  sm: 'text-[30px] leading-[1.15] md:text-[34px]',
  md: 'text-[32px] leading-[1.1] md:text-[36px]',
  lg: 'text-[38px] leading-[1.08] md:text-[46px]',
  xl: 'text-[38px] leading-tight md:text-[44px]'
};

export function PageHead({
  as: Tag = 'h1',
  kicker,
  title,
  lede,
  actions,
  link,
  marker = false,
  size = 'md',
  align = 'start',
  textClassName = '',
  className = '',
  children
}) {useTranslation();
  const right = actions || link;
  if (!kicker && !title && !lede && !right && !children) return null;
  return (
    <div className={`flex flex-wrap ${align === 'end' ? 'items-end' : 'items-start'} justify-between gap-4 ${className}`.trim()}>
      {localizeText((kicker || title || lede) &&
      <div className={`min-w-0 ${textClassName}`.trim()}>
          {localizeText(kicker &&
        <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-clay">
              {localizeText(marker && <span className="inline-block h-px w-6 bg-clay" />)}
              {localizeText(kicker)}
            </p>)
        }
          {localizeText(title && <Tag className={`mt-3 font-serif ${sizes[size] || sizes.md}`}>{localizeText(title)}</Tag>)}
          {localizeText(lede && <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-ink-muted">{localizeText(lede)}</p>)}
        </div>)
      }
      {localizeText(right && <div className="flex shrink-0 flex-wrap items-center gap-2">{localizeText(right)}</div>)}
      {localizeText(children)}
    </div>);

}

export default PageHead;
