import { localizeText } from "../i18n.js";import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { courses } from '../data/mock.js';
import { paths, initialThreads } from '../data/extra.js';
import { quizzes, assignments, grades, certificates } from '../data/roles.js';

const AppContext = createContext(null);

function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored === null ? initialValue : JSON.parse(stored);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  return [value, setValue];
}

export const ROLES = [
{ id: 'student', label: 'Student' },
{ id: 'instructor', label: 'Instructor' },
{ id: 'admin', label: 'Admin' }];


export function AppProvider({ children }) {
  const [role, setRole] = usePersistentState('learn-role', 'student');
  const [theme, setTheme] = usePersistentState('learn-theme', 'light');
  const [studyPlan, setStudyPlan] = usePersistentState('learn-study-plan', {
    days: ['Mon', 'Wed', 'Fri'],
    minutes: 30,
    goal: 'finish',
    courseId: 'design-foundations'
  });
  const [reminderSettings, setReminderSettings] = usePersistentState('learn-reminders', {
    enabled: false,
    time: '18:00'
  });
  const [sidebarOpen, setSidebarOpen] = usePersistentState('learn-sidebar-open', true);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantDocked, setAssistantDocked] = usePersistentState('learn-assistant-docked', true);
  const [threads, setThreads] = usePersistentState('learn-threads', initialThreads);
  const [activeThreadId, setActiveThreadId] = usePersistentState('learn-active-thread', initialThreads[0]?.id);
  const [enrolledIds, setEnrolledIds] = usePersistentState('learn-enrolled-courses', ['design-foundations', 'writing-clearly']);
  const [savedIds, setSavedIds] = usePersistentState('learn-saved-courses', ['economics-everyday']);
  const [completedLessons, setCompletedLessons] = usePersistentState('learn-completed-lessons', {
    'design-foundations': ['d1-l1', 'd1-l2'],
    'writing-clearly': ['w1-l1']
  });
  const [notes, setNotes] = usePersistentState('learn-notes', [
  { id: 'n1', courseId: 'design-foundations', lessonId: 'd1-l2', text: 'Contrast is about intent.', updatedAt: 'Tue 14:20' }]
  );

  const [quizResults, setQuizResults] = usePersistentState('learn-quiz-results-v2', {});
  const [profile, setProfile] = usePersistentState('learn-profile', { name: 'Sara Haddad', email: 'sara@example.com', bio: 'Design and writing, 30 min a day.' });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    if (!reminderSettings.enabled || !studyPlan.days.length || !('Notification' in window) || Notification.permission !== 'granted') return;

    const checkReminder = () => {
      const now = new Date();
      const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][now.getDay()];
      const [hour, minute] = reminderSettings.time.split(':').map(Number);
      if (!studyPlan.days.includes(day) || now.getHours() !== hour || now.getMinutes() !== minute) return;

      const reminderKey = `${now.toDateString()}-${reminderSettings.time}`;
      if (window.localStorage.getItem('learn-last-reminder') === reminderKey) return;
      new Notification('Your Learn study session', {
        body: `Your ${studyPlan.minutes}-minute learning session starts now.`
      });
      window.localStorage.setItem('learn-last-reminder', reminderKey);
    };

    checkReminder();
    const timer = window.setInterval(checkReminder, 30000);
    return () => window.clearInterval(timer);
  }, [reminderSettings, studyPlan]);

  const value = useMemo(() => ({
    courses, paths, quizzes, assignments, grades, certificates,
    role, setRole, theme, setTheme, studyPlan, setStudyPlan, reminderSettings, setReminderSettings,
    sidebarOpen, setSidebarOpen,
    assistantOpen, setAssistantOpen,
    assistantDocked, setAssistantDocked,
    threads, setThreads,
    activeThreadId, setActiveThreadId,
    enrolledIds, setEnrolledIds,
    savedIds, setSavedIds,
    completedLessons, setCompletedLessons,
    notes, setNotes,
    quizResults, setQuizResults,
    profile, setProfile
  }), [role, theme, studyPlan, reminderSettings, sidebarOpen, assistantOpen, assistantDocked, threads, activeThreadId, enrolledIds, savedIds, completedLessons, notes, quizResults, profile]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
