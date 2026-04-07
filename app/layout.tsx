import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JobBoard — Track Your Job Applications',
  description: 'A personal job application tracker built with Next.js, Supabase and TypeScript.',
  openGraph: {
    title: 'JobBoard',
    description: 'Track every job application, interview and offer in one place.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}