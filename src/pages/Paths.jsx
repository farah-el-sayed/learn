import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { SectionHead } from '../components/Cards.jsx';
export default function Paths() {useTranslation();
  const { paths } = useApp();
  return (
    <div className="mx-auto max-w-shell px-5 py-12">
      <SectionHead kicker="Paths" title={localizeText("Follow a longer arc")} lede="Twelve weeks, one transformation." />
      <div className="grid gap-5 md:grid-cols-2">
        {localizeText(paths.map((p, i) =>
        <div key={p.id} className="overflow-hidden border border-line bg-white">
            <div className="relative h-40 overflow-hidden bg-cream">
              <img src={p.coverImage} alt="" loading="lazy" className="h-full w-full object-cover" />
              <span className="absolute inset-0 bg-black/25" aria-hidden="true" />
              <p className="absolute bottom-5 left-6 font-serif text-[15px] text-white">{localizeText("Path 0")}{localizeText(i + 1)}</p>
            </div>
            <div className="p-8">
              <h3 className="font-serif text-[26px] tracking-tight">{localizeText(p.title)}</h3>
              <p className="mt-2 text-[14px] text-ink-muted">{localizeText(p.desc)}{localizeText(" ")}{localizeText("·")}{localizeText(" ")}{localizeText(p.length)}</p>
              <Link to="/courses" className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-medium underline">{localizeText("Begin path")}{localizeText(" ")}<ArrowRight size={14} /></Link>
            </div>
          </div>
        ))}
      </div>
    </div>);

}
