import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h3 className="text-3xl font-bold">Welcome Home!</h3>
      <p className="mt-4">Your Vite + React + TanStack Router + Tailwind CSS app is ready!</p>
    </div>
  )
}
