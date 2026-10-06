import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import Badge from './Badge.jsx';
import Button from './Button.jsx';

// An assignment row: title, due date, status badge, grade and a way to the brief.
// compact = the tighter variant used in dashboard sidebars.
export function AssignmentCard({
  assignment,
  compact = false,
  to,
  showGrade = true,
  openLabel = 'Open brief',
  onSubmit,
  className = ''
}) {useTranslation();
  if (!assignment) return null;
  const href = to || `/courses/${assignment.courseId}`;

  if (compact) {
    return (
      <div className={`flex items-baseline justify-between gap-4 border-b border-line py-3.5 ${className}`.trim()}>
        <div className="min-w-0">
          <p className="text-[13.5px] font-medium">{localizeText(assignment.title)}</p>
          <p className="text-[12px] text-ink-muted">{localizeText("Due")}{localizeText(" ")}{localizeText(assignment.due)}</p>
        </div>
        <Badge status={assignment.status} />
      </div>);

  }

  return (
    <div className={`grid items-baseline gap-3 border-b border-line py-5 md:grid-cols-[1fr_auto_auto_auto] md:gap-8 ${className}`.trim()}>
      <div>
        <p className="font-serif text-[19px]">{localizeText(assignment.title)}</p>
        <p className="mt-1 text-[13px] text-ink-muted">{localizeText("Due")}{localizeText(" ")}{localizeText(assignment.due)}</p>
      </div>
      <Badge status={assignment.status} size="md" />
      {localizeText(showGrade && <span className="text-[13px] text-ink-muted">{localizeText(assignment.grade ? `Grade ${assignment.grade}` : 'Ungraded')}</span>)}
      {localizeText(href && <Button variant="link" size="plain" to={href}>{localizeText(openLabel)}</Button>)}
      {localizeText(onSubmit && assignment.status !== 'Submitted' &&
      <Button variant="primary" size="sm" onClick={() => onSubmit(assignment.id)}>{localizeText("Submit")}</Button>)
      }
    </div>);

}

export default AssignmentCard;
