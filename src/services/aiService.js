/**
 * AI Service Abstraction
 * 
 * This service provides a clean interface for AI functionality.
 * Currently uses mock responses, but can be easily replaced with a real AI API.
 * 
 * To switch to a real API:
 * 1. Set USE_REAL_API = true
 * 2. Implement the real API methods
 * 3. Configure your API credentials
 */

const USE_REAL_API = false

// AI Service Interface
class AIService {
  constructor() {
    this.useRealAPI = USE_REAL_API
  }

  /**
   * Ask a question related to a course or lesson
   * @param {string} question - The user's question
   * @param {Object} context - Additional context (courseId, lessonId, etc.)
   * @returns {Promise<string>} AI response
   */
  async askQuestion(question, context = {}) {
    if (this.useRealAPI) {
      return this.realAskQuestion(question, context)
    }
    return this.mockAskQuestion(question, context)
  }

  /**
   * Explain a concept in detail
   * @param {string} concept - The concept to explain
   * @param {Object} context - Additional context
   * @returns {Promise<string>} Detailed explanation
   */
  async explainConcept(concept, context = {}) {
    if (this.useRealAPI) {
      return this.realExplainConcept(concept, context)
    }
    return this.mockExplainConcept(concept, context)
  }

  /**
   * Summarize a lesson's content
   * @param {string} lessonContent - The lesson content to summarize
   * @param {Object} context - Additional context
   * @returns {Promise<string>} Summary
   */
  async summarizeLesson(lessonContent, context = {}) {
    if (this.useRealAPI) {
      return this.realSummarizeLesson(lessonContent, context)
    }
    return this.mockSummarizeLesson(lessonContent, context)
  }

  /**
   * Generate a quiz based on lesson content
   * @param {string} lessonContent - The lesson content
   * @param {Object} options - Quiz options (questionCount, difficulty, etc.)
   * @returns {Promise<Object>} Generated quiz
   */
  async generateQuiz(lessonContent, options = {}) {
    if (this.useRealAPI) {
      return this.realGenerateQuiz(lessonContent, options)
    }
    return this.mockGenerateQuiz(lessonContent, options)
  }

  /**
   * Generate flashcards from content
   * @param {string} content - The content to create flashcards from
   * @param {Object} options - Flashcard options (count, format, etc.)
   * @returns {Promise<Array>} Generated flashcards
   */
  async generateFlashcards(content, options = {}) {
    if (this.useRealAPI) {
      return this.realGenerateFlashcards(content, options)
    }
    return this.mockGenerateFlashcards(content, options)
  }

  /**
   * Provide examples for a concept
   * @param {string} concept - The concept to provide examples for
   * @param {Object} options - Example options (count, complexity, etc.)
   * @returns {Promise<Array>} Examples
   */
  async giveExamples(concept, options = {}) {
    if (this.useRealAPI) {
      return this.realGiveExamples(concept, options)
    }
    return this.mockGiveExamples(concept, options)
  }

  /**
   * Recommend next learning steps
   * @param {Object} progress - User's current progress
   * @param {Object} context - Additional context
   * @returns {Promise<Array>} Recommendations
   */
  async recommendNext(progress, context = {}) {
    if (this.useRealAPI) {
      return this.realRecommendNext(progress, context)
    }
    return this.mockRecommendNext(progress, context)
  }

  /**
   * Chat conversation support
   * @param {Array} messages - Conversation history
   * @param {Object} context - Additional context
   * @returns {Promise<string>} AI response
   */
  async chat(messages, context = {}) {
    if (this.useRealAPI) {
      return this.realChat(messages, context)
    }
    return this.mockChat(messages, context)
  }

  // ============ MOCK METHODS ============

  async mockAskQuestion(question, context) {
    await this.simulateDelay()
    const responses = {
      javascript: `Great question about JavaScript! ${question}\n\nJavaScript is a versatile programming language that runs in browsers and on servers. For this specific topic, I'd recommend focusing on understanding the fundamentals first, then moving to more advanced concepts like closures and async programming.`,
      react: `Regarding React: ${question}\n\nReact is a JavaScript library for building user interfaces. The key concepts to understand are components, state, props, and the virtual DOM. Would you like me to explain any of these in more detail?`,
      css: `For CSS: ${question}\n\nCSS (Cascading Style Sheets) is used to style web pages. The modern approach uses Flexbox and Grid for layout, along with CSS custom properties for theming. Start with the basics and gradually explore more advanced techniques.`,
      default: `That's an interesting question! ${question}\n\nLet me help you understand this better. The key points to consider are:\n1. Understand the core concept\n2. Practice with examples\n3. Apply it in real projects\n\nWould you like me to provide specific examples or go deeper into any particular aspect?`
    }

    const topic = this.detectTopic(question)
    return responses[topic] || responses.default
  }

  async mockExplainConcept(concept, context) {
    await this.simulateDelay()
    const explanations = {
      'closures': `Closures are a fundamental concept in JavaScript. A closure is created when a function is defined inside another function and has access to variables from its outer (enclosing) scope, even after the outer function has returned.\n\nExample:\n\`\`\`javascript\nfunction createCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\n\`\`\`\n\nClosures are used for:\n- Data privacy\n- Function factories\n- Maintaining state in async operations`,
      'flexbox': `Flexbox is a CSS layout model that allows you to arrange elements in a flexible way. The main components are:\n\n**Flex Container**: The parent element with \`display: flex\`\n**Flex Items**: The direct children of the container\n\nKey properties:\n- \`flex-direction\`: row, column, row-reverse, column-reverse\n- \`justify-content\`: aligns items along the main axis\n- \`align-items\`: aligns items along the cross axis\n- \`flex-wrap\`: wraps items to multiple lines\n\nExample:\n\`\`\`css\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\`\`\``,
      'components': `Components are the building blocks of React applications. A component is a reusable piece of UI that can accept inputs (props) and return JSX.\n\nTypes of components:\n1. **Functional Components**: Modern, preferred approach\n2. **Class Components**: Older syntax, still supported\n\nExample:\n\`\`\`jsx\nfunction Welcome({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n\`\`\`\n\nKey principles:\n- Components should be small and focused\n- Use props for data flow\n- Keep state local when possible`,
      'hooks': `React Hooks are functions that let you use state and other React features in functional components.\n\nCommon hooks:\n\n1. **useState**: Manage state in functional components\n\`\`\`jsx\nconst [count, setCount] = useState(0);\n\`\`\`\n\n2. **useEffect**: Handle side effects\n\`\`\`jsx\nuseEffect(() => {\n  document.title = \`Count: \${count}\`;\n}, [count]);\n\`\`\`\n\n3. **useContext**: Access context values\n\`\`\`jsx\nconst theme = useContext(ThemeContext);\n\`\`\`\n\nRules of hooks:\n- Only call hooks at the top level\n- Only call hooks from React functions`,
      default: `${concept} is an important concept in this topic. Let me break it down for you:\n\n**Definition**: This concept refers to...\n\n**Key Points**:\n1. First important aspect\n2. Second important aspect\n3. Third important aspect\n\n**Example**:\nHere's a practical example to illustrate...\n\n**Best Practices**:\n- Practice regularly\n- Apply in real projects\n- Review and refine your understanding\n\nWould you like me to go deeper into any specific aspect?`
    }

    const key = Object.keys(explanations).find(k => concept.toLowerCase().includes(k))
    return explanations[key] || explanations.default
  }

  async mockSummarizeLesson(lessonContent, context) {
    await this.simulateDelay()
    return `**Lesson Summary**\n\nThis lesson covers the fundamental concepts you need to understand this topic.\n\n**Key Takeaways**:\n• The core concept is [main idea]\n• Important to remember [key point 1]\n• Don't forget [key point 2]\n\n**Main Topics Covered**:\n1. Introduction to the concept\n2. Practical applications\n3. Common pitfalls and how to avoid them\n\n**What's Next**:\nPractice what you've learned with the exercises, then move on to the next lesson to build on this foundation.\n\n**Difficulty**: ${context.difficulty || 'Intermediate'}\n**Estimated Time to Master**: ${context.estimatedTime || '2-3 hours'}`
  }

  async mockGenerateQuiz(lessonContent, options = {}) {
    await this.simulateDelay()
    const questionCount = options.questionCount || 5
    const difficulty = options.difficulty || 'medium'

    return {
      title: options.title || 'Knowledge Check',
      difficulty,
      timeLimit: options.timeLimit || 15,
      passingScore: options.passingScore || 70,
      questions: Array.from({ length: questionCount }, (_, i) => ({
        id: i + 1,
        question: `Question ${i + 1} about the lesson content`,
        options: [
          'Option A - Correct answer',
          'Option B - Incorrect',
          'Option C - Incorrect',
          'Option D - Incorrect'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: `Explanation for why option A is correct and the others are not.`
      }))
    }
  }

  async mockGenerateFlashcards(content, options = {}) {
    await this.simulateDelay()
    const count = options.count || 10

    const topics = [
      { front: 'What is a closure in JavaScript?', back: 'A closure is a function that has access to variables from its outer scope, even after the outer function has returned.' },
      { front: 'What does CSS Flexbox do?', back: 'Flexbox is a layout model that allows flexible arrangement of elements in a container along a single axis.' },
      { front: 'What is a React component?', back: 'A component is a reusable piece of UI that accepts props and returns JSX to describe what should be rendered.' },
      { front: 'What is the useState hook?', back: 'useState is a React hook that adds state to functional components. It returns an array with the current state value and a function to update it.' },
      { front: 'What is the purpose of useEffect?', back: 'useEffect is used to handle side effects in functional components, such as data fetching, subscriptions, or DOM manipulation.' },
      { front: 'What is the virtual DOM?', back: 'The virtual DOM is a lightweight JavaScript representation of the real DOM that React uses to efficiently update the UI.' },
      { front: 'What are props in React?', back: 'Props (properties) are inputs passed to React components to customize their behavior and appearance.' },
      { front: 'What is the difference between let and const?', back: 'let allows reassignment of variables, while const creates a constant that cannot be reassigned after initialization.' },
      { front: 'What is a callback function?', back: 'A callback function is a function passed as an argument to another function, which is then invoked inside the outer function.' },
      { front: 'What is event bubbling?', back: 'Event bubbling is the propagation of an event from the target element up through its ancestors in the DOM tree.' }
    ]

    return topics.slice(0, count)
  }

  async mockGiveExamples(concept, options = {}) {
    await this.simulateDelay()
    const count = options.count || 3
    const complexity = options.complexity || 'basic'

    const examples = {
      javascript: [
        { title: 'Variable Declaration', code: 'const name = "John";\nlet age = 25;\nvar legacy = "old way";', explanation: 'Modern JavaScript uses const and let instead of var.' },
        { title: 'Arrow Function', code: 'const add = (a, b) => a + b;\nconst greet = name => `Hello, ${name}!`;', explanation: 'Arrow functions provide a concise syntax for writing functions.' },
        { title: 'Array Methods', code: 'const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconst filtered = numbers.filter(n => n > 2);', explanation: 'Array methods like map and filter are essential for data transformation.' }
      ],
      react: [
        { title: 'Functional Component', code: 'function Greeting({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}', explanation: 'Simple functional component with props.' },
        { title: 'useState Hook', code: 'function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}', explanation: 'Using useState to manage component state.' },
        { title: 'useEffect Hook', code: 'useEffect(() => {\n  document.title = \`Count: \${count}\`;\n}, [count]);', explanation: 'useEffect runs side effects when dependencies change.' }
      ],
      css: [
        { title: 'Flexbox Layout', code: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}', explanation: 'Centering content with Flexbox.' },
        { title: 'Grid Layout', code: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}', explanation: 'Creating a responsive grid layout.' },
        { title: 'CSS Variables', code: ':root {\n  --primary-color: #3498db;\n  --spacing: 1rem;\n}\n\n.button {\n  background: var(--primary-color);\n  padding: var(--spacing);\n}', explanation: 'Using CSS custom properties for theming.' }
      ],
      default: [
        { title: 'Example 1', code: '// Basic example code', explanation: 'Simple demonstration of the concept.' },
        { title: 'Example 2', code: '// Intermediate example code', explanation: 'Building on the basic example.' },
        { title: 'Example 3', code: '// Advanced example code', explanation: 'Real-world application.' }
      ]
    }

    const topic = this.detectTopic(concept)
    return (examples[topic] || examples.default).slice(0, count)
  }

  async mockRecommendNext(progress, context = {}) {
    await this.simulateDelay()
    return [
      {
        type: 'lesson',
        title: 'Next Lesson: Advanced Concepts',
        description: 'Build on what you learned with more advanced topics',
        priority: 'high',
        estimatedTime: '45 min'
      },
      {
        type: 'practice',
        title: 'Practice Exercise',
        description: 'Apply your knowledge with hands-on exercises',
        priority: 'medium',
        estimatedTime: '30 min'
      },
      {
        type: 'quiz',
        title: 'Knowledge Check',
        description: 'Test your understanding with a quick quiz',
        priority: 'medium',
        estimatedTime: '10 min'
      },
      {
        type: 'review',
        title: 'Review Previous Topics',
        description: 'Strengthen your foundation by reviewing key concepts',
        priority: 'low',
        estimatedTime: '20 min'
      }
    ]
  }

  async mockChat(messages, context = {}) {
    await this.simulateDelay()
    const lastMessage = messages[messages.length - 1]
    const userQuestion = lastMessage?.content || ''

    const responses = [
      "That's a great question! Let me explain...",
      "I'd be happy to help with that. Here's what you need to know...",
      "Excellent point! The key to understanding this is...",
      "Let me break this down for you step by step...",
      "This is a common question. Here's the explanation..."
    ]

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    return `${randomResponse}\n\n${userQuestion}\n\nWould you like me to provide more details or examples?`
  }

  // ============ REAL API METHODS (To be implemented) ============

  async realAskQuestion(question, context) {
    // TODO: Implement real API call
    throw new Error('Real API not implemented yet')
  }

  async realExplainConcept(concept, context) {
    // TODO: Implement real API call
    throw new Error('Real API not implemented yet')
  }

  async realSummarizeLesson(lessonContent, context) {
    // TODO: Implement real API call
    throw new Error('Real API not implemented yet')
  }

  async realGenerateQuiz(lessonContent, options) {
    // TODO: Implement real API call
    throw new Error('Real API not implemented yet')
  }

  async realGenerateFlashcards(content, options) {
    // TODO: Implement real API call
    throw new Error('Real API not implemented yet')
  }

  async realGiveExamples(concept, options) {
    // TODO: Implement real API call
    throw new Error('Real API not implemented yet')
  }

  async realRecommendNext(progress, context) {
    // TODO: Implement real API call
    throw new Error('Real API not implemented yet')
  }

  async realChat(messages, context) {
    // TODO: Implement real API call
    throw new Error('Real API not implemented yet')
  }

  // ============ HELPER METHODS ============

  simulateDelay(min = 500, max = 1500) {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min
    return new Promise(resolve => setTimeout(resolve, delay))
  }

  detectTopic(text) {
    const lower = text.toLowerCase()
    if (lower.includes('javascript') || lower.includes('js') || lower.includes('function') || lower.includes('variable')) {
      return 'javascript'
    }
    if (lower.includes('react') || lower.includes('component') || lower.includes('hook') || lower.includes('jsx')) {
      return 'react'
    }
    if (lower.includes('css') || lower.includes('style') || lower.includes('flexbox') || lower.includes('grid')) {
      return 'css'
    }
    return 'default'
  }
}

// Export singleton instance
export const aiService = new AIService()

// Export class for testing/custom instances
export default AIService
