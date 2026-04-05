"use client";

import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FormInput from '@/components/FormInput';
import { login, register } from '@/lib/api';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('sms-token');

    if (token) {
      router.replace('/dashboard');
    }
  }, [router]);

  const validate = () => {
    if (mode === 'register' && name.trim().length < 3) {
      setError('Please enter your full name.');
      return false;
    }

    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      if (mode === 'login') {
        const response = await login(email, password);
        localStorage.setItem('sms-token', response.token);
        router.push('/dashboard');
      } else {
        await register(name, email, password);
        setMode('login');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Unable to complete the request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-brand">Student Management</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">{mode === 'login' ? 'Welcome back' : 'Create account'}</h1>
          <p className="mt-2 text-sm text-slate-500">Secure login and registration for administrators.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <FormInput label="Full name" name="name" value={name} onChange={setName} placeholder="Jane Doe" />
          )}
          <FormInput label="Email address" name="email" type="email" value={email} onChange={setEmail} placeholder="admin@example.com" />
          <FormInput label="Password" name="password" type="password" value={password} onChange={setPassword} placeholder="Enter a secure password" />

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
          <p>{mode === 'login' ? "Don't have an account?" : 'Already registered?'}</p>
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setError('');
            }}
            className="font-semibold text-brand hover:text-blue-600"
          >
            {mode === 'login' ? 'Register' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
