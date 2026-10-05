import { useState } from 'react'
import { platformUsers } from '../data/roles.js'
import Badge from '../components/Badge.jsx'
import Input from '../components/Input.jsx'
import { PageHead } from '../components/PageHead.jsx'

export default function AdminUsers() {
  const [users, setUsers] = useState(platformUsers)
  const [q, setQ] = useState('')
  const cycle = (id) => {
    setUsers(u => u.map(x => x.id === id ? { ...x, status: x.status === 'Active' ? 'Invited' : 'Active' } : x))
  }
  const list = users.filter(u => u.name.toLowerCase().includes(q.toLowerCase()))
  return (
    <div>
      <PageHead kicker="Admin" title="Users" lede="Members, roles, and access." />
      <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search members…" className="mt-6 max-w-xs" label="Search members" />
      <div className="mt-6 border-t border-line">
        {list.map(u => (
          <div key={u.id} className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line py-4">
            <div><p className="text-[14.5px] font-medium">{u.name}</p><p className="text-[12.5px] text-ink-muted">{u.role} · {u.courses} courses</p></div>
            <button type="button" onClick={() => cycle(u.id)} className="w-fit" title="Toggle access">
              <Badge status={u.status} size="md" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
