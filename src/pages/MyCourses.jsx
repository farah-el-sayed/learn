import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import CourseGrid from '../components/CourseGrid.jsx';
import { PageHead } from '../components/PageHead.jsx';
export default function MyCourses() {useTranslation();
  const { courses, enrolledIds, completedLessons } = useApp();
  const list = courses.filter((c) => enrolledIds.includes(c.id));
  return (
    <div>
      <PageHead kicker="Student" title={localizeText("My Courses")} lede={`${list.length} enrolled · steady pace.`} />
      <CourseGrid
        className="mt-8"
        courses={list}
        cols={3}
        getProgress={(course) => {
          const total = course.syllabus.flatMap((module) => module.lessons).length;
          const completed = (completedLessons[course.id] || []).length;
          return Math.round(completed / Math.max(1, total) * 100);
        }}
        emptyTitle="Nothing enrolled yet"
        empty="Pick one course from the catalogue and it will wait for you here." />
      
      <Link to="/courses" className="mt-8 inline-block text-[13.5px] font-medium underline">{localizeText("Browse the catalogue")}</Link>
    </div>);

}
