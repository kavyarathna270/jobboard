'use client'

export default function SearchBar({
  value, onChange
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <input
      type="text"
      placeholder="Search by company or role..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full border rounded-lg px-4 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
  )
}