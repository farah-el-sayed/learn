import { useTranslation } from "react-i18next";import { useApp } from '../context/AppContext.jsx';
import { localizeText } from '../i18n.js';
import StatCard from '../components/StatCard.jsx';
import { PageHead } from '../components/PageHead.jsx';

export function DashHead({ name }) {
  const { t } = useTranslation();
  const h = new Date().getHours();
  const greeting = h < 12 ? 'dashboard.morning' : h < 18 ? 'dashboard.afternoon' : 'dashboard.evening';
  return <PageHead kicker="My learning" title={t(greeting, { name: localizeText(name) })} lede="Continue where you left off." size="lg" />;
}

export function DashStats({ items }) {useTranslation();
  return <StatCard className="mt-10" items={items} cols={4} />;
}
