'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { JobStatus } from '@/types/job'

export default function AddJobForm({ onAdd }: { onAdd: () => void }) {
  const [form, setForm] = useState({
    company: '', role: '', status: 'applied' as JobStatus,
    applied_date: '', job_url: '', notes: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!form.company || !form.role) return alert('Company and role are required')
    setLoading(true)
    const { error } = await supabase.from('jobs').insert([form])
    if (error) alert('Error saving job: ' + error.message)
    else {
      setForm({ company: '', role: '', status: 'applied', applied_date: '', job_url: '', notes: '' })
      onAdd()
    }
    setLoading(false)
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Add New Application</h2>
      <div className="grid grid-cols-2 gap-4">
        <input className="border rounded p-2" placeholder="Company *"
          value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
        <input className="border rounded p-2" placeholder="Role *"
          value={form.role} onChange={e => setForm({...form, role: e.target.value})} />
        <select className="border rounded p-2" value={form.status}
          onChange={e => setForm({...form, status: e.target.value as JobStatus})}>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
        <input className="border rounded p-2" type="date"
          value={form.applied_date} onChange={e => setForm({...form, applied_date: e.target.value})} />
        <input className="border rounded p-2 col-span-2" placeholder="Job URL"
          value={form.job_url} onChange={e => setForm({...form, job_url: e.target.value})} />
        <textarea className="border rounded p-2 col-span-2" placeholder="Notes"
          value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
      </div>
      <button onClick={handleSubmit} disabled={loading}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
        {loading ? 'Saving...' : 'Add Job'}
      </button>
    </div>
  )
}