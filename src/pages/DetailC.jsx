import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { Link, useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
export function Reviews({ course }) {useTranslation();
  const r = [
  { n: 'Sara H.', t: 'Worth every evening. I use this at work daily.', s: 5 },
  { n: 'Omar K.', t: 'Short lessons, honest feedback, no filler.', s: 5 },
  { n: 'Nina P.', t: 'Calm pacing. Finished what two other courses could not.', s: 4 }];

  return (
    <section className="mx-auto max-w-shell px-5 pt-14">
      <h2 className="font-serif text-[28px]">{localizeText("Reviews")}</h2>
      <p className="mt-2 flex items-center gap-1.5 text-[14px] text-ink-muted"><Star size={14} /> {localizeText(course.rating)}{localizeText(" ")}{localizeText("average ·")}{localizeText(" ")}{localizeText(course.learners.toLocaleString())}{localizeText(" ")}{localizeText("students")}</p>
      <div className="mt-6 grid gap-px border border-line bg-line md:grid-cols-3">
        {localizeText(r.map((x) =>
        <figure key={x.n} className="bg-white p-6">
            <p className="text-[13px] tracking-wide text-clay">{localizeText('★'.repeat(x.s))}{localizeText('☆'.repeat(5 - x.s))}</p>
            <blockquote className="mt-2 font-serif text-[17px] leading-snug">{localizeText("“")}{localizeText(x.t)}{localizeText("”")}</blockquote>
            <figcaption className="mt-4 text-[12.5px] text-ink-muted">{localizeText(x.n)}</figcaption>
          </figure>
        ))}
      </div>
    </section>);

}
export function DetailCta({ course, enrolled, onEnroll }) {useTranslation();
  const { id } = useParams();
  void id;
  return (
    <section className="mx-auto max-w-shell px-5 py-16">
      <div className="grid items-center gap-6 border border-line bg-pine-deep p-10 text-paper md:grid-cols-2">
        <h2 className="font-serif text-[30px] leading-tight">{localizeText("Join")}{localizeText(" ")}{localizeText(course.learners.toLocaleString())}{localizeText(" ")}{localizeText("learners in")}{localizeText(" ")}{localizeText(course.title)}{localizeText(".")}</h2>
        <div>
          {localizeText(!enrolled ?
          <button onClick={onEnroll} className="inline-block bg-paper px-6 py-3 text-[14px] font-medium text-ink" aria-label={`Enroll in ${course.title}`}>{localizeText("Enroll now")}</button> :

          <Link to={`/courses/${course.id}/lessons/${course.syllabus[0].lessons[0].id}`} className="inline-block bg-paper px-6 py-3 text-[14px] font-medium text-ink">{localizeText("Continue learning")}</Link>)
          }
          <p className="mt-3 text-[13px] opacity-70">{localizeText("Thirty minutes a day. Certificate on completion.")}</p>
        </div>
      </div>
    </section>);

}
