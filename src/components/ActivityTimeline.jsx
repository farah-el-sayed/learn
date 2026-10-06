import { localizeText } from "../i18n.js";import { useTranslation } from "react-i18next";import EmptyState from './EmptyState.jsx';

const markers = {
  clay: 'bg-clay',
  pine: 'bg-pine',
  sage: 'bg-sage',
  ink: 'bg-ink'
};

// Dotted list of what happened, newest first. Used on the dashboard and progress views.
export function ActivityTimeline({
  items = [],
  title,
  link,
  marker = 'clay',
  emptyTitle = 'No activity yet',
  emptyLede = 'Lessons, notes and quizzes will appear here as you go.',
  className = '',
  itemClassName = ''
}) {useTranslation();
  return (
    <section className={className}>
      {localizeText((title || link) &&
      <div className="flex items-baseline justify-between gap-4">
          {localizeText(title && <h2 className="font-serif text-[22px]">{localizeText(title)}</h2>)}
          {localizeText(link)}
        </div>)
      }

      {localizeText(items.length === 0 ?
      <EmptyState size="sm" title={emptyTitle} lede={emptyLede} className={title ? 'mt-4' : ''} /> :

      <ol className={`border-t border-line ${title ? 'mt-4' : ''} ${itemClassName}`.trim()}>
          {localizeText(items.map((item) =>
        <li key={item.id ?? item.text} className="flex gap-4 border-b border-line py-3.5">
              <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 ${markers[marker] || markers.clay}`} aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-[13.5px]">{localizeText(item.text)}</p>
                {localizeText((item.day || item.meta) &&
            <p className="mt-0.5 text-[12px] text-ink-faint">{localizeText([item.day, item.meta].filter(Boolean).join(' · '))}</p>)
            }
              </div>
            </li>
        ))}
        </ol>)
      }
    </section>);

}

export default ActivityTimeline;
