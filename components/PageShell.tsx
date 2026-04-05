import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Sidebar />
        <main className="w-full rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
          {children}
        </main>
      </div>
    </div>
  );
}
