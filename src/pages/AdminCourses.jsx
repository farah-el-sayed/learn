import { useApp } from '../context/AppContext.jsx'
import Badge from '../components/Badge.jsx'
import { PageHead } from '../components/PageHead.jsx'

export default function AdminCourses() {
  const { courses } = useApp()
  return (
    <div>
      <PageHead kicker="Admin" title="Courses" lede="Catalogue status and ownership." />
      <div className="mt-8 border-t border-line">
        {courses.map((c, i) => (
          <div key={c.id} className="flex items-baseline gap-4 border-b border-line py-4">
            <span className="font-serif text-[13px] text-ink-faint">0{i + 1}</span>
            <div className="flex-1"><p className="text-[14.5px] font-medium">{c.title}</p><p className="text-[12.5px] text-ink-muted">{c.instructor.name} · {c.learners.toLocaleString()} learners</p></div>
            <Badge status="Live" size="md" />
          </div>
        ))}
      </div>
    </div>
  )
}
