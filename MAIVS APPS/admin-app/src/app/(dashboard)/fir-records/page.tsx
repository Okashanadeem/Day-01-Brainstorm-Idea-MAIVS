'use client';

import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { SimulationTooltip } from '@/components/ui/SimulationTooltip';
import { 
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function FIRRecordsPage() {
  const [firs, setFirs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFirs = async () => {
    try {
      const response = await api.get('/firs');
      setFirs(response.data);
    } catch (err) {
      console.error('Failed to fetch FIRs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFirs();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await api.patch(`/firs/${id}`, { status: newStatus });
      fetchFirs(); // Refresh
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-slate-900">FIR Records</h1>
          <SimulationTooltip content="This dashboard simulates integration with official Police FIR Management Systems. In a real deployment, these records would sync directly with law enforcement databases." />
        </div>
        <p className="text-slate-500">Official incident reports and investigation status.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">FIR Number</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">IMEI</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Police Station</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">Loading records...</td></tr>
            ) : firs.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">No FIR records found.</td></tr>
            ) : firs.map((fir: any) => (
              <tr key={fir._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <DocumentTextIcon className="h-4 w-4 text-slate-400" />
                    <span className="font-bold text-slate-900">{fir.firNumber}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-sm text-slate-600">{fir.imei}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{fir.policeStation}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    fir.status === 'Filed' ? 'bg-amber-100 text-amber-700' :
                    fir.status === 'Under Investigation' ? 'bg-blue-100 text-blue-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {fir.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    {fir.status !== 'Device Recovered' && (
                      <>
                        <button 
                          onClick={() => handleUpdateStatus(fir._id, 'Under Investigation')}
                          className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                        >
                          Investigate
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(fir._id, 'Device Recovered')}
                          className="text-xs font-bold text-emerald-600 hover:text-emerald-800"
                        >
                          Recovered
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
