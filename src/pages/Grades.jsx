import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { useApp } from '../context/AppContext.jsx';
import Badge from '../components/Badge.jsx';
import { SectionHead } from '../components/Cards.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { FileText } from 'lucide-react';

export default function Grades() {useTranslation();
  const { grades } = useApp();
  return (
    <div className="mx-auto max-w-shell px-5 py-14">
      <SectionHead kicker="Student" title={localizeText("Grades")} lede="A plain record. No streaks, no noise." />
      <div className="max-w-3xl border-t border-line">
        {localizeText(grades.length === 0 ?
        <EmptyState
          icon={FileText}
          title={localizeText("No grades yet")}
          lede="Complete quizzes and assignments to see your grades here." /> :


        <>
            <div className="grid grid-cols-[1fr_auto_auto] gap-6 border-b border-line py-3 text-[12px] font-semibold uppercase tracking-widest text-ink-faint">
              <span>{localizeText("Item")}</span><span>{localizeText("Score")}</span><span>{localizeText("Grade")}</span>
            </div>
            {grades.map((g) =>
          <div key={g.id} className="grid grid-cols-[1fr_auto_auto] items-baseline gap-6 border-b border-line py-4">
                <div><p className="text-[14px] font-medium">{localizeText(g.item)}</p><p className="text-[12.5px] text-ink-muted">{localizeText(g.course)}</p></div>
                <span className="text-[13.5px]">{localizeText(g.score)}</span>
                <Badge tone="pine" size="md" className="font-semibold">{localizeText(g.grade)}</Badge>
              </div>
          )}
          </>)
        }
      </div>
    </div>);

}
