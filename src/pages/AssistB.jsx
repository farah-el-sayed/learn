import AIChat from '../components/AIChat.jsx'

// The full-page conversation view: layout lives on the Assistant page.
export function ThreadView({ thread, typing, onSend }) {
  return (
    <AIChat
      frame
      kicker="Learning companion"
      title="What would you like to understand?"
      messages={thread?.messages || []}
      typing={typing}
      onSend={onSend}
    />
  )
}
