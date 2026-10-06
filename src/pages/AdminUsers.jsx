import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { useState } from 'react';
import { platformUsers } from '../data/roles.js';
import Badge from '../components/Badge.jsx';
import Input from '../components/Input.jsx';
import { PageHead } from '../components/PageHead.jsx';

export default function AdminUsers() {useTranslation();
  const [users, setUsers] = useState(platformUsers);
  const [q, setQ] = useState('');
  const cycle = (id) => {
    setUsers((u) => u.map((x) => x.id === id ? { ...x, status: x.status === 'Active' ? 'Invited' : 'Active' } : x));
  };
  const list = users.filter((u) => u.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageHead kicker="Admin" title={localizeText("Users")} lede="Members, roles, and access." />
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={localizeText("Search members…")} className="mt-6 max-w-xs" label={localizeText("Search members")} />
      <div className="mt-6 border-t border-line">
        {localizeText(list.map((u) =>
        <div key={u.id} className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line py-4">
            <div><p className="text-[14.5px] font-medium">{localizeText(u.name)}</p><p className="text-[12.5px] text-ink-muted">{localizeText(u.role)}{localizeText(" ")}{localizeText("·")}{localizeText(" ")}{localizeText(u.courses)}{localizeText(" ")}{localizeText("courses")}</p></div>
            <button type="button" onClick={() => cycle(u.id)} className="w-fit" title={localizeText("Toggle access")}>
              <Badge status={u.status} size="md" />
            </button>
          </div>
        ))}
      </div>
    </div>);

}
