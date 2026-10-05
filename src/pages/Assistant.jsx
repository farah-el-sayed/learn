import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import AITutorCard from '../components/AITutorCard.jsx'
import { PageHead } from '../components/PageHead.jsx'
import useTutorChat from '../hooks/useTutorChat.js'
import { suggestedActions } from '../data/tutor.js'
import { ThreadList } from './AssistA.jsx'
import { ThreadView } from './AssistB.jsx'

const actionTitles = {
  explain: 'Explain this lesson',
  summarize: 'Summarize this lesson',
  example: 'See a worked example',
  flashcards: 'Review with flashcards',
}

export default function Assistant() {
  const { action } = useParams()
  const { threads, setActiveThreadId } = useApp()
  const { thread, typing, send, context } = useTutorChat()
  const sentAction = useRef(null)
  const selectedAction = suggestedActions.find(item => item.id === action)

  useEffect(() => {
    if (!selectedAction || sentAction.current === action) return
    sentAction.current = action
    send(selectedAction.prompt)
  }, [action, selectedAction, send])

  return (
    <div className="mx-auto max-w-shell px-5 py-14">
      <PageHead
        kicker="AI Tutor"
        title={actionTitles[action] || 'Your learning companion.'}
        lede={selectedAction
          ? `A full-page ${actionTitles[action].toLowerCase()} session${context ? ` for ${context}` : ''}.`
          : `Grounded in your syllabus${context ? ` — currently reading ${context} with you` : ''}. Quiet, precise, and patient.`}
        size="lg"
      />
      <div className="mt-10 grid gap-8 md:grid-cols-12">
        <aside className="md:col-span-4">
          <ThreadList threads={threads} thread={thread} setActiveThreadId={setActiveThreadId} />
          <AITutorCard
            className="mt-6"
            kicker="How it helps"
            checks={false}
            items={[
              'Explains the exact lesson you are on',
              'Summarises modules in one paragraph',
              'Quizzes, examples, and flashcards',
            ]}
          />
        </aside>
        <div className="md:col-span-8">
          <ThreadView thread={thread} typing={typing} onSend={send} />
        </div>
      </div>
    </div>
  )
}

