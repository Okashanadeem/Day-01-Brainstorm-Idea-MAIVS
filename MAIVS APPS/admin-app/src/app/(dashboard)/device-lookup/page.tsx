'use client';

import React, { useState } from 'react';
import api from '@/services/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { 
  MagnifyingGlassIcon,
  UserIcon,
  ShieldCheckIcon,
  HistoryIcon,
  IdentificationIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

export default function DeviceLookupPage() {
  const [query, setQuery] = useState('');
  const [device, setDevice] = useState<any>(null);
  const [deviceList, setDeviceList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'single' | 'list'>('single');

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setDevice(null);
    setDeviceList([]);
    setLoading(true);

    try {
      if (query.length === 15) {
        // IMEI Search
        const response = await api.get(`/devices/verify/${query}`);
        setDevice(response.data);
        setMode('single');
      } else if (query.length === 13) {
        // CNIC Search
        const response = await api.get(`/admin/devices/owner/${query}`);
        if (response.data.length === 0) {
          setError('No devices found for this CNIC.');
        } else {
          setDeviceList(response.data);
          setMode('list');
        }
      } else {
        setError('Invalid input. Enter 15-digit IMEI or 13-digit CNIC.');
      }
    } catch (err: any) {
      setError('Search failed or not found.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">National Registry Lookup</h1>
        <p className="text-slate-500">Search by Device IMEI (15 digits) or Owner CNIC (13 digits).</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-xl">
        <form onSubmit={handleLookup} className="flex gap-4">
          <div className="flex-1">
            <Input
              label="Enter IMEI or CNIC"
              type="text"
              maxLength={15}
              placeholder="3520460... or 42101..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="pt-7">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </form>
      </div>

      {error && (
        <div className="bg-rose-50 text-rose-600 p-4 rounded-xl border border-rose-200 max-w-xl">
          {error}
        </div>
      )}

      {/* Single Device View (IMEI Search) */}
      {mode === 'single' && device && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Device Specifications</h3>
                  <p className="text-3xl font-bold text-slate-900 mt-1">{device.brand} {device.deviceModel}</p>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${
                  device.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  {device.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">IMEI Number</p>
                  <p className="text-lg font-mono text-slate-700 mt-1">{device.imei}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Current Owner</p>
                  <div className="flex items-center space-x-2 mt-1 text-slate-700">
                    <UserIcon className="h-5 w-5 text-slate-400" />
                    <span className="text-lg font-medium">{device.ownerName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List View (CNIC Search) */}
      {mode === 'list' && deviceList.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800">Owned Devices ({deviceList.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deviceList.map((d: any) => (
              <div key={d.imei} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-4">
                <div className="p-3 bg-slate-100 rounded-lg">
                  <DevicePhoneMobileIcon className="h-8 w-8 text-slate-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{d.brand} {d.deviceModel}</h3>
                      <p className="text-sm text-slate-500 font-mono mt-1">{d.imei}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      d.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {d.status}
                    </span>
                  </div>
                  <div className="mt-4 text-xs text-slate-400">
                    Registered: {new Date(d.registrationDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}