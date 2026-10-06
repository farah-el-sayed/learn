import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { Link } from 'react-router-dom';
import Avatar from '../components/Avatar.jsx';
import LessonList from '../components/LessonList.jsx';

export function CurriculumFull({ course, done }) {useTranslation();
  const total = course.syllabus.flatMap((m) => m.lessons).length;
  return (
    <section className="mx-auto max-w-shell px-5 pt-14">
      <h2 className="font-serif text-[28px]">{localizeText("Curriculum")}</h2>
      <p className="mt-2 text-[14px] text-ink-muted">{localizeText(total)}{localizeText(" ")}{localizeText("lessons ·")}{localizeText(" ")}{localizeText(done.length)}{localizeText(" ")}{localizeText("completed")}</p>
      <LessonList className="mt-6" variant="catalogue" syllabus={course.syllabus} courseId={course.id} doneIds={done} />
    </section>);

}
export function Meta({ course, quiz }) {useTranslation();
  return (
    <section className="mx-auto max-w-shell px-5 pt-14">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="border-t border-ink/20 pt-5">
          <h3 className="font-serif text-[22px]">{localizeText("Requirements")}</h3>
          <ul className="mt-3 space-y-2 text-[14px] text-ink-soft">
            <li>{localizeText("No prior experience — curiosity is enough.")}</li>
            <li>{localizeText("Thirty minutes a day, four days a week.")}</li>
            <li>{localizeText("A notebook, or the notes tab in each lesson.")}</li>
          </ul>
        </div>
        <div className="border-t border-ink/20 pt-5">
          <h3 className="font-serif text-[22px]">{localizeText("About the instructor")}</h3>
          <div className="mt-3 flex items-center gap-4">
            <Avatar name={course.instructor.name} initials={course.instructor.initials} size="lg" />
            <div><p className="text-[14.5px] font-medium">{localizeText(course.instructor.name)}</p><p className="text-[13px] text-ink-muted">{localizeText(course.instructor.role)}</p></div>
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{localizeText("Teaches slowly and edits honestly. Believes taste can be learned — one small exercise at a time.")}</p>
          {localizeText(quiz && <Link to={`/quiz/${quiz.id}`} className="mt-4 inline-block text-[13.5px] font-medium underline">{localizeText("Preview the course quiz")}</Link>)}
        </div>
      </div>
    </section>);

}
