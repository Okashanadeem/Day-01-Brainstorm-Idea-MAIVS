import React from 'react';
import { DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

interface DeviceCardProps {
  device: {
    imei: string;
    brand: string;
    deviceModel: string;
    status: 'Active' | 'Stolen' | 'Under Investigation' | 'Recovered';
    registrationDate: string;
  };
  onAction?: () => void;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ device, onAction }) => {
  const statusColors = {
    Active: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Stolen: 'bg-rose-100 text-rose-800 border-rose-200 animate-pulse',
    'Under Investigation': 'bg-amber-100 text-amber-800 border-amber-200',
    Recovered: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-slate-100 rounded-lg">
            <DevicePhoneMobileIcon className="h-8 w-8 text-slate-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{device.brand} {device.deviceModel}</h3>
            <p className="text-sm text-slate-500 font-mono mt-1">IMEI: {device.imei}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[device.status]}`}>
          {device.status}
        </span>
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <div className="text-xs text-slate-400">
          Registered: {new Date(device.registrationDate).toLocaleDateString()}
        </div>
        {onAction && (
          <button 
            onClick={onAction}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Manage Device
          </button>
        )}
      </div>
    </div>
  );
};
