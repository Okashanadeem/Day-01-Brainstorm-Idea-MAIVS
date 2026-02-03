'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SimulationTooltip } from '@/components/ui/SimulationTooltip';
import api from '@/services/api';

export default function RegisterDevicePage() {
  const [formData, setFormData] = useState({
    imei: '',
    brand: '',
    deviceModel: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.imei.length !== 15) {
      return setError('IMEI must be exactly 15 digits');
    }

    setLoading(true);

    try {
      await api.post('/devices/register', formData);
      router.push('/my-devices');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register device. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Register New Device</h1>
        
        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="bg-rose-50 text-rose-600 p-3 rounded-md text-sm border border-rose-200 text-center">
              {error}
            </div>
          )}

          <div className="relative">
            <Input
              label="IMEI Number (15 Digits)"
              name="imei"
              type="text"
              required
              maxLength={15}
              placeholder="352046097653210"
              value={formData.imei}
              onChange={handleChange}
            />
            <div className="absolute top-0 right-0">
              <SimulationTooltip content="In production, this will verify against Manufacturer and GSMA databases to detect tempered hardware and valid global identities." />
            </div>
          </div>

          <Input
            label="Brand"
            name="brand"
            type="text"
            required
            placeholder="e.g. Samsung, Apple"
            value={formData.brand}
            onChange={handleChange}
          />

          <Input
            label="Model"
            name="deviceModel"
            type="text"
            required
            placeholder="e.g. Galaxy S23, iPhone 15"
            value={formData.deviceModel}
            onChange={handleChange}
          />

          <div className="pt-4 flex space-x-4">
            <Button 
              type="button" 
              variant="secondary" 
              className="flex-1"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              className="flex-1"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register Device'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
