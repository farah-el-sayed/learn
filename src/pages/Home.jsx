import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, LogIn, UserPlus } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { Featured, HowItWorks } from './HomeA.jsx'
import { TutorSection, Stats } from './HomeB.jsx'
import { Voices, Studio, FinalCta } from './HomeC.jsx'
export default function Home() {
  const { setAssistantOpen } = useApp()
  return (
    <div>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-shell gap-12 px-5 pb-16 pt-16 md:grid-cols-12 md:pt-24">
          <div className="md:col-span-7">
            <p className="inline-flex items-center gap-2 border border-line bg-white px-3 py-1.5 text-[12px] font-medium text-ink-soft"><Sparkles size={13} /> A calmer place to learn</p>
            <h1 className="mt-6 font-serif text-[52px] leading-[1.02] md:text-[84px]">Learn at your<br />own <em className="font-serif italic">rhythm.</em></h1>
            <p className="mt-6 max-w-md text-[16.5px] leading-relaxed text-ink-muted">Build meaningful learning habits with structured courses and an intelligent learning companion.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/courses" className="flex items-center gap-2 bg-pine px-6 py-3.5 text-[14px] font-medium text-paper hover:bg-pine-deep">Explore Courses <ArrowRight size={16} /></Link>
              <button onClick={() => setAssistantOpen(true)} className="border border-ink/20 bg-white px-6 py-3.5 text-[14px] font-medium hover:border-ink">Meet Your AI Tutor</button>
              <Link to="/login" className="flex items-center gap-2 border border-line bg-white px-6 py-3.5 text-[14px] font-medium hover:border-ink"><LogIn size={16} /> Sign in</Link>
              <Link to="/register" className="flex items-center gap-2 border border-line bg-white px-6 py-3.5 text-[14px] font-medium hover:border-ink"><UserPlus size={16} /> Create account</Link>
            </div>
          </div>
          <aside className="md:col-span-5">
            <div className="border border-line bg-white">
              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <p className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-muted"><span className="h-1.5 w-1.5 bg-sage" /> Tutor</p>
                <p className="text-[12px] text-ink-faint">Knows your syllabus</p>
              </div>
              <img
                src="src/images/photo-1.jpg"
                alt="Learners studying together around a table"
                className="h-36 w-full object-cover"
                loading="eager"
              />
              <div className="space-y-3 px-5 py-5 text-[13.5px] leading-relaxed">
                <p className="w-fit max-w-[90%] border border-line bg-paper px-3.5 py-2.5">My poster looks flat. Where do I start?</p>
                <p className="w-fit max-w-[92%] bg-pine px-3.5 py-2.5 text-paper">One clear winner — then quiet everything else.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <Featured />
      <HowItWorks />
      <TutorSection />
      <Stats />
      <Voices />
      <Studio />
      <FinalCta />
    </div>
  )
}
