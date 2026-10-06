import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import { SectionHead } from '../components/Cards.jsx';
import { useToast } from '../components/Toast.jsx';

export default function Profile() {useTranslation();
  const { profile, setProfile } = useApp();
  const { success, error } = useToast();
  const [form, setForm] = useState(profile);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!form.name.trim()) {
      newErrors.name = 'This field is required.';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = 'This field is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Bio validation (optional but max length)
    if (form.bio && form.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const save = () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setProfile(form);
      setLoading(false);
      success('Profile updated successfully!');
    }, 500);
  };
  return (
    <div className="mx-auto max-w-shell px-5 py-14">
      <SectionHead kicker="Student" title={localizeText("Profile")} lede="Your public byline and private rhythm." />
      <div className="grid max-w-3xl gap-6">
        <Input
          label={localizeText("Name")}
          value={form.name}
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
            if (errors.name) setErrors({ ...errors, name: '' });
          }}
          size="lg"
          error={errors.name} />
        
        <Input
          label={localizeText("Email")}
          value={form.email}
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          size="lg"
          error={errors.email} />
        
        <Input
          as="textarea"
          rows={3}
          label={localizeText("Bio")}
          value={form.bio}
          onChange={(e) => {
            setForm({ ...form, bio: e.target.value });
            if (errors.bio) setErrors({ ...errors, bio: '' });
          }}
          size="lg"
          error={errors.bio}
          hint="Optional" />
        
        <div>
          <Button variant="primary" size="xl" onClick={save} loading={loading} disabled={loading}>{localizeText("Save changes")}</Button>
        </div>
      </div>
    </div>);

}
