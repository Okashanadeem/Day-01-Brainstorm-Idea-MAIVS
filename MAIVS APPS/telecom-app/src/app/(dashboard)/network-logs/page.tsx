'use client';

import React from 'react';
import NetworkLogViewer from '@/components/dashboard/NetworkLogViewer';

export default function NetworkLogsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Network Activity Logs</h1>
      <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
        <NetworkLogViewer />
      </div>
      <p className="text-xs text-slate-500 text-center">
        Real-time telemetry from core network switches and HLR/VLR databases.
      </p>
    </div>
  );
}
