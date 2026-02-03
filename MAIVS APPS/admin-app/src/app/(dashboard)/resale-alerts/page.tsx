'use client';

import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { 
  BellAlertIcon,
  MapPinIcon,
  ClockIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/solid';

export default function ResaleAlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await api.get('/admin/resale-alerts');
        setAlerts(response.data);
      } catch (err) {
        console.error('Failed to fetch alerts');
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
    
    // Poll for new alerts in demo
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="bg-rose-100 p-2 rounded-lg">
          <BellAlertIcon className="h-6 w-6 text-rose-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Resale Alerts (Trap Monitoring)</h1>
          <p className="text-slate-500">Real-time alerts triggered when stolen IMEIs are checked at shops.</p>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-slate-400">Monitoring for attempts...</div>
        ) : alerts.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center shadow-sm">
            <ClockIcon className="h-12 w-12 text-slate-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900">No active threats</h3>
            <p className="text-slate-500 mt-1">No resale attempts of stolen devices detected in the last 24 hours.</p>
          </div>
        ) : alerts.map((alert: any) => (
          <div key={alert._id} className="bg-white p-6 rounded-2xl border-l-8 border-rose-600 border border-slate-200 shadow-lg animate-pulse">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-4">
                <div className="bg-rose-100 p-3 rounded-full">
                  <ExclamationCircleIcon className="h-8 w-8 text-rose-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Stolen Device Detected</h3>
                  <p className="text-sm font-mono text-rose-600 font-bold">IMEI: {alert.imei}</p>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <MapPinIcon className="h-5 w-5 text-slate-400" />
                      <span className="text-sm font-medium">Shop CNIC: {alert.shopkeeperCNIC}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <ClockIcon className="h-5 w-5 text-slate-400" />
                      <span className="text-sm font-medium">{new Date(alert.attemptDate).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="bg-rose-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-rose-700 transition-colors shadow-sm">
                RESPOND NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
