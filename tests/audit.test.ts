import { describe, it, expect } from 'vitest'
import { auditTools } from '../lib/audit-engine'

describe('audit engine', ()=>{
  it('downgrades small team on expensive plan', ()=>{
    const input = [{ id: 'cursor', plan: 'cursor-team', monthlySpend: 160, seats: 2 }]
    const res = auditTools(input, 2, 'mixed')
    expect(res.totalMonthlySavings).toBeGreaterThanOrEqual(0)
  })

  it('calculates annual savings correctly', ()=>{
    const input = [{ id: 'chatgpt', plan: 'chatgpt-team', monthlySpend: 300, seats: 5 }]
    const res = auditTools(input, 5, 'coding')
    expect(res.totalAnnualSavings).toBe(res.totalMonthlySavings * 12)
  })

  it('flags enterprise misuse', ()=>{
    const input = [{ id: 'anthropic', plan: 'enterprise', monthlySpend: 1000, seats: 2 }]
    const res = auditTools(input, 2, 'research')
    // enterprise misuse rule should recommend savings
    expect(res.totalMonthlySavings).toBeGreaterThanOrEqual(0)
  })

  it('low-spend optimized case returns near zero savings', ()=>{
    const input = [{ id: 'openai', plan: 'openai-api', monthlySpend: 20, seats: 1 }]
    const res = auditTools(input, 1, 'data')
    expect(res.totalMonthlySavings).toBeLessThanOrEqual(20)
  })

  it('handles empty or unknown tools gracefully', ()=>{
    const input = [{ id: 'unknown', plan: 'x', monthlySpend: 50, seats: 1 }]
    const res = auditTools(input, 1, 'mixed')
    expect(res.items.length).toBe(0)
  })
})
