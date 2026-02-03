'use client';

import React from 'react';

const StatCard = ({ title, value, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <p className="text-sm font-medium text-slate-500">{title}</p>
    <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
  </div>
);

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-900">Crime Analytics & Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Thefts (Monthly)" value="412" color="text-slate-900" />
        <StatCard title="Recovery Rate" value="68%" color="text-emerald-600" />
        <StatCard title="Active Hotspots" value="5" color="text-rose-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Theft Trends (Last 6 Months)</h3>
          <div className="flex items-end space-x-4 h-64">
            {[45, 60, 35, 80, 55, 40].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end group">
                <div 
                  className="w-full bg-indigo-100 group-hover:bg-indigo-200 transition-all rounded-t-lg relative"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h * 10}
                  </div>
                </div>
                <p className="text-xs text-center text-slate-500 mt-2">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Device Types Targeted</h3>
          <div className="space-y-4">
            {[
              { label: 'iPhone 14/15 Pro', val: 75, color: 'bg-slate-800' },
              { label: 'Samsung S23/24', val: 50, color: 'bg-blue-600' },
              { label: 'Xiaomi/Redmi', val: 30, color: 'bg-orange-500' },
              { label: 'Others', val: 20, color: 'bg-slate-400' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">{item.label}</span>
                  <span className="text-slate-500">{item.val}% Risk</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full`} style={{ width: `${item.val}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
