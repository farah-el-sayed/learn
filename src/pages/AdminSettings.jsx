import { useState } from 'react'
import { PageHead } from '../components/PageHead.jsx'

export default function AdminSettings() {
  const [s, setS] = useState({ enrolment: true, certificates: true, digest: false })
  const row = (key, title, desc) => (
    <div className="flex items-center justify-between gap-6 border-b border-line py-5">
      <div><p className="text-[14.5px] font-medium">{title}</p><p className="mt-1 text-[13px] text-ink-muted">{desc}</p></div>
      <button onClick={() => setS(p => ({ ...p, [key]: !p[key] }))} className={`h-6 w-11 px-0.5 ${s[key] ? 'bg-pine' : 'bg-line'}`}>
        <span className={`block h-5 w-5 bg-paper transition-all ${s[key] ? 'ml-5' : 'ml-0'}`} />
      </button>
    </div>
  )
  return (
    <div>
      <PageHead kicker="Admin" title="Settings" lede="Platform defaults. Changed rarely, on purpose." />
      <div className="mt-8 max-w-2xl border-t border-line">
        {row('enrolment', 'Open enrolment', 'Anyone may join a course without approval.')}
        {row('certificates', 'Certificates', 'Issue certificates on course completion.')}
        {row('digest', 'Weekly digest', 'Email every learner one idea each Sunday.')}
      </div>
    </div>
  )
}
