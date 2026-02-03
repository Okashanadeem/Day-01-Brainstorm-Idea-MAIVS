'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import api from '@/services/api';

export default function TelecomLoginPage() {
  const [operatorId, setOperatorId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // In a real scenario, this would hit a specific telecom auth endpoint
      // For demo, we simulate a successful login if credentials are provided
      // and mock a user object with 'telecom' role.
      
      // We'll use the existing auth endpoint but treat any successful login 
      // here as a telecom operator for the purpose of the demo flow, 
      // OR we can just mock it directly if the backend doesn't support 'telecom' role yet.
      // Let's try to authenticate real users first.
      
      // const response = await api.post('/auth/login', { cnic: operatorId, password });
      
      // MOCK LOGIN FOR TELECOM DEMO
      if (operatorId === 'telecom' && password === 'admin') {
         localStorage.setItem('token', 'demo-telecom-token');
         localStorage.setItem('user', JSON.stringify({ name: 'Jazz Operator', role: 'telecom', cnic: 'telecom' }));
         router.push('/block-requests');
         return;
      }

      // Fallback to real auth
      const response = await api.post('/auth/login', { cnic: operatorId, password });
      const { user, token } = response.data;
      
      // Allow admin or a specific telecom role
      if (user.role !== 'admin' && user.role !== 'telecom') {
         throw new Error('Access denied. Authorized Telecom Operator account required.');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      router.push('/block-requests');
    } catch (err: any) {
      setError('Invalid Operator ID or Password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl border-t-4 border-emerald-600">
        <div>
          <div className="flex justify-center">
            <span className="bg-emerald-100 p-3 rounded-full text-emerald-600 font-bold text-2xl">
              NTB
            </span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
            Telecom Operator Portal
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            National Telecom Bridge Access
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
              label="Operator ID"
              type="text"
              required
              placeholder="OP-786-JAZZ"
              value={operatorId}
              onChange={(e) => setOperatorId(e.target.value)}
            />
            <Input
              label="Access Key"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <Button type="submit" variant="primary" fullWidth disabled={loading} className="bg-emerald-600 hover:bg-emerald-700">
              {loading ? 'Verifying Link...' : 'Access Network Control'}
            </Button>
          </div>
          
          <div className="text-center text-xs text-slate-400 mt-4">
            <p>Authorized for: Jazz, Telenor, Zong, Ufone</p>
            <p className="mt-1">(Demo Login: <b>telecom</b> / <b>admin</b>)</p>
          </div>
        </form>
      </div>
      <p className="mt-8 text-center text-xs text-slate-500 uppercase tracking-widest">
        Secure Gateway • PTA Compliance Node
      </p>
    </div>
  );
}
