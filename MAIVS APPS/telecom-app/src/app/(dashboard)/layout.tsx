import React from 'react';
import AdminSidebar from '@/components/layout/Sidebar';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen">
        <header className="bg-white h-16 border-b border-slate-200 flex items-center px-8 justify-between sticky top-0 z-10">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">MAIVS Administrative Portal</h2>
          <div className="flex items-center space-x-4">
            <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2 py-1 rounded border border-indigo-100">STABLE v1.0</span>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
