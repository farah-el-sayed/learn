import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import Button from '../components/Button.jsx'
import { FeatureCourse, CourseRow, SectionHead } from '../components/Cards.jsx'
import Select from '../components/Select.jsx'
import EmptyState from '../components/EmptyState.jsx'
export default function Courses() {
  const { courses } = useApp()
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const [cat, setCat] = useState('All')
  const [level, setLevel] = useState('All')
  const [length, setLength] = useState('Any')
  const cats = ['All', ...new Set(courses.map(c => c.category))]
  const setQuery = value => {
    const params = new URLSearchParams(searchParams)
    if (value.trim()) params.set('q', value.trim())
    else params.delete('q')
    setSearchParams(params, { replace: true })
  }
  const list = courses.filter(c => {
    const weeks = Number(c.duration.match(/(\d+)\s*weeks?/i)?.[1] || 0)
    const matchesSearch = [c.title, c.subtitle, c.description, c.category, c.instructor.name].join(' ').toLowerCase().includes(q.trim().toLowerCase())
    const matchesLength = length === 'Any' || (length === 'short' && weeks <= 4) || (length === 'medium' && weeks >= 5 && weeks <= 6) || (length === 'long' && weeks > 6)
    return (cat === 'All' || c.category === cat) && (level === 'All' || c.level === level) && matchesLength && matchesSearch
  })
  const clearFilters = () => {
    setQuery('')
    setCat('All')
    setLevel('All')
    setLength('Any')
  }
  const [first, ...others] = list
  return (
    <div className="mx-auto max-w-shell px-5 py-14">
      <SectionHead kicker="Catalogue" title="All courses" lede="Small, serious courses. An editor’s shelf — one featured, the rest in index." />
      <div className="mb-10 border-y border-line py-4">
        <div className="grid gap-4 sm:grid-cols-[minmax(180px,1fr)_repeat(2,minmax(150px,200px))]">
          <label className="flex items-center gap-2 border-b border-line pb-2 sm:border-0 sm:pb-0">
            <Search size={14} className="text-ink-faint" />
            <input value={q} onChange={e => setQuery(e.target.value)} placeholder="Search courses…" className="min-w-0 flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-ink-faint" aria-label="Search courses" />
          </label>
          <label className="grid gap-1 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
            Level
            <Select value={level} onChange={e => setLevel(e.target.value)} size="sm" aria-label="Filter by level">
              <option value="All">All levels</option>
              {[...new Set(courses.map(c => c.level))].map(value => <option key={value} value={value}>{value}</option>)}
            </Select>
          </label>
          <label className="grid gap-1 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
            Duration
            <Select value={length} onChange={e => setLength(e.target.value)} size="sm" aria-label="Filter by duration">
              <option value="Any">Any length</option>
              <option value="short">Up to 4 weeks</option>
              <option value="medium">5–6 weeks</option>
              <option value="long">More than 6 weeks</option>
            </Select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {cats.map(c => (
            <Button key={c} variant={cat === c ? 'ink' : 'ghost'} size="sm" onClick={() => setCat(c)}>{c}</Button>
          ))}
          <p className="ml-auto text-[12px] text-ink-muted">{list.length} {list.length === 1 ? 'course' : 'courses'}</p>
          {(q || cat !== 'All' || level !== 'All' || length !== 'Any') && <Button variant="quiet" size="sm" onClick={clearFilters}>Clear filters</Button>}
        </div>
      </div>
      {first ? (
        <>
          <FeatureCourse course={first} index={0} />
          <div className="mt-10">
            {others.map((c, i) => <CourseRow key={c.id} course={c} index={i + 1} />)}
          </div>
        </>
      ) : (
        <EmptyState title="No courses found" lede="Try a different search or clear some filters." action={<Button variant="primary" onClick={clearFilters}>Clear filters</Button>} />
      )}
    </div>
  )
}
