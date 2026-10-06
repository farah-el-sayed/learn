import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { Link } from 'react-router-dom';
import { activity } from '../data/dash.js';
import ActivityTimeline from '../components/ActivityTimeline.jsx';
import AssignmentCard from '../components/AssignmentCard.jsx';
import QuizCard from '../components/QuizCard.jsx';

export function Upcoming({ assignments, quizzes }) {useTranslation();
  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h2 className="font-serif text-[22px]">{localizeText("Upcoming")}</h2>
        <Link to="/assignments" className="text-[13px] font-medium underline">{localizeText("All")}</Link>
      </div>
      <div className="mt-4 border-t border-line">
        {localizeText(assignments.map((a) => <AssignmentCard key={a.id} assignment={a} compact />))}
        {localizeText(quizzes.slice(0, 2).map((q) => <QuizCard key={q.id} quiz={q} compact />))}
      </div>
    </section>);

}

export function RecentActivity() {useTranslation();
  return <ActivityTimeline title={localizeText("Recent activity")} items={activity} />;
}
