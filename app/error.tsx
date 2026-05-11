'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="container mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="text-slate-300 mb-6">{error.message || 'An unexpected error occurred.'}</p>
      <button
        onClick={() => reset()}
        className="inline-block bg-white text-slate-900 px-5 py-3 rounded-md font-medium hover:bg-slate-100"
      >
        Try again
      </button>
    </main>
  )
}
