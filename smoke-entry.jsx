// Temporary smoke test: server-renders every page so runtime errors surface without a browser.
import React from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './src/context/AppContext.jsx'
import App from './src/App.jsx'
import Home from './src/pages/Home.jsx'
import Courses from './src/pages/Courses.jsx'
import CourseDetail from './src/pages/CourseDetail.jsx'
import Lesson from './src/pages/Lesson.jsx'
import Dashboard from './src/pages/Dashboard.jsx'
import MyCourses from './src/pages/MyCourses.jsx'
import Progress from './src/pages/Progress.jsx'
import Paths from './src/pages/Paths.jsx'
import Assistant from './src/pages/Assistant.jsx'
import Quiz from './src/pages/Quiz.jsx'
import Assignments from './src/pages/Assignments.jsx'
import Grades from './src/pages/Grades.jsx'
import Quizzes from './src/pages/Quizzes.jsx'
import Certificates from './src/pages/Certificates.jsx'
import Profile from './src/pages/Profile.jsx'
import Settings from './src/pages/Settings.jsx'
import Teach from './src/pages/Teach.jsx'
import TeachCourse from './src/pages/TeachCourse.jsx'
import TeachStudents from './src/pages/TeachStudents.jsx'
import TeachAnalytics from './src/pages/TeachAnalytics.jsx'
import Admin from './src/pages/Admin.jsx'
import AdminUsers from './src/pages/AdminUsers.jsx'
import AdminCourses from './src/pages/AdminCourses.jsx'
import AdminSettings from './src/pages/AdminSettings.jsx'
import AdminAnalytics from './src/pages/AdminAnalytics.jsx'

const pages = [
  ['/', Home],
  ['/courses', Courses],
  ['/courses/design-foundations', CourseDetail],
  ['/courses/design-foundations/lessons/d1-l1', Lesson],
  ['/paths', Paths],
  ['/assistant', Assistant],
  ['/profile', Profile],
  ['/quiz/q-contrast', Quiz],
  ['/dashboard', Dashboard],
  ['/my-courses', MyCourses],
  ['/progress', Progress],
  ['/assignments', Assignments],
  ['/quizzes', Quizzes],
  ['/grades', Grades],
  ['/certificates', Certificates],
  ['/settings', Settings],
  ['/teach', Teach],
  ['/teach/courses/design-foundations', TeachCourse],
  ['/teach/students', TeachStudents],
  ['/teach/analytics', TeachAnalytics],
  ['/admin', Admin],
  ['/admin/users', AdminUsers],
  ['/admin/courses', AdminCourses],
  ['/admin/settings', AdminSettings],
  ['/admin/analytics', AdminAnalytics],
]

function render(node, path) {
  return renderToString(
    React.createElement(
      MemoryRouter,
      { initialEntries: [path] },
      React.createElement(AppProvider, null, node)
    )
  )
}

const results = pages.map(([path, Component]) => {
  const html = render(
    React.createElement(Routes, null, React.createElement(Route, { path, element: React.createElement(Component) })),
    path
  )
  return { path, length: html.length, ok: html.length > 400 }
})

// And once through the real App shell so the layout, navbar and footer render too.
const shellHtml = render(React.createElement(App), '/')
results.push({ path: 'App shell', length: shellHtml.length, ok: shellHtml.includes('Learn') })

const one = (path, Component) =>
  render(React.createElement(Routes, null, React.createElement(Route, { path, element: React.createElement(Component) })), path)

const dashHtml = one('/dashboard', Dashboard)
const assistantHtml = one('/assistant', Assistant)
const lessonHtml = one('/courses/design-foundations/lessons/d1-l1', Lesson)
const detailHtml = one('/courses/design-foundations', CourseDetail)
const myCoursesHtml = one('/my-courses', MyCourses)
const shellHtml2 = render(React.createElement(App), '/')

const lessonHtml2 = one('/courses/design-foundations/lessons/d2-l1', Lesson)

const checks = {
  ProgressBar_on_dashboard: (dashHtml.match(/role="progressbar"/g) || []).length,
  Badge_on_dashboard: dashHtml.includes('bg-pine-soft text-pine'),
  ActivityTimeline: dashHtml.includes('Recent activity'),
  QuizCard_start: dashHtml.includes('Start'),
  Chat_chips: assistantHtml.includes('Explain this lesson'),
  Chat_empty_state_or_messages: assistantHtml.includes('Learning companion'),
  LessonList_curriculum: lessonHtml.includes('Curriculum'),
  LessonList_locked: lessonHtml.includes('cursor-not-allowed'),
  LessonList_done_state: lessonHtml.includes('border-pine bg-pine text-paper'),
  CoursePlayer_title: lessonHtml.includes('Contrast with intent'),
  CoursePlayer_complete_button: lessonHtml.includes('Completed'),
  CoursePlayer_complete_on_fresh_lesson: lessonHtml2.includes('Mark as Complete'),
  AIChat_compact: lessonHtml.includes('Study companion'),
  CourseGrid_mycourses: (myCoursesHtml.match(/Maya Lindqvist|Jonas Feld/g) || []).length,
  StatCard_boxed: detailHtml.includes('Difficulty'),
  NotificationPanel: shellHtml2.includes('Notifications'),
  Navbar_role_switcher: shellHtml2.includes('>Student<'),
  MobileNav_drawer_closed: !shellHtml2.includes('Navigation menu'),
}

console.log(JSON.stringify(checks, null, 1))
console.log('CHECKS_OK', Object.values(checks).every(v => (typeof v === 'number' ? v > 0 : v === true)))
console.log('DEBUG_COMPLETE_IDX', lessonHtml2.indexOf('Complete'))
console.log('DEBUG_TAIL', lessonHtml2.slice(8160, 8420))

console.log(JSON.stringify(results, null, 1))
console.log(results.every(r => r.ok) ? 'SMOKE_OK' : 'SMOKE_FAIL')

