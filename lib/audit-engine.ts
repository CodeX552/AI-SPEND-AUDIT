import { PRICING_TOOLS, Plan } from '../constants/pricing'

export type ToolInput = { id: string; plan?: string; monthlySpend: number; seats: number }
export type AuditResultItem = {
  id: string
  name: string
  currentSpend: number
  recommendedAction: string
  monthlySavings: number
  annualSavings: number
  reason: string
}

export function auditTools(tools: ToolInput[], teamSize: number, primaryUse: string): { items: AuditResultItem[]; totalMonthlySavings: number; totalAnnualSavings: number }{
  const items: AuditResultItem[] = []
  let totalMonthlySavings = 0

  for(const t of tools){
    const meta = PRICING_TOOLS.find(p=>p.id===t.id)
    if(!meta) continue
    const current = t.monthlySpend
    let monthlySavings = 0
    let recommendedAction = 'Keep current'
    let reason = ''

    // Rule 1: tiny teams on team/enterprise plans
    const plan = meta.plans.find(p=>p.id===t.plan)
    if(plan && plan.monthlyPerSeat && t.seats <= 2 && plan.monthlyPerSeat > 30){
      // Suggest downgrade to Indie if exists
      const indie = meta.plans.find(p=>p.name.toLowerCase().includes('indie') || p.monthlyPerSeat && p.monthlyPerSeat < plan.monthlyPerSeat)
      if(indie){
        monthlySavings = (plan.monthlyPerSeat - (indie.monthlyPerSeat||0)) * t.seats
        recommendedAction = `Downgrade to ${indie.name}`
        reason = `Team size (${t.seats}) is small — enterprise/team plans are wasteful.`
      }
    }

    // Rule 2: API-based tools with low spend — suggest lower tier or pay-as-you-go
    if((t.id==='openai' || t.id==='anthropic' || t.id==='gemini') && current < 50){
      monthlySavings = Math.min( Math.round(current * 0.5), current )
      recommendedAction = 'Reduce API usage or move to lower plan'
      reason = 'Low API usage — evaluate quota and pause unused pipelines.'
    }

    // Rule 3: coding-heavy teams might prefer Cursor over ChatGPT for copilot-like tasks
    if(primaryUse==='coding'){
      if(t.id==='chatgpt' && t.monthlySpend > 100 && teamSize >= 3){
        const cursor = PRICING_TOOLS.find(p=>p.id==='cursor')
        if(cursor){
          const altPerSeat = cursor.plans[0].monthlyPerSeat || 0
          const altCost = altPerSeat * Math.max(1, teamSize)
          if(altCost + 20 < current){
            monthlySavings = current - altCost
            recommendedAction = `Consider Cursor Team — estimated cost $${altCost}/mo`
            reason = 'For coding workflows Cursor may be more cost-efficient for teams.'
          }
        }
      }
    }

    // Rule 4: Enterprise misuse — enterprise plans for <5 users
    if(plan && plan.name.toLowerCase().includes('enterprise') && t.seats < 5){
      monthlySavings = Math.round((plan.monthlyPerSeat||0) * t.seats * 0.6)
      recommendedAction = 'Contact vendor to move off enterprise or negotiate credits'
      reason = 'Enterprise is often overkill for small teams; negotiate or downgrade.'
    }

    // Rule 5: sanity cap — don't recommend savings bigger than current
    monthlySavings = Math.max(0, Math.min(monthlySavings, current))

    const annualSavings = Math.round(monthlySavings * 12)
    items.push({ id: t.id, name: meta.name, currentSpend: current, recommendedAction, monthlySavings, annualSavings, reason })
    totalMonthlySavings += monthlySavings
  }

  return { items, totalMonthlySavings, totalAnnualSavings: totalMonthlySavings * 12 }
}
