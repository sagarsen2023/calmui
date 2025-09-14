import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/settings/"!</div>
}
