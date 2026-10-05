import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { SectionHead } from '../components/Cards.jsx'
import Button from '../components/Button.jsx'
import { useToast } from '../components/Toast.jsx'

export default function Quiz() {
  const { quizId } = useParams()
  const { quizzes, quizResults, setQuizResults } = useApp()
  const { success, error } = useToast()
  const quiz = quizzes.find(q => q.id === quizId) || quizzes[0]
  const [answers, setAnswers] = useState({})
  const [done, setDone] = useState(quizResults[quiz.id] != null)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const score = quiz.questions.filter((q, i) => answers[q.id] === q.answer).length
  const submit = () => {
    // Validation: all questions must be answered
    if (Object.keys(answers).length < quiz.questions.length) {
      setSubmitError('Please answer all questions before submitting.')
      return
    }

    setSubmitError('')
    setLoading(true)
    setTimeout(() => {
      setQuizResults(p => ({ ...p, [quiz.id]: score }))
      setDone(true)
      setLoading(false)
      if (score === quiz.questions.length) {
        success('Perfect score! Great job!')
      } else if (score >= quiz.questions.length * 0.7) {
        success(`Quiz completed! Score: ${score}/${quiz.questions.length}`)
      } else {
        error(`Quiz completed. Score: ${score}/${quiz.questions.length}. Review the lesson and try again.`)
      }
    }, 500)
  }
  return (
    <div className="mx-auto max-w-shell px-5 py-14">
      <Link to="/dashboard" className="text-[13px] text-ink-muted underline">Back to learning</Link>
      <div className="mt-4 max-w-2xl">
        <SectionHead kicker="Quiz" title={quiz.title} lede="No pressure. Three questions, then a note from your tutor." />
        <div className="space-y-6">
          {quiz.questions.map((q, qi) => (
            <div key={q.id} className="border border-line bg-white p-6">
              <p className="font-serif text-[18px]">{qi + 1}. {q.q}</p>
              <div className="mt-4 space-y-2">
                {q.options.map((o, oi) => (
                  <button key={oi} disabled={done} onClick={() => setAnswers(a => ({ ...a, [q.id]: oi }))} className={`flex w-full items-center gap-3 border px-4 py-3 text-left text-[13.5px] ${answers[q.id] === oi ? 'border-pine bg-pine-soft' : 'border-line hover:border-ink/30'}`}>
                    <span className={`flex h-5 w-5 items-center justify-center border ${answers[q.id] === oi ? 'border-pine bg-pine text-paper' : 'border-line'}`}>{answers[q.id] === oi && <Check size={12} />}</span>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {!done ? (
          <>
            {submitError && <p className="mt-4 text-[13px] text-clay-deep">{submitError}</p>}
            <Button variant="primary" size="xl" onClick={submit} disabled={Object.keys(answers).length < quiz.questions.length || loading} loading={loading} className="mt-6">Submit answers</Button>
          </>
        ) : (
          <div className="mt-6 border border-line bg-white p-6">
            <p className="font-serif text-[22px]">You scored {(quizResults[quiz.id] ?? score)} / {quiz.questions.length}</p>
            <p className="mt-2 text-[13.5px] text-ink-muted">Kindly marked. Review the lesson, then try the next exercise — spacing beats cramming.</p>
          </div>
        )}
      </div>
    </div>
  )
}
