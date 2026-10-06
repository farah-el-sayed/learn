import { localizeText } from "../i18n.js";import { useTranslation } from "react-i18next";import { Check } from 'lucide-react';

// Compact pitch for the AI tutor: kicker, one line, a short list, one action.
// Used on the home page (dark, with a worked example) and beside the assistant page (paper).
// Brand feeling: AI as companion, not replacement. Sage color for friendly, supportive feel.
// Typography-led, editorial approach - learning-focused, not tech-focused.
const tones = {
  paper: {
    wrap: 'border border-sage/60 bg-paper',
    kicker: 'text-ink-faint',
    title: 'text-ink',
    item: 'text-ink-soft',
    check: 'text-pine'
  },
  ink: {
    wrap: 'border border-line bg-pine-deep text-paper',
    kicker: 'text-paper opacity-70',
    title: '',
    item: 'opacity-90',
    check: 'text-sage'
  }
};

const sizes = {
  md: { wrap: 'p-5', kicker: 'text-[11px] tracking-[0.14em]', title: 'mt-2 font-serif text-[19px] leading-snug', list: 'mt-3 space-y-2 text-[13px] leading-relaxed', glyph: 14, action: 'mt-4' },
  lg: { wrap: 'p-9 md:p-12', kicker: 'text-[12px] tracking-[0.16em]', title: 'mt-3 font-serif text-[32px] leading-[1.12]', list: 'mt-6 space-y-3 text-[14px] leading-relaxed', glyph: 16, action: 'mt-7' }
};

export function AITutorCard({
  kicker = 'AI Tutor',
  title,
  lede,
  items = [],
  checks = true,
  action,
  example,
  tone = 'paper',
  size = 'md',
  className = ''
}) {useTranslation();
  const t = tones[tone] || tones.paper;
  const s = sizes[size] || sizes.md;

  const main =
  <div className={s.wrap}>
      <p className={`flex items-center gap-1.5 font-semibold uppercase ${t.kicker} ${s.kicker}`.trim()}>
        <span className="h-1.5 w-1.5 bg-sage" />
        {localizeText(kicker)}
      </p>
      {localizeText(title && <p className={s.title}>{localizeText(title)}</p>)}
      {localizeText(lede && <p className={`mt-3 text-[13.5px] leading-relaxed ${t.item}`.trim()}>{localizeText(lede)}</p>)}
      {localizeText(items.length > 0 &&
    <ul className={`${s.list} ${t.item}`.trim()}>
          {localizeText(items.map((text) =>
      <li key={text} className="flex gap-2.5">
              {localizeText(checks && <Check size={s.glyph} className={`mt-0.5 shrink-0 ${t.check}`.trim()} />)}
              <span>{localizeText(text)}</span>
            </li>
      ))}
        </ul>)
    }
      {localizeText(action && <div className={s.action}>{localizeText(action)}</div>)}
    </div>;


  if (!example) return <section className={`${t.wrap} ${className}`.trim()}>{localizeText(main)}</section>;

  return (
    <section className={`grid md:grid-cols-2 ${t.wrap} ${className}`.trim()}>
      {localizeText(main)}
      <div className={`border-t p-9 md:border-l md:border-t-0 md:p-12 ${tone === 'ink' ? 'border-paper/20' : 'border-line'}`.trim()}>
        <p className="text-[12px] uppercase tracking-[0.16em] opacity-60">{localizeText(example.title || 'Example')}</p>
        {localizeText(example.question && <p className="mt-4 w-fit bg-paper px-3.5 py-2.5 text-[13.5px] text-ink">{localizeText(example.question)}</p>)}
        {localizeText(example.answer &&
        <p className={`mt-3 w-fit px-3.5 py-2.5 text-[13.5px] ${tone === 'ink' ? 'border border-paper/30' : 'border border-line'}`.trim()}>
            {localizeText(example.answer)}
          </p>)
        }
      </div>
    </section>);

}

export default AITutorCard;
