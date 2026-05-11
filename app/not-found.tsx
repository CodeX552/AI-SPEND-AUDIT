export default function NotFound() {
  return (
    <main className="container mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-slate-300 mb-6">The page you're looking for doesn't exist.</p>
      <a href="/" className="inline-block bg-white text-slate-900 px-5 py-3 rounded-md font-medium">
        Go Home
      </a>
    </main>
  )
}
