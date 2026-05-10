"use client"
import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { PRICING_TOOLS } from '../constants/pricing'
import { useRouter } from 'next/navigation'

const toolSchema = z.object({
  id: z.string(),
  plan: z.string().optional(),
  monthlySpend: z.number().min(0),
  seats: z.number().min(0)
})

const formSchema = z.object({
  tools: z.array(toolSchema).min(1),
  teamSize: z.number().min(1),
  primaryUse: z.enum(['coding','writing','research','data','mixed'])
})

type FormValues = z.infer<typeof formSchema>

export default function SpendForm(){
  const router = useRouter()
  const { control, handleSubmit, reset, watch } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tools: PRICING_TOOLS.map(t => ({ id: t.id, plan: t.plans[0].id, monthlySpend: 0, seats: 1 })),
      teamSize: 3,
      primaryUse: 'mixed'
    }
  })

  // persist to localStorage
  useEffect(()=>{
    const sub = watch((v)=>{
      try{ localStorage.setItem('ai-spend-form', JSON.stringify(v)) }catch(e){}
    })
    const raw = localStorage.getItem('ai-spend-form')
    if(raw){
      try{ reset(JSON.parse(raw)) }catch(e){}
    }
    return ()=>sub.unsubscribe()
  },[reset, watch])

  function onSubmit(values: FormValues){
    // send to results page via stateful URL (simple base64)
    const payload = Buffer.from(JSON.stringify(values)).toString('base64')
    router.push(`/report/${encodeURIComponent(payload)}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-3">
        <label className="text-slate-200 font-medium">Primary Use</label>
        <Controller name="primaryUse" control={control} render={({field})=> (
          <select {...field} className="bg-slate-900 p-2 rounded w-full">
            <option value="coding">Coding</option>
            <option value="writing">Writing</option>
            <option value="research">Research</option>
            <option value="data">Data</option>
            <option value="mixed">Mixed</option>
          </select>
        )} />
      </div>

      <div>
        <label className="text-slate-200 font-medium">Team size</label>
        <Controller name="teamSize" control={control} render={({field})=> (
          <input type="number" {...field} min={1} className="bg-slate-900 p-2 rounded w-full" />
        )} />
      </div>

      <div className="space-y-2">
        <h3 className="text-slate-100 font-semibold">Tools</h3>
        <Controller name="tools" control={control} render={({field})=> (
          <div className="space-y-3">
            {field.value.map((t, idx)=>{
              const toolMeta = PRICING_TOOLS.find(p=>p.id===t.id)!
              return (
                <div key={t.id} className="bg-slate-800 p-3 rounded grid grid-cols-2 gap-3">
                  <div>
                    <div className="font-semibold">{toolMeta.name}</div>
                    <div className="text-slate-400 text-sm">Plan</div>
                    <select className="bg-slate-900 p-2 rounded w-full" value={t.plan} onChange={(e)=>{
                      const next = [...field.value]; next[idx] = {...next[idx], plan: e.target.value}; field.onChange(next)
                    }}>
                      {toolMeta.plans.map(p=> <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm">Monthly spend</label>
                    <input type="number" className="bg-slate-900 p-2 rounded w-full" value={t.monthlySpend} onChange={(e)=>{ const v = Number(e.target.value||0); const next = [...field.value]; next[idx] = {...next[idx], monthlySpend: v}; field.onChange(next) }} />
                    <label className="text-slate-400 text-sm">Seats</label>
                    <input type="number" className="bg-slate-900 p-2 rounded w-full" value={t.seats} onChange={(e)=>{ const v = Number(e.target.value||0); const next = [...field.value]; next[idx] = {...next[idx], seats: v}; field.onChange(next) }} />
                  </div>
                </div>
              )
            })}
          </div>
        )} />
      </div>

      <div className="flex justify-between items-center">
        <button type="submit" className="bg-emerald-400 text-slate-900 px-4 py-2 rounded">Run Audit</button>
        <button type="button" onClick={()=>{ localStorage.removeItem('ai-spend-form'); reset(undefined) }} className="text-slate-400">Reset</button>
      </div>
    </form>
  )
}
