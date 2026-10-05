// Mock Quizzes Data
export const mockQuizzes = [
  {
    id: 1,
    courseId: 1,
    moduleId: 2,
    title: 'HTML Fundamentals Quiz',
    description: 'Test your knowledge of HTML basics and elements.',
    type: 'multiple_choice',
    timeLimit: 15,
    passingScore: 70,
    maxAttempts: 3,
    showAnswers: true,
    shuffleQuestions: true,
    questions: [
      {
        id: 1,
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Hyper Transfer Markup Language',
          'Home Tool Markup Language'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'HTML stands for Hyper Text Markup Language.'
      },
      {
        id: 2,
        question: 'Which tag is used to create a hyperlink?',
        options: ['<link>', '<a>', '<href>', '<url>'],
        correctAnswer: 1,
        points: 10,
        explanation: 'The <a> tag is used to create hyperlinks in HTML.'
      },
      {
        id: 3,
        question: 'Which HTML element is used for the largest heading?',
        options: ['<h6>', '<head>', '<h1>', '<heading>'],
        correctAnswer: 2,
        points: 10,
        explanation: '<h1> is the largest heading tag in HTML.'
      },
      {
        id: 4,
        question: 'What is the correct HTML element for inserting a line break?',
        options: ['<break>', '<lb>', '<br>', '<newline>'],
        correctAnswer: 2,
        points: 10,
        explanation: '<br> is the self-closing tag for line breaks in HTML.'
      },
      {
        id: 5,
        question: 'Which attribute specifies an alternate text for an image?',
        options: ['title', 'alt', 'src', 'longdesc'],
        correctAnswer: 1,
        points: 10,
        explanation: 'The alt attribute provides alternate text for images.'
      }
    ],
    createdAt: '2024-09-25T10:00:00Z'
  },
  {
    id: 2,
    courseId: 2,
    moduleId: 5,
    title: 'JavaScript Variables Quiz',
    description: 'Test your understanding of JavaScript variables and data types.',
    type: 'multiple_choice',
    timeLimit: 10,
    passingScore: 80,
    maxAttempts: 2,
    showAnswers: true,
    shuffleQuestions: true,
    questions: [
      {
        id: 1,
        question: 'Which keyword declares a variable that cannot be reassigned?',
        options: ['var', 'let', 'const', 'final'],
        correctAnswer: 2,
        points: 10,
        explanation: 'const declares a variable that cannot be reassigned.'
      },
      {
        id: 2,
        question: 'What is the result of typeof null in JavaScript?',
        options: ['"null"', '"undefined"', '"object"', '"number"'],
        correctAnswer: 2,
        points: 10,
        explanation: 'typeof null returns "object" due to a historical bug in JavaScript.'
      },
      {
        id: 3,
        question: 'Which of the following is NOT a primitive data type?',
        options: ['string', 'number', 'array', 'boolean'],
        correctAnswer: 2,
        points: 10,
        explanation: 'Array is not a primitive type; it is an object.'
      },
      {
        id: 4,
        question: 'What is the output of: console.log(1 + "1")?',
        options: ['2', '"11"', 'NaN', 'undefined'],
        correctAnswer: 1,
        points: 10,
        explanation: 'JavaScript performs type coercion, resulting in string concatenation.'
      }
    ],
    createdAt: '2024-09-26T10:00:00Z'
  },
  {
    id: 3,
    courseId: 3,
    moduleId: 8,
    title: 'Python Basics Quiz',
    description: 'Test your Python programming fundamentals.',
    type: 'multiple_choice',
    timeLimit: 20,
    passingScore: 75,
    maxAttempts: 3,
    showAnswers: true,
    shuffleQuestions: true,
    questions: [
      {
        id: 1,
        question: 'How do you create a list in Python?',
        options: ['list()', '{}', '[]', '()'],
        correctAnswer: 2,
        points: 10,
        explanation: 'Square brackets [] are used to create lists in Python.'
      },
      {
        id: 2,
        question: 'What is the correct file extension for Python files?',
        options: ['.python', '.py', '.pt', '.pyt'],
        correctAnswer: 1,
        points: 10,
        explanation: '.py is the standard file extension for Python source files.'
      },
      {
        id: 3,
        question: 'Which function is used to output text in Python?',
        options: ['echo()', 'print()', 'console.log()', 'write()'],
        correctAnswer: 1,
        points: 10,
        explanation: 'print() is the standard function for output in Python.'
      },
      {
        id: 4,
        question: 'How do you create a comment in Python?',
        options: ['// comment', '/* comment */', '# comment', '-- comment'],
        correctAnswer: 2,
        points: 10,
        explanation: '# is used for single-line comments in Python.'
      },
      {
        id: 5,
        question: 'What is the result of: 3 ** 2 in Python?',
        options: ['6', '9', '5', '8'],
        correctAnswer: 1,
        points: 10,
        explanation: '** is the exponentiation operator, so 3 ** 2 = 9.'
      }
    ],
    createdAt: '2024-09-20T10:00:00Z'
  },
  {
    id: 4,
    courseId: 4,
    moduleId: 11,
    title: 'React Fundamentals Quiz',
    description: 'Test your knowledge of React basics and concepts.',
    type: 'multiple_choice',
    timeLimit: 15,
    passingScore: 70,
    maxAttempts: 3,
    showAnswers: true,
    shuffleQuestions: true,
    questions: [
      {
        id: 1,
        question: 'What is JSX?',
        options: [
          'A JavaScript framework',
          'A syntax extension for JavaScript',
          'A database query language',
          'A CSS preprocessor'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'JSX is a syntax extension that allows writing HTML-like code in JavaScript.'
      },
      {
        id: 2,
        question: 'Which hook is used for state management in functional components?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correctAnswer: 1,
        points: 10,
        explanation: 'useState is the primary hook for managing state in functional components.'
      },
      {
        id: 3,
        question: 'What does the useEffect hook do?',
        options: [
          'Manages component state',
          'Handles side effects in functional components',
          'Creates context for components',
          'Optimizes component performance'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'useEffect is used for handling side effects like data fetching and subscriptions.'
      },
      {
        id: 4,
        question: 'How do you pass data from parent to child component?',
        options: ['Context API', 'Redux', 'Props', 'State'],
        correctAnswer: 2,
        points: 10,
        explanation: 'Props (properties) are used to pass data from parent to child components.'
      }
    ],
    createdAt: '2024-09-22T10:00:00Z'
  },
  {
    id: 5,
    courseId: 5,
    moduleId: 13,
    title: 'Machine Learning Concepts Quiz',
    description: 'Test your understanding of ML fundamentals.',
    type: 'multiple_choice',
    timeLimit: 20,
    passingScore: 70,
    maxAttempts: 2,
    showAnswers: true,
    shuffleQuestions: true,
    questions: [
      {
        id: 1,
        question: 'What is supervised learning?',
        options: [
          'Learning without labeled data',
          'Learning with labeled input-output pairs',
          'Learning by reinforcement',
          'Learning from unlabeled data'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Supervised learning uses labeled data to learn input-output mappings.'
      },
      {
        id: 2,
        question: 'Which is NOT a type of machine learning?',
        options: ['Supervised', 'Unsupervised', 'Reinforcement', 'Compiled'],
        correctAnswer: 3,
        points: 10,
        explanation: 'Compiled is not a type of machine learning; the main types are supervised, unsupervised, and reinforcement.'
      },
      {
        id: 3,
        question: 'What is overfitting in machine learning?',
        options: [
          'Model performs well on training data only',
          'Model performs well on test data only',
          'Model has too few parameters',
          'Model converges too quickly'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Overfitting occurs when a model learns the training data too well and fails to generalize.'
      },
      {
        id: 4,
        question: 'What is the purpose of a validation set?',
        options: [
          'To train the model',
          'To test the final model',
          'To tune hyperparameters and prevent overfitting',
          'To store model checkpoints'
        ],
        correctAnswer: 2,
        points: 10,
        explanation: 'Validation sets are used to tune hyperparameters and detect overfitting during training.'
      },
      {
        id: 5,
        question: 'Which algorithm is commonly used for classification?',
        options: [
          'Linear Regression',
          'Logistic Regression',
          'K-Means Clustering',
          'PCA'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Logistic Regression is a classification algorithm, while Linear Regression is for regression tasks.'
      }
    ],
    createdAt: '2024-09-18T10:00:00Z'
  }
];
