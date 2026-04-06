'use client'

type Filter = 'all' | 'applied' | 'interview' | 'offer' | 'rejected'

const filters: Filter[] = ['all', 'applied', 'interview', 'offer', 'rejected']

export default function FilterBar({
  active, onChange
}: {
  active: Filter
  onChange: (f: Filter) => void
}) {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {filters.map(f => (
        <button key={f} onClick={() => onChange(f)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition
            ${active === f
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
          {f}
        </button>
      ))}
    </div>
  )
}