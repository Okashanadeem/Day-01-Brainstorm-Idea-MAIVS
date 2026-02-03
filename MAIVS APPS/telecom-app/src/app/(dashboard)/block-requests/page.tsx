'use client';

import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { Button } from '@/components/ui/Button';

interface BlockRequest {
  _id: string;
  imei: string;
  reason: string;
  requestDate: string;
  status: 'Pending' | 'Blocked' | 'Rejected';
}

export default function BlockRequestsPage() {
  const [requests, setRequests] = useState<BlockRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const response = await api.get('/blocks');
      setRequests(response.data);
    } catch (error) {
      console.error('Failed to fetch requests', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id: string, status: 'Blocked' | 'Rejected') => {
    try {
      await api.patch(`/blocks/${id}`, { status });
      fetchRequests(); // Refresh
    } catch {
      alert('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">IMEI Block Requests</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">IMEI</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {loading ? (
              <tr><td colSpan={5} className="text-center py-4">Loading...</td></tr>
            ) : requests.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-4 text-slate-500">No pending requests</td></tr>
            ) : (
              requests.map((req) => {
                const isPanic = req.reason.includes('PANIC ALERT');
                return (
                <tr key={req._id} className={isPanic ? 'bg-red-50 border-l-4 border-red-600 animate-pulse' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm font-medium text-slate-900">
                    {req.imei}
                    {isPanic && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">CRITICAL</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">
                    {req.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(req.requestDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      req.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                      req.status === 'Blocked' ? 'bg-red-100 text-red-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    {req.status === 'Pending' && (
                      <>
                        <Button 
                          size="sm"
                          className="bg-red-600 hover:bg-red-700 text-white shadow-sm"
                          onClick={() => handleAction(req._id, 'Blocked')}
                        >
                          {isPanic ? '🚨 URGENT BLOCK' : 'BLOCK IMEI'}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => handleAction(req._id, 'Rejected')}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              )})
            )}
          </tbody>
        </table>
      </div>


      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-500 space-y-2">
        <p className="font-semibold text-slate-700">System Integration Notes:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>
            &quot;BLOCK IMEI&quot; actions here trigger a simulated signal. In production, this connects directly to the <span className="font-bold" title="Enables network-level blocking">Telecom Operator Core Network?</span>.
          </li>
          <li>
            Blocked devices are automatically reported to the <span className="font-bold" title="Central Equipment Identity Register for cross-border tracking">CEIR (Central Equipment Identity Register)?</span> to prevent international smuggling.
          </li>
          <li>
            Status updates are synchronized with <span className="font-bold" title="Apple, Samsung, etc.">Device Manufacturers?</span> for hardware-level locking where supported.
          </li>
        </ul>
      </div>
    </div>
  );
}
