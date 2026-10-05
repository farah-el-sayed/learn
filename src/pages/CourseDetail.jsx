import { Link, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { useToast } from '../components/Toast.jsx'
import { DetailHead, Outcomes } from './DetailA.jsx'
import { CurriculumFull, Meta } from './DetailB.jsx'
import { Reviews, DetailCta } from './DetailC.jsx'
export default function CourseDetail() {
  const { id } = useParams()
  const { courses, completedLessons, enrolledIds, setEnrolledIds, quizzes } = useApp()
  const { success } = useToast()
  const course = courses.find(c => c.id === id) || courses[0]
  const done = completedLessons[course.id] || []
  const enrolled = enrolledIds.includes(course.id)
  const quiz = quizzes.find(q => q.courseId === course.id)

  const handleEnroll = () => {
    if (!enrolled) {
      setEnrolledIds(ids => ids.includes(course.id) ? ids : [...ids, course.id])
      success('Successfully enrolled in this course!')
    }
  }

  return (
    <div>
      <div className="mx-auto max-w-shell px-5 pt-8">
        <Link to="/courses" className="text-[13px] text-ink-muted underline">Back to courses</Link>
      </div>
      <DetailHead course={course} enrolled={enrolled} setEnrolledIds={setEnrolledIds} onEnroll={handleEnroll} />
      <Outcomes course={course} />
      <CurriculumFull course={course} done={done} />
      <Meta course={course} quiz={quiz} />
      <Reviews course={course} />
      <DetailCta course={course} enrolled={enrolled} onEnroll={handleEnroll} />
    </div>
  )
}

