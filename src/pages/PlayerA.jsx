import { useTranslation } from "react-i18next";import LessonList from '../components/LessonList.jsx';

export function Curriculum({ course, lesson, doneIds, lockedAfter }) {useTranslation();
  return (
    <LessonList
      syllabus={course.syllabus}
      courseId={course.id}
      currentLessonId={lesson.id}
      doneIds={doneIds}
      lockedAfter={lockedAfter}
      heading="Curriculum" />);


}
