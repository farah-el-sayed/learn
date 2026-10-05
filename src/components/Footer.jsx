import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import BrandMark from './BrandMark.jsx'

export default function Footer() {
  const { role } = useApp()
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-shell gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <BrandMark size="sm" />
            <span className="font-serif text-lg">Learn</span>
          </div>
          <p className="mt-3 max-w-xs text-[13.5px] leading-relaxed text-ink-muted">A calmer place to learn. Short lessons, honest teaching, and a tutor that knows your courses.</p>
        </div>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-widest text-ink-faint">Learn</p>
          <div className="mt-3 flex flex-col gap-2 text-[13.5px] text-ink-soft">
            <Link to="/courses">All courses</Link>
            {role === 'student' && <Link to="/dashboard">My learning</Link>}
            {role === 'student' && <Link to="/assignments">Assignments</Link>}
            <Link to="/profile">Profile</Link>
            {role === 'instructor' && <Link to="/teach">Teach</Link>}
            {role === 'admin' && <Link to="/admin">Admin</Link>}
          </div>
        </div>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-widest text-ink-faint">Studio</p>
          <div className="mt-3 flex flex-col gap-2 text-[13.5px] text-ink-soft">
            <Link to="/manifesto">Manifesto</Link>
            <Link to="/teaching-notes">Teaching notes</Link>
            <Link to="/about">About</Link>
          </div>
        </div>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-widest text-ink-faint">Weekly letter</p>
          <p className="mt-3 text-[13.5px] text-ink-muted">One idea, one exercise, every Sunday.</p>
          <div className="mt-3 flex">
            <input placeholder="you@example.com" className="w-full border border-line bg-white px-3 py-2 text-[13px] outline-none" />
            <button className="bg-ink px-4 text-[13px] font-medium text-paper">Join</button>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-2 px-5 py-4 text-[12px] text-ink-faint">
          <span>© 2026 Learn Studio</span>
          <span>Set in Instrument Serif & DM Sans</span>
        </div>
      </div>
    </footer>
  )
}
