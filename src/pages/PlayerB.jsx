import { localizeText } from "../i18n.js";import { useState } from 'react';
import { FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button.jsx';
import CoursePlayer from '../components/CoursePlayer.jsx';

export function LessonMain({ course, lesson, idx, all, done, toggle, note, setNote }) {
  const [tab, setTab] = useState('lesson');
  const { t } = useTranslation();
  return (
    <CoursePlayer
      course={course}
      lesson={lesson}
      index={idx}
      total={all.length}
      done={done}
      onToggle={toggle}
      prev={idx > 0 ? all[idx - 1] : null}
      next={idx < all.length - 1 ? all[idx + 1] : null}
      actions={<Button variant="outline" to="/quiz/q-contrast" className="underline underline-offset-4">{localizeText(t('lessonContent.takeQuiz'))}</Button>}>
      
      <div id="lesson-content" className="scroll-mt-24">
        <div className="mt-5 flex gap-5 border-b border-line text-[13.5px] font-medium" role="tablist">
          {localizeText([['lesson', 'lessonTab'], ['resources', 'resourcesTab'], ['notes', 'notesTab']].map(([id, label]) =>
          <button key={id} onClick={() => setTab(id)} className={`pb-2.5 ${tab === id ? 'border-b-2 border-ink text-ink' : 'text-ink-muted'}`} role="tab" aria-selected={tab === id} aria-controls={`${id}-panel`} id={`${id}-tab`}>{localizeText(t(`lessonContent.${label}`))}</button>
          ))}
        </div>
        {localizeText(tab === 'lesson' &&
        <div id="lesson-panel" role="tabpanel" aria-labelledby="lesson-tab" className="space-y-4 py-6 text-[15px] leading-[1.8] text-ink-soft">
            <p>{localizeText(t('lessonContent.opening'))}</p>
            <p>{localizeText(t('lessonContent.paragraphTwo'))}</p>
            <p>{localizeText(t('lessonContent.paragraphThree'))}</p>
            <div className="border-l-2 border-clay bg-white px-4 py-3 text-[14px]">{localizeText(t('lessonContent.exercise'))}</div>
          </div>)
        }
        {localizeText(tab === 'resources' &&
        <div id="resources-panel" role="tabpanel" aria-labelledby="resources-tab" className="space-y-0 py-2">
            {localizeText([
          ['reading', 8],
          ['worksheet', 1],
          ['transcript', null]].
          map(([key, pageCount]) =>
          <div key={key} className="flex items-center gap-3 border-b border-line py-3.5 text-[13.5px]">
                <FileText size={15} className="text-ink-faint" /><span className="flex-1">{localizeText(t(`lessonContent.${key}`))}</span><span className="text-[12px] text-ink-faint">{localizeText(pageCount === null ? t('lessonContent.textFormat') : t('lessonContent.pageCount', { count: pageCount }))}</span>
              </div>
          ))}
          </div>)
        }
        {localizeText(tab === 'notes' &&
        <div id="notes-panel" role="tabpanel" aria-labelledby="notes-tab" className="py-6">
            <label className="sr-only" htmlFor="lesson-notes">{localizeText(t('lessonContent.notesLabel'))}</label>
            <textarea id="lesson-notes" value={note} onChange={(e) => setNote(e.target.value)} rows={4} placeholder={t('lessonContent.notesPlaceholder')} className="w-full border border-line bg-white p-4 text-[14px] outline-none placeholder:text-ink-faint" aria-label={t('lessonContent.notesLabel')} />
            <p className="mt-2 text-[12px] text-ink-faint">{localizeText(t('lessonContent.recallTip'))}</p>
          </div>)
        }
      </div>
    </CoursePlayer>);

}
