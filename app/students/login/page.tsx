"use client";

import type { FormEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormInput from '@/components/FormInput';
import { studentLogin } from '@/lib/api';

export default function StudentLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await studentLogin(email, password);
      localStorage.setItem('student-token', response.token);
      localStorage.setItem('student-user', JSON.stringify(response.user));
      router.push('/students/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid student credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-brand">Student Login</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">Student Sign In</h1>
          <p className="mt-2 text-sm text-slate-500">Use your student credentials to access your dashboard.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormInput label="Email address" name="email" type="email" value={email} onChange={setEmail} placeholder="student@example.com" />
          <FormInput label="Password" name="password" type="password" value={password} onChange={setPassword} placeholder="Enter your password" />

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
