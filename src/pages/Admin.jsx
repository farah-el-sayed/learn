import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { Link } from 'react-router-dom';
import { analytics, platformUsers } from '../data/roles.js';
import StatCard from '../components/StatCard.jsx';
import { PageHead } from '../components/PageHead.jsx';

export default function Admin() {useTranslation();
  return (
    <div>
      <PageHead
        kicker="Admin"
        title={localizeText("Platform overview")}
        align="end"
        actions={<Link to="/admin/users" className="text-[13.5px] font-medium underline">{localizeText("Manage users")}</Link>} />
      
      <StatCard
        className="mt-8"
        variant="plain"
        cols={4}
        items={[
        ['Learners', '42,318'],
        ['Instructors', '18'],
        ['Courses', '6'],
        ['Completion', `${analytics.completionAvg}%`]]
        } />
      
      <p className="mt-10 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-faint">{localizeText("Recent members")}</p>
      <div className="mt-3 border-t border-line">
        {localizeText(platformUsers.slice(0, 3).map((u) =>
        <div key={u.id} className="flex items-baseline justify-between border-b border-line py-3.5 text-[14px]">
            <span className="font-medium">{localizeText(u.name)} <span className="font-normal text-ink-muted">{localizeText("·")}{localizeText(" ")}{localizeText(u.role)}</span></span>
            <span className="text-[12.5px] text-ink-faint">{localizeText(u.status)}</span>
          </div>
        ))}
      </div>
    </div>);

}
