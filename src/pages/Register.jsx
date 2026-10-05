import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import Button from '../components/Button.jsx'
import BrandMark from '../components/BrandMark.jsx'
import AuthLayout from '../components/AuthLayout.jsx'
import Input from '../components/Input.jsx'
import { useToast } from '../components/Toast.jsx'

export default function Register() {
  const navigate = useNavigate()
  const { setRole, setProfile } = useApp()
  const { success, error } = useToast()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!form.name.trim()) {
      newErrors.name = 'This field is required.'
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.'
    }

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = 'This field is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    // Password validation
    if (!form.password) {
      newErrors.password = 'This field is required.'
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    // Mock registration logic
    setTimeout(() => {
      setLoading(false)
      setRole('student')
      setProfile({ name: form.name, email: form.email })
      success('Account created successfully!')
      navigate('/dashboard')
    }, 1000)
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <BrandMark size="lg" className="mx-auto" />
          <h1 className="mt-4 font-serif text-[32px]">Create account</h1>
          <p className="mt-2 text-[14px] text-ink-muted">Start your learning journey today</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            label="Full name"
            value={form.name}
            onChange={e => {
              setForm({ ...form, name: e.target.value })
              if (errors.name) setErrors({ ...errors, name: '' })
            }}
            placeholder="Your name"
            required
            error={errors.name}
          />
          <Input
            type="email"
            label="Email"
            value={form.email}
            onChange={e => {
              setForm({ ...form, email: e.target.value })
              if (errors.email) setErrors({ ...errors, email: '' })
            }}
            placeholder="you@example.com"
            required
            error={errors.email}
          />
          <Input
            type="password"
            label="Password"
            value={form.password}
            onChange={e => {
              setForm({ ...form, password: e.target.value })
              if (errors.password) setErrors({ ...errors, password: '' })
            }}
            placeholder="••••••••"
            required
            error={errors.password}
            hint="Must be at least 6 characters"
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            full
            loading={loading}
            disabled={loading}
          >
            Create account
          </Button>
        </form>

        <div className="mt-6 text-center text-[13px] text-ink-muted">
          <p>
            Already have an account?{' '}
            <button type="button" onClick={() => navigate('/login')} className="underline">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
