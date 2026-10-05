import { Link, useParams } from 'react-router-dom'
import { Star } from 'lucide-react'
export function Reviews({ course }) {
  const r = [
    { n: 'Sara H.', t: 'Worth every evening. I use this at work daily.', s: 5 },
    { n: 'Omar K.', t: 'Short lessons, honest feedback, no filler.', s: 5 },
    { n: 'Nina P.', t: 'Calm pacing. Finished what two other courses could not.', s: 4 },
  ]
  return (
    <section className="mx-auto max-w-shell px-5 pt-14">
      <h2 className="font-serif text-[28px]">Reviews</h2>
      <p className="mt-2 flex items-center gap-1.5 text-[14px] text-ink-muted"><Star size={14} /> {course.rating} average · {course.learners.toLocaleString()} students</p>
      <div className="mt-6 grid gap-px border border-line bg-line md:grid-cols-3">
        {r.map(x => (
          <figure key={x.n} className="bg-white p-6">
            <p className="text-[13px] tracking-wide text-clay">{'★'.repeat(x.s)}{'☆'.repeat(5 - x.s)}</p>
            <blockquote className="mt-2 font-serif text-[17px] leading-snug">“{x.t}”</blockquote>
            <figcaption className="mt-4 text-[12.5px] text-ink-muted">{x.n}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
export function DetailCta({ course, enrolled, onEnroll }) {
  const { id } = useParams()
  void id
  return (
    <section className="mx-auto max-w-shell px-5 py-16">
      <div className="grid items-center gap-6 border border-line bg-pine-deep p-10 text-paper md:grid-cols-2">
        <h2 className="font-serif text-[30px] leading-tight">Join {course.learners.toLocaleString()} learners in {course.title}.</h2>
        <div>
          {!enrolled ? (
            <button onClick={onEnroll} className="inline-block bg-paper px-6 py-3 text-[14px] font-medium text-ink" aria-label={`Enroll in ${course.title}`}>Enroll now</button>
          ) : (
            <Link to={`/courses/${course.id}/lessons/${course.syllabus[0].lessons[0].id}`} className="inline-block bg-paper px-6 py-3 text-[14px] font-medium text-ink">Continue learning</Link>
          )}
          <p className="mt-3 text-[13px] opacity-70">Thirty minutes a day. Certificate on completion.</p>
        </div>
      </div>
    </section>
  )
}
