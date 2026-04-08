'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Job } from '@/types/job'
import AddJobForm from '@/components/AddJobForm'
import JobList from '@/components/JobList'
import StatsBar from '@/components/StatsBar'
import FilterBar from '@/components/FilterBar'
import SearchBar from '@/components/SearchBar'

type Filter = 'all' | 'applied' | 'interview' | 'offer' | 'rejected'

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from('jobs').select('*').order('created_at', { ascending: false })
    if (!error) setJobs(data as Job[])
    setLoading(false)
  }

  useEffect(() => {
    const loadJobs = async () => {
      await fetchJobs()
    }
    loadJobs()
  }, [])

  const filteredJobs = jobs
    .filter(j => filter === 'all' || j.status === filter)
    .filter(j => {
      const q = search.toLowerCase()
      return j.company.toLowerCase().includes(q) || j.role.toLowerCase().includes(q)
    })

  return (
    <main className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">JobBoard</h1>
          <p className="text-gray-500 text-sm">Track your Melbourne job hunt</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
          {showForm ? 'Cancel' : '+ Add Job'}
        </button>
      </div>

      {/* Stats */}
      <div className="mt-6">
        <StatsBar jobs={jobs} />
      </div>

      {/* Add Form (toggle) */}
      {showForm && (
        <AddJobForm onAdd={() => { fetchJobs(); setShowForm(false) }} />
      )}

      {/* Search + Filter */}
      <SearchBar value={search} onChange={setSearch} />
      <FilterBar active={filter} onChange={setFilter} />

      {/* Job List */}
      {loading
        ? <p className="text-gray-400 text-center py-10">Loading...</p>
        : <JobList jobs={filteredJobs} onRefresh={fetchJobs} />
      }
    </main>
  )
}