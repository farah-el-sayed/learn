import { useApp } from '../context/AppContext.jsx'
import Badge from '../components/Badge.jsx'
import { SectionHead } from '../components/Cards.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { FileText } from 'lucide-react'

export default function Grades() {
  const { grades } = useApp()
  return (
    <div className="mx-auto max-w-shell px-5 py-14">
      <SectionHead kicker="Student" title="Grades" lede="A plain record. No streaks, no noise." />
      <div className="max-w-3xl border-t border-line">
        {grades.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No grades yet"
            lede="Complete quizzes and assignments to see your grades here."
          />
        ) : (
          <>
            <div className="grid grid-cols-[1fr_auto_auto] gap-6 border-b border-line py-3 text-[12px] font-semibold uppercase tracking-widest text-ink-faint">
              <span>Item</span><span>Score</span><span>Grade</span>
            </div>
            {grades.map(g => (
              <div key={g.id} className="grid grid-cols-[1fr_auto_auto] items-baseline gap-6 border-b border-line py-4">
                <div><p className="text-[14px] font-medium">{g.item}</p><p className="text-[12.5px] text-ink-muted">{g.course}</p></div>
                <span className="text-[13.5px]">{g.score}</span>
                <Badge tone="pine" size="md" className="font-semibold">{g.grade}</Badge>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
