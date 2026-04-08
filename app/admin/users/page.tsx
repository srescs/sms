import Link from 'next/link';

export default function UsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">User & Role Management</h1>
      <p className="text-slate-600">Manage users, roles, and assignments.</p>
      <div className="mt-6">
        <Link href="/admin/users/new" className="text-indigo-600 hover:underline">Add new user</Link>
      </div>
    </div>
  );
}
