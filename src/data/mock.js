import photo33 from '../images/photo-33.jpg'
import photo34 from '../images/photo-34.jpg'
import photo35 from '../images/photo-35.jpg'
import photo36 from '../images/photo-36.jpg'
import photo37 from '../images/photo-37.jpg'
import writingCover from '../images/write.jpg'

export const instructors = {
  maya: { name: 'Maya Lindqvist', role: 'Design educator, ex-Studio Norm', initials: 'ML' },
  jonas: { name: 'Jonas Feld', role: 'Writer and editor', initials: 'JF' },
  priya: { name: 'Priya Nair', role: 'Economist', initials: 'PN' },
  tomas: { name: 'Tomas Rivera', role: 'Research scientist', initials: 'TR' },
  elena: { name: 'Elena Marsh', role: 'Photographer', initials: 'EM' },
}

export const courses = [
  {
    id: 'design-foundations',
    title: 'Design Foundations',
    subtitle: 'See clearly, compose with intent',
    description: 'A slow, deliberate introduction to visual design. Hierarchy, contrast, spacing, and taste. For non-designers who want to think like one.',
    instructor: instructors.maya,
    level: 'Beginner',
    duration: '6 weeks, 24 lessons',
    category: 'Design',
    rating: 4.9,
    learners: 12480,
    progress: 38,
    coverTone: '#EAE6DB',
    coverImage: photo33,
    outcomes: ['Compose layouts with clear hierarchy', 'Use contrast and spacing with intent', 'Critique your own work honestly'],
    syllabus: [
      { id: 'm1', title: 'Seeing', lessons: [
        { id: 'd1-l1', title: 'Learning to notice', length: '12 min', kind: 'Reading' },
        { id: 'd1-l2', title: 'Contrast with intent', length: '18 min', kind: 'Lesson' },
        { id: 'd1-l3', title: 'Field study: your street', length: '25 min', kind: 'Exercise' },
      ]},
      { id: 'm2', title: 'Composing', lessons: [
        { id: 'd2-l1', title: 'Hierarchy before style', length: '16 min', kind: 'Lesson' },
        { id: 'd2-l2', title: 'Spacing is meaning', length: '14 min', kind: 'Lesson' },
        { id: 'd2-l3', title: 'Redesign a menu', length: '40 min', kind: 'Project' },
      ]},
    ],
  },
  {
    id: 'writing-clearly',
    title: 'Writing Clearly',
    subtitle: 'Say what you mean',
    description: 'Short essays, sharp sentences, honest editing. A writing course for people who think they cannot write.',
    instructor: instructors.jonas,
    level: 'All levels',
    duration: '4 weeks, 18 lessons',
    category: 'Writing',
    rating: 4.8,
    learners: 9320,
    progress: 22,
    coverTone: '#F0E7D9',
    coverImage: writingCover,
    outcomes: ['Write shorter, stronger sentences', 'Structure any piece in 20 minutes', 'Edit without fear'],
    syllabus: [
      { id: 'm1', title: 'Clarity', lessons: [
        { id: 'w1-l1', title: 'Lead with the point', length: '10 min', kind: 'Lesson' },
        { id: 'w1-l2', title: 'One idea per sentence', length: '14 min', kind: 'Exercise' },
        { id: 'w1-l3', title: 'Cut 30 percent', length: '20 min', kind: 'Exercise' },
      ]},
      { id: 'm2', title: 'Rhythm', lessons: [
        { id: 'w2-l1', title: 'Read it aloud', length: '12 min', kind: 'Lesson' },
        { id: 'w2-l2', title: 'Your first essay', length: '45 min', kind: 'Project' },
      ]},
    ],
  },
  {
    id: 'economics-everyday',
    title: 'Everyday Economics',
    subtitle: 'Why the world prices what it does',
    description: 'Incentives, trade-offs, and the quiet logic behind everyday decisions. Explained without jargon.',
    instructor: instructors.priya,
    level: 'Beginner',
    duration: '5 weeks, 20 lessons',
    category: 'Society',
    rating: 4.7,
    learners: 7640,
    progress: 0,
    coverTone: '#DFE5DD',
    coverImage: photo34,
    outcomes: ['Think in trade-offs', 'Read the news like an economist', 'Explain incentives simply'],
    syllabus: [
      { id: 'm1', title: 'Choice', lessons: [
        { id: 'e1-l1', title: 'There is no free lunch', length: '15 min', kind: 'Lesson' },
        { id: 'e1-l2', title: 'Incentives everywhere', length: '18 min', kind: 'Lesson', mediaImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85' },
      ]},
    ],
  },
  {
    id: 'learning-how-to-learn',
    title: 'Learning How to Learn',
    subtitle: 'Study less, remember more',
    description: 'Evidence-based study methods: spacing, retrieval, rest.',
    instructor: instructors.tomas,
    level: 'All levels',
    duration: '3 weeks, 12 lessons',
    category: 'Study',
    rating: 4.9,
    learners: 18230,
    progress: 64,
    coverTone: '#E7E5DA',
    coverImage: photo35,
    outcomes: ['Build a recall habit', 'Design a weekly rhythm'],
    syllabus: [
      { id: 'm1', title: 'Memory', lessons: [
        { id: 'l1-l1', title: 'Retrieval beats review', length: '12 min', kind: 'Lesson' },
        { id: 'l1-l2', title: 'Space it out', length: '11 min', kind: 'Lesson' },
      ]},
    ],
  },
  {
    id: 'photography-seeing',
    title: 'Photography as Seeing',
    subtitle: 'A slower way to look',
    description: 'Light, frame, patience. For beginners with any camera.',
    instructor: instructors.elena,
    level: 'Beginner',
    duration: '4 weeks, 16 lessons',
    category: 'Craft',
    rating: 4.8,
    learners: 5210,
    progress: 0,
    coverTone: '#E4E0D2',
    coverImage: photo36,
    outcomes: ['Read light', 'Compose deliberately'],
    syllabus: [
      { id: 'm1', title: 'Light', lessons: [
        { id: 'p1-l1', title: 'Morning, noon, dusk', length: '14 min', kind: 'Lesson' },
        { id: 'p1-l2', title: 'One walk, ten frames', length: '30 min', kind: 'Exercise' },
      ]},
    ],
  },
  {
    id: 'data-literacy',
    title: 'Data Literacy',
    subtitle: 'Read charts, ask better questions',
    description: 'A gentle path through numbers in the news.',
    instructor: instructors.tomas,
    level: 'Intermediate',
    duration: '5 weeks, 22 lessons',
    category: 'Study',
    rating: 4.6,
    learners: 6890,
    progress: 0,
    coverTone: '#EAE2D2',
    coverImage: photo37,
    outcomes: ['Question any average', 'Make one honest chart'],
    syllabus: [
      { id: 'm1', title: 'Numbers', lessons: [
        { id: 'da-l1', title: 'What an average hides', length: '13 min', kind: 'Lesson' },
      ]},
    ],
  },
]
