import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CourseCover } from './CourseCard.jsx';
import { ProgressBar } from './ProgressBar.jsx';
import { PageHead } from './PageHead.jsx';

// CourseCard lives in CourseCard.jsx — this file holds the other editorial course
// presentations (feature, index row, compact, continue) plus the section head.

export function FeatureCourse({ course, index }) {useTranslation();
  return (
    <Link to={`/courses/${course.id}`} className="group grid border border-line bg-white md:grid-cols-2">
      <div className="relative isolate flex min-h-[280px] flex-col justify-between overflow-hidden bg-cream p-8" style={{ backgroundColor: course.coverTone }}>
        {localizeText(course.coverImage && <img src={course.coverImage} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />)}
        <span className="absolute inset-0 bg-black/25" aria-hidden="true" />
        <span className="relative text-[12px] font-semibold uppercase tracking-[0.16em] text-white">{localizeText("Featured — 0")}{localizeText(index + 1)}</span>
        <span className="relative font-serif text-[72px] leading-none text-white/75">{localizeText(course.title.charAt(0))}</span>
      </div>
      <div className="flex flex-col justify-center p-8 md:p-12">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-clay">{localizeText(course.category)}</p>
        <h3 className="mt-3 font-serif text-[32px] leading-[1.1] group-hover:underline">{localizeText(course.title)}</h3>
        <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-ink-muted">{localizeText(course.description)}</p>
        <p className="mt-5 text-[13px] text-ink-muted">{localizeText(course.instructor.name)}{localizeText(" ")}{localizeText("·")}{localizeText(" ")}{localizeText(course.duration)}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-[13.5px] font-medium">{localizeText("Open course")}{localizeText(" ")}<ArrowRight size={15} /></span>
      </div>
    </Link>);

}

export function CourseRow({ course, index }) {useTranslation();
  return (
    <Link to={`/courses/${course.id}`} className="group flex items-baseline gap-5 border-t border-line py-5 last:border-b">
      <span className="w-8 shrink-0 font-serif text-[14px] text-ink-faint">{localizeText(String(index + 1).padStart(2, '0'))}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-serif text-[20px] leading-snug group-hover:underline">{localizeText(course.title)}</span>
        <span className="mt-1 block text-[13px] text-ink-muted">{localizeText(course.subtitle)}{localizeText(" ")}{localizeText("—")}{localizeText(" ")}{localizeText(course.instructor.name)}</span>
      </span>
      <span className="hidden shrink-0 text-[12px] uppercase tracking-widest text-ink-faint sm:block">{localizeText(course.category)}</span>
      <span className="hidden shrink-0 text-[12px] text-ink-muted md:block">{localizeText(course.duration.split(',')[0])}</span>
      <ArrowUpRight size={16} className="shrink-0 text-ink-faint group-hover:text-ink" />
    </Link>);

}

export function CompactCard({ course, progress }) {useTranslation();
  return (
    <Link to={`/courses/${course.id}`} className="group border border-line bg-white transition hover:border-ink/30">
      <CourseCover course={course} className="h-24" />
      <div className="p-4">
        <p className="font-serif text-[16px] leading-snug group-hover:underline">{localizeText(course.title)}</p>
        <p className="mt-1 text-[12px] text-ink-muted">{localizeText(course.instructor.name)}{localizeText(" ")}{localizeText("·")}{localizeText(" ")}{localizeText(course.duration.split(',')[0])}</p>
        {localizeText(progress != null &&
        <ProgressBar value={progress} className="mt-3" label={`${progress}%`} />)
        }
      </div>
    </Link>);

}

export function ContinueCard({ course }) {useTranslation();
  return (
    <Link to={`/courses/${course.id}`} className="flex items-center gap-5 border border-line bg-white p-4 transition hover:border-ink/30">
      <CourseCover course={course} align="center" className="h-16 w-16 shrink-0 p-0" initialClassName="text-xl">
        <span className="font-serif text-xl text-white/80">{localizeText(course.title.charAt(0))}</span>
      </CourseCover>
      <div className="min-w-0 flex-1">
        <p className="truncate font-serif text-[17px]">{localizeText(course.title)}</p>
        <ProgressBar value={course.progress} className="mt-2" label={`${course.progress}% complete`} />
      </div>
      <span className="flex items-center gap-1 text-[13px] font-medium">{localizeText("Resume")}{localizeText(" ")}<ArrowUpRight size={15} /></span>
    </Link>);

}

// Section-level heading: the same PageHead, with the clay rule and a larger lede rhythm.
export function SectionHead({ kicker, title, lede, link, actions }) {useTranslation();
  return (
    <PageHead
      as="h2"
      marker
      align="end"
      size="sm"
      textClassName="max-w-xl"
      className="mb-8"
      kicker={kicker}
      title={title}
      lede={lede}
      link={link}
      actions={actions} />);


}
