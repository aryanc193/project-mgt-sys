import type { ReactNode } from "react";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen min-w-screen bg-gray-100 text-gray-900">
      <header className="bg-white border-b">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <h1 className="text-lg font-semibold">
            Project Management System
          </h1>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-5xl px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
