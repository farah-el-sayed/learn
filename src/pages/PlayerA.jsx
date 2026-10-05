import LessonList from '../components/LessonList.jsx'

export function Curriculum({ course, lesson, doneIds, lockedAfter }) {
  return (
    <LessonList
      syllabus={course.syllabus}
      courseId={course.id}
      currentLessonId={lesson.id}
      doneIds={doneIds}
      lockedAfter={lockedAfter}
      heading="Curriculum"
    />
  )
}
