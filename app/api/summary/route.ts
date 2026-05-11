import { NextResponse } from 'next/server'

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || ''

export async function POST(req: Request){
  try{
    const body = await req.json()
    // body should include report payload and contact info
    const summaryPrompt = `Generate a ~100 word founder-facing summary for the following JSON:\n\n${JSON.stringify(body)}\n\nFollow constraints in PROMPTS.md`;

    if(!ANTHROPIC_API_KEY) return NextResponse.json({ ok: false, error: 'Anthropic not configured' }, { status: 500 })

    // Call Anthropic (basic example). Replace with official SDK usage as needed.
    const resp = await fetch('https://api.anthropic.com/v1/complete', {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'x-api-key': ANTHROPIC_API_KEY },
      body: JSON.stringify({ model: 'claude-2', prompt: summaryPrompt, max_tokens_to_sample: 300 })
    })
    if(!resp.ok) return NextResponse.json({ ok: false, error: 'api failed' }, { status: 502 })
    const data = await resp.json()
    const text = data?.completion || data?.choices?.[0]?.text || ''
    return NextResponse.json({ ok: true, summary: text })
  }catch(e){
    return NextResponse.json({ ok: false, error: 'failed' }, { status: 500 })
  }
}
