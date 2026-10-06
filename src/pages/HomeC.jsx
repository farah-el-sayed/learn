import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Avatar from '../components/Avatar.jsx';
import Button from '../components/Button.jsx';
import { SectionHead } from '../components/Cards.jsx';
import { ArrowRight } from 'lucide-react';
export function Voices() {useTranslation();
  const t = [
  { q: 'I finally finish courses. Thirty minutes, one note, no guilt.', n: 'Sara H.', r: 'Design Foundations' },
  { q: 'The tutor asks better questions than my old study group.', n: 'Omar K.', r: 'Writing Clearly' },
  { q: 'Calm, serious, beautifully paced. Nothing shouts here.', n: 'Nina P.', r: 'Everyday Economics' }];

  return (
    <section className="mx-auto max-w-shell px-5 pt-20">
      <SectionHead kicker="Voices" title={localizeText("Loved by quiet learners")} />
      <div className="grid gap-px border border-line bg-line md:grid-cols-3">
        {localizeText(t.map((x) =>
        <figure key={x.n} className="bg-white p-8">
            <blockquote className="font-serif text-[19px]">{localizeText("“")}{localizeText(x.q)}{localizeText("”")}</blockquote>
            <figcaption className="mt-5 border-t border-line pt-4 text-[13px] text-ink-muted"><span className="font-medium text-ink">{localizeText(x.n)}</span>{localizeText(" ")}{localizeText("·")}{localizeText(" ")}{localizeText(x.r)}</figcaption>
          </figure>
        ))}
      </div>
    </section>);

}
export function Studio() {useTranslation();
  const { courses } = useApp();
  return (
    <section className="mx-auto max-w-shell px-5 pt-20">
      <SectionHead kicker="Studio" title={localizeText("Taught by practitioners")} lede="Designers, writers, researchers." />
      <div className="border-t border-line">
        {localizeText(courses.slice(0, 4).map((c) =>
        <div key={c.id} className="flex items-center gap-5 border-b border-line py-5">
            <Avatar name={c.instructor.name} initials={c.instructor.initials} size="lg" />
            <div className="flex-1"><p className="text-[15px] font-medium">{localizeText(c.instructor.name)}</p><p className="text-[13px] text-ink-muted">{localizeText(c.instructor.role)}</p></div>
            <Link to={`/courses/${c.id}`} className="text-[13px] font-medium underline">{localizeText("View course")}</Link>
          </div>
        ))}
      </div>
    </section>);

}
export function FinalCta() {useTranslation();
  const { setAssistantOpen } = useApp();
  return (
    <section className="mx-auto max-w-shell px-5 py-20">
      <div className="grid items-center gap-8 border border-line bg-white p-10 md:grid-cols-2 md:p-14">
        <h2 className="font-serif text-[34px] leading-[1.1] md:text-[44px]">{localizeText("Begin with thirty")}{localizeText(" ")}<em className="italic">{localizeText("calm")}</em>{localizeText(" ")}{localizeText("minutes today.")}</h2>
        <div>
          <p className="max-w-sm text-[14.5px] text-ink-muted">{localizeText("Pick one course, and let the tutor keep your rhythm.")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="primary" size="xl" to="/courses" trailingIcon={ArrowRight}>{localizeText("Explore Courses")}</Button>
            <Button variant="quiet" size="xl" onClick={() => setAssistantOpen(true)}>{localizeText("Meet Your AI Tutor")}</Button>
          </div>
        </div>
      </div>
    </section>);

}
