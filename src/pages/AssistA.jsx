import { useState } from 'react'
import { Send, Plus, BookOpen } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { tutorReply, suggestedActions } from '../data/tutor.js'
export function ThreadList({ threads, thread, setActiveThreadId }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-faint">Conversations</p>
        <p className="text-[12px] text-ink-faint">{threads.length}</p>
      </div>
      <div className="mt-3 border-t border-line">
        {threads.map(t => (
          <button key={t.id} onClick={() => setActiveThreadId(t.id)} className={`block w-full border-b border-line py-3 text-left ${t.id === thread?.id ? 'border-l-2 border-l-pine pl-3' : ''}`}>
            <p className="text-[13.5px] font-medium">{t.title}</p>
            <p className="mt-0.5 text-[12px] text-ink-muted">{t.updatedAt} · {t.messages.length} messages</p>
          </button>
        ))}
      </div>
    </div>
  )
}
