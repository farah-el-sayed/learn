import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar.jsx'
import LessonList from '../components/LessonList.jsx'

export function CurriculumFull({ course, done }) {
  const total = course.syllabus.flatMap(m => m.lessons).length
  return (
    <section className="mx-auto max-w-shell px-5 pt-14">
      <h2 className="font-serif text-[28px]">Curriculum</h2>
      <p className="mt-2 text-[14px] text-ink-muted">{total} lessons · {done.length} completed</p>
      <LessonList className="mt-6" variant="catalogue" syllabus={course.syllabus} courseId={course.id} doneIds={done} />
    </section>
  )
}
export function Meta({ course, quiz }) {
  return (
    <section className="mx-auto max-w-shell px-5 pt-14">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="border-t border-ink/20 pt-5">
          <h3 className="font-serif text-[22px]">Requirements</h3>
          <ul className="mt-3 space-y-2 text-[14px] text-ink-soft">
            <li>No prior experience — curiosity is enough.</li>
            <li>Thirty minutes a day, four days a week.</li>
            <li>A notebook, or the notes tab in each lesson.</li>
          </ul>
        </div>
        <div className="border-t border-ink/20 pt-5">
          <h3 className="font-serif text-[22px]">About the instructor</h3>
          <div className="mt-3 flex items-center gap-4">
            <Avatar name={course.instructor.name} initials={course.instructor.initials} size="lg" />
            <div><p className="text-[14.5px] font-medium">{course.instructor.name}</p><p className="text-[13px] text-ink-muted">{course.instructor.role}</p></div>
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">Teaches slowly and edits honestly. Believes taste can be learned — one small exercise at a time.</p>
          {quiz && <Link to={`/quiz/${quiz.id}`} className="mt-4 inline-block text-[13.5px] font-medium underline">Preview the course quiz</Link>}
        </div>
      </div>
    </section>
  )
}
