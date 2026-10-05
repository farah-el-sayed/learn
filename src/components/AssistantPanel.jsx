import { Plus, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import AIChat from './AIChat.jsx'
import useTutorChat from '../hooks/useTutorChat.js'

// Docked assistant: panel chrome only — the conversation itself is AIChat.
export default function AssistantPanel() {
  const { assistantOpen, setAssistantOpen } = useApp()
  const navigate = useNavigate()
  const { threads, thread, typing, send, newThread, context, setActiveThreadId } = useTutorChat()
  if (!assistantOpen) return null

  return (
    <aside className="fixed inset-y-0 right-0 z-50 flex w-[86vw] max-w-[420px] flex-col border-l border-line bg-white md:inset-auto md:bottom-4 md:right-4 md:top-20 md:z-40 md:w-[384px] md:max-w-[calc(100vw-2rem)] md:border md:border-line" aria-label="Learning companion">
      <div onClick={() => setAssistantOpen(false)} className="fixed inset-0 -z-10 bg-ink/40 md:hidden" aria-hidden="true" />
      <AIChat
        density="panel"
        className="min-h-0 flex-1"
        kicker="Learning companion"
        title="What would you like to understand?"
        meta={context ? `Reading with you · ${context}` : undefined}
        actions={
          <>
            <button onClick={() => newThread()} className="border border-line p-1.5 text-ink-muted hover:text-ink" title="New conversation" aria-label="New conversation"><Plus size={14} /></button>
            <button onClick={() => setAssistantOpen(false)} className="border border-line p-1.5 text-ink-muted hover:text-ink" title="Close" aria-label="Close"><X size={14} /></button>
          </>
        }
        toolbar={
          <div className="flex gap-1.5 overflow-x-auto">
            {threads.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveThreadId(t.id)}
                className={`whitespace-nowrap border px-2.5 py-1 text-[12px] ${t.id === thread?.id ? 'border-ink bg-white font-medium' : 'border-transparent text-ink-muted hover:text-ink'}`}
              >
                {t.title.slice(0, 24)}
              </button>
            ))}
          </div>
        }
        messages={thread?.messages || []}
        typing={typing}
        onSend={send}
        onSuggestion={action => {
          const destinations = {
            explain: '/assistant/explain',
            summarize: '/assistant/summarize',
            quiz: '/quiz/q-contrast',
            example: '/assistant/example',
            flashcards: '/assistant/flashcards',
          }
          setAssistantOpen(false)
          navigate(destinations[action.id] || '/assistant')
        }}
      />
    </aside>
  )
}

