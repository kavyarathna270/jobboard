export type JobStatus = 'applied' | 'interview' | 'offer' | 'rejected';

export type Job = {
    id: string
    company: string
    role: string
    status: JobStatus
    applied_date: string
    job_url: string
    notes: string
    created_at: string
}

