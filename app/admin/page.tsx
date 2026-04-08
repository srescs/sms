import Link from 'next/link';

const sections = [
  { label: 'Organization Setup', href: '/admin/organization' },
  { label: 'Academic Structure', href: '/admin/academic' },
  { label: 'User & Role Management', href: '/admin/users' },
  { label: 'Access Control', href: '/admin/access' },
  { label: 'System Configuration', href: '/admin/settings' },
  { label: 'Academic Calendar', href: '/admin/calendar' },
  { label: 'Audit & Activity Logs', href: '/admin/audit' },
];

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Admin & Core Management</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300">
            <h2 className="text-xl font-semibold mb-2">{section.label}</h2>
            <p className="text-slate-600">Manage {section.label.toLowerCase()} and configuration.</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
