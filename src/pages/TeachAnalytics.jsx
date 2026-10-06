import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { analytics } from '../data/roles.js';
import StatCard from '../components/StatCard.jsx';
import { PageHead } from '../components/PageHead.jsx';
import { Bars, Line, ChartCard } from './TeachCharts.jsx';

export default function TeachAnalytics() {useTranslation();
  return (
    <div className="mx-auto max-w-shell px-5 py-14">
      <PageHead kicker="Instructor" title={localizeText("Analytics")} lede="Minimal numbers for better teaching." size="lg" />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <ChartCard title={localizeText("Student enrollment")} sub="6 weeks">
          <Bars data={analytics.enrolments} color="bg-pine" />
          <p className="mt-3 text-[12px] text-ink-faint">{localizeText("Jan — Jun · steady growth")}</p>
        </ChartCard>
        <ChartCard title={localizeText("Course completion")} sub={`${analytics.completionAvg}% average`}>
          <Line data={analytics.completion} />
          <p className="mt-3 text-[12px] text-ink-faint">{localizeText("Completion rate trending up")}</p>
        </ChartCard>
        <ChartCard title={localizeText("Learning activity")} sub="This week">
          <Bars data={analytics.activity} color="bg-sage" />
          <p className="mt-3 text-[12px] text-ink-faint">{localizeText("Daily active learners · Mon — Sun")}</p>
        </ChartCard>
        <StatCard
          variant="ruled"
          valueClassName="text-[30px]"
          items={[
          ['Avg. quiz score', `${analytics.avgQuiz}%`],
          ['Active learners', analytics.active.toLocaleString()],
          ['Completion', `${analytics.completionAvg}%`]]
          } />
        
      </div>
    </div>);

}
