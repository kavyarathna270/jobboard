import { getStats } from '@/lib/utils'
import { Job } from '@/types/job'

const mockJobs: Job[] = [
  { id: '1', company: 'Google', role: 'SWE', status: 'applied',
    applied_date: '2025-01-01', job_url: '', notes: '', created_at: '' },
  { id: '2', company: 'Atlassian', role: 'Frontend', status: 'interview',
    applied_date: '2025-01-02', job_url: '', notes: '', created_at: '' },
  { id: '3', company: 'Canva', role: 'Senior Dev', status: 'offer',
    applied_date: '2025-01-03', job_url: '', notes: '', created_at: '' },
  { id: '4', company: 'Seek', role: 'React Dev', status: 'rejected',
    applied_date: '2025-01-04', job_url: '', notes: '', created_at: '' },
]

describe('getStats', () => {
  it('calculates total correctly', () => {
    expect(getStats(mockJobs).total).toBe(4)
  })

  it('counts interviews correctly', () => {
    expect(getStats(mockJobs).interviews).toBe(1)
  })

  it('counts offers correctly', () => {
    expect(getStats(mockJobs).offers).toBe(1)
  })

  it('calculates response rate correctly', () => {
    expect(getStats(mockJobs).responseRate).toBe(50)
  })

  it('returns zeros for empty array', () => {
    const stats = getStats([])
    expect(stats.total).toBe(0)
    expect(stats.responseRate).toBe(0)
  })
})