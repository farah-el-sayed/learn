export function tutorReply(input, courseTitle) {
  const q = input.toLowerCase()
  const ctx = courseTitle ? ` in ${courseTitle}` : ''
  if (q.includes('explain')) return `Here is the idea${ctx}, plainly stated:\n\nEvery page needs one clear winner. Give the key element size, weight, or solitude — then reduce everything else. Read the page once: if the eye hesitates, simplify until it does not.`
  if (q.includes('summar')) return `A one-paragraph summary${ctx}:\n\nHierarchy first, contrast with intent, spacing as meaning. Name one idea per page, make differences confident, and let empty space do the quiet work.`
  if (q.includes('quiz') || q.includes('test')) return `Three questions, no pressure:\n\n1. What should the eye read first?\n2. Should a difference be subtle or clear?\n3. What does extra spacing signal?\n\nReply with your answers and I will mark them kindly.`
  if (q.includes('example')) return `An example${ctx}:\n\nA bakery poster — headline large on one line, date set apart with generous space, address small and muted. The rest of the page stays empty. Restraint is what makes it feel premium.`
  if (q.includes('flashcard')) return `Five flashcards${ctx}:\n\n1. Front: What comes first? Back: One clear winner.\n2. Front: Contrast rule? Back: Confident, never timid.\n3. Front: Spacing means? Back: Importance.\n4. Front: Editing rule? Back: Remove a third.\n5. Front: Daily habit? Back: 25 min focus, 5 min recall.`
  if (q.includes('plan') || q.includes('study')) return 'A calm plan: 25 minutes of focus, 5 minutes of recall in your own words. One lesson a day is plenty. Which course should we plan around?'
  if (q.includes('design') || q.includes('contrast') || q.includes('poster') || q.includes('hierarchy')) return 'Every page needs one winner. Give the key element size, weight, or solitude, then quiet the rest. Confident differences look premium.'
  if (q.includes('writ') || q.includes('essay')) return 'Write the ending first in one sentence, then three short paragraphs that earn it. Paste a paragraph and I will help tighten it.'
  return 'Good question. Try the smallest checkable step for 20 minutes, then tell me what felt unclear and I will explain that part precisely. Which lesson are you on?'
}
export const suggestedActions = [
  { id: 'explain', label: 'Explain this lesson', prompt: 'Explain this lesson' },
  { id: 'summarize', label: 'Summarize', prompt: 'Summarize this for me' },
  { id: 'quiz', label: 'Quiz me', prompt: 'Quiz me' },
  { id: 'example', label: 'Give me an example', prompt: 'Give me an example' },
  { id: 'flashcards', label: 'Create flashcards', prompt: 'Create flashcards' },
]
