/**
 * AI Service Usage Examples
 * 
 * This file demonstrates how to use the AI service in your components.
 * Copy and adapt these examples as needed.
 */

import { aiService } from './index.js'

// Example 1: Ask a Question
export async function exampleAskQuestion() {
  try {
    const response = await aiService.askQuestion(
      "What is a closure in JavaScript?",
      { courseId: 1, lessonId: 5 }
    )
    console.log('AI Response:', response)
    return response
  } catch (error) {
    console.error('Error asking question:', error)
  }
}

// Example 2: Explain a Concept
export async function exampleExplainConcept() {
  try {
    const explanation = await aiService.explainConcept(
      "React hooks",
      { courseId: 2 }
    )
    console.log('Explanation:', explanation)
    return explanation
  } catch (error) {
    console.error('Error explaining concept:', error)
  }
}

// Example 3: Summarize a Lesson
export async function exampleSummarizeLesson() {
  try {
    const lessonContent = "This lesson covers JavaScript closures and their practical applications..."
    const summary = await aiService.summarizeLesson(lessonContent, {
      difficulty: 'intermediate',
      estimatedTime: '2 hours'
    })
    console.log('Summary:', summary)
    return summary
  } catch (error) {
    console.error('Error summarizing lesson:', error)
  }
}

// Example 4: Generate a Quiz
export async function exampleGenerateQuiz() {
  try {
    const lessonContent = "JavaScript closures allow functions to access variables from their outer scope..."
    const quiz = await aiService.generateQuiz(lessonContent, {
      questionCount: 5,
      difficulty: 'medium',
      timeLimit: 15,
      passingScore: 70,
      title: 'Closures Quiz'
    })
    console.log('Generated Quiz:', quiz)
    return quiz
  } catch (error) {
    console.error('Error generating quiz:', error)
  }
}

// Example 5: Generate Flashcards
export async function exampleGenerateFlashcards() {
  try {
    const content = "JavaScript closures, React components, CSS Flexbox"
    const flashcards = await aiService.generateFlashcards(content, {
      count: 10
    })
    console.log('Flashcards:', flashcards)
    return flashcards
  } catch (error) {
    console.error('Error generating flashcards:', error)
  }
}

// Example 6: Get Examples
export async function exampleGiveExamples() {
  try {
    const examples = await aiService.giveExamples(
      "JavaScript closures",
      { count: 3, complexity: 'basic' }
    )
    console.log('Examples:', examples)
    return examples
  } catch (error) {
    console.error('Error getting examples:', error)
  }
}

// Example 7: Get Recommendations
export async function exampleRecommendNext() {
  try {
    const progress = {
      completedLessons: [1, 2, 3],
      currentLesson: 4,
      quizScores: [85, 90, 78]
    }
    const recommendations = await aiService.recommendNext(progress, {
      courseId: 1
    })
    console.log('Recommendations:', recommendations)
    return recommendations
  } catch (error) {
    console.error('Error getting recommendations:', error)
  }
}

// Example 8: Chat Conversation
export async function exampleChat() {
  try {
    const messages = [
      { role: 'user', content: 'Hello!' },
      { role: 'assistant', content: 'Hi! How can I help you today?' },
      { role: 'user', content: 'Can you explain React hooks?' }
    ]
    const response = await aiService.chat(messages, {
      courseId: 2
    })
    console.log('Chat Response:', response)
    return response
  } catch (error) {
    console.error('Error in chat:', error)
  }
}

// Example 9: Using in a React Component
export function exampleReactComponentUsage() {
  // This is how you would use it in a React component
  /*
  import { useState } from 'react'
  import { aiService } from '../services'

  function AIAssistant() {
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)

    const handleAsk = async (question) => {
      setLoading(true)
      try {
        const answer = await aiService.askQuestion(question, {
          courseId: 1,
          lessonId: 5
        })
        setResponse(answer)
      } catch (error) {
        console.error('Error:', error)
        setResponse('Sorry, something went wrong.')
      } finally {
        setLoading(false)
      }
    }

    return (
      <div>
        <button onClick={() => handleAsk('What is a closure?')}>
          Ask AI
        </button>
        {loading && <p>Loading...</p>}
        {response && <p>{response}</p>}
      </div>
    )
  }
  */
}

// Example 10: Error Handling Best Practice
export async function exampleWithErrorHandling() {
  try {
    const response = await aiService.askQuestion('Your question')
    // Success handling
    return response
  } catch (error) {
    // Error handling
    if (error.message.includes('not implemented')) {
      console.warn('Feature not available yet')
      return 'This feature is coming soon!'
    } else if (error.message.includes('network')) {
      console.error('Network error:', error)
      return 'Please check your connection and try again.'
    } else {
      console.error('Unexpected error:', error)
      return 'Something went wrong. Please try again later.'
    }
  }
}
