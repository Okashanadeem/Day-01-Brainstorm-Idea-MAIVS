'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  SignalIcon, 
    NoSymbolIcon,
    ArrowLeftOnRectangleIcon,
      ServerIcon,
      UserIcon,
      GlobeAltIcon
    } from '@heroicons/react/24/outline';
    
    interface User {
      name: string;
      role: string;
      cnic: string;
    }
    
    const TelecomSidebar = () => {
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
    
      const handleLogout = () => {        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
      };
    
      const navItems = [
        { name: 'Overview', href: '/dashboard', icon: SignalIcon },
        { name: 'Block Requests', href: '/block-requests', icon: NoSymbolIcon },
        { name: 'Network Logs', href: '/network-logs', icon: ServerIcon },
        { name: 'Real World', href: '/real-world', icon: GlobeAltIcon },
      ];  
    return (
      <div className="h-screen w-64 bg-slate-950 text-slate-300 flex flex-col fixed left-0 top-0 border-r border-slate-800">
        <div className="p-6 bg-slate-900 flex items-center space-x-3">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <SignalIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white leading-none">MAIVS</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Telecom Portal</p>
          </div>
        </div>
  
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center space-x-3 p-3 rounded-md transition-all ${
                  isActive 
                    ? 'bg-emerald-600/10 text-emerald-400 border-l-4 border-emerald-600' 
                    : 'hover:bg-slate-900 hover:text-white border-l-4 border-transparent'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
  
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 space-y-4">
          <div className="flex items-center space-x-3 px-3 py-2 bg-slate-800 rounded-lg">
            <UserIcon className="h-8 w-8 text-emerald-400" />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">
                {typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}').name || 'Operator' : 'Operator'}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}').role || 'Network Admin' : 'Network Admin'}
              </p>
            </div>
          </div>
  
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 rounded-md text-slate-500 hover:bg-rose-950/20 hover:text-rose-400 transition-colors w-full"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </div>
    );
  };
export default TelecomSidebar;