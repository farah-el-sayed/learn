import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import { useToast } from '../components/Toast.jsx'

export default function TeachCourse() {
  const { id } = useParams()
  const { courses } = useApp()
  const { success, error } = useToast()
  const course = courses.find(c => c.id === id) || courses[0]
  const [modules, setModules] = useState(course.syllabus)
  const [qTitle, setQTitle] = useState('')
  const [qTitleError, setQTitleError] = useState('')
  const addModule = () => {
    setModules(m => [...m, { id: 'm' + Date.now(), title: 'New module', lessons: [] }])
  }
  const addLesson = (mid) => {
    setModules(m => m.map(x => x.id === mid ? { ...x, lessons: [...x.lessons, { id: 'l' + Date.now(), title: 'Untitled lesson', length: '10 min', kind: 'Lesson' }] } : x))
  }
  const addQuiz = () => {
    if (!qTitle.trim()) {
      setQTitleError('Quiz title is required.')
      return
    }
    if (qTitle.trim().length < 3) {
      setQTitleError('Quiz title must be at least 3 characters.')
      return
    }
    setQTitleError('')
    setQTitle('')
    success('Quiz draft added successfully!')
  }
  return (
    <div className="mx-auto max-w-shell px-5 py-14">
      <Link to="/teach" className="text-[13px] text-ink-muted underline">Back to courses</Link>
      <h1 className="mt-3 font-serif text-[34px]">Edit — {course.title}</h1>
      <p className="mt-2 max-w-xl text-[14px] text-ink-muted">Modules, lessons, and quizzes. Changes save as drafts until you publish.</p>
      <div className="mt-8 grid gap-8 md:grid-cols-12">
        <div className="space-y-5 md:col-span-7">
          {modules.map(m => (
            <div key={m.id} className="border border-line bg-white p-6">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-serif text-[19px]">{m.title}</p>
                <Button variant="link" size="plain" icon={Plus} onClick={() => addLesson(m.id)}>Lesson</Button>
              </div>
              <div className="mt-3 border-t border-line">
                {m.lessons.map(l => (
                  <div key={l.id} className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-[13.5px]">
                    <span>{l.title}</span><span className="text-[12px] text-ink-faint">{l.kind} · {l.length}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Button variant="outline" size="md" icon={Plus} onClick={addModule}>Add module</Button>
        </div>
        <div className="md:col-span-5">
          <div className="border border-line bg-white p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-faint">Quiz builder</p>
            <Input 
              value={qTitle} 
              onChange={e => {
                setQTitle(e.target.value)
                if (qTitleError) setQTitleError('')
              }} 
              placeholder="Quiz title…" 
              tone="paper" 
              className="mt-3" 
              label="Quiz title" 
              error={qTitleError}
            />
            <Button variant="ink" size="md" className="mt-3" onClick={addQuiz}>Add quiz draft</Button>
            <p className="mt-3 text-[12.5px] text-ink-muted">Quizzes appear to students after the linked lesson.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
