export type Plan = { id: string; name: string; monthlyPerSeat?: number; monthly?: number; notes?: string; url?: string }

export const PRICING_TOOLS: { id: string; name: string; plans: Plan[] }[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    plans: [
      { id: 'cursor-indie', name: 'Indie', monthlyPerSeat: 20, url: 'https://cursor.so/pricing' },
      { id: 'cursor-team', name: 'Team', monthlyPerSeat: 40, url: 'https://cursor.so/pricing' }
    ]
  },
  { id: 'copilot', name: 'GitHub Copilot', plans: [ { id: 'copilot-for-business', name: 'Copilot for Business', monthlyPerSeat: 19 } ] },
  { id: 'claude', name: 'Claude', plans: [ { id: 'claude-1', name: 'Standard', monthlyPerSeat: 20 } ] },
  { id: 'chatgpt', name: 'ChatGPT', plans: [ { id: 'chatgpt-plus', name: 'Plus', monthly: 20 }, { id: 'chatgpt-team', name: 'Team', monthlyPerSeat: 30 } ] },
  { id: 'anthropic', name: 'Anthropic', plans: [ { id: 'anthropic-api', name: 'API', monthly: 0, notes: 'API billed per usage' } ] },
  { id: 'openai', name: 'OpenAI', plans: [ { id: 'openai-api', name: 'API', monthly: 0, notes: 'API billed per usage' } ] },
  { id: 'gemini', name: 'Gemini', plans: [ { id: 'gemini-api', name: 'API', monthly: 0 } ] },
  { id: 'windsurf', name: 'Windsurf', plans: [ { id: 'windsurf-pro', name: 'Pro', monthlyPerSeat: 25 } ] }
]

export const TOOL_ID_TO_NAME: Record<string,string> = PRICING_TOOLS.reduce((acc,t)=>{ acc[t.id]=t.name; return acc },{} as Record<string,string>)
