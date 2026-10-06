import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useToast } from '../components/Toast.jsx';
import { DashHead, DashStats } from './DashA.jsx';
import { ContinueList, Recommended } from './DashB.jsx';
import { Upcoming, RecentActivity } from './DashC.jsx';
import StudyPlan from '../components/StudyPlan.jsx';
export default function Dashboard() {useTranslation();
  const { courses, enrolledIds, setEnrolledIds, completedLessons, assignments, quizzes, profile } = useApp();
  const { success } = useToast();
  const enrolled = courses.filter((c) => enrolledIds.includes(c.id));
  const suggested = courses.filter((c) => !enrolledIds.includes(c.id)).slice(0, 3);
  const doneCount = enrolled.reduce((sum, course) => sum + (completedLessons[course.id] || []).length, 0);
  const avg = Math.round(enrolled.reduce((sum, course) => {
    const total = course.syllabus.flatMap((module) => module.lessons).length;
    const completed = (completedLessons[course.id] || []).length;
    return sum + completed / Math.max(1, total) * 100;
  }, 0) / Math.max(1, enrolled.length));

  const handleEnroll = (courseId) => {
    setEnrolledIds((ids) => ids.includes(courseId) ? ids : [...ids, courseId]);
    success('Enrolled successfully!');
  };

  return (
    <div className="dashboard-stagger">
      <DashHead name={profile.name.split(' ')[0]} />
      <DashStats items={[['Active Courses', String(enrolled.length)], ['Learning Progress', `${avg}%`], ['Learning Hours', '12.5'], ['Completed Lessons', String(doneCount)]]} />
      <StudyPlan />
      <div className="mt-14 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-[26px]">{localizeText("Continue learning")}</h2>
            <Link to="/courses" className="text-[13px] font-medium underline">{localizeText("All courses")}</Link>
          </div>
          <ContinueList enrolled={enrolled} completedLessons={completedLessons} onEnroll={handleEnroll} />
          <div className="mt-12 flex items-baseline justify-between">
            <h2 className="font-serif text-[26px]">{localizeText("Recommended")}</h2>
            <Link to="/courses" className="flex items-center gap-1 text-[13px] font-medium">{localizeText("Browse all")}{localizeText(" ")}<ArrowUpRight size={14} /></Link>
          </div>
          <Recommended suggested={suggested} onEnroll={handleEnroll} />
        </div>
        <div className="space-y-10 md:col-span-5">
          <Upcoming assignments={assignments} quizzes={quizzes} />
          <RecentActivity />
        </div>
      </div>
    </div>);

}
