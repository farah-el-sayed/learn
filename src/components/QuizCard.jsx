import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import Badge from './Badge.jsx';
import Button from './Button.jsx';

// A quiz row: title, question count, and either the score or a way in.
// compact = the tighter variant used in dashboard sidebars.
export function QuizCard({ quiz, result = null, compact = false, courseTitle, to, className = '' }) {useTranslation();
  if (!quiz) return null;
  const done = result != null;
  const sizes = compact ?
  { row: 'gap-4 py-3.5', title: 'text-[13.5px] font-medium', meta: 'text-[12px]' } :
  { row: 'gap-4 py-4', title: 'text-[14.5px] font-medium', meta: 'text-[12.5px]' };

  return (
    <div className={`flex items-baseline justify-between border-b border-line ${sizes.row} ${className}`.trim()}>
      <div className="min-w-0">
        <p className={sizes.title}>{localizeText(quiz.title)}</p>
        <p className={`text-ink-muted ${sizes.meta}`}>
          {localizeText(compact ? 'Quiz' : '')}{localizeText(compact ? ' · ' : '')}{localizeText(quiz.questions.length)}{localizeText(' ')}{localizeText('questions')}
          {courseTitle && !compact && <> · {localizeText(courseTitle)}</>}
        </p>
      </div>
      {localizeText(done ?
      <div className="flex shrink-0 items-center gap-3">
          <Badge tone="pine" size={compact ? 'sm' : 'md'}>{localizeText(result)}{localizeText(" ")}{localizeText("/")}{localizeText(" ")}{localizeText(quiz.questions.length)}</Badge>
          <Button variant="link" size="plain" to={to || `/quiz/${quiz.id}`} className="shrink-0">{localizeText("Retake")}</Button>
        </div> :

      <Button variant="link" size="plain" to={to || `/quiz/${quiz.id}`} className="shrink-0">{localizeText("Start")}</Button>)
      }
    </div>);

}

export default QuizCard;
