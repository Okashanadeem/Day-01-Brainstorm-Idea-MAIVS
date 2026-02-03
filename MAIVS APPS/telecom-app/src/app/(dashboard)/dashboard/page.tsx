'use client';

import React from 'react';
import { SimulationTooltip } from '@/components/ui/SimulationTooltip';
import NetworkLogViewer from '@/components/dashboard/NetworkLogViewer';
import { 
  SignalIcon, 
  WifiIcon, 
  ShieldCheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  </div>
);

export default function TelecomDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-slate-900">Network Overview</h1>
          <SimulationTooltip content="This dashboard represents the Telecom Operator Integration. In a real scenario, this system would interface with cellular core networks to execute IMEI blocking requests in real-time." />
        </div>
        <p className="text-slate-500">National Telecom Bridge Status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Active Blocks" 
          value="1,240" 
          icon={ShieldCheckIcon} 
          color="bg-emerald-50 text-emerald-600" 
        />
        <StatCard 
          title="Pending Requests" 
          value="15" 
          icon={ExclamationTriangleIcon} 
          color="bg-amber-50 text-amber-600" 
        />
        <StatCard 
          title="Network Load" 
          value="98.2%" 
          icon={SignalIcon} 
          color="bg-indigo-50 text-indigo-600" 
        />
        <StatCard 
          title="Connected Towers" 
          value="45k" 
          icon={WifiIcon} 
          color="bg-blue-50 text-blue-600" 
        />
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-4">Live Block Feed</h3>
        <div className="rounded-lg border border-slate-200 overflow-hidden">
           <NetworkLogViewer limit={8} />
        </div>
      </div>
    </div>
  );
}