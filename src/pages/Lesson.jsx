import { localizeText } from "../i18n.js";import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Button from '../components/Button.jsx';
import { ProgressBar } from '../components/ProgressBar.jsx';
import { useToast } from '../components/Toast.jsx';
import { Curriculum } from './PlayerA.jsx';
import { LessonMain } from './PlayerB.jsx';
import { StudyCompanion } from './PlayerC.jsx';
import { useTranslation } from 'react-i18next';
export default function Lesson() {
  const { id, lessonId } = useParams();
  const { courses, completedLessons, setCompletedLessons, setAssistantOpen } = useApp();
  const { success } = useToast();
  const { t } = useTranslation();
  const course = courses.find((c) => c.id === id) || courses[0];
  const all = course.syllabus.flatMap((m) => m.lessons);
  const idx = Math.max(0, all.findIndex((l) => l.id === lessonId));
  const lesson = all[idx];
  const doneIds = completedLessons[course.id] || [];
  const done = doneIds.includes(lesson.id);
  const [note, setNote] = useState('');
  const toggle = () => {
    setCompletedLessons((p) => {
      const cur = p[course.id] || [];
      const has = cur.includes(lesson.id);
      const newIds = has ? cur.filter((x) => x !== lesson.id) : [...cur, lesson.id];
      if (!has) {
        success('Lesson marked as complete!');
      }
      return { ...p, [course.id]: newIds };
    });
  };
  const pct = Math.round(doneIds.length / all.length * 100);
  return (
    <div className="border-b border-line bg-paper">
      <div className="mx-auto flex max-w-shell flex-wrap items-center gap-3 px-4 py-3 text-[12.5px] sm:px-5">
        <Link to={`/courses/${course.id}`} className="font-medium underline">{localizeText(course.title)}</Link>
        <span className="text-ink-faint">{localizeText("/")}</span>
        <a href="#lesson-player" className="text-ink-muted underline underline-offset-2 hover:text-ink">{localizeText(lesson.title)}</a>
        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <ProgressBar value={pct} className="w-28" animate={true} />
          <span className="text-ink-faint">{localizeText(pct)}{localizeText("%")}</span>
        </div>
        <Button variant="outline" size="sm" className="border-sage px-2.5 py-1 text-[12px] lg:hidden" onClick={() => setAssistantOpen(true)}>{localizeText(t('lessonPage.companion'))}</Button>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto grid max-w-shell gap-6 px-4 py-8 sm:px-5 lg:grid-cols-[280px_minmax(0,1fr)_300px]">
          <div className="order-2 lg:order-1"><Curriculum course={course} lesson={lesson} doneIds={doneIds} lockedAfter={idx + 2} /></div>
          <div className="order-1 lg:order-2"><LessonMain course={course} lesson={lesson} idx={idx} all={all} done={done} toggle={toggle} note={note} setNote={setNote} /></div>
          <div className="order-3 hidden lg:block"><StudyCompanion courseTitle={course.title} /></div>
        </div>
      </div>
    </div>);

}
