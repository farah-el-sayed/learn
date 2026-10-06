import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { useState } from 'react';
import { platformUsers } from '../data/roles.js';
import Badge from '../components/Badge.jsx';
import Input from '../components/Input.jsx';
export function UsersTable({ filter }) {useTranslation();
  const [q, setQ] = useState('');
  const list = platformUsers.filter((u) => (!filter || u.role === filter) && u.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={localizeText("Search…")} className="max-w-xs" label={localizeText("Search")} />
      <div className="mt-5 border-t border-line">
        <div className="hidden grid-cols-[1fr_110px_90px_90px] gap-6 border-b border-line py-3 text-[11.5px] font-semibold uppercase tracking-widest text-ink-faint sm:grid">
          <span>{localizeText("Name")}</span><span>{localizeText("Role")}</span><span>{localizeText("Courses")}</span><span>{localizeText("Status")}</span>
        </div>
        {localizeText(list.map((u) =>
        <div key={u.id} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[1fr_110px_90px_90px] sm:items-center sm:gap-6">
            <p className="text-[14.5px] font-medium">{localizeText(u.name)}</p>
            <span className="text-[13px] text-ink-muted">{localizeText(u.role)}</span>
            <span className="text-[13px] text-ink-muted">{localizeText(u.courses)}</span>
            <Badge status={u.status} />
          </div>
        ))}
      </div>
    </div>);

}
