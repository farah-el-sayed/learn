import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import BrandMark from './BrandMark.jsx';

export default function Footer() {useTranslation();
  const { role } = useApp();
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-shell gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <BrandMark size="sm" />
            <span className="font-serif text-lg">{localizeText("Learn")}</span>
          </div>
          <p className="mt-3 max-w-xs text-[13.5px] leading-relaxed text-ink-muted">{localizeText("A calmer place to learn. Short lessons, honest teaching, and a tutor that knows your courses.")}</p>
        </div>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-widest text-ink-faint">{localizeText("Learn")}</p>
          <div className="mt-3 flex flex-col gap-2 text-[13.5px] text-ink-soft">
            <Link to="/courses">{localizeText("All courses")}</Link>
            {localizeText(role === 'student' && <Link to="/dashboard">{localizeText("My learning")}</Link>)}
            {localizeText(role === 'student' && <Link to="/assignments">{localizeText("Assignments")}</Link>)}
            <Link to="/profile">{localizeText("Profile")}</Link>
            {localizeText(role === 'instructor' && <Link to="/teach">{localizeText("Teach")}</Link>)}
            {localizeText(role === 'admin' && <Link to="/admin">{localizeText("Admin")}</Link>)}
          </div>
        </div>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-widest text-ink-faint">{localizeText("Studio")}</p>
          <div className="mt-3 flex flex-col gap-2 text-[13.5px] text-ink-soft">
            <Link to="/manifesto">{localizeText("Manifesto")}</Link>
            <Link to="/teaching-notes">{localizeText("Teaching notes")}</Link>
            <Link to="/about">{localizeText("About")}</Link>
          </div>
        </div>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-widest text-ink-faint">{localizeText("Weekly letter")}</p>
          <p className="mt-3 text-[13.5px] text-ink-muted">{localizeText("One idea, one exercise, every Sunday.")}</p>
          <div className="mt-3 flex">
            <input placeholder={localizeText("you@example.com")} className="w-full border border-line bg-white px-3 py-2 text-[13px] outline-none" />
            <button className="bg-ink px-4 text-[13px] font-medium text-paper">{localizeText("Join")}</button>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-2 px-5 py-4 text-[12px] text-ink-faint">
          <span>{localizeText("© 2026 Learn Studio")}</span>
          <span>{localizeText("Set in Instrument Serif & DM Sans")}</span>
        </div>
      </div>
    </footer>);

}
