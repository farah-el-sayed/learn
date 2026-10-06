import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { ProgressBar } from './ProgressBar.jsx';
import Button from './Button.jsx';

// The single course cover tile (category chip + initial). Reused by CourseCard,
// CompactCard and ContinueCard so the tint/typography never drifts.
// Design system: Sharp edges, 1px line border, no shadow, editorial typography.
export function CourseCover({ course, className = 'h-32', align = 'end', initialClassName = 'text-[28px]', children }) {useTranslation();
  if (!course) return null;
  const alignment = align === 'center' ? 'items-center justify-center' : 'items-end justify-between';
  return (
    <div
      className={`relative isolate flex overflow-hidden ${alignment} p-4 ${className}`.trim()}
      style={{ background: course.coverTone }}>
      
      {localizeText(course.coverImage && <img src={course.coverImage} alt="" loading="lazy" className="absolute inset-0 z-0 h-full w-full object-cover" />)}
      {localizeText(course.coverImage && <span className="absolute inset-0 z-0 bg-black/20" aria-hidden="true" />)}
      {localizeText(children ?
      <div className={`relative z-10 flex w-full ${alignment}`}>{localizeText(children)}</div> :

      <>
          <span className="relative z-10 bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-widest text-ink-soft">{localizeText(course.category)}</span>
          <span className={`relative z-10 font-serif leading-none ${course.coverImage ? 'text-white/75' : 'text-ink/15'} ${initialClassName}`.trim()}>{localizeText(course.title.charAt(0))}</span>
        </>)
      }
    </div>);

}

// Reusable course card. `progress` is optional — pass a number to show the rule.
// `link={false}` renders a plain article (for use inside an existing link).
export const CourseCard = memo(function CourseCard({ course, progress, to, showMeta = true, link = true, onEnroll, className = '', ...rest }) {useTranslation();
  if (!course) return null;
  const href = to ?? `/courses/${course.id}`;
  const asLink = link && href;
  const Tag = asLink ? Link : 'article';
  const tagProps = asLink ? { to: href } : {};

  return (
    <Tag {...tagProps} className={`group flex flex-col border border-line bg-white transition-normal hover-lift ${className}`.trim()} {...rest}>
      <CourseCover course={course} />
      <div className="flex flex-1 flex-col p-5">
          <h3 className="font-serif text-[20px] leading-snug group-hover:underline">
            {localizeText(link ? course.title : <Link to={href}>{localizeText(course.title)}</Link>)}
          </h3>
        <p className="mt-1 text-[13px] text-ink-muted">{localizeText("by")}{localizeText(" ")}{localizeText(course.instructor?.name)}</p>
        <div className="mt-auto">
          {localizeText(progress != null &&
          <ProgressBar value={progress} className="mt-4 animate-progress" label={`${Math.round(progress)}% complete`} />)
          }
          {localizeText(showMeta &&
          <p className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[12px] text-ink-muted">
              <span>{localizeText(course.duration?.split(',')[0])}{localizeText(" ")}{localizeText("·")}{localizeText(" ")}{localizeText(course.level)}</span>
              <span className="flex items-center gap-1"><Star size={12} /> {localizeText(course.rating)}</span>
            </p>)
          }
          {localizeText(onEnroll &&
          <Button variant="primary" size="sm" className="mt-4 w-full" onClick={() => onEnroll(course.id)}>{localizeText("Enroll")}

          </Button>)
          }
        </div>
      </div>
    </Tag>);

});

export default CourseCard;
