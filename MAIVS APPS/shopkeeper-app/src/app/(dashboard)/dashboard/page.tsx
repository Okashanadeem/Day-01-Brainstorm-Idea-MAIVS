'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user.name}</h1>
        <p className="text-slate-600 mt-2">Manage your mobile assets and keep them secure.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">My Devices</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">--</p>
          <Link href="/my-devices">
            <Button variant="outline" className="mt-4 w-full">View All</Button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Security Status</h3>
          <div className="mt-2 flex items-center space-x-2">
            <span className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-emerald-600 font-medium">All devices active</span>
          </div>
          <Link href="/report-theft">
            <Button variant="danger" className="mt-4 w-full">Report Theft</Button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Verify Asset</h3>
          <p className="text-sm text-slate-600 mt-2">Checking a second-hand phone?</p>
          <Link href="/verify">
            <Button variant="primary" className="mt-4 w-full">Verify IMEI</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
