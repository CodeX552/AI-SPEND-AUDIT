import Link from 'next/link'
import SpendForm from '../components/SpendForm'

export default function Home() {
  return (
    <main className="container mx-auto p-6">
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center py-12">
        <div>
          <h1 className="text-4xl font-bold mb-4">AI Spend Audit</h1>
          <p className="text-slate-300 mb-6">Mint for AI tool spend — audit your team’s AI costs and find realistic savings.</p>
          <Link href="#audit" className="inline-block bg-white text-slate-900 px-5 py-3 rounded-md font-medium">Run Audit — Free</Link>
        </div>
        <div id="audit" className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 shadow-lg">
          <SpendForm />
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-2xl font-semibold mb-4">How it works</h2>
        <ol className="list-decimal ml-6 text-slate-300">
          <li>Enter your AI subscriptions and team context.</li>
          <li>Receive a deterministic audit with recommended plan changes and alternatives.</li>
          <li>Get a shareable report and optional consultation.</li>
        </ol>
      </section>
    </main>
  )
}
