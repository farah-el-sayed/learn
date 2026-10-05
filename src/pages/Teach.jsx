import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, BookOpen } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import Button from '../components/Button.jsx'
import { TeachOverview } from './TeachOv.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useToast } from '../components/Toast.jsx'

export default function Teach() {
  const { courses } = useApp()
  const { success, error } = useToast()
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('')
  const [list, setList] = useState(courses.slice(0, 3))

  const create = () => {
    // Validation
    if (!title.trim()) {
      setTitleError('Course title is required.')
      return
    }
    if (title.trim().length < 3) {
      setTitleError('Course title must be at least 3 characters.')
      return
    }

    setTitleError('')
    setList([{ id: 'draft-' + Date.now(), title: title.trim(), subtitle: 'Draft — outline first', category: 'Draft', level: '—', duration: '—', rating: '—', learners: 0, progress: 0, coverTone: '#EAE6DB', description: 'Draft.', instructor: { name: 'You' }, syllabus: [] }, ...list])
    setTitle('')
    success('Course created successfully!')
  }
  return (
    <div className="mx-auto max-w-shell px-5 py-14">
      <TeachOverview />
      <div className="mt-14 flex items-baseline justify-between">
        <h2 className="font-serif text-[26px]">Courses</h2>
        <Link to="/teach/analytics" className="text-[13px] font-medium underline">Analytics</Link>
      </div>
      <div className="mt-5 flex gap-2 border border-line bg-white p-3">
        <div className="flex-1">
          <input 
            value={title} 
            onChange={e => {
              setTitle(e.target.value)
              if (titleError) setTitleError('')
            }} 
            placeholder="Name a new course…" 
            className={`w-full bg-transparent px-3 py-2 text-[14px] outline-none placeholder:text-ink-faint ${titleError ? 'border-b-2 border-clay' : ''}`} 
            aria-label="New course name" 
          />
          {titleError && <p className="mt-1 text-[12px] text-clay-deep">{titleError}</p>}
        </div>
        <Button variant="primary" size="md" icon={Plus} onClick={create}>Create course</Button>
      </div>
      <div className="mt-6 border-t border-line">
        {list.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No courses yet"
            lede="Create your first course to start teaching. Add modules, lessons, and quizzes."
          />
        ) : (
          list.map((c, i) => (
            <div key={c.id} className="flex flex-wrap items-baseline gap-4 border-b border-line py-5">
              <span className="font-serif text-[13px] text-ink-faint">0{i + 1}</span>
              <div className="min-w-0 flex-1">
                <Link to={`/teach/courses/${c.id}`} className="font-serif text-[20px] hover:underline">{c.title}</Link>
                <p className="text-[13px] text-ink-muted">{c.subtitle}</p>
              </div>
              <Link to={`/teach/courses/${c.id}`} className="text-[13px] font-medium underline">Edit · modules · lessons · quizzes</Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

