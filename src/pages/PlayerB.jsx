import { useState } from 'react'
import { FileText } from 'lucide-react'
import Button from '../components/Button.jsx'
import CoursePlayer from '../components/CoursePlayer.jsx'

export function LessonMain({ course, lesson, idx, all, done, toggle, note, setNote }) {
  const [tab, setTab] = useState('lesson')
  return (
    <CoursePlayer
      course={course}
      lesson={lesson}
      index={idx}
      total={all.length}
      done={done}
      onToggle={toggle}
      prev={idx > 0 ? all[idx - 1] : null}
      next={idx < all.length - 1 ? all[idx + 1] : null}
      actions={<Button variant="outline" to="/quiz/q-contrast" className="underline underline-offset-4">Take quiz</Button>}
    >
      <div id="lesson-content" className="scroll-mt-24">
        <div className="mt-5 flex gap-5 border-b border-line text-[13.5px] font-medium" role="tablist">
          {[['lesson', 'Lesson'], ['resources', 'Resources'], ['notes', 'Notes']].map(([id, l]) => (
            <button key={id} onClick={() => setTab(id)} className={`pb-2.5 ${tab === id ? 'border-b-2 border-ink text-ink' : 'text-ink-muted'}`} role="tab" aria-selected={tab === id} aria-controls={`${id}-panel`} id={`${id}-tab`}>{l}</button>
          ))}
        </div>
        {tab === 'lesson' && (
          <div id="lesson-panel" role="tabpanel" aria-labelledby="lesson-tab" className="space-y-4 py-6 text-[15px] leading-[1.8] text-ink-soft">
            <p><span className="float-left mr-2 font-serif text-[44px] leading-[0.9] text-ink">E</span>very page makes a promise about what matters. Most pages break it — everything shouts, so nothing is heard. This lesson keeps the promise.</p>
            <p>Begin by naming the single idea this page must carry. Write it in one sentence. If you cannot, the reader will not find it either.</p>
            <p>Then give that idea room: size, weight, or solitude. Reduce the rest without apology. Restraint reads as confidence.</p>
            <div className="border-l-2 border-clay bg-white px-4 py-3 text-[14px]">Exercise — take any page you made and remove a third of it. Read it again. Keep what survived.</div>
          </div>
        )}
        {tab === 'resources' && (
          <div id="resources-panel" role="tabpanel" aria-labelledby="resources-tab" className="space-y-0 py-2">
            {[['Reading — Hierarchy before style (PDF)', '8 pages'], ['Worksheet — Contrast pairs', '1 page'], ['Transcript — this lesson', 'Text']].map(([t, m]) => (
              <div key={t} className="flex items-center gap-3 border-b border-line py-3.5 text-[13.5px]">
                <FileText size={15} className="text-ink-faint" /><span className="flex-1">{t}</span><span className="text-[12px] text-ink-faint">{m}</span>
              </div>
            ))}
          </div>
        )}
        {tab === 'notes' && (
          <div id="notes-panel" role="tabpanel" aria-labelledby="notes-tab" className="py-6">
            <label className="sr-only" htmlFor="lesson-notes">Lesson notes</label>
            <textarea id="lesson-notes" value={note} onChange={e => setNote(e.target.value)} rows={4} placeholder="Write one sentence in your own words…" className="w-full border border-line bg-white p-4 text-[14px] outline-none placeholder:text-ink-faint" aria-label="Lesson notes" />
            <p className="mt-2 text-[12px] text-ink-faint">Recall in your own words beats highlighting.</p>
          </div>
        )}
      </div>
    </CoursePlayer>
  )
}
