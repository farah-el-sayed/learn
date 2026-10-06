import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { analytics } from '../data/roles.js';
import StatCard from '../components/StatCard.jsx';
import { PageHead } from '../components/PageHead.jsx';
import { Bars, ChartCard } from './TeachCharts.jsx';
export function TeachOverview() {useTranslation();
  const { courses } = useApp();
  const students = 1240;
  return (
    <div>
      <PageHead kicker="Instructor" title={localizeText("Good morning, Maya.")} lede="Your studio this week — quiet growth." size="xl" />
      <StatCard
        className="mt-8"
        cols={4}
        valueClassName="text-[30px]"
        items={[
        ['Total Students', students.toLocaleString()],
        ['Active Courses', String(courses.length)],
        ['Average Completion', `${analytics.completionAvg}%`],
        ['Course Revenue', '$7,350']]
        } />
      
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <ChartCard title={localizeText("Enrollment")} sub="+88 this week" link={<Link to="/teach/analytics" className="flex items-center gap-1 text-[13px] font-medium">{localizeText("Details")}{localizeText(" ")}<ArrowUpRight size={13} /></Link>}>
          <Bars data={analytics.enrolments} color="bg-pine" />
        </ChartCard>
        <ChartCard title={localizeText("Revenue")} sub="$1,680 · June" link={<Link to="/teach/analytics" className="flex items-center gap-1 text-[13px] font-medium">{localizeText("Details")}{localizeText(" ")}<ArrowUpRight size={13} /></Link>}>
          <Bars data={analytics.revenue} color="bg-clay" />
        </ChartCard>
      </div>
    </div>);

}
