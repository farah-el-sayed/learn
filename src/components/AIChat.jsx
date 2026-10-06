import { localizeText } from "../i18n.js";import { useTranslation } from "react-i18next";import { useState } from 'react';
import { BookOpen, Send } from 'lucide-react';
import { suggestedActions } from '../data/tutor.js';
import Button from './Button.jsx';
import Input from './Input.jsx';
import LoadingState from './LoadingState.jsx';

// One chat surface for the tutor: thread list is owned by the page, everything else lives here.
// density: 'page' (full screen), 'panel' (docked assistant), 'compact' (lesson sidebar).
// Brand feeling: Conversational, supportive, learning-focused. AI as companion, not command center.
// Sage color for friendly, human-like presence. Typography-led for editorial feel.
const densities = {
  page: {
    head: 'px-6 py-4',
    kicker: 'text-[11px] tracking-[0.14em]',
    title: 'mt-1.5 font-serif text-[24px] leading-snug',
    list: 'space-y-6 px-6 py-6',
    user: 'max-w-[80%] bg-pine px-4 py-2.5 text-[13.5px] text-paper',
    assistant: 'mt-1.5 whitespace-pre-line font-serif text-[17px] leading-[1.7]',
    chip: 'px-3 py-1.5 text-[12.5px]',
    input: 'md',
    height: 'h-[440px]'
  },
  panel: {
    head: 'px-4 pb-3 pt-4',
    kicker: 'text-[11px] tracking-[0.14em]',
    title: 'font-serif text-[19px] leading-snug',
    list: 'space-y-5 px-4 py-5',
    user: 'max-w-[85%] bg-pine px-3.5 py-2.5 text-[13.5px] leading-relaxed text-paper',
    assistant: 'mt-1.5 whitespace-pre-line font-serif text-[16.5px] leading-[1.65]',
    chip: 'px-2.5 py-1.5 text-[12px]',
    input: 'md',
    height: 'flex-1'
  },
  compact: {
    head: 'px-4 py-3',
    kicker: 'text-[11px] tracking-[0.14em]',
    title: 'mt-1 font-serif text-[17px]',
    list: 'space-y-4 px-4 py-4',
    user: 'max-w-[90%] bg-pine px-3 py-2 text-[12.5px] text-paper',
    assistant: 'mt-1 whitespace-pre-line font-serif text-[14.5px] leading-relaxed',
    chip: 'px-2 py-1 text-[11.5px]',
    input: 'xs',
    height: 'max-h-[46vh]'
  }
};

export function AIChat({
  frame = false,
  kicker = 'Learning companion',
  title,
  meta,
  actions,
  toolbar,
  messages = [],
  typing = false,
  pendingLabel = 'Gathering the relevant lesson…',
  suggestions = suggestedActions,
  suggestionsLimit,
  placeholder = 'Ask about any lesson…',
  onSend,
  density = 'page',
  limit,
  empty,
  sendLabel = 'Send',
  onSuggestion,
  className = '',
  heightClass,
  listClassName = '',
  footerClassName = 'p-3'
}) {useTranslation();
  const d = densities[density] || densities.page;
  const [value, setValue] = useState('');
  const visible = limit ? messages.slice(-limit) : messages;
  const chips = suggestionsLimit ? suggestions.slice(0, suggestionsLimit) : suggestions;

  const submit = (text) => {
    const clean = (text ?? value).trim();
    if (!clean) return;
    onSend?.(clean);
    setValue('');
  };

  const body =
  <>
      {(kicker || title || meta || actions) &&
    <div className={`flex items-start justify-between gap-3 border-b border-line ${d.head}`.trim()}>
          <div className="min-w-0">
            {localizeText(kicker &&
        <p className={`flex items-center gap-1.5 font-semibold uppercase text-ink-faint ${d.kicker}`.trim()}>
                <span className="h-1.5 w-1.5 bg-sage" />
                {localizeText(kicker)}
              </p>)
        }
            {localizeText(title && <p className={d.title}>{localizeText(title)}</p>)}
            {localizeText(meta && <p className="mt-1 text-[12px] text-ink-muted">{localizeText(meta)}</p>)}
          </div>
          {localizeText(actions && <div className="flex shrink-0 gap-1.5">{localizeText(actions)}</div>)}
        </div>
    }

      {toolbar && <div className="border-b border-line bg-paper px-3 py-2">{localizeText(toolbar)}</div>}

      <div className={`overflow-y-auto ${d.list} ${heightClass || d.height} ${listClassName}`.trim()}>
        {localizeText(visible.length ?
      visible.map((m) =>
      <div key={m.id}>
              {localizeText(m.role === 'assistant' ?
        <div>
                  <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-faint">
                    <BookOpen size={11} /> {localizeText(kicker || 'Companion')}{localizeText(m.context ? ` · ${m.context}` : '')}
                  </p>
                  <p className={d.assistant}>{localizeText(m.text)}</p>
                </div> :

        <p className={`ml-auto w-fit ${d.user}`.trim()}>{localizeText(m.text)}</p>)
        }
            </div>
      ) :
      empty)}
        {localizeText(typing && <LoadingState label={pendingLabel} />)}
      </div>

      <div className={`border-t border-line ${footerClassName}`.trim()}>
        {localizeText(chips.length > 0 &&
      <div className="mb-2.5 flex flex-wrap gap-1.5">
            {localizeText(chips.map((a) =>
        <button
          key={a.id}
          type="button"
          onClick={() => onSuggestion ? onSuggestion(a) : submit(a.prompt)}
          className={`border border-line text-ink-soft hover:border-sage hover:bg-paper ${d.chip}`.trim()}>
          
                {localizeText(a.label)}
              </button>
        ))}
          </div>)
      }
        <div className="flex gap-2">
          <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder={placeholder}
          size={d.input}
          tone="paper" />
        
          <Button variant="primary" size="sm" icon={Send} className="self-stretch px-3" aria-label={sendLabel} onClick={() => submit()} />
        </div>
      </div>
    </>;


  if (!frame) return <div className={`flex min-h-0 flex-col ${className}`.trim()}>{localizeText(body)}</div>;
  return <section className={`flex flex-col border border-line bg-white ${className}`.trim()}>{localizeText(body)}</section>;
}

export default AIChat;
