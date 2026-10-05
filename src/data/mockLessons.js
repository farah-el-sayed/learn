// Mock Lessons Data
export const mockLessons = [
  {
    id: 1,
    moduleId: 1,
    courseId: 1,
    title: 'What is Web Development?',
    description: 'Understand the basics of web development and how websites work.',
    order: 1,
    duration: 15,
    videoUrl: 'https://example.com/videos/lesson1.mp4',
    videoDuration: 720,
    type: 'video',
    isPreview: true,
    resources: [
      {
        title: 'Web Development Cheat Sheet',
        type: 'pdf',
        url: 'https://example.com/resources/cheatsheet.pdf'
      }
    ],
    createdAt: '2024-02-25T10:00:00Z'
  },
  {
    id: 2,
    moduleId: 1,
    courseId: 1,
    title: 'Setting Up Your Environment',
    description: 'Install and configure the necessary tools for web development.',
    order: 2,
    duration: 20,
    videoUrl: 'https://example.com/videos/lesson2.mp4',
    videoDuration: 1200,
    type: 'video',
    isPreview: true,
    resources: [
      {
        title: 'VS Code Setup Guide',
        type: 'pdf',
        url: 'https://example.com/resources/vscode-guide.pdf'
      }
    ],
    createdAt: '2024-02-25T10:00:00Z'
  },
  {
    id: 3,
    moduleId: 2,
    courseId: 1,
    title: 'HTML Document Structure',
    description: 'Learn the basic structure of an HTML document and essential elements.',
    order: 1,
    duration: 25,
    videoUrl: 'https://example.com/videos/lesson3.mp4',
    videoDuration: 1500,
    type: 'video',
    isPreview: true,
    resources: [],
    createdAt: '2024-02-25T10:00:00Z'
  },
  {
    id: 4,
    moduleId: 2,
    courseId: 1,
    title: 'HTML Elements and Attributes',
    description: 'Master HTML elements, tags, and attributes for building web pages.',
    order: 2,
    duration: 30,
    videoUrl: 'https://example.com/videos/lesson4.mp4',
    videoDuration: 1800,
    type: 'video',
    isPreview: false,
    resources: [
      {
        title: 'HTML Elements Reference',
        type: 'link',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element'
      }
    ],
    createdAt: '2024-02-25T10:00:00Z'
  },
  {
    id: 5,
    moduleId: 3,
    courseId: 1,
    title: 'CSS Selectors',
    description: 'Learn how to select and style HTML elements using CSS selectors.',
    order: 1,
    duration: 35,
    videoUrl: 'https://example.com/videos/lesson5.mp4',
    videoDuration: 2100,
    type: 'video',
    isPreview: false,
    resources: [],
    createdAt: '2024-02-25T10:00:00Z'
  },
  {
    id: 6,
    moduleId: 4,
    courseId: 1,
    title: 'JavaScript Variables and Data Types',
    description: 'Understand variables, data types, and type conversion in JavaScript.',
    order: 1,
    duration: 40,
    videoUrl: 'https://example.com/videos/lesson6.mp4',
    videoDuration: 2400,
    type: 'video',
    isPreview: false,
    resources: [
      {
        title: 'JavaScript Data Types Cheatsheet',
        type: 'pdf',
        url: 'https://example.com/resources/js-types.pdf'
      }
    ],
    createdAt: '2024-02-25T10:00:00Z'
  },
  {
    id: 7,
    moduleId: 5,
    courseId: 2,
    title: 'Variables and Constants',
    description: 'Learn about let, const, and var in JavaScript and when to use each.',
    order: 1,
    duration: 20,
    videoUrl: 'https://example.com/videos/lesson7.mp4',
    videoDuration: 1200,
    type: 'video',
    isPreview: true,
    resources: [],
    createdAt: '2024-03-10T09:00:00Z'
  },
  {
    id: 8,
    moduleId: 6,
    courseId: 2,
    title: 'Function Declaration vs Expression',
    description: 'Understand the differences between function declarations and expressions.',
    order: 1,
    duration: 25,
    videoUrl: 'https://example.com/videos/lesson8.mp4',
    videoDuration: 1500,
    type: 'video',
    isPreview: false,
    resources: [],
    createdAt: '2024-03-10T09:00:00Z'
  },
  {
    id: 9,
    moduleId: 8,
    courseId: 3,
    title: 'Python Basics',
    description: 'Introduction to Python syntax and basic programming concepts.',
    order: 1,
    duration: 30,
    videoUrl: 'https://example.com/videos/lesson9.mp4',
    videoDuration: 1800,
    type: 'video',
    isPreview: true,
    resources: [
      {
        title: 'Python Installation Guide',
        type: 'pdf',
        url: 'https://example.com/resources/python-install.pdf'
      }
    ],
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 10,
    moduleId: 9,
    courseId: 3,
    title: 'Introduction to Pandas',
    description: 'Learn the basics of Pandas for data manipulation and analysis.',
    order: 1,
    duration: 35,
    videoUrl: 'https://example.com/videos/lesson10.mp4',
    videoDuration: 2100,
    type: 'video',
    isPreview: false,
    resources: [],
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 11,
    moduleId: 11,
    courseId: 4,
    title: 'What is React?',
    description: 'Introduction to React library and its core concepts.',
    order: 1,
    duration: 20,
    videoUrl: 'https://example.com/videos/lesson11.mp4',
    videoDuration: 1200,
    type: 'video',
    isPreview: true,
    resources: [],
    createdAt: '2024-04-05T12:00:00Z'
  },
  {
    id: 12,
    moduleId: 12,
    courseId: 4,
    title: 'useState Hook',
    description: 'Learn how to use useState hook for state management in React.',
    order: 1,
    duration: 25,
    videoUrl: 'https://example.com/videos/lesson12.mp4',
    videoDuration: 1500,
    type: 'video',
    isPreview: false,
    resources: [],
    createdAt: '2024-04-05T12:00:00Z'
  },
  {
    id: 13,
    moduleId: 13,
    courseId: 5,
    title: 'Introduction to ML',
    description: 'Understand what machine learning is and its applications.',
    order: 1,
    duration: 25,
    videoUrl: 'https://example.com/videos/lesson13.mp4',
    videoDuration: 1500,
    type: 'video',
    isPreview: true,
    resources: [],
    createdAt: '2024-02-01T11:00:00Z'
  },
  {
    id: 14,
    moduleId: 14,
    courseId: 5,
    title: 'Linear Regression',
    description: 'Learn linear regression algorithm for supervised learning.',
    order: 1,
    duration: 35,
    videoUrl: 'https://example.com/videos/lesson14.mp4',
    videoDuration: 2100,
    type: 'video',
    isPreview: false,
    resources: [
      {
        title: 'Linear Regression Notebook',
        type: 'notebook',
        url: 'https://example.com/resources/linear-regression.ipynb'
      }
    ],
    createdAt: '2024-02-01T11:00:00Z'
  }
];
