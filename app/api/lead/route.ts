import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || ''
const RESEND_API_KEY = process.env.RESEND_API_KEY || ''

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

export async function POST(req: Request){
  try{
    const body = await req.json()
    // basic honeypot
    if(body.honeypot) return NextResponse.json({ ok: false }, { status: 400 })

    const { email, company, role, teamSize, reportId } = body
    if(!email) return NextResponse.json({ ok: false, error: 'email required' }, { status: 400 })

    // store in supabase
    const { error } = await supabase.from('leads').insert([{ email, company, role, team_size: teamSize, report_id: reportId }])
    if(error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

    // send confirmation email via Resend
    if(RESEND_API_KEY){
      try{
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
          body: JSON.stringify({
            from: 'audit@ai-spend.example.com',
            to: email,
            subject: 'Your AI Spend Audit report',
            html: `<p>Thanks — we received your audit request. View report: <a href="${process.env.NEXT_PUBLIC_APP_URL}/report/${reportId}">Open report</a></p>`
          })
        })
      }catch(e){ /* swallow email errors */ }
    }

    return NextResponse.json({ ok: true })
  }catch(e){
    return NextResponse.json({ ok: false, error: 'invalid request' }, { status: 400 })
  }
}
