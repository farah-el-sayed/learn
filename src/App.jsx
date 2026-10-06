import { useTranslation } from "react-i18next";import { localizeText } from "./i18n.js";import { Component, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Topbar from './components/Topbar.jsx';
import DashboardLayout from './components/DashboardLayout.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import Footer from './components/Footer.jsx';
import AssistantPanel from './components/AssistantPanel.jsx';
import { ToastProvider } from './components/Toast.jsx';
import PageLoader from './components/PageLoader.jsx';
import ErrorState from './components/ErrorState.jsx';
import { useApp } from './context/AppContext.jsx';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Courses = lazy(() => import('./pages/Courses.jsx'));
const CourseDetail = lazy(() => import('./pages/CourseDetail.jsx'));
const Lesson = lazy(() => import('./pages/Lesson.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const MyCourses = lazy(() => import('./pages/MyCourses.jsx'));
const Progress = lazy(() => import('./pages/Progress.jsx'));
const Paths = lazy(() => import('./pages/Paths.jsx'));
const Assistant = lazy(() => import('./pages/Assistant.jsx'));
const Quiz = lazy(() => import('./pages/Quiz.jsx'));
const Assignments = lazy(() => import('./pages/Assignments.jsx'));
const Grades = lazy(() => import('./pages/Grades.jsx'));
const Quizzes = lazy(() => import('./pages/Quizzes.jsx'));
const Certificates = lazy(() => import('./pages/Certificates.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const Manifesto = lazy(() => import('./pages/StudioPages.jsx').then((module) => ({ default: module.ManifestoPage })));
const TeachingNotes = lazy(() => import('./pages/StudioPages.jsx').then((module) => ({ default: module.TeachingNotesPage })));
const About = lazy(() => import('./pages/StudioPages.jsx').then((module) => ({ default: module.AboutPage })));
const Settings = lazy(() => import('./pages/Settings.jsx'));
const Teach = lazy(() => import('./pages/Teach.jsx'));
const TeachCourse = lazy(() => import('./pages/TeachCourse.jsx'));
const TeachStudents = lazy(() => import('./pages/TeachStudents.jsx'));
const TeachAnalytics = lazy(() => import('./pages/TeachAnalytics.jsx'));
const Admin = lazy(() => import('./pages/Admin.jsx'));
const AdminUsers = lazy(() => import('./pages/AdminUsers.jsx'));
const AdminCourses = lazy(() => import('./pages/AdminCourses.jsx'));
const AdminSettings = lazy(() => import('./pages/AdminSettings.jsx'));
const AdminAnalytics = lazy(() => import('./pages/AdminAnalytics.jsx'));
const UsersTable = lazy(() => import('./pages/AdminTables.jsx').then((m) => ({ default: m.UsersTable })));

function Guard({ allow, to, children }) {
  const { role } = useApp();
  if (!allow.includes(role)) return <Navigate to={to} replace />;
  return children;
}

class RouteErrorBoundary extends Component {
  state = { hasError: false };

  componentDidMount() {
    window.addEventListener('online', this.retryAfterConnection);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.retryAfterConnection);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  retryAfterConnection = () => {
    if (this.state.hasError) window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-shell px-5 py-12">
          <ErrorState
            title={localizeText("This page could not load")}
            message="We’ll retry automatically when your connection returns."
            actionLabel="Reload page"
            onRetry={() => window.location.reload()} />
          
        </div>);

    }
    return this.props.children;
  }
}

const shellRoutes = ['/dashboard', '/my-courses', '/progress', '/assignments', '/quizzes', '/quiz', '/grades', '/certificates', '/teach', '/admin', '/settings'];

function Shell({ children }) {useTranslation();
  const loc = useLocation();
  const { sidebarOpen } = useApp();
  const inShell = shellRoutes.some((r) => loc.pathname === r || loc.pathname.startsWith(r + '/') || loc.pathname.startsWith(r));
  if (!inShell) return children;
  return (
    <DashboardLayout
      showMenuButton={false}
      sidebar={<Sidebar className={sidebarOpen ? 'sticky top-20 hidden h-[calc(100vh-5rem)] w-60 md:flex' : 'sticky top-20 hidden h-[calc(100vh-5rem)] w-60 lg:flex'} />}>
      
      {children}
    </DashboardLayout>);

}

export default function App() {useTranslation();
  const location = useLocation();

  return (
    <ToastProvider>
      <div className="min-h-screen bg-paper">
        <Topbar />
        <main>
          <Shell>
            <div key={location.pathname} className="route-enter">
              <RouteErrorBoundary>
                <Suspense fallback={<PageLoader message="Loading page…" />}>
                  <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="/courses/:id/lessons/:lessonId" element={<Lesson />} />
                <Route path="/assistant" element={<Assistant />} />
                <Route path="/assistant/:action" element={<Assistant />} />
                <Route path="/paths" element={<Paths />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/quiz/:quizId" element={<Quiz />} />
                <Route path="/dashboard" element={<Guard allow={['student']} to="/teach"><Dashboard /></Guard>} />
                <Route path="/my-courses" element={<Guard allow={['student']} to="/teach"><MyCourses /></Guard>} />
                <Route path="/progress" element={<Guard allow={['student']} to="/teach"><Progress /></Guard>} />
                <Route path="/assignments" element={<Guard allow={['student']} to="/teach"><Assignments /></Guard>} />
                <Route path="/quizzes" element={<Guard allow={['student']} to="/teach"><Quizzes /></Guard>} />
                <Route path="/grades" element={<Guard allow={['student']} to="/teach"><Grades /></Guard>} />
                <Route path="/certificates" element={<Guard allow={['student']} to="/teach"><Certificates /></Guard>} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/manifesto" element={<Manifesto />} />
                <Route path="/teaching-notes" element={<TeachingNotes />} />
                <Route path="/about" element={<About />} />
                <Route path="/teach" element={<Guard allow={['instructor']} to="/dashboard"><Teach /></Guard>} />
                <Route path="/teach/courses" element={<Guard allow={['instructor']} to="/dashboard"><Teach /></Guard>} />
                <Route path="/teach/courses/:id" element={<Guard allow={['instructor']} to="/dashboard"><TeachCourse /></Guard>} />
                <Route path="/teach/students" element={<Guard allow={['instructor']} to="/dashboard"><TeachStudents /></Guard>} />
                <Route path="/teach/analytics" element={<Guard allow={['instructor']} to="/dashboard"><TeachAnalytics /></Guard>} />
                <Route path="/admin" element={<Guard allow={['admin']} to="/dashboard"><Admin /></Guard>} />
                <Route path="/admin/users" element={<Guard allow={['admin']} to="/dashboard"><AdminUsers /></Guard>} />
                <Route path="/admin/students" element={<Guard allow={['admin']} to="/dashboard"><div className="mx-auto max-w-shell px-5 py-14"><p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-clay">{localizeText("Admin")}</p><h1 className="mt-3 font-serif text-[36px]">{localizeText("Students")}</h1><div className="mt-8"><UsersTable filter="Student" /></div></div></Guard>} />
                <Route path="/admin/instructors" element={<Guard allow={['admin']} to="/dashboard"><div className="mx-auto max-w-shell px-5 py-14"><p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-clay">{localizeText("Admin")}</p><h1 className="mt-3 font-serif text-[36px]">{localizeText("Instructors")}</h1><div className="mt-8"><UsersTable filter="Instructor" /></div></div></Guard>} />
                <Route path="/admin/courses" element={<Guard allow={['admin']} to="/dashboard"><AdminCourses /></Guard>} />
                <Route path="/admin/analytics" element={<Guard allow={['admin']} to="/dashboard"><AdminAnalytics /></Guard>} />
                <Route path="/admin/settings" element={<Guard allow={['admin']} to="/dashboard"><AdminSettings /></Guard>} />
                <Route path="*" element={<Home />} />
                  </Routes>
                </Suspense>
              </RouteErrorBoundary>
            </div>
          </Shell>
        </main>
        <Footer />
        <AssistantPanel />
      </div>
    </ToastProvider>);

}
