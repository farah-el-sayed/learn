import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { FeatureCourse, SectionHead } from '../components/Cards.jsx';
export function Featured() {useTranslation();
  const { courses } = useApp();
  return (
    <section className="mx-auto max-w-shell px-5 pt-20">
      <SectionHead kicker="Featured" title={localizeText("Courses worth your evenings")} lede="Small, serious courses. Each teaches a way of seeing." />
      <div className="space-y-6">
        {localizeText(courses.slice(0, 3).map((c, i) => <FeatureCourse key={c.id} course={c} index={i} />))}
      </div>
    </section>);

}
export function HowItWorks() {useTranslation();
  return (
    <section className="mt-20 border-y border-line bg-white">
      <div className="mx-auto grid max-w-shell gap-10 px-5 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-clay"><span className="inline-block h-px w-6 bg-clay" />{localizeText("How it works")}</p>
          <h2 className="mt-3 font-serif text-[32px] leading-[1.12]">{localizeText("Three steps,")}<br />{localizeText("no noise.")}</h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-3 md:col-span-8">
          {localizeText([['01', 'Choose a course', 'Pick one arc and stay with it.'], ['02', 'Learn in 30 minutes', 'One lesson, one note, one exercise.'], ['03', 'Ask the tutor', 'Quizzes and plans from your syllabus.']].map(([n, t, d]) =>
          <div key={t} className="border-t border-ink/20 pt-4">
              <p className="font-serif text-[13px] text-ink-faint">{localizeText(n)}</p>
              <h3 className="mt-2 font-serif text-[20px]">{localizeText(t)}</h3>
              <p className="mt-2 text-[13.5px] text-ink-muted">{localizeText(d)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>);

}
