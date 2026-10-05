import { useApp } from '../context/AppContext.jsx'
import AssignmentCard from '../components/AssignmentCard.jsx'
import { SectionHead } from '../components/Cards.jsx'
import { useToast } from '../components/Toast.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { ClipboardList } from 'lucide-react'

export default function Assignments() {
  const { assignments } = useApp()
  const { success } = useToast()
  
  const handleSubmit = (assignmentId) => {
    success('Assignment submitted successfully!')
  }

  return (
    <div className="mx-auto max-w-shell px-5 py-14">
      <SectionHead kicker="Student" title="Assignments" lede="What is due, what is done, and what needs one quiet hour." />
      <div className="border-t border-line">
        {assignments.length === 0 ? (
          <EmptyState
            icon={ClipboardList}
            title="No upcoming assignments"
            lede="You're all caught up! Enjoy your free time or explore new courses."
            action={
              <a href="/courses" className="inline-block border border-line bg-white px-6 py-3 text-[14px] font-medium hover:border-ink">
                Browse courses
              </a>
            }
          />
        ) : (
          assignments.map(a => <AssignmentCard key={a.id} assignment={a} onSubmit={handleSubmit} />)
        )}
      </div>
    </div>
  )
}
