import { useApp } from '../context/AppContext.jsx'
import StatCard from '../components/StatCard.jsx'
import { PageHead } from '../components/PageHead.jsx'

export function DashHead({ name }) {
  const h = new Date().getHours()
  const g = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
  return <PageHead kicker="My learning" title={`${g}, ${name}.`} lede="Continue where you left off." size="lg" />
}

export function DashStats({ items }) {
  return <StatCard className="mt-10" items={items} cols={4} />
}
