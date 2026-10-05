import { Link } from 'react-router-dom'
import { Check, Lock, Play } from 'lucide-react'

// Every module/lesson list in the project: the lesson player sidebar and the
// course-detail catalogue both render through this component.
// variant 'player'    — bordered, scrollable, with done / current / locked states
// variant 'catalogue' — two-column editorial rows used on the course page
export function LessonList({
  syllabus = [],
  courseId,
  currentLessonId,
  doneIds = [],
  lockedAfter,
  variant = 'player',
  heading = 'Curriculum',
  scrollable = true,
  className = '',
  moduleClassName = '',
  rowClassName = '',
}) {
  const lessonTo = id => (courseId ? `/courses/${courseId}/lessons/${id}` : undefined)
  let counter = 0

  if (variant === 'catalogue') {
    return (
      <div className={`border-t border-line ${className}`.trim()}>
        {syllabus.map((m, mi) => (
          <div key={m.id} className={`grid gap-4 border-b border-line py-6 md:grid-cols-[200px_1fr] ${moduleClassName}`.trim()}>
            <div>
              <p className="font-serif text-[14px] text-ink-faint">Module {mi + 1}</p>
              <p className="mt-1 text-[15px] font-medium">{m.title}</p>
            </div>
            <div>
              {m.lessons.map((l, li) => {
                const done = doneIds.includes(l.id)
                return (
                  <Link key={l.id} to={lessonTo(l.id)} className="group flex items-baseline gap-4 border-t border-line py-3 first:border-0">
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center border ${done ? 'border-pine bg-pine text-paper' : 'border-line'}`}>
                      {done && <Check size={11} />}
                    </span>
                    <span className="font-serif text-[13px] text-ink-faint">{String(li + 1).padStart(2, '0')}</span>
                    <span className="flex-1 text-[14.5px] group-hover:underline">{l.title}</span>
                    <span className="text-[12px] text-ink-faint">{l.kind} · {l.length}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const scroll = scrollable
    ? 'max-h-[55vh] overflow-y-auto sm:max-h-[70vh]'
    : ''

  return (
    <nav className={`border border-line bg-white ${className}`.trim()} aria-label={heading}>
      {heading && (
        <p className="border-b border-line px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">{heading}</p>
      )}
      <div className={scroll}>
        {syllabus.map(m => (
          <div key={m.id} className={`border-b border-line last:border-0 ${moduleClassName}`.trim()}>
            <p className="bg-paper px-4 py-2.5 text-[12px] font-semibold text-ink-soft">{m.title}</p>
            {m.lessons.map(l => {
              counter += 1
              const done = doneIds.includes(l.id)
              const current = l.id === currentLessonId
              const locked = lockedAfter != null && counter > lockedAfter
              const row = `flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[13px] ${rowClassName}`.trim()
              const inner = (
                <>
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center border ${done ? 'border-pine bg-pine text-paper' : current ? 'border-pine' : 'border-line text-ink-faint'}`}>
                    {done ? <Check size={11} /> : locked ? <Lock size={10} /> : current ? <Play size={10} /> : <span className="text-[10px]">{counter}</span>}
                  </span>
                  <span className={`flex-1 leading-snug ${current ? 'font-medium' : locked ? 'text-ink-faint' : ''}`.trim()}>{l.title}</span>
                  <span className="shrink-0 text-[11px] text-ink-faint">{l.length}</span>
                </>
              )
              if (locked) return <div key={l.id} className={`${row} cursor-not-allowed opacity-60`}>{inner}</div>
              return (
                <Link key={l.id} to={lessonTo(l.id)} className={`${row} hover:bg-paper ${current ? 'bg-paper' : ''}`.trim()}>
                  {inner}
                </Link>
              )
            })}
          </div>
        ))}
      </div>
    </nav>
  )
}

export default LessonList
