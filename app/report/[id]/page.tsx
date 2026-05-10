import { auditTools } from '../../../lib/audit-engine'
import { TOOL_ID_TO_NAME } from '../../../constants/pricing'
import React from 'react'

type Params = { params: { id: string } }

export default async function ReportPage({ params }: Params){
  const { id } = await params;
  try{
    const raw = decodeURIComponent(id)
    const json = Buffer.from(raw,'base64').toString('utf8')
    const payload = JSON.parse(json)
    const { items, totalMonthlySavings, totalAnnualSavings } = auditTools(payload.tools, payload.teamSize, payload.primaryUse)

    return (
      <main className="container mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Audit Results</h1>
          <p className="text-slate-300">Summary of savings and recommended actions</p>
        </header>

        <section className="grid gap-4">
          <div className="bg-slate-800 p-4 rounded flex justify-between items-center">
            <div>
              <div className="text-slate-400">Estimated monthly savings</div>
              <div className="text-2xl font-semibold">${totalMonthlySavings}</div>
            </div>
            <div>
              <div className="text-slate-400">Estimated annual savings</div>
              <div className="text-2xl font-semibold">${totalAnnualSavings}</div>
            </div>
          </div>

          {items.map(it=> (
            <div key={it.id} className="bg-slate-800 p-4 rounded grid grid-cols-3 gap-4">
              <div>
                <div className="font-semibold">{TOOL_ID_TO_NAME[it.id]}</div>
                <div className="text-slate-400 text-sm">${it.currentSpend}/mo current</div>
              </div>
              <div>
                <div className="font-medium">Action</div>
                <div className="text-slate-200">{it.recommendedAction}</div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-semibold">-${it.monthlySavings}/mo</div>
                <div className="text-slate-400 text-sm">{it.reason}</div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center">
            <a href="#" className="text-emerald-400">Share report</a>
            <a href="#" className="bg-emerald-500 px-4 py-2 rounded">Save lead & get summary</a>
          </div>
        </section>
      </main>
    )
  }catch(e){
    return (<div className="p-6">Invalid report</div>)
  }
}
