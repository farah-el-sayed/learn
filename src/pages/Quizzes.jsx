import { useApp } from '../context/AppContext.jsx'
import QuizCard from '../components/QuizCard.jsx'
import { PageHead } from '../components/PageHead.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { FileText } from 'lucide-react'

export default function Quizzes() {
  const { quizzes, quizResults } = useApp()
  return (
    <div>
      <PageHead kicker="Student" title="Quizzes" lede="Short checks, kindly marked." />
      <div className="mt-8 max-w-2xl border-t border-line">
        {quizzes.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No quizzes available"
            lede="Quizzes will appear here as you progress through your courses."
          />
        ) : (
          quizzes.map(q => <QuizCard key={q.id} quiz={q} result={quizResults[q.id]} />)
        )}
      </div>
    </div>
  )
}
