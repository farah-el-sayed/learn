// Native select styled like the role switcher in the top bar. `size`/`tone` mirror Input.
const sizes = {
  sm: 'px-2 py-2 text-[12.5px]',
  md: 'px-3 py-2.5 text-[13px]',
}

const tones = {
  white: 'bg-white',
  paper: 'bg-paper',
}

export function Select({ label, options = [], children, size = 'md', tone = 'white', width = 'w-full', disabled = false, className = '', wrapClassName = '', ...rest }) {
  const field = `${width} border border-line ${tones[tone] || tones.white} ${sizes[size] || sizes.md} font-medium text-ink outline-none transition-normal focus:border-pine focus:ring-1 focus:ring-pine ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`.trim()
  const control = (
    <select className={field} disabled={disabled} {...rest}>
      {children ??
        options.map(option =>
          typeof option === 'string' ? (
            <option key={option} value={option}>{option}</option>
          ) : (
            <option key={option.value} value={option.value}>{option.label}</option>
          )
        )}
    </select>
  )
  if (!label) return control
  return (
    <label className={`grid gap-2 text-[13px] font-medium text-ink ${disabled ? 'opacity-50' : ''} ${wrapClassName}`.trim()}>
      {label}
      {control}
    </label>
  )
}

export default Select
