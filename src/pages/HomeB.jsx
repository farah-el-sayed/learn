import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { useApp } from '../context/AppContext.jsx';
import AITutorCard from '../components/AITutorCard.jsx';
import Button from '../components/Button.jsx';
import StatCard from '../components/StatCard.jsx';
import { SectionHead } from '../components/Cards.jsx';

export function TutorSection() {useTranslation();
  const { setAssistantOpen } = useApp();
  return (
    <section className="mx-auto max-w-shell px-5 pt-20">
      <AITutorCard
        tone="ink"
        size="lg"
        title={localizeText("A companion that knows your courses.")}
        items={[
        'Quizzes you kindly, on your own lessons',
        'Summarises any module in one paragraph',
        'Plans 30-minute days around your life']
        }
        action={<Button variant="paper" size="xl" onClick={() => setAssistantOpen(true)}>{localizeText("Meet Your AI Tutor")}</Button>}
        example={{ question: 'Summarise module two?', answer: 'Hierarchy first, contrast with intent, spacing as meaning.' }} />
      
    </section>);

}

export function Stats() {useTranslation();
  return (
    <section className="mx-auto max-w-shell px-5 pt-20">
      <StatCard
        variant="centered"
        items={[
        { value: '42k', label: 'active learners' },
        { value: '4.8 / 5', label: 'average rating' },
        { value: '120+', label: 'lessons published' },
        { value: '92%', label: 'finish their course' }]
        } />
      
    </section>);

}
