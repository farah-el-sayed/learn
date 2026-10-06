import { localizeText } from "../i18n.js";import { useTranslation } from "react-i18next";import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-pine text-paper hover:bg-pine-deep',
  ink: 'bg-ink text-paper hover:bg-ink-soft',
  paper: 'bg-paper text-ink hover:bg-white',
  outline: 'border border-line bg-white text-ink hover:border-ink/30',
  quiet: 'border border-ink/20 bg-white text-ink hover:border-ink',
  ghost: 'text-ink-soft hover:bg-paper',
  accent: 'bg-clay text-paper hover:bg-clay-deep',
  link: 'underline underline-offset-4 text-ink'
};

const sizes = {
  plain: '',
  sm: 'px-2.5 py-1.5 text-[12.5px]',
  md: 'px-4 py-2.5 text-[13.5px]',
  lg: 'px-5 py-2.5 text-[13.5px]',
  xl: 'px-6 py-3.5 text-[14px]'
};

const iconSizes = { plain: 14, sm: 14, md: 15, lg: 15, xl: 16 };

function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  icon: Icon,
  trailingIcon: TrailingIcon,
  full = false,
  disabled = false,
  loading = false,
  className = '',
  ...rest
}) {useTranslation();
  // `plain` is an empty string on purpose: it means "no size classes", so the
  // caller owns the padding. `??` keeps that empty value (|| would fall through
  // to md and quietly re-add padding).
  const baseClasses = `inline-flex items-center justify-center gap-2 font-medium transition-normal active-scale focus-ring disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100 ${variants[variant] || variants.primary} ${sizes[size] ?? sizes.md} ${full ? 'w-full' : ''} ${loading ? 'opacity-70 cursor-wait' : ''} ${className}`;

  const glyph = iconSizes[size] ?? 15;

  const content =
  <>
      {loading ?
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg> :

    Icon && <Icon size={glyph} />
    }
      {children}
      {TrailingIcon && <TrailingIcon size={glyph} />}
    </>;


  if (to && !disabled && !loading) {
    return (
      <Link to={to} className={baseClasses} {...rest}>
        {localizeText(content)}
      </Link>);

  }

  if (href && !disabled && !loading) {
    return (
      <a href={href} className={baseClasses} {...rest}>
        {localizeText(content)}
      </a>);

  }

  return (
    <button
      type={rest.type || 'button'}
      className={baseClasses}
      disabled={disabled || loading}
      {...rest}>
      
      {localizeText(content)}
    </button>);

}

export default Button;
