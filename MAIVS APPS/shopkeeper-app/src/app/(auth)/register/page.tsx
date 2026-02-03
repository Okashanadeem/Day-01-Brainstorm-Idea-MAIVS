'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SimulationTooltip } from '@/components/ui/SimulationTooltip';
import api from '@/services/api';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    cnic: '',
    name: '',
    password: '',
    confirmPassword: '',
    role: 'citizen',
    phoneNumber: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register', {
        cnic: formData.cnic,
        name: formData.name,
        password: formData.password,
        role: formData.role,
        phoneNumber: formData.phoneNumber
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
            Create account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleRegister}>
          {error && (
            <div className="bg-rose-50 text-rose-600 p-3 rounded-md text-sm border border-rose-200 text-center">
              {error}
            </div>
          )}
          
          <Input
            label="Full Name"
            name="name"
            type="text"
            required
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />

          <div className="relative">
            <Input
              label="CNIC Number"
              name="cnic"
              type="text"
              required
              placeholder="4210112345678"
              value={formData.cnic}
              onChange={handleChange}
            />
            <div className="absolute top-0 right-0">
               <SimulationTooltip content="In a real production environment, this field will validate directly against the NADRA database to ensure the citizen's identity is authentic." />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              I am a:
            </label>
            <select
              name="role"
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="citizen">Citizen</option>
              <option value="shopkeeper">Shopkeeper</option>
            </select>
          </div>

          <Input
            label="Phone Number"
            name="phoneNumber"
            type="text"
            placeholder="+923001234567"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <div>
            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
