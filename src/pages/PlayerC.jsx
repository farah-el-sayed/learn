import AIChat from '../components/AIChat.jsx'
import useTutorChat from '../hooks/useTutorChat.js'

// The lesson sidebar uses the same chat surface as the assistant, just denser.
export function StudyCompanion({ courseTitle }) {
  const { thread, typing, send } = useTutorChat({ courseTitle, delay: 700 })
  return (
    <AIChat
      frame
      density="compact"
      className="border-sage/60"
      kicker="Study companion"
      title="Ask about this lesson"
      messages={thread?.messages || []}
      limit={6}
      typing={typing}
      suggestionsLimit={3}
      placeholder="Ask…"
      onSend={send}
    />
  )
}
