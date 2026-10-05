import { Check, Star } from 'lucide-react'
import Button from '../components/Button.jsx'
import { CourseCover } from '../components/CourseCard.jsx'
import StatCard from '../components/StatCard.jsx'

export function DetailHead({ course, enrolled, setEnrolledIds, onEnroll }) {
  const lessons = course.syllabus.flatMap(m => m.lessons)
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-shell gap-10 px-5 py-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-clay">{course.category} · {course.level}</p>
          <h1 className="mt-3 font-serif text-[44px] leading-[1.05] md:text-[56px]">{course.title}</h1>
          <p className="mt-3 font-serif text-[20px] text-ink-muted">{course.subtitle}</p>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft">{course.description}</p>
          <p className="mt-5 text-[13.5px] text-ink-muted">By <span className="font-medium text-ink">{course.instructor.name}</span> · {course.instructor.role}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {!enrolled && (
              <Button variant="primary" size="xl" onClick={onEnroll}>Enroll — start today</Button>
            )}
            <Button variant="quiet" size="xl" to={`/courses/${course.id}/lessons/${lessons[0].id}`}>
              {enrolled ? 'Continue learning' : 'Preview first lesson'}
            </Button>
          </div>
        </div>
        <div className="md:col-span-5">
          <StatCard
            variant="boxed"
            items={[
              { label: 'Rating', value: course.rating, icon: Star },
              { label: 'Students', value: course.learners.toLocaleString() },
              { label: 'Duration', value: course.duration.split(',')[0] },
              { label: 'Difficulty', value: course.level },
            ]}
          />
          <CourseCover course={course} className="mt-4 min-h-[140px] border border-line p-5">
            <span className="font-serif text-[56px] leading-none text-white/80">{course.title.charAt(0)}</span>
            <span className="text-[12px] text-white/90">{lessons.length} lessons</span>
          </CourseCover>
        </div>
      </div>
    </section>
  )
}

export function Outcomes({ course }) {
  return (
    <section className="mx-auto max-w-shell px-5 pt-14">
      <h2 className="font-serif text-[28px]">What you will learn</h2>
      <div className={`mt-5 grid gap-px border border-line bg-line ${course.outcomes.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
        {course.outcomes.map((o, i) => (
          <div key={o} className="bg-white p-6">
            <p className="font-serif text-[13px] text-ink-faint">0{i + 1}</p>
            <p className="mt-2 flex gap-2 text-[14px] leading-relaxed"><Check size={15} className="mt-1 shrink-0 text-pine" /> {o}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
