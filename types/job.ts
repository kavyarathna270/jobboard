export type JobStatus = 'applied' | 'interview' | 'offer' | 'not selected';

export type Job = {
    id: string
    company: string
    role: string
    status: JobStatus
    applied_date: string
    job_url: string
    notes: string
    createdAt: string
}

