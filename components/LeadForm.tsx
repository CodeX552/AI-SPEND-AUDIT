"use client"
import React, { useState } from 'react'

export default function LeadForm({ reportId }: { reportId: string }){
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [teamSize, setTeamSize] = useState(3)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  async function submit(e: React.FormEvent){
    e.preventDefault()
    setLoading(true)
    setMsg(null)
    try{
      const res = await fetch('/api/lead', { method: 'POST', headers: { 'content-type':'application/json' }, body: JSON.stringify({ email, company, role, teamSize, reportId, honeypot: '' }) })
      if(res.ok){ setMsg('Thanks — check your inbox for confirmation.'); setEmail('') }
      else { setMsg('Failed to save lead') }
    }catch(e){ setMsg('Network error') }
    setLoading(false)
  }

  return (
    <form onSubmit={submit} className="bg-slate-800 p-4 rounded space-y-3">
      <input type="text" name="honeypot" style={{display:'none'}} />
      <div>
        <label className="text-slate-300">Email</label>
        <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 rounded bg-slate-900" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <input placeholder="Company (optional)" value={company} onChange={e=>setCompany(e.target.value)} className="p-2 rounded bg-slate-900" />
        <input placeholder="Role (optional)" value={role} onChange={e=>setRole(e.target.value)} className="p-2 rounded bg-slate-900" />
      </div>
      <div>
        <label className="text-slate-300">Team size</label>
        <input type="number" min={1} value={teamSize} onChange={e=>setTeamSize(Number(e.target.value))} className="p-2 rounded bg-slate-900" />
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-emerald-400 text-slate-900 px-4 py-2 rounded" disabled={loading}>Get Summary</button>
        {msg && <div className="text-slate-300">{msg}</div>}
      </div>
    </form>
  )
}
