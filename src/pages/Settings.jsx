import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import { useToast } from '../components/Toast.jsx'
export default function Settings() {
  const { profile, setProfile, reminderSettings, setReminderSettings } = useApp()
  const { success, error } = useToast()
  const [form, setForm] = useState({ name: '', email: '' })
  const [errors, setErrors] = useState({})
  const [weeklyLetter, setWeeklyLetter] = useState(() => window.localStorage.getItem('learn-weekly-letter') !== 'false')
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    const name = form.name.trim() || profile.name.trim()
    const email = form.email.trim() || profile.email.trim()

    // Name validation
    if (!name) {
      newErrors.name = 'This field is required.'
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters.'
    }

    // Email validation
    if (!email) {
      newErrors.email = 'This field is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const save = () => {
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setTimeout(() => {
      setProfile({
        ...profile,
        name: form.name.trim() || profile.name,
        email: form.email.trim() || profile.email,
      })
      setForm({ name: '', email: '' })
      setLoading(false)
      success('Settings saved successfully!')
    }, 500)
  }

  const toggleReminders = async () => {
    const enabled = !reminderSettings.enabled
    if (enabled) {
      if (!('Notification' in window)) {
        error('This browser does not support study reminders.')
        return
      }
      let permission
      try {
        permission = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission()
      } catch {
        error('Browser notification permission could not be requested.')
        return
      }
      if (permission !== 'granted') {
        error('Allow browser notifications to receive study reminders.')
        return
      }
    }
    setReminderSettings(settings => ({ ...settings, enabled }))
  }

  const toggleWeeklyLetter = () => {
    setWeeklyLetter(enabled => {
      window.localStorage.setItem('learn-weekly-letter', String(!enabled))
      return !enabled
    })
  }

  return (
    <div>
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-clay">Workspace</p>
      <h1 className="mt-3 font-serif text-[36px]">Settings</h1>
      <div className="mt-8 grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.7fr)]">
        <div className="grid content-start gap-8">
          <div className="border border-line bg-white p-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-faint">Profile</p>
          <Input 
            value={form.name}
            placeholder={profile.name}
            onChange={e => {
              setForm({ ...form, name: e.target.value })
              if (errors.name) setErrors({ ...errors, name: '' })
            }} 
            tone="paper" 
            className="mt-3" 
            label="Name" 
            error={errors.name}
          />
          <Input 
            value={form.email}
            placeholder={profile.email}
            onChange={e => {
              setForm({ ...form, email: e.target.value })
              if (errors.email) setErrors({ ...errors, email: '' })
            }} 
            tone="paper" 
            className="mt-2" 
            label="Email" 
            error={errors.email}
          />
          <Button variant="primary" size="lg" className="mt-3" onClick={save} loading={loading} disabled={loading}>Save</Button>
          </div>
          <div className="border border-line bg-white p-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-faint">Notifications</p>
          <div className="flex items-center justify-between border-b border-line py-3">
            <span className="text-[14px]">Study reminders</span>
            <button type="button" onClick={toggleReminders} className={`h-6 w-11 px-0.5 ${reminderSettings.enabled ? 'bg-pine' : 'bg-line'}`} role="switch" aria-checked={reminderSettings.enabled} aria-label="Toggle study reminders"><span className={`block h-5 w-5 bg-paper ${reminderSettings.enabled ? 'ml-5' : ''}`} /></button>
          </div>
          {reminderSettings.enabled && (
            <label className="grid max-w-xs gap-2 py-3 text-[13px] font-medium text-ink-soft">
              Reminder time
              <input type="time" value={reminderSettings.time} onChange={event => setReminderSettings(settings => ({ ...settings, time: event.target.value }))} className="border border-line bg-paper px-3 py-2 text-ink" />
              <span className="text-[12px] font-normal text-ink-muted">Alerts follow your weekly plan and appear while Learn is open.</span>
            </label>
          )}
          <div className="flex items-center justify-between py-3">
            <span className="text-[14px]">Sunday letter</span>
            <button type="button" onClick={toggleWeeklyLetter} className={`h-6 w-11 px-0.5 ${weeklyLetter ? 'bg-pine' : 'bg-line'}`} role="switch" aria-checked={weeklyLetter} aria-label="Toggle Sunday letter"><span className={`block h-5 w-5 bg-paper ${weeklyLetter ? 'ml-5' : ''}`} /></button>
          </div>
          </div>
        </div>
        <figure className="relative aspect-[4/3] overflow-hidden lg:sticky lg:top-24 lg:aspect-[3/4]">
          <img
            src="src/images/write.jpg"
            alt="Notebook and pen on a study desk"
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </figure>
      </div>
    </div>
  )
}
