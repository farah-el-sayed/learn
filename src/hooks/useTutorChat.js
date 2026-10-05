import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { tutorReply } from '../data/tutor.js'

// One conversation loop for every surface that talks to the AI tutor
// (AssistantPanel, Assistant page, lesson StudyCompanion).
// Appends the question, then the reply after a short beat.
export function useTutorChat({ courseTitle, delay = 900 } = {}) {
  const { threads, setThreads, activeThreadId, setActiveThreadId, courses, enrolledIds } = useApp()
  const [typing, setTyping] = useState(false)
  const thread = threads.find(t => t.id === activeThreadId) || threads[0]
  const enrolled = courses.find(c => enrolledIds.includes(c.id))
  const context = courseTitle ?? enrolled?.title

  const append = (message) => {
    if (!thread) return
    setThreads(ts => ts.map(t => t.id === thread.id ? { ...t, messages: [...t.messages, message], updatedAt: 'Today' } : t))
  }

  const send = (text) => {
    const clean = (text ?? '').trim()
    if (!clean || !thread) return
    append({ id: 'u' + Date.now(), role: 'user', text: clean })
    setTyping(true)
    setTimeout(() => {
      append({ id: 'a' + Date.now(), role: 'assistant', text: tutorReply(clean, context), context })
      setTyping(false)
    }, delay)
  }

  const newThread = (title = 'New conversation') => {
    const created = {
      id: 't' + Date.now(),
      title,
      updatedAt: 'Today',
      messages: [{ id: 'w' + Date.now(), role: 'assistant', text: 'Hello. I follow your courses and your pace. What would you like to understand today?', context }],
    }
    setThreads(ts => [created, ...ts])
    setActiveThreadId(created.id)
    return created
  }

  return { threads, thread, typing, send, newThread, context, setActiveThreadId }
}

export default useTutorChat
