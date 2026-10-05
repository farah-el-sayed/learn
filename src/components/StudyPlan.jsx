import { useApp } from '../context/AppContext.jsx'
import Select from './Select.jsx'
import Button from './Button.jsx'

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const goals = [
  { value: 'finish', label: 'Finish a course' },
  { value: 'habit', label: 'Build a steady habit' },
  { value: 'review', label: 'Review what I learned' },
]

export default function StudyPlan() {
  const { studyPlan, setStudyPlan, courses, enrolledIds, completedLessons } = useApp()
  const enrolled = courses.filter(course => enrolledIds.includes(course.id))
  const selectedCourse = enrolled.find(course => course.id === studyPlan.courseId) || enrolled[0]
  const lessons = selectedCourse?.syllabus.flatMap(module => module.lessons).filter(lesson => !(completedLessons[selectedCourse.id] || []).includes(lesson.id)) || []
  const selectedDays = weekdays.filter(day => studyPlan.days.includes(day))

  const updatePlan = changes => setStudyPlan(plan => ({ ...plan, ...changes }))
  const toggleDay = day => {
    const days = studyPlan.days.includes(day)
      ? studyPlan.days.filter(value => value !== day)
      : [...studyPlan.days, day]
    updatePlan({ days: weekdays.filter(value => days.includes(value)) })
  }

  return (
    <section className="mt-12 border-y border-line py-7" aria-labelledby="study-plan-heading">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-clay">A rhythm that fits</p>
          <h2 id="study-plan-heading" className="mt-1 font-serif text-[26px]">Your weekly plan</h2>
        </div>
        <p className="text-[13px] text-ink-muted">{selectedDays.length} sessions · {studyPlan.minutes} minutes each</p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <label className="grid gap-1 text-[12px] font-medium text-ink-muted">
          Goal
          <Select value={studyPlan.goal} onChange={event => updatePlan({ goal: event.target.value })} size="sm" aria-label="Weekly learning goal">
            {goals.map(goal => <option key={goal.value} value={goal.value}>{goal.label}</option>)}
          </Select>
        </label>
        <label className="grid gap-1 text-[12px] font-medium text-ink-muted">
          Course
          <Select
            value={selectedCourse?.id || ''}
            onChange={event => updatePlan({ courseId: event.target.value })}
            size="sm"
            disabled={!enrolled.length}
            aria-label="Choose a course for your plan"
          >
            {enrolled.length ? enrolled.map(course => <option key={course.id} value={course.id}>{course.title}</option>) : <option value="">No active courses</option>}
          </Select>
        </label>
        <label className="grid gap-1 text-[12px] font-medium text-ink-muted">
          Session length
          <Select value={studyPlan.minutes} onChange={event => updatePlan({ minutes: Number(event.target.value) })} size="sm" aria-label="Minutes per study session">
            {[15, 30, 45, 60].map(minutes => <option key={minutes} value={minutes}>{minutes} minutes</option>)}
          </Select>
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-[12px] font-medium text-ink-muted">Study days</legend>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
          {weekdays.map(day => (
            <label key={day} className="flex items-center gap-2 border border-line px-2.5 py-2 text-[13px]">
              <input type="checkbox" checked={studyPlan.days.includes(day)} onChange={() => toggleDay(day)} className="accent-pine" />
              {day}
            </label>
          ))}
        </div>
      </fieldset>

      {selectedDays.length ? (
        <ol className="mt-5 border-t border-line">
          {selectedDays.map((day, index) => {
            const lesson = lessons[index % Math.max(lessons.length, 1)]
            const activity = studyPlan.goal === 'review'
              ? `Review notes and recall${lesson ? `: ${lesson.title}` : ''}`
              : studyPlan.goal === 'habit'
                ? 'A focused study session'
                : lesson?.title || 'Course complete; celebrate your progress.'
            return (
              <li key={day} className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-line py-3 text-[13px]">
                <span className="w-10 font-semibold text-ink-soft">{day}</span>
                <span className="min-w-0 flex-1 text-ink-muted">{selectedCourse ? `${selectedCourse.title} · ${activity}` : 'Choose a course to plan your next lesson.'}</span>
                <span className="text-ink-faint">{studyPlan.minutes} min</span>
              </li>
            )
          })}
        </ol>
      ) : (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <p className="text-[13px] text-ink-muted">Pick at least one day to build your schedule.</p>
          <Button variant="quiet" size="sm" onClick={() => updatePlan({ days: ['Mon', 'Wed', 'Fri'] })}>Use a 3-day rhythm</Button>
        </div>
      )}
    </section>
  )
}