import { Link } from 'react-router-dom'
import { Check, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import Button from './Button.jsx'

// The lesson player shell: media frame, lesson header, tab content (children),
// completion action and prev/next navigation.
export function CoursePlayer({
  course,
  lesson,
  index = 0,
  total = 1,
  done = false,
  onToggle,
  onComplete,
  actions,
  prev,
  next,
  mediaLabel,
  className = '',
  children,
}) {
  if (!course || !lesson) return null
  const complete = onToggle || onComplete
  const mediaImage = lesson.mediaImage || course.coverImage
  const lessonTo = l => (l ? `/courses/${course.id}/lessons/${l.id}` : undefined)

  return (
    <article id="lesson-player" className={`min-w-0 scroll-mt-24 ${className}`.trim()}>
      <div className="relative isolate flex aspect-video flex-col items-start justify-end overflow-hidden border border-line p-4 sm:p-6" style={{ background: course.coverTone }}>
        {mediaImage && <img src={mediaImage} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />}
        <span className="absolute inset-0 bg-black/35" aria-hidden="true" />
        <span className="relative z-10 bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-widest text-ink-soft">
          Lesson {index + 1} of {total}
        </span>
        <button
          type="button"
          onClick={() => {
            const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
            document.getElementById('lesson-content')?.scrollIntoView({ behavior, block: 'start' })
          }}
          className="relative z-10 mt-3 flex h-10 w-10 items-center justify-center bg-pine text-paper transition hover:bg-pine-deep focus-ring sm:h-12 sm:w-12"
          aria-label="Start lesson"
          title="Start lesson"
        >
          <Play size={18} />
        </button>
        <p className="relative z-10 mt-3 text-[12.5px] text-white">{mediaLabel || `${lesson.kind} · ${lesson.length} · lesson content below`}</p>
      </div>

      <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-clay">{course.title}</p>
      <h1 className="mt-2 font-serif text-[32px] leading-tight md:text-[38px]">{lesson.title}</h1>
      <p className="mt-2 text-[13px] text-ink-muted">
        {lesson.kind} · {lesson.length}{course.instructor?.name ? ` · by ${course.instructor.name}` : ''}
      </p>

      {children}

      {(complete || actions) && (
        <div className="flex flex-wrap gap-3 border-t border-line pt-5">
          {complete && (
            <Button variant={done ? 'primary' : 'ink'} size="lg" icon={done ? Check : undefined} onClick={complete}>
              {done ? 'Completed' : 'Mark as Complete'}
            </Button>
          )}
          {actions}
        </div>
      )}

      {(prev || next) && (
        <div className="mt-5 flex justify-between border-t border-line pt-5">
          {prev ? (
            <Link to={lessonTo(prev)} className="flex items-center gap-1 text-[13.5px] font-medium">
              <ChevronLeft size={15} /> Previous
            </Link>
          ) : <span />}
          {next && (
            <Link to={lessonTo(next)} className="flex items-center gap-1 text-[13.5px] font-medium">
              Next <ChevronRight size={15} />
            </Link>
          )}
        </div>
      )}
    </article>
  )
}

export default CoursePlayer
