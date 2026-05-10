import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'AI Spend Audit',
  description: 'Mint for AI tool spend — Audit, save, and optimize.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100">
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  )
}
