import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { Link } from 'react-router-dom';

const principles = [
['Small steps, often', 'A focused lesson can fit into a real day. Progress should not require a perfect schedule.'],
['Practice over noise', 'Useful work comes from trying, reflecting, and returning to an idea with a fresh perspective.'],
['Guidance with context', 'A learning companion should help with the course in front of you, not distract from it.']];


function StudioPage({ kicker, title, lede, children }) {useTranslation();
  return (
    <div className="mx-auto max-w-shell px-5 py-14">
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-clay">{localizeText(kicker)}</p>
      <h1 className="mt-4 max-w-3xl font-serif text-[42px] leading-[1.08] sm:text-[56px]">{localizeText(title)}</h1>
      <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-ink-muted">{localizeText(lede)}</p>
      {localizeText(children)}
    </div>);

}

export function ManifestoPage() {useTranslation();
  return (
    <StudioPage
      kicker="Learn / Manifesto"
      title={localizeText("Make room for learning that lasts.")}
      lede="Learning belongs in everyday life: a clear idea, a little practice, and enough space to make it your own.">
      
      <div className="mt-12 grid gap-8 border-y border-line py-8 md:grid-cols-3">
        {localizeText(principles.map(([title, description], index) =>
        <section key={title} className="border-t border-ink/20 pt-4">
            <p className="font-serif text-[13px] text-ink-faint">{localizeText("0")}{localizeText(index + 1)}</p>
            <h2 className="mt-3 font-serif text-[23px]">{localizeText(title)}</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{localizeText(description)}</p>
          </section>
        ))}
      </div>
      <Link to="/courses" className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium underline underline-offset-4">{localizeText("Browse courses")}{localizeText(" ")}<span aria-hidden="true">{localizeText("→")}</span></Link>
    </StudioPage>);

}

export function TeachingNotesPage() {useTranslation();
  return (
    <StudioPage
      kicker="Studio / Teaching notes"
      title={localizeText("Good teaching leaves room to think.")}
      lede="A few principles behind the lessons and learning tools on Learn.">
      
      <div className="mt-12 border-t border-line">
        {localizeText([
        ['01', 'Start with one useful idea', 'A lesson is easier to remember when its purpose is clear.'],
        ['02', 'Make practice part of the lesson', 'Understanding grows when learners use an idea, not only read about it.'],
        ['03', 'Let reflection close the loop', 'A short note about what changed can make the next session more meaningful.']].
        map(([number, title, description]) =>
        <article key={number} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[64px_1fr]">
            <span className="font-serif text-[14px] text-ink-faint">{localizeText(number)}</span>
            <div>
              <h2 className="font-serif text-[23px]">{localizeText(title)}</h2>
              <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-ink-muted">{localizeText(description)}</p>
            </div>
          </article>
        ))}
      </div>
    </StudioPage>);

}

export function AboutPage() {useTranslation();
  return (
    <StudioPage
      kicker="About Learn"
      title={localizeText("A calmer place to learn.")}
      lede="Learn brings together structured courses, manageable study sessions, and a tutor that can work with the material you are studying.">
      
      <div className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
        <section>
          <h2 className="font-serif text-[22px]">{localizeText("Courses with a point of view")}</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{localizeText("Focused paths help you build a skill one idea at a time.")}</p>
        </section>
        <section>
          <h2 className="font-serif text-[22px]">{localizeText("A pace you can keep")}</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{localizeText("Plan short sessions around your week and pick up where you left off.")}</p>
        </section>
        <section>
          <h2 className="font-serif text-[22px]">{localizeText("Support that follows along")}</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{localizeText("The learning companion can help explain lessons, review ideas, and prepare practice.")}</p>
        </section>
      </div>
      <Link to="/courses" className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium underline underline-offset-4">{localizeText("Explore the catalogue")}{localizeText(" ")}<span aria-hidden="true">{localizeText("→")}</span></Link>
    </StudioPage>);

}
