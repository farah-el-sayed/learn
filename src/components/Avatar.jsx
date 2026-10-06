import { localizeText } from "../i18n.js";import { useTranslation } from "react-i18next";const sizes = {
  sm: 'h-8 w-8 text-[11px]',
  md: 'h-10 w-10 text-[13px]',
  lg: 'h-12 w-12 text-[13px]',
  xl: 'h-16 w-16 font-serif text-[22px]'
};

const tones = {
  cream: 'bg-cream text-ink-soft',
  paper: 'bg-paper text-ink',
  pine: 'bg-pine text-paper',
  sage: 'bg-sage text-pine-deep'
};

function initialsOf(name = '') {
  return name.
  split(' ').
  map((w) => w.charAt(0)).
  filter(Boolean).
  slice(0, 2).
  join('').
  toUpperCase();
}

export function Avatar({ name = '', src, initials, size = 'md', tone = 'cream', style, className = '', ...rest }) {useTranslation();
  const label = initials || initialsOf(name);
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center font-semibold uppercase ${sizes[size] || sizes.md} ${style ? '' : tones[tone] || tones.cream} ${className}`}
      style={style}
      title={name || undefined}
      aria-label={name || undefined}
      {...rest}>
      
      {localizeText(src ? <img src={src} alt={name} className="h-full w-full object-cover" /> : label)}
    </span>);

}

export default Avatar;
