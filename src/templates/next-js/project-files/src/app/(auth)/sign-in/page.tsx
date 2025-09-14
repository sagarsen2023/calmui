import { LoginForm } from "@/modules/auth/login-form";
import React from "react";

function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}

export default Page;
