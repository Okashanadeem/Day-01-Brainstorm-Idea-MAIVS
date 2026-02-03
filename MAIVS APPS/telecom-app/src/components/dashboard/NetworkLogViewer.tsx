'use client';

import React, { useEffect, useState, useRef } from 'react';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
  source: string;
}

const LOG_MESSAGES = [
  { level: 'INFO', message: 'Handshake initiated with Tower-402', source: 'BSC-01' },
  { level: 'INFO', message: 'Packet uplink received 40ms latency', source: 'BTS-North' },
  { level: 'INFO', message: 'IMEI verified: 3520...210 [CLEAN]', source: 'Core-DB' },
  { level: 'WARN', message: 'Signal degradation detected on Sector 3', source: 'RF-Monitor' },
  { level: 'INFO', message: 'Subscriber auth token refreshed', source: 'HSS' },
  { level: 'SUCCESS', message: 'Block rule propagated to Switch-04', source: 'Policy-Engine' },
  { level: 'INFO', message: 'Roaming request authorized', source: 'VLR' },
  { level: 'WARN', message: 'High traffic load on Cell-ID 8842', source: 'Traffic-Mgr' },
  { level: 'ERROR', message: 'Handover failure: Target cell busy', source: 'BSC-02' },
  { level: 'INFO', message: 'SMS gateway heartbeat ack', source: 'SMSC' },
];

export default function NetworkLogViewer({ limit = 0 }: { limit?: number }) {
  const [logs, setLogs] = useState<LogEntry[]>(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(Date.now() - (5 - i) * 1000).toISOString().split('T')[1].slice(0, 12),
      level: 'INFO',
      message: 'System initialization sequence...',
      source: 'KERNEL'
    }));
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMsg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      const newLog: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString().split('T')[1].slice(0, 12),
        level: randomMsg.level as LogEntry['level'],
        message: randomMsg.message,
        source: randomMsg.source
      };

      setLogs(prev => {
        const updated = [...prev, newLog];
        return updated.slice(limit ? -limit : -50); // Keep last 50 or limit
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [limit]);

  useEffect(() => {
    if (scrollRef.current && !limit) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, limit]);

  return (
    <div className={`bg-slate-900 rounded-lg p-4 font-mono text-xs overflow-hidden ${!limit ? 'h-[600px] flex flex-col' : 'h-full'}`}>
      <div className={`space-y-1 ${!limit ? 'overflow-y-auto flex-1' : ''}`} ref={scrollRef}>
        {logs.map((log) => (
          <div key={log.id} className="flex items-start space-x-3 hover:bg-slate-800/50 p-0.5 rounded">
            <span className="text-slate-500 shrink-0 select-none">[{log.timestamp}]</span>
            <span className={`font-bold shrink-0 w-16 ${
              log.level === 'INFO' ? 'text-blue-400' :
              log.level === 'WARN' ? 'text-amber-400' :
              log.level === 'ERROR' ? 'text-rose-400' :
              'text-emerald-400'
            }`}>
              {log.level}
            </span>
            <span className="text-slate-400 shrink-0 w-24 border-r border-slate-700 mr-2">
              {log.source}
            </span>
            <span className="text-slate-300 break-all">
              {log.message}
            </span>
          </div>
        ))}
      </div>
      {!limit && (
        <div className="mt-2 pt-2 border-t border-slate-800 flex items-center text-slate-500 text-[10px]">
          <span className="animate-pulse mr-2">●</span> Live Stream Active
        </div>
      )}
    </div>
  );
}
