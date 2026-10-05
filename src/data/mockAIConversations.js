// Mock AI Conversations Data
export const mockAIConversations = [
  {
    id: 1,
    userId: 1,
    courseId: 1,
    title: 'Help with CSS Flexbox',
    status: 'active',
    createdAt: '2024-09-30T08:00:00Z',
    updatedAt: '2024-09-30T09:30:00Z',
    messages: [
      {
        id: 1,
        role: 'user',
        content: 'I am having trouble understanding CSS Flexbox. Can you explain how it works?',
        timestamp: '2024-09-30T08:00:00Z'
      },
      {
        id: 2,
        role: 'assistant',
        content: 'Of course! CSS Flexbox is a layout model that allows you to arrange elements in a flexible way. The main concept is a flex container with flex items inside. You can control the direction, alignment, and distribution of space using properties like `display: flex`, `flex-direction`, `justify-content`, and `align-items`. Would you like me to explain any specific property in detail?',
        timestamp: '2024-09-30T08:01:00Z'
      },
      {
        id: 3,
        role: 'user',
        content: 'Yes, please explain justify-content and align-items.',
        timestamp: '2024-09-30T08:05:00Z'
      },
      {
        id: 4,
        role: 'assistant',
        content: 'Great question! `justify-content` controls the alignment of flex items along the main axis (horizontal by default). Options include: flex-start, flex-end, center, space-between, space-around, and space-evenly. `align-items` controls alignment along the cross axis (vertical by default). Options include: flex-start, flex-end, center, stretch, and baseline. Think of justify-content as left-right alignment and align-items as top-bottom alignment for a row layout.',
        timestamp: '2024-09-30T08:06:00Z'
      },
      {
        id: 5,
        role: 'user',
        content: 'That makes sense! How do I center an element both horizontally and vertically?',
        timestamp: '2024-09-30T09:30:00Z'
      }
    ]
  },
  {
    id: 2,
    userId: 1,
    courseId: 2,
    title: 'JavaScript Closures Explained',
    status: 'archived',
    createdAt: '2024-09-28T14:00:00Z',
    updatedAt: '2024-09-28T15:30:00Z',
    messages: [
      {
        id: 1,
        role: 'user',
        content: 'Can you explain JavaScript closures with a simple example?',
        timestamp: '2024-09-28T14:00:00Z'
      },
      {
        id: 2,
        role: 'assistant',
        content: 'A closure is a function that has access to variables from its outer (enclosing) scope, even after the outer function has returned. Here is a simple example:\n\n```javascript\nfunction createCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\n```\n\nThe inner function "closes over" the `count` variable, maintaining its state between calls.',
        timestamp: '2024-09-28T14:01:00Z'
      },
      {
        id: 3,
        role: 'user',
        content: 'Thank you! That helps a lot.',
        timestamp: '2024-09-28T15:30:00Z'
      }
    ]
  },
  {
    id: 3,
    userId: 2,
    courseId: 3,
    title: 'Pandas Dataframe Questions',
    status: 'active',
    createdAt: '2024-09-29T10:00:00Z',
    updatedAt: '2024-09-29T11:45:00Z',
    messages: [
      {
        id: 1,
        role: 'user',
        content: 'How do I filter a Pandas dataframe based on multiple conditions?',
        timestamp: '2024-09-29T10:00:00Z'
      },
      {
        id: 2,
        role: 'assistant',
        content: 'You can filter a Pandas dataframe using boolean indexing with multiple conditions. Use `&` for AND and `|` for OR operations. Remember to wrap each condition in parentheses. Here is an example:\n\n```python\nimport pandas as pd\n\n# Filter rows where age > 25 AND city == "New York"\nfiltered_df = df[(df["age"] > 25) & (df["city"] == "New York")]\n\n# Filter where salary > 50000 OR department == "Engineering"\nfiltered_df = df[(df["salary"] > 50000) | (df["department"] == "Engineering")]\n```\n\nYou can also use the `query()` method for more readable syntax: `df.query("age > 25 and city == \'New York\'")`',
        timestamp: '2024-09-29T10:01:00Z'
      },
      {
        id: 3,
        role: 'user',
        content: 'What about handling missing values in a dataframe?',
        timestamp: '2024-09-29T11:45:00Z'
      }
    ]
  },
  {
    id: 4,
    userId: 2,
    courseId: 5,
    title: 'Machine Learning Model Evaluation',
    status: 'archived',
    createdAt: '2024-09-25T16:00:00Z',
    updatedAt: '2024-09-25T17:20:00Z',
    messages: [
      {
        id: 1,
        role: 'user',
        content: 'What is the difference between accuracy, precision, and recall?',
        timestamp: '2024-09-25T16:00:00Z'
      },
      {
        id: 2,
        role: 'assistant',
        content: 'These are important metrics for evaluating classification models:\n\n**Accuracy**: The proportion of correct predictions (both true positives and true negatives) out of all predictions. Formula: (TP + TN) / (TP + TN + FP + FN)\n\n**Precision**: The proportion of positive predictions that are actually correct. It measures how many selected items are relevant. Formula: TP / (TP + FP)\n\n**Recall (Sensitivity)**: The proportion of actual positives that are correctly identified. It measures how many relevant items are selected. Formula: TP / (TP + FN)\n\nUse precision when false positives are costly (e.g., spam detection). Use recall when false negatives are costly (e.g., disease diagnosis). The F1-score combines both metrics.',
        timestamp: '2024-09-25T16:01:00Z'
      },
      {
        id: 3,
        role: 'user',
        content: 'Very helpful explanation, thank you!',
        timestamp: '2024-09-25T17:20:00Z'
      }
    ]
  },
  {
    id: 5,
    userId: 1,
    courseId: 4,
    title: 'React useEffect Hook',
    status: 'active',
    createdAt: '2024-09-30T07:00:00Z',
    updatedAt: '2024-09-30T07:30:00Z',
    messages: [
      {
        id: 1,
        role: 'user',
        content: 'When should I use the useEffect hook in React?',
        timestamp: '2024-09-30T07:00:00Z'
      },
      {
        id: 2,
        role: 'assistant',
        content: 'The useEffect hook is used for side effects in functional components. Common use cases include:\n\n1. **Data fetching**: Fetch data from APIs when the component mounts\n2. **Subscriptions**: Set up event listeners or WebSocket connections\n3. **DOM manipulation**: Directly interact with the DOM\n4. **Timers**: Set up intervals or timeouts\n\nThe hook takes two arguments: a function (the effect) and a dependency array. The effect runs after every render by default, but you can control when it runs using the dependency array:\n\n- Empty array `[]`: Runs only once on mount\n- No array: Runs on every render\n- With dependencies: Runs when any dependency changes\n\nExample:\n```javascript\nuseEffect(() => {\n  fetchData();\n}, []); // Runs once on mount\n```',
        timestamp: '2024-09-30T07:01:00Z'
      },
      {
        id: 3,
        role: 'user',
        content: 'How do I clean up side effects?',
        timestamp: '2024-09-30T07:30:00Z'
      }
    ]
  }
];
