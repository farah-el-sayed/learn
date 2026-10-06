import { localizeText } from "../i18n.js";import { useTranslation } from "react-i18next"; // Flat field matching every form in the project (Profile, Settings, search boxes, admin tables).
// Pass `as="textarea"` + rows for multi-line fields. `size`/`tone` cover the two flat variants already in use.
const sizes = {
  xs: 'px-2.5 py-2 text-[12.5px]',
  sm: 'px-3 py-2 text-[13px]',
  md: 'px-3.5 py-2.5 text-[13.5px]',
  lg: 'px-4 py-3 text-[14px]'
};

const tones = {
  white: 'bg-white',
  paper: 'bg-paper',
  transparent: 'bg-transparent'
};

export function Input({
  as: Tag = 'input',
  label,
  hint,
  error,
  size = 'md',
  tone = 'white',
  disabled = false,
  className = '',
  wrapClassName = '',
  ...rest
}) {useTranslation();
  const field = `w-full border border-line ${tones[tone] || tones.white} ${sizes[size] || sizes.md} text-ink outline-none placeholder:text-ink-faint transition-normal focus:border-pine focus:ring-1 focus:ring-pine ${error ? 'border-clay focus:border-clay focus:ring-clay' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`.trim();
  const control = <Tag className={label ? `${field} font-normal` : field} disabled={disabled} {...rest} />;
  if (!label && !hint && !error) return control;
  return (
    <label className={`grid gap-2 text-[13px] font-medium text-ink ${disabled ? 'opacity-50' : ''} ${wrapClassName}`.trim()}>
      {localizeText(label)}
      {localizeText(control)}
      {localizeText(hint && !error && <span className="text-[12px] font-normal text-ink-faint">{localizeText(hint)}</span>)}
      {localizeText(error && <span className="text-[12px] font-normal text-clay-deep">{localizeText(error)}</span>)}
    </label>);

}

export default Input;
