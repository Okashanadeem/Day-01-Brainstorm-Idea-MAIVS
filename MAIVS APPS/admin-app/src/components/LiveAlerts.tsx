'use client';

import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

interface Alert {
  _id: string;
  resourceId: string;
  timestamp: string;
  ipAddress: string;
}

export const LiveAlerts = () => {
  const [lastCheck, setLastCheck] = useState(() => Date.now());
  const [activeAlert, setActiveAlert] = useState<Alert | null>(null);

  useEffect(() => {
    const pollAlerts = async () => {
      try {
        // Assume polling every 5 seconds
        const response = await api.get('/admin/panic-alerts');
        const newAlerts = response.data;
        
        if (newAlerts.length > 0) {
          const latest = newAlerts[0];
          const alertTime = new Date(latest.timestamp).getTime();
          
          // If the alert is newer than our component mount time (or last dismissed), show it
          if (alertTime > lastCheck) {
            setActiveAlert(latest);
            // Play sound?
          }
        }
      } catch {
        // silent fail
      }
    };

    const interval = setInterval(pollAlerts, 5000);
    return () => clearInterval(interval);
  }, [lastCheck]);

  if (!activeAlert) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-10 fade-in duration-500">
      <div className="bg-rose-600 text-white p-4 rounded-xl shadow-2xl flex items-center space-x-4 border-4 border-rose-800">
        <div className="bg-white p-2 rounded-full">
          <ExclamationTriangleIcon className="h-8 w-8 text-rose-600 animate-pulse" />
        </div>
        <div>
          <h3 className="font-bold text-lg uppercase tracking-wider">PANIC ALERT RECEIVED</h3>
          <p className="text-sm font-medium opacity-90">IMEI: {activeAlert.resourceId}</p>
          <p className="text-xs opacity-75 mt-1">Location: {activeAlert.ipAddress} • Just now</p>
        </div>
        <div className="flex flex-col space-y-2">
          <button 
            onClick={async () => {
              // Simulate Acknowledge Action
              try {
                 await api.post('/admin/acknowledge-alert', { alertId: activeAlert._id });
              } catch (e) { /* ignore in demo */ }
              
              alert(`Telecom Control Center has been notified. IMEI ${activeAlert.resourceId} is now queued for NETWORK BLOCKAGE.`);
              setActiveAlert(null);
              setLastCheck(Date.now());
            }}
            className="bg-white text-rose-700 hover:bg-rose-50 px-4 py-2 rounded font-bold text-xs shadow-sm uppercase tracking-wide transition-colors"
          >
            INFORM TELECOM
          </button>
           <button 
            onClick={() => {
              alert(`Dispatching nearest unit to IP Location: ${activeAlert.ipAddress}`);
              setActiveAlert(null);
              setLastCheck(Date.now());
            }}
            className="bg-rose-800 hover:bg-rose-900 text-white border border-rose-700 px-4 py-2 rounded font-bold text-xs uppercase tracking-wide transition-colors"
          >
            DISPATCH UNIT
          </button>
        </div>
      </div>
    </div>
  );
};
