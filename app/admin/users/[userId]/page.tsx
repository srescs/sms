interface Params {
  params: { userId: string };
}

export default function UserDetailPage({ params }: Params) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
      <p className="text-slate-600">Manage user details for {params.userId}.</p>
    </div>
  );
}
