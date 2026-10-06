import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { useApp } from '../context/AppContext.jsx';
import { ProgressBar } from '../components/ProgressBar.jsx';
import { PageHead } from '../components/PageHead.jsx';
export default function Progress() {useTranslation();
  const { courses, enrolledIds, completedLessons } = useApp();
  const list = courses.filter((c) => enrolledIds.includes(c.id));
  const total = list.reduce((a, c) => a + c.syllabus.flatMap((m) => m.lessons).length, 0);
  const done = list.reduce((sum, course) => sum + (completedLessons[course.id] || []).length, 0);
  return (
    <div>
      <PageHead kicker="Student" title={localizeText("Progress")} lede={`${done} of ${total} lessons · no streaks, just rhythm.`} />
      <div className="mt-8 max-w-2xl border-t border-line">
        {localizeText(list.map((c) => {
          const n = c.syllabus.flatMap((m) => m.lessons).length;
          const d = (completedLessons[c.id] || []).length;
          return (
            <div key={c.id} className="border-b border-line py-5">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-serif text-[19px]">{localizeText(c.title)}</p>
                <p className="text-[13px] text-ink-muted">{localizeText(d)}{localizeText(" ")}{localizeText("/")}{localizeText(" ")}{localizeText(n)}</p>
              </div>
              <ProgressBar value={Math.round(d / Math.max(1, n) * 100)} thickness={4} className="mt-3" />
            </div>);

        }))}
      </div>
    </div>);

}
