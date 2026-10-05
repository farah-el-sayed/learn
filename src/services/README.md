# AI Service Documentation

## Overview

The AI Service provides a clean abstraction layer for AI functionality. It currently uses mock responses but is designed to be easily replaced with a real AI API.

## Features

- ✅ Ask questions about course content
- ✅ Explain concepts in detail
- ✅ Summarize lessons
- ✅ Generate quizzes
- ✅ Generate flashcards
- ✅ Provide examples
- ✅ Recommend next learning steps
- ✅ Chat conversation support

## Usage

### Import the Service

```javascript
import { aiService } from '../services'
```

### Ask a Question

```javascript
const response = await aiService.askQuestion(
  "What is a closure in JavaScript?",
  { courseId: 1, lessonId: 5 }
)
console.log(response)
```

### Explain a Concept

```javascript
const explanation = await aiService.explainConcept(
  "React hooks",
  { courseId: 2 }
)
console.log(explanation)
```

### Summarize a Lesson

```javascript
const summary = await aiService.summarizeLesson(
  lessonContent,
  { difficulty: 'intermediate', estimatedTime: '2 hours' }
)
console.log(summary)
```

### Generate a Quiz

```javascript
const quiz = await aiService.generateQuiz(
  lessonContent,
  {
    questionCount: 5,
    difficulty: 'medium',
    timeLimit: 15,
    passingScore: 70
  }
)
console.log(quiz)
```

### Generate Flashcards

```javascript
const flashcards = await aiService.generateFlashcards(
  content,
  { count: 10 }
)
console.log(flashcards)
```

### Get Examples

```javascript
const examples = await aiService.giveExamples(
  "JavaScript closures",
  { count: 3, complexity: 'basic' }
)
console.log(examples)
```

### Get Recommendations

```javascript
const recommendations = await aiService.recommendNext(
  userProgress,
  { courseId: 1 }
)
console.log(recommendations)
```

### Chat Conversation

```javascript
const response = await aiService.chat(
  [
    { role: 'user', content: 'Hello!' },
    { role: 'assistant', content: 'Hi! How can I help?' },
    { role: 'user', content: 'Explain React hooks' }
  ],
  { courseId: 2 }
)
console.log(response)
```

## Switching to Real API

### Step 1: Enable Real API

In `src/services/aiService.js`, change:

```javascript
const USE_REAL_API = false
```

to:

```javascript
const USE_REAL_API = true
```

### Step 2: Implement Real API Methods

Implement each `real*` method in the `AIService` class. For example:

```javascript
async realAskQuestion(question, context) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI tutor for an online learning platform.'
        },
        {
          role: 'user',
          content: question
        }
      ]
    })
  })

  const data = await response.json()
  return data.choices[0].message.content
}
```

### Step 3: Add API Configuration

Add configuration for your API:

```javascript
class AIService {
  constructor() {
    this.useRealAPI = USE_REAL_API
    this.apiKey = process.env.REACT_APP_AI_API_KEY || ''
    this.apiEndpoint = process.env.REACT_APP_AI_API_ENDPOINT || 'https://api.openai.com/v1'
    this.model = process.env.REACT_APP_AI_MODEL || 'gpt-4'
  }
  
  // ... rest of the class
}
```

### Step 4: Add Environment Variables

Create a `.env` file:

```
REACT_APP_AI_API_KEY=your_api_key_here
REACT_APP_AI_API_ENDPOINT=https://api.openai.com/v1
REACT_APP_AI_MODEL=gpt-4
```

## Custom AI Service

You can also create a custom instance:

```javascript
import AIService from '../services/aiService'

const customAI = new AIService()
customAI.useRealAPI = true
// Configure custom instance
```

## Testing

The service includes built-in delay simulation for mock responses. You can adjust this in the `simulateDelay` method:

```javascript
simulateDelay(min = 500, max = 1500) {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min
  return new Promise(resolve => setTimeout(resolve, delay))
}
```

## Error Handling

Always wrap AI service calls in try-catch:

```javascript
try {
  const response = await aiService.askQuestion(question, context)
  // Handle response
} catch (error) {
  console.error('AI service error:', error)
  // Handle error
}
```

## API Response Formats

### Quiz Response

```javascript
{
  title: "Knowledge Check",
  difficulty: "medium",
  timeLimit: 15,
  passingScore: 70,
  questions: [
    {
      id: 1,
      question: "Question text",
      options: ["A", "B", "C", "D"],
      correctAnswer: 0,
      points: 10,
      explanation: "Explanation text"
    }
  ]
}
```

### Flashcards Response

```javascript
[
  {
    front: "Question",
    back: "Answer"
  }
]
```

### Examples Response

```javascript
[
  {
    title: "Example Title",
    code: "code snippet",
    explanation: "explanation text"
  }
]
```

### Recommendations Response

```javascript
[
  {
    type: "lesson",
    title: "Title",
    description: "Description",
    priority: "high",
    estimatedTime: "45 min"
  }
]
```

## Contributing

When adding new AI features:

1. Add the method to the `AIService` class
2. Implement both `mock*` and `real*` versions
3. Update this documentation
4. Add example usage

## License

This service is part of the Learn platform project.
