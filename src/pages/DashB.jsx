import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import Button from '../components/Button.jsx';
import CourseGrid from '../components/CourseGrid.jsx';
import { CourseCover } from '../components/CourseCard.jsx';
import { ProgressBar } from '../components/ProgressBar.jsx';
import EmptyState from '../components/EmptyState.jsx';

export function ContinueList({ enrolled, completedLessons, onEnroll }) {useTranslation();
  if (enrolled.length === 0) {
    return (
      <div className="mt-5 border-t border-line">
        <EmptyState
          icon={BookOpen}
          title={localizeText("No courses yet")}
          lede="You haven't enrolled in any courses. Start your learning journey today."
          action={
          <Button variant="primary" to="/courses">{localizeText("Browse courses")}

          </Button>
          } />
        
      </div>);

  }

  return (
    <div className="mt-5 border-t border-line">
      {localizeText(enrolled.map((c) => {
        const all = c.syllabus.flatMap((m) => m.lessons);
        const done = completedLessons[c.id] || [];
        const next = all.find((l) => !done.includes(l.id)) || all[0];
        return (
          <div key={c.id} className="grid gap-4 border-b border-line py-6 sm:grid-cols-[64px_1fr_auto] sm:items-center">
            <CourseCover course={c} align="center" className="h-16 w-16 p-0" initialClassName="text-[22px]">
              <span className="font-serif text-[22px] text-white/80">{localizeText(c.title.charAt(0))}</span>
            </CourseCover>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">{localizeText(c.category)}</p>
              <Link to={`/courses/${c.id}`} className="mt-1 block font-serif text-[21px] hover:underline">{localizeText(c.title)}</Link>
              <p className="mt-1 text-[13px] text-ink-muted">{localizeText(c.instructor.name)}{localizeText(" ")}{localizeText("· Next:")}{localizeText(" ")}{localizeText(next.title)}</p>
              <ProgressBar value={Math.round(done.length / Math.max(1, all.length) * 100)} className="mt-3 max-w-xs" animate={true} label={`${Math.round(done.length / Math.max(1, all.length) * 100)}% complete`} />
            </div>
            <Button
              variant="primary"
              trailingIcon={ArrowRight}
              to={`/courses/${c.id}/lessons/${next.id}`}
              className="w-fit">{localizeText("Continue")}


            </Button>
          </div>);

      }))}
    </div>);

}

export function Recommended({ suggested, onEnroll }) {useTranslation();
  return <CourseGrid className="mt-5" courses={suggested} cols={3} gap={5} onEnroll={onEnroll} cardProps={{ link: false }} />;
}
