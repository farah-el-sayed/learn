// Mock Notifications Data
export const mockNotifications = [
  {
    id: 1,
    userId: 1,
    type: 'course_update',
    title: 'New Lesson Available',
    message: 'A new lesson "Advanced CSS Grid" has been added to the Complete Web Development Bootcamp.',
    link: '/courses/1/modules/3',
    isRead: false,
    priority: 'normal',
    createdAt: '2024-09-30T08:00:00Z'
  },
  {
    id: 2,
    userId: 1,
    type: 'assignment_reminder',
    title: 'Assignment Due Soon',
    message: 'Your assignment "Build Your First HTML Page" is due in 3 days.',
    link: '/courses/1/assignments/1',
    isRead: false,
    priority: 'high',
    createdAt: '2024-09-30T07:30:00Z'
  },
  {
    id: 3,
    userId: 1,
    type: 'achievement',
    title: 'Congratulations!',
    message: 'You have earned the "Quick Learner" badge for completing 5 lessons in one day!',
    link: '/profile/badges',
    isRead: true,
    priority: 'normal',
    createdAt: '2024-09-29T18:45:00Z'
  },
  {
    id: 4,
    userId: 1,
    type: 'quiz_result',
    title: 'Quiz Completed',
    message: 'You scored 90% on the HTML Fundamentals Quiz. Great job!',
    link: '/courses/1/quizzes/1/results',
    isRead: true,
    priority: 'normal',
    createdAt: '2024-09-29T15:20:00Z'
  },
  {
    id: 5,
    userId: 1,
    type: 'certificate',
    title: 'Certificate Issued',
    message: 'Your certificate for JavaScript Mastery has been issued. Download it now!',
    link: '/certificates/2',
    isRead: true,
    priority: 'high',
    createdAt: '2024-09-01T14:30:00Z'
  },
  {
    id: 6,
    userId: 2,
    type: 'course_update',
    title: 'Course Discount',
    message: 'Special offer! Get 50% off on Machine Learning Fundamentals for the next 24 hours.',
    link: '/courses/5',
    isRead: false,
    priority: 'normal',
    createdAt: '2024-09-30T09:00:00Z'
  },
  {
    id: 7,
    userId: 2,
    type: 'announcement',
    title: 'Platform Maintenance',
    message: 'Scheduled maintenance on October 5th from 2:00 AM to 4:00 AM UTC.',
    link: null,
    isRead: false,
    priority: 'low',
    createdAt: '2024-09-29T12:00:00Z'
  },
  {
    id: 8,
    userId: 2,
    type: 'reply',
    title: 'New Reply to Your Question',
    message: 'Instructor Sarah Williams replied to your question about Pandas dataframes.',
    link: '/courses/3/discussions/45',
    isRead: true,
    priority: 'normal',
    createdAt: '2024-09-28T16:30:00Z'
  },
  {
    id: 9,
    userId: 1,
    type: 'enrollment',
    title: 'Welcome to the Course!',
    message: 'You have been successfully enrolled in React.js Complete Guide. Start learning now!',
    link: '/courses/4',
    isRead: true,
    priority: 'normal',
    createdAt: '2024-09-20T10:00:00Z'
  },
  {
    id: 10,
    userId: 3,
    type: 'welcome',
    title: 'Welcome to LearnTech!',
    message: 'Thank you for joining LearnTech Academy. Complete your profile to get started.',
    link: '/profile/edit',
    isRead: false,
    priority: 'normal',
    createdAt: '2024-09-25T15:45:00Z'
  }
];
