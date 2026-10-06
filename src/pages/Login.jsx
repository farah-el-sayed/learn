import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Button from '../components/Button.jsx';
import BrandMark from '../components/BrandMark.jsx';
import AuthLayout from '../components/AuthLayout.jsx';
import Input from '../components/Input.jsx';
import { useToast } from '../components/Toast.jsx';

export default function Login() {useTranslation();
  const navigate = useNavigate();
  const { setRole, setProfile } = useApp();
  const { success, error } = useToast();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = 'This field is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Password validation
    if (!form.password) {
      newErrors.password = 'This field is required.';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Mock login logic
    setTimeout(() => {
      setLoading(false);

      // Simple mock authentication
      if (form.email.includes('student')) {
        setRole('student');
        setProfile({ name: 'Sara H.', email: form.email });
        success('Welcome back, Sara!');
        navigate('/dashboard');
      } else if (form.email.includes('instructor')) {
        setRole('instructor');
        setProfile({ name: 'Omar K.', email: form.email });
        success('Welcome back, Omar!');
        navigate('/teach');
      } else if (form.email.includes('admin')) {
        setRole('admin');
        setProfile({ name: 'Admin User', email: form.email });
        success('Welcome back, Admin!');
        navigate('/admin');
      } else {
        // Default to student
        setRole('student');
        setProfile({ name: 'Learner', email: form.email });
        success('Welcome to Learn!');
        navigate('/dashboard');
      }
    }, 1000);
  };

  return (
    <AuthLayout>
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <BrandMark size="lg" className="mx-auto" />
            <h1 className="mt-4 font-serif text-[32px]">{localizeText("Sign in")}</h1>
            <p className="mt-2 text-[14px] text-ink-muted">{localizeText("Enter your email to access your workspace")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
            type="email"
            label={localizeText("Email")}
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            placeholder={localizeText("you@example.com")}
            required
            error={errors.email} />
          
            <Input
            type="password"
            label={localizeText("Password")}
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            placeholder={localizeText("••••••••")}
            required
            error={errors.password} />
          
            <Button
            type="submit"
            variant="primary"
            size="lg"
            full
            loading={loading}
            disabled={loading}>{localizeText("Sign in")}


          </Button>
          </form>

          <div className="mt-6 text-center text-[13px] text-ink-muted">
            <p>{localizeText("Demo accounts: student@test.com, instructor@test.com, admin@test.com")}</p>
            <p className="mt-2">{localizeText("Any password works")}</p>
          </div>
        </div>
    </AuthLayout>);

}
