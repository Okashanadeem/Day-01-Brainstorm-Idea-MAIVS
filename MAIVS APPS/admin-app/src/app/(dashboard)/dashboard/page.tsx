'use client';

import React, { useEffect, useState } from 'react';
import { 
  ShieldExclamationIcon, 
  CheckBadgeIcon, 
  ArrowPathIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const StatCard = ({ title, value, icon: Icon, color }: any) => (
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

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalStolen: 124,
    recoveredToday: 3,
    pendingFIRs: 18,
    recoveryRate: '64%'
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Overview</h1>
        <p className="text-slate-500">Real-time statistics across all jurisdictions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Stolen Devices" 
          value={stats.totalStolen} 
          icon={ShieldExclamationIcon} 
          color="bg-rose-50 text-rose-600" 
        />
        <StatCard 
          title="Recovered Today" 
          value={stats.recoveredToday} 
          icon={CheckBadgeIcon} 
          color="bg-emerald-50 text-emerald-600" 
        />
        <StatCard 
          title="Pending FIRs" 
          value={stats.pendingFIRs} 
          icon={ExclamationCircleIcon} 
          color="bg-amber-50 text-amber-600" 
        />
        <StatCard 
          title="Recovery Rate" 
          value={stats.recoveryRate} 
          icon={ArrowPathIcon} 
          color="bg-indigo-50 text-indigo-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-3 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-50 last:border-0">
                <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">
                  {i}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">New FIR Filed - Area 0{i}</p>
                  <p className="text-xs text-slate-500">IMEI: 35204609765321{i} • 12 mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4">Jurisdiction Performance</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Saddar Division</span>
                <span className="font-bold">82%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full">
                <div className="bg-indigo-600 h-2 rounded-full w-[82%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Clifton Division</span>
                <span className="font-bold">45%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full">
                <div className="bg-amber-500 h-2 rounded-full w-[45%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
