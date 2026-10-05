import { Link } from 'react-router-dom'
import { analytics } from '../data/roles.js'
import { PageHead } from '../components/PageHead.jsx'
import { Bars, Line, ChartCard } from './TeachCharts.jsx'
export default function AdminAnalytics() {
  return (
    <div>
      <PageHead kicker="Admin" title="Analytics" lede="Platform health, minimal and honest." />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <ChartCard title="New learners" sub="6 weeks"><Bars data={analytics.enrolments} color="bg-pine" /></ChartCard>
        <ChartCard title="Completion" sub={`${analytics.completionAvg}%`}><Line data={analytics.completion} /></ChartCard>
        <ChartCard title="Revenue" sub="$7,350 total"><Bars data={analytics.revenue} color="bg-clay" /></ChartCard>
        <ChartCard title="Activity" sub="This week" link={<Link to="/admin/users" className="text-[13px] font-medium underline">Users</Link>}><Bars data={analytics.activity} color="bg-sage" /></ChartCard>
      </div>
    </div>
  )
}
