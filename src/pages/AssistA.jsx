import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { useState } from 'react';
import { Send, Plus, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { tutorReply, suggestedActions } from '../data/tutor.js';
export function ThreadList({ threads, thread, setActiveThreadId }) {useTranslation();
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-faint">{localizeText("Conversations")}</p>
        <p className="text-[12px] text-ink-faint">{localizeText(threads.length)}</p>
      </div>
      <div className="mt-3 border-t border-line">
        {localizeText(threads.map((t) =>
        <button key={t.id} onClick={() => setActiveThreadId(t.id)} className={`block w-full border-b border-line py-3 text-left ${t.id === thread?.id ? 'border-l-2 border-l-pine pl-3' : ''}`}>
            <p className="text-[13.5px] font-medium">{localizeText(t.title)}</p>
            <p className="mt-0.5 text-[12px] text-ink-muted">{localizeText(t.updatedAt)}{localizeText(" ")}{localizeText("·")}{localizeText(" ")}{localizeText(t.messages.length)}{localizeText(" ")}{localizeText("messages")}</p>
          </button>
        ))}
      </div>
    </div>);

}
