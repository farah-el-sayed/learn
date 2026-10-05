import { Link } from 'react-router-dom'
import { activity } from '../data/dash.js'
import ActivityTimeline from '../components/ActivityTimeline.jsx'
import AssignmentCard from '../components/AssignmentCard.jsx'
import QuizCard from '../components/QuizCard.jsx'

export function Upcoming({ assignments, quizzes }) {
  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h2 className="font-serif text-[22px]">Upcoming</h2>
        <Link to="/assignments" className="text-[13px] font-medium underline">All</Link>
      </div>
      <div className="mt-4 border-t border-line">
        {assignments.map(a => <AssignmentCard key={a.id} assignment={a} compact />)}
        {quizzes.slice(0, 2).map(q => <QuizCard key={q.id} quiz={q} compact />)}
      </div>
    </section>
  )
}

export function RecentActivity() {
  return <ActivityTimeline title="Recent activity" items={activity} />
}
