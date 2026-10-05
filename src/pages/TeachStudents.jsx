import { useState } from 'react'
import { instructorStudents } from '../data/roles.js'
import Badge from '../components/Badge.jsx'
import Input from '../components/Input.jsx'
import { ProgressBar } from '../components/ProgressBar.jsx'
import { PageHead } from '../components/PageHead.jsx'

export default function TeachStudents() {
  const [q, setQ] = useState('')
  const list = instructorStudents.filter(s => s.name.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="mx-auto max-w-shell px-5 py-14">
      <PageHead kicker="Instructor" title="Students" lede="Progress, last activity, and completion — one calm table." size="lg" />
      <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search students…" className="mt-6 max-w-xs" label="Search students" />
      <div className="mt-6 border-t border-line">
        <div className="hidden grid-cols-[1fr_140px_120px_110px] gap-6 border-b border-line py-3 text-[11.5px] font-semibold uppercase tracking-widest text-ink-faint sm:grid">
          <span>Student</span><span>Progress</span><span>Last activity</span><span>Status</span>
        </div>
        {list.map(s => {
          const status = s.progress >= 80 ? 'On track' : s.progress >= 40 ? 'In progress' : 'At risk'
          return (
            <div key={s.id} className="grid gap-2 border-b border-line py-4 sm:grid-cols-[1fr_140px_120px_110px] sm:items-center sm:gap-6">
              <div><p className="text-[14.5px] font-medium">{s.name}</p><p className="text-[12.5px] text-ink-muted">{s.course}</p></div>
              <div className="flex items-center gap-2">
                <ProgressBar value={s.progress} className="w-20" />
                <span className="text-[12.5px] text-ink-muted">{s.progress}%</span>
              </div>
              <span className="text-[13px] text-ink-muted">{s.lastActive}</span>
              <Badge status={status} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

