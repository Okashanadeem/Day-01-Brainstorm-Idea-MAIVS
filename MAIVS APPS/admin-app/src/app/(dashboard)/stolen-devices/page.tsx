'use client';

import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { SimulationTooltip } from '@/components/ui/SimulationTooltip';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

export default function StolenDevicesPage() {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStolen = async () => {
      try {
        const response = await api.get('/admin/stolen-devices');
        setDevices(response.data);
      } catch (err) {
        console.error('Failed to fetch stolen devices');
      } finally {
        setLoading(false);
      }
    };
    fetchStolen();
  }, []);

  const filteredDevices = devices.filter((d: any) => 
    d.imei.includes(search) || d.ownerCNIC.includes(search) || d.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-slate-900">Stolen Devices Registry</h1>
            <SimulationTooltip content="This registry represents a National Crime Database. It allows for cross-province tracking and intelligence sharing on stolen mobile assets." />
          </div>
          <p className="text-slate-500">Live directory of all reported mobile thefts.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center space-x-4 shadow-sm">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search by IMEI, Brand, or Owner CNIC..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
          <FunnelIcon className="h-5 w-5" />
          <span className="font-medium text-sm">Filter</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Device Info</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">IMEI</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Owner CNIC</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Reported Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">Loading registry...</td></tr>
            ) : filteredDevices.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">No stolen devices found.</td></tr>
            ) : filteredDevices.map((device: any) => (
              <tr key={device.imei} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900">{device.brand}</div>
                  <div className="text-xs text-slate-500">{device.deviceModel}</div>
                </td>
                <td className="px-6 py-4 font-mono text-sm text-slate-600">{device.imei}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{device.ownerCNIC}</td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {new Date(device.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50 transition-colors">
                    <EyeIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
