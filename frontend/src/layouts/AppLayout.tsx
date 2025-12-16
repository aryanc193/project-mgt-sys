import type { ReactNode } from "react";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 overflow-x-hidden">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <h1 className="text-lg font-semibold tracking-tight">
            Project Management System
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Multi-tenant demo built with Django, GraphQL, and React
          </p>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
