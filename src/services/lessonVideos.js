// Real educational YouTube videos, matched to each lesson by topic.
// Every lesson now plays a real video about its own idea.
export const lessonVideos = {
  // Design Foundations
  'd1-l1': { youtubeId: '9EPTM91TBDU', title: 'The Principles of Design — Free Course' },
  'd1-l2': { youtubeId: 'ybC3WhN6ByQ', title: 'Principles of Design — Contrast' },
  'd1-l3': { youtubeId: 'YUMdv4yFlQU', title: 'Visual Design Principles in Action' },
  'd2-l1': { youtubeId: 'ZXItTIjC0Wk', title: 'Visual Hierarchy Design Principles' },
  'd2-l2': { youtubeId: 'J6hT41Om9Ew', title: 'Mastering Spacing in UI Design' },
  'd2-l3': { youtubeId: 'FDFD2-poyGw', title: 'Graphic Design Master-Class — White Space' },
  // Writing Clearly
  'w1-l1': { youtubeId: 'N9eEV_3IVEk', title: 'Get to the Point: Write Clearly and Concisely' },
  'w1-l2': { youtubeId: 'prUqCd2R3Zw', title: '3 Ways To Make Your Writing Clearer' },
  'w1-l3': { youtubeId: 'ZhPmz6DPRE8', title: '5 Line Editing Tips to Make Your Prose Shine' },
  'w2-l1': { youtubeId: 'RbGkZ3mZvJY', title: 'What Are You Trying To Say?' },
  'w2-l2': { youtubeId: 'GMAf0veC970', title: 'Editing for Clarity: Making Your Writing Flow' },
  // Everyday Economics
  'e1-l1': { youtubeId: 'uorrlWJ23Mg', title: 'Opportunity Cost and Tradeoffs' },
  'e1-l2': { youtubeId: 'gPxu4Bc7chg', title: 'Incentives and Opportunity Costs' },
  // Learning How to Learn
  'l1-l1': { youtubeId: 'g6aH8lC9PLk', title: 'Cued Recall and Retrieval Practice' },
  'l1-l2': { youtubeId: 'Z-zNHHpXoMM', title: 'Spaced Repetition — Evidence-Based Revision' },
  // Photography as Seeing
  'p1-l1': { youtubeId: 'n9XhOUbNSEg', title: 'Natural Light Photography: Golden Hour' },
  'p1-l2': { youtubeId: 'lHcA7pPwYZY', title: 'Photography Fundamentals: Composition and Light' },
  // Data Literacy
  'da-l1': { youtubeId: 'E91bGT9BjYk', title: 'How to Spot a Misleading Graph' },
}

export function lessonVideo(lesson) {
  if (!lesson) return null
  return lessonVideos[lesson.id] || null
}

export function lessonVideoEmbed(lesson) {
  const v = lessonVideo(lesson)
  if (!v) return null
  return `https://www.youtube.com/embed/${v.youtubeId}?rel=0`
}

export function lessonVideoWatch(lesson) {
  const v = lessonVideo(lesson)
  if (!v) return null
  return `https://www.youtube.com/watch?v=${v.youtubeId}`
}
