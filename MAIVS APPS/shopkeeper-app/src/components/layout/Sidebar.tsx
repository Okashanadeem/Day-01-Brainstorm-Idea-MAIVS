'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  HomeIcon, 
  DevicePhoneMobileIcon, 
  ShieldExclamationIcon, 
  MagnifyingGlassIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

interface User {
  name: string;
  role: string;
  cnic: string;
}

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'My Devices', href: '/my-devices', icon: DevicePhoneMobileIcon },
    { name: 'Report Theft', href: '/report-theft', icon: ShieldExclamationIcon },
    { name: 'Verify IMEI', href: '/verify', icon: MagnifyingGlassIcon },
    { name: 'Real World', href: '/real-world', icon: GlobeAltIcon },
  ];

  return (
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-indigo-400">MAIVS</h1>
        <p className="text-xs text-slate-400 mt-1">Asset Verification System</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-4">
              <div className="flex items-center space-x-3 px-3 py-2 bg-slate-800 rounded-lg">
                <UserCircleIcon className="h-8 w-8 text-indigo-400" />
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-white truncate">
                    {typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}').name || 'User' : 'User'}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}').cnic || '' : ''}
                  </p>
                </div>
              </div>
      
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-3 p-3 rounded-lg text-slate-400 hover:bg-rose-900/30 hover:text-rose-400 transition-colors w-full"
              >
                <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
    </div>
  );
};

export default Sidebar;
