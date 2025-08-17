import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="p-2">
      <h3 className="text-3xl font-bold">About</h3>
      <p className="mt-4">This is the about page of your new Vite React application.</p>
    </div>
  )
}
