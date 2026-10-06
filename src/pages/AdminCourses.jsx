import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { useApp } from '../context/AppContext.jsx';
import Badge from '../components/Badge.jsx';
import { PageHead } from '../components/PageHead.jsx';

export default function AdminCourses() {useTranslation();
  const { courses } = useApp();
  return (
    <div>
      <PageHead kicker="Admin" title={localizeText("Courses")} lede="Catalogue status and ownership." />
      <div className="mt-8 border-t border-line">
        {localizeText(courses.map((c, i) =>
        <div key={c.id} className="flex items-baseline gap-4 border-b border-line py-4">
            <span className="font-serif text-[13px] text-ink-faint">{localizeText("0")}{localizeText(i + 1)}</span>
            <div className="flex-1"><p className="text-[14.5px] font-medium">{localizeText(c.title)}</p><p className="text-[12.5px] text-ink-muted">{localizeText(c.instructor.name)}{localizeText(" ")}{localizeText("·")}{localizeText(" ")}{localizeText(c.learners.toLocaleString())}{localizeText(" ")}{localizeText("learners")}</p></div>
            <Badge status="Live" size="md" />
          </div>
        ))}
      </div>
    </div>);

}
