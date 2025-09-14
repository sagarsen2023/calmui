import { LoginForm } from "@/modules/auth/login-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
