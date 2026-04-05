"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/students', label: 'Students' },
  { href: '/attendance', label: 'Attendance' },
  { href: '/exam', label: 'Online Exam' },
  { href: '/results', label: 'Results' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 flex-col gap-3 border-r border-slate-200 bg-white p-6 lg:flex">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Navigation</p>
      </div>

      <nav className="space-y-2">
        {links.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? 'bg-brand text-white shadow'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
