import { Job } from '@/types/job'

export function getStats(jobs: Job[]) {
  const total = jobs.length
  const interviews = jobs.filter(j => j.status === 'interview').length
  const offers = jobs.filter(j => j.status === 'offer').length
  const rejected = jobs.filter(j => j.status === 'rejected').length
  const responseRate = total > 0
    ? Math.round((interviews + offers) / total * 100)
    : 0

  return { total, interviews, offers, rejected, responseRate }
}