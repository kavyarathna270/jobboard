'use client'
import { useState } from 'react'
import { Job, JobStatus } from '@/types/job'
import { supabase } from '@/lib/supabase'

const statusColors: Record<string, string> = {
  applied: 'bg-blue-100 text-blue-700',
  interview: 'bg-yellow-100 text-yellow-700',
  offer: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

export default function JobList({ jobs, onRefresh }: { jobs: Job[], onRefresh: () => void }) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this application?')) return
    setDeletingId(id)
    await supabase.from('jobs').delete().eq('id', id)
    onRefresh()
    setDeletingId(null)
  }

  const handleStatusChange = async (id: string, status: JobStatus) => {
    setEditingId(id)
    await supabase.from('jobs').update({ status }).eq('id', id)
    onRefresh()
    setEditingId(null)
  }

  if (jobs.length === 0) return (
    <p className="text-gray-400 text-center py-10">No applications found.</p>
  )

  return (
    <div className="flex flex-col gap-3">
      {jobs.map(job => (
        <div key={job.id}
          className="bg-white p-4 rounded-xl shadow flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 truncate">{job.role}</h3>
            <p className="text-gray-500 text-sm">{job.company}</p>
            {job.notes && (
              <p className="text-gray-400 text-xs mt-1 line-clamp-2">{job.notes}</p>
            )}
            {job.job_url && (
              <a href={job.job_url} target="_blank"
                className="text-blue-500 text-xs underline mt-1 inline-block">
                View Listing
              </a>
            )}
          </div>

          <div className="flex flex-col gap-2 items-end shrink-0">
            {/* Inline status editor */}
            <select
              value={job.status}
              disabled={editingId === job.id}
              onChange={e => handleStatusChange(job.id, e.target.value as JobStatus)}
              className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer
                ${statusColors[job.status]} ${editingId === job.id ? 'opacity-50' : ''}`}>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>

            <span className="text-xs text-gray-400">{job.applied_date}</span>

            <button
              onClick={() => handleDelete(job.id)}
              disabled={deletingId === job.id}
              className="text-xs text-red-400 hover:text-red-600 disabled:opacity-50">
              {deletingId === job.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}