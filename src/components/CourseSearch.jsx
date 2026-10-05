import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import Button from './Button.jsx'
import useDismiss from '../hooks/useDismiss.js'

export default function CourseSearch() {
  const { courses } = useApp()
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [open, setOpen] = useState(false)
  const containerRef = useDismiss({ open, onClose: () => setOpen(false) })
  const openRef = useRef(open)
  openRef.current = open
  const [query, setQuery] = useState('')
  const term = query.trim().toLowerCase()
  const results = (term
    ? courses.filter(course => [course.title, course.subtitle, course.description, course.category, course.instructor.name].join(' ').toLowerCase().includes(term))
    : courses
  ).slice(0, 5)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // "/" opens search from anywhere, the way a search-led product should.
  useEffect(() => {
    const onKeyDown = event => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target
      if (target?.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName)) return
      event.preventDefault()
      setOpen(true)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const closeOutside = event => {
      if (!openRef.current || containerRef.current?.contains(event.target)) return
      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()
      setOpen(false)
    }
    document.addEventListener('click', closeOutside, true)
    return () => document.removeEventListener('click', closeOutside, true)
  }, [containerRef])

  const submitSearch = event => {
    event.preventDefault()
    const value = query.trim()
    setOpen(false)
    navigate(value ? `/courses?q=${encodeURIComponent(value)}` : '/courses')
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Collapses to a plain icon on narrow screens, opens into a real field from md up. */}
      <Button
        variant="ghost"
        size="plain"
        icon={Search}
        className={`h-9 gap-2 whitespace-nowrap border border-line bg-surface-deep px-2.5 py-2 text-[13px] text-ink-muted transition hover:border-ink/25 hover:bg-surface-deep hover:text-ink md:w-60 md:justify-start lg:w-72 ${open ? 'relative z-[60] border-pine text-ink' : ''}`}
        onClick={() => setOpen(value => !value)}
        aria-label="Search courses"
        title="Search courses"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="hidden md:inline">Search courses, topics, instructors…</span>
        <kbd className="hidden border border-line px-1.5 py-0.5 font-sans text-[11px] text-ink-faint lg:inline" aria-hidden="true">/</kbd>
      </Button>

      {open && (
        <div
          role="dialog"
          aria-label="Search courses"
          className="absolute right-0 top-full z-50 mt-2 flex max-h-[85vh] w-[min(24rem,calc(100vw-2rem))] flex-col border border-line bg-white shadow-subtle md:right-auto md:left-1/2 md:-translate-x-1/2"
        >
          <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-clay">Course search</p>
              <p className="mt-1 font-serif text-[22px] leading-snug">Find a course</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="shrink-0 border border-line p-1.5 text-ink-muted hover:text-ink"
              aria-label="Close search"
            >
              <X size={14} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <form onSubmit={submitSearch} className="flex items-center gap-3 border-b border-line pb-3">
              <Search size={17} className="shrink-0 text-ink-faint" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Title, topic, or instructor"
                className="min-w-0 flex-1 bg-transparent py-2 text-[15px] text-ink outline-none placeholder:text-ink-faint"
                aria-label="Search by title, topic, or instructor"
              />
              <Button type="submit" size="sm" variant="primary">Search</Button>
            </form>
            <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
              {term ? `${results.length} matching ${results.length === 1 ? 'course' : 'courses'}` : 'Popular courses'}
            </p>
            {results.length ? (
              <div className="divide-y divide-line">
                {results.map(course => (
                  <Link
                    key={course.id}
                    to={`/courses/${course.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between gap-4 py-3 hover:text-pine"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-serif text-[18px]">{course.title}</span>
                      <span className="mt-1 block truncate text-[12px] text-ink-muted">{course.category} · {course.level} · {course.duration.split(',')[0]}</span>
                    </span>
                    <ArrowUpRight size={16} className="shrink-0 text-ink-faint" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-[13px] text-ink-muted">No courses match that search.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}