// src/app/login/page.tsx
import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>🔐 Login</h1>
      <Suspense fallback={<p>Loading login form...</p>}>
        <LoginClient />
      </Suspense>
    </div>
  );
}

