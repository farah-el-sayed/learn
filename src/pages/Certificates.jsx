import { Award, BookOpen } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import Button from '../components/Button.jsx'
import { ProgressBar } from '../components/ProgressBar.jsx'
import { SectionHead } from '../components/Cards.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function Certificates() {
  const { certificates, profile } = useApp()
  return (
    <div className="mx-auto max-w-shell px-5 py-14">
      <SectionHead kicker="Student" title="Certificates" lede="Earned slowly. Kept permanently." />
      {certificates.length === 0 ? (
        <EmptyState
          icon={Award}
          title="No certificates yet"
          lede="Complete courses and quizzes to earn your certificates. They'll appear here permanently."
          action={
            <Button variant="primary" to="/courses">
              Browse courses
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {certificates.map(c => (
            <div key={c.id} className="border border-line bg-white p-10 text-center">
              <Award size={28} className="mx-auto text-clay" />
              <p className="mt-4 text-[12px] uppercase tracking-[0.18em] text-ink-faint">Certificate of completion</p>
              <p className="mt-3 font-serif text-[28px]">{c.course}</p>
              <p className="mt-2 text-[13.5px] text-ink-muted">Awarded to {profile.name} · {c.date}</p>
              <p className="mt-4 text-[12px] text-ink-faint">Ref {c.code}</p>
              <Button variant="quiet" size="lg" className="mt-6">Download PDF</Button>
            </div>
          ))}
          <div className="border border-dashed border-line p-10">
            <p className="font-serif text-[22px]">Next: Design Foundations</p>
            <p className="mt-2 text-[13.5px] text-ink-muted">Finish the menu project and the final quiz to unlock your second certificate.</p>
            <ProgressBar value={38} tone="clay" className="mt-4" />
            <p className="mt-2 text-[12px] text-ink-faint">38% complete</p>
          </div>
        </div>
      )}
    </div>
  )
}
