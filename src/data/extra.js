export const paths = [
  { id: 'path-thinker', title: 'The Clear Thinker', count: 3, length: '12 weeks', desc: 'Writing, economics, study method.', coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85' },
  { id: 'path-maker', title: 'The Visual Maker', count: 2, length: '10 weeks', desc: 'Design and photography as seeing.', coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=85' },
]
export const initialThreads = [
  { id: 't1', title: 'Contrast in my poster draft', updatedAt: 'Today', messages: [
    { id: 'm1', role: 'user', text: 'My poster looks flat. Where do I start?' },
    { id: 'm2', role: 'assistant', text: 'Start with hierarchy, not decoration. Decide what the eye reads first, second, third. Make the first unmissable, then quiet everything else.' },
  ]},
]
