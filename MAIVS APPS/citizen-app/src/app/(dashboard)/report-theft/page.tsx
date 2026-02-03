'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SimulationTooltip } from '@/components/ui/SimulationTooltip';
import api from '@/services/api';

export default function ReportTheftPage() {
  const [devices, setDevices] = useState([]);
  const [formData, setFormData] = useState({
    imei: '',
    policeStation: '',
    description: '',
    incidentDate: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await api.get('/devices/my');
        // Only allow reporting for non-stolen devices
        const activeDevices = response.data.filter((d: any) => d.status === 'Active');
        setDevices(activeDevices);
      } catch (err: any) {
        setError('Failed to fetch your devices.');
      } finally {
        setFetching(false);
      }
    };

    fetchDevices();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.imei) {
      return setError('Please select a device');
    }

    setLoading(true);

    try {
      await api.post('/firs', formData);
      router.push('/my-devices');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to file report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Report Theft</h1>
        <p className="text-slate-500 mb-6">File an FIR and mark your device as stolen to prevent its resale.</p>
        
        {fetching ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : devices.length === 0 ? (
          <div className="bg-amber-50 text-amber-700 p-4 rounded-lg border border-amber-200 mb-6 text-center text-sm">
            You don't have any active devices to report.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-rose-50 text-rose-600 p-3 rounded-md text-sm border border-rose-200 text-center">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Select Stolen Device
              </label>
              <select
                name="imei"
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.imei}
                onChange={handleChange}
                required
              >
                <option value="">-- Choose a device --</option>
                {devices.map((d: any) => (
                  <option key={d.imei} value={d.imei}>
                    {d.brand} {d.deviceModel} ({d.imei})
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Incident Date"
              name="incidentDate"
              type="date"
              required
              value={formData.incidentDate}
              onChange={handleChange}
            />

            <div className="relative">
              <Input
                label="Preferred Police Station"
                name="policeStation"
                type="text"
                required
                placeholder="e.g. Saddar Police Station"
                value={formData.policeStation}
                onChange={handleChange}
              />
              <div className="absolute top-0 right-0">
                <SimulationTooltip content="Filing this report will eventually integrate with Official Police FIR Systems to automatically lodge a complaint and notify law enforcement." />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Incident Description
              </label>
              <textarea
                name="description"
                rows={4}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Briefly describe the circumstances..."
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

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
                variant="danger" 
                className="flex-1"
                disabled={loading}
              >
                {loading ? 'Filing Report...' : 'File FIR & Mark Stolen'}
              </Button>
            </div>
            
            <p className="mt-6 text-xs text-center text-slate-400 italic">
              * This is a demo FIR. In the official system, this action will automatically sync with the <span className="font-semibold text-slate-500" title="Connects with local police station records">Police FIR Management System?</span> and <span className="font-semibold text-slate-500" title="National Crime Database for cross-province tracking">National Crime Database?</span>.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
