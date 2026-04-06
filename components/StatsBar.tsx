import { Job } from '@/types/job'

export default function StatsBar({ jobs }: { jobs: Job[] }) {
  const total = jobs.length
  const interviews = jobs.filter(j => j.status === 'interview').length
  const offers = jobs.filter(j => j.status === 'offer').length
  const rejected = jobs.filter(j => j.status === 'not selected').length
  const responseRate = total > 0 ? Math.round((interviews + offers) / total * 100) : 0

  const stats = [
    { label: 'Total Applied', value: total, color: 'bg-blue-50 text-blue-700' },
    { label: 'Interviews', value: interviews, color: 'bg-yellow-50 text-yellow-700' },
    { label: 'Offers', value: offers, color: 'bg-green-50 text-green-700' },
    { label: 'Rejected', value: rejected, color: 'bg-red-50 text-red-700' },
    { label: 'Response Rate', value: `${responseRate}%`, color: 'bg-purple-50 text-purple-700' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
      {stats.map(stat => (
        <div key={stat.label} className={`rounded-xl p-4 text-center ${stat.color}`}>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-xs mt-1 font-medium">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}