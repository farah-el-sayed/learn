export const quizzes = [
  {
    id: 'q-contrast',
    courseId: 'design-foundations',
    lessonId: 'd1-l2',
    title: 'Contrast with intent — check',
    questions: [
      { id: 'qq1', q: 'What should the eye read first on any page?', options: ['Everything at once', 'One clear winner', 'The footer'], answer: 1 },
      { id: 'qq2', q: 'When two things differ, the difference should be…', options: ['Timid', 'Clear and confident', 'Hidden'], answer: 1 },
      { id: 'qq3', q: 'What does generous spacing signal?', options: ['Importance', 'A mistake', 'Nothing'], answer: 0 },
    ],
  },
  {
    id: 'q-clarity',
    courseId: 'writing-clearly',
    lessonId: 'w1-l1',
    title: 'Lead with the point — check',
    questions: [
      { id: 'qq1', q: 'Where should the main point go?', options: ['At the end', 'First', 'In the middle'], answer: 1 },
      { id: 'qq2', q: 'How many ideas per sentence?', options: ['One', 'Three', 'As many as possible'], answer: 0 },
    ],
  },
]

export const assignments = [
  { id: 'a1', courseId: 'design-foundations', title: 'Redesign a menu', due: 'Sun, Oct 5', status: 'Submitted', grade: 'A−' },
  { id: 'a2', courseId: 'design-foundations', title: 'Field study: your street', due: 'Sun, Oct 12', status: 'In progress', grade: null },
  { id: 'a3', courseId: 'writing-clearly', title: 'Your first essay', due: 'Fri, Oct 10', status: 'Not started', grade: null },
]

export const grades = [
  { id: 'g1', course: 'Design Foundations', item: 'Contrast quiz', score: '3 / 3', grade: 'A' },
  { id: 'g2', course: 'Design Foundations', title2: null, item: 'Menu redesign', score: '92 / 100', grade: 'A−' },
  { id: 'g3', course: 'Writing Clearly', item: 'Lead with the point', score: '2 / 2', grade: 'A' },
]

export const certificates = [
  { id: 'c1', course: 'Learning How to Learn', date: 'Sep 12, 2026', code: 'LRN-8F42-2026' },
]

export const platformUsers = [
  { id: 'u1', name: 'Sara Haddad', role: 'Student', courses: 3, status: 'Active' },
  { id: 'u2', name: 'Maya Lindqvist', role: 'Instructor', courses: 2, status: 'Active' },
  { id: 'u3', name: 'Jonas Feld', role: 'Instructor', courses: 1, status: 'Active' },
  { id: 'u4', name: 'Omar Karim', role: 'Student', courses: 1, status: 'Invited' },
  { id: 'u5', name: 'Lena Weiss', role: 'Admin', courses: 0, status: 'Active' },
]

export const instructorStudents = [
  { id: 's1', name: 'Sara Haddad', course: 'Design Foundations', progress: 68, lastActive: 'Today' },
  { id: 's2', name: 'Omar Karim', course: 'Design Foundations', progress: 24, lastActive: 'Yesterday' },
  { id: 's3', name: 'Nina Petrova', course: 'Writing Clearly', progress: 81, lastActive: 'Today' },
]

export const analytics = {
  enrolments: [42, 58, 51, 74, 69, 88],
  completion: [38, 44, 41, 52, 58, 64],
  activity: [12, 18, 15, 22, 19, 26, 21],
  completionAvg: 64,
  avgQuiz: 86,
  active: 1240,
  revenue: [820, 1140, 980, 1420, 1310, 1680],
}

