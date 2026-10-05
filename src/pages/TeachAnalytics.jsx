import { analytics } from '../data/roles.js'
import StatCard from '../components/StatCard.jsx'
import { PageHead } from '../components/PageHead.jsx'
import { Bars, Line, ChartCard } from './TeachCharts.jsx'

export default function TeachAnalytics() {
  return (
    <div className="mx-auto max-w-shell px-5 py-14">
      <PageHead kicker="Instructor" title="Analytics" lede="Minimal numbers for better teaching." size="lg" />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <ChartCard title="Student enrollment" sub="6 weeks">
          <Bars data={analytics.enrolments} color="bg-pine" />
          <p className="mt-3 text-[12px] text-ink-faint">Jan — Jun · steady growth</p>
        </ChartCard>
        <ChartCard title="Course completion" sub={`${analytics.completionAvg}% average`}>
          <Line data={analytics.completion} />
          <p className="mt-3 text-[12px] text-ink-faint">Completion rate trending up</p>
        </ChartCard>
        <ChartCard title="Learning activity" sub="This week">
          <Bars data={analytics.activity} color="bg-sage" />
          <p className="mt-3 text-[12px] text-ink-faint">Daily active learners · Mon — Sun</p>
        </ChartCard>
        <StatCard
          variant="ruled"
          valueClassName="text-[30px]"
          items={[
            ['Avg. quiz score', `${analytics.avgQuiz}%`],
            ['Active learners', analytics.active.toLocaleString()],
            ['Completion', `${analytics.completionAvg}%`],
          ]}
        />
      </div>
    </div>
  )
}

