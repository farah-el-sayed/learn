// Mock Assignments Data
export const mockAssignments = [
  {
    id: 1,
    courseId: 1,
    moduleId: 2,
    title: 'Build Your First HTML Page',
    description: 'Create a complete HTML page with at least 5 different elements and proper structure.',
    instructions: 'Create an HTML file that includes:\n- Proper DOCTYPE and html tags\n- Head section with title\n- Body with at least 5 different elements (h1, p, ul, img, etc.)\n- Proper indentation and comments',
    type: 'project',
    points: 100,
    dueDate: '2024-10-15T23:59:59Z',
    allowLateSubmission: true,
    latePenalty: 10,
    attachments: [
      {
        name: 'assignment-template.html',
        url: 'https://example.com/assignments/template.html'
      }
    ],
    createdAt: '2024-09-25T10:00:00Z'
  },
  {
    id: 2,
    courseId: 1,
    moduleId: 3,
    title: 'Style a Web Page with CSS',
    description: 'Apply CSS styling to make your HTML page visually appealing and responsive.',
    instructions: 'Add CSS to your HTML page:\n- Use at least 5 different CSS properties\n- Implement a color scheme\n- Make it responsive using media queries\n- Add hover effects',
    type: 'project',
    points: 100,
    dueDate: '2024-10-20T23:59:59Z',
    allowLateSubmission: true,
    latePenalty: 10,
    attachments: [],
    createdAt: '2024-09-25T10:00:00Z'
  },
  {
    id: 3,
    courseId: 2,
    moduleId: 6,
    title: 'JavaScript Functions Challenge',
    description: 'Write 5 different functions to solve specific problems using JavaScript.',
    instructions: 'Create functions for:\n1. Calculate the sum of an array\n2. Reverse a string\n3. Check if a number is prime\n4. Find the maximum value in an array\n5. Generate a random password',
    type: 'coding',
    points: 50,
    dueDate: '2024-10-18T23:59:59Z',
    allowLateSubmission: false,
    latePenalty: 0,
    attachments: [],
    createdAt: '2024-09-26T10:00:00Z'
  },
  {
    id: 4,
    courseId: 3,
    moduleId: 9,
    title: 'Data Analysis Project',
    description: 'Use Pandas to analyze a dataset and answer specific questions.',
    instructions: 'Download the provided dataset and:\n- Load it into a Pandas DataFrame\n- Clean the data if needed\n- Answer 5 analytical questions\n- Create at least 3 visualizations\n- Submit your Jupyter notebook',
    type: 'project',
    points: 150,
    dueDate: '2024-10-25T23:59:59Z',
    allowLateSubmission: true,
    latePenalty: 15,
    attachments: [
      {
        name: 'dataset.csv',
        url: 'https://example.com/assignments/dataset.csv'
      },
      {
        name: 'questions.pdf',
        url: 'https://example.com/assignments/questions.pdf'
      }
    ],
    createdAt: '2024-09-20T10:00:00Z'
  },
  {
    id: 5,
    courseId: 4,
    moduleId: 12,
    title: 'React Todo App',
    description: 'Build a complete todo application using React hooks.',
    instructions: 'Create a React app with:\n- Add new todos\n- Mark todos as complete\n- Delete todos\n- Filter by status (all/active/completed)\n- Persist to localStorage\n- Use at least 3 different hooks',
    type: 'project',
    points: 120,
    dueDate: '2024-10-22T23:59:59Z',
    allowLateSubmission: true,
    latePenalty: 10,
    attachments: [],
    createdAt: '2024-09-22T10:00:00Z'
  },
  {
    id: 6,
    courseId: 5,
    moduleId: 14,
    title: 'Linear Regression Implementation',
    description: 'Implement linear regression from scratch and apply it to a real dataset.',
    instructions: 'Implement linear regression:\n- From scratch using NumPy\n- Train on the provided dataset\n- Evaluate using MSE and R2\n- Compare with scikit-learn\n- Document your findings',
    type: 'coding',
    points: 100,
    dueDate: '2024-10-28T23:59:59Z',
    allowLateSubmission: true,
    latePenalty: 15,
    attachments: [
      {
        name: 'housing-data.csv',
        url: 'https://example.com/assignments/housing.csv'
      }
    ],
    createdAt: '2024-09-18T10:00:00Z'
  }
];
