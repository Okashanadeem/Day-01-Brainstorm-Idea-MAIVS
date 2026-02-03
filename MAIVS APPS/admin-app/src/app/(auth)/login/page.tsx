'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import api from '@/services/api';

export default function AdminLoginPage() {
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { cnic, password });
      
      const { user, token } = response.data;
      
      if (user.role !== 'police' && user.role !== 'admin') {
        throw new Error('Access denied. Police or Admin role required.');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl border-t-4 border-indigo-600">
        <div>
          <div className="flex justify-center">
            <span className="bg-indigo-100 p-3 rounded-full text-indigo-600 font-bold text-2xl">
              MAIVS
            </span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
            Secure Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            Authorized Personnel Only
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-rose-50 text-rose-600 p-3 rounded-md text-sm border border-rose-200 text-center font-medium">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <Input
              label="CNIC / ID"
              type="text"
              required
              placeholder="0000000000001"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
            />
            <Input
              label="Secure Password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              {loading ? 'Authenticating...' : 'Enter Control Panel'}
            </Button>
          </div>
        </form>
      </div>
      <p className="mt-8 text-center text-xs text-slate-500 uppercase tracking-widest">
        Property of MAIVS Digital Assets Protection
      </p>
    </div>
  );
}
