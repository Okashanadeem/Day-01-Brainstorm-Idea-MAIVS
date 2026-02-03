'use client';

import React, { useEffect, useState } from 'react';
import { DeviceCard } from '@/components/device/DeviceCard';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import api from '@/services/api';
import { TransferOwnershipModal } from '@/components/modals/TransferOwnershipModal';

export default function MyDevicesPage() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchDevices = async () => {
    try {
      const response = await api.get('/devices/my');
      setDevices(response.data);
    } catch (err: any) {
      setError('Failed to fetch devices. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleOpenTransfer = (device: any) => {
    setSelectedDevice(device);
    setShowModal(true);
  };

  const handleTransferSuccess = () => {
    setShowModal(false);
    fetchDevices(); // Refresh list
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Devices</h1>
          <p className="text-slate-600 mt-2">A list of all mobile assets registered to your CNIC.</p>
        </div>
        <Link href="/register-device">
          <Button variant="primary">Add New Device</Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : error ? (
        <div className="bg-rose-50 text-rose-600 p-4 rounded-lg border border-rose-200">
          {error}
        </div>
      ) : devices.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center">
          <div className="max-w-sm mx-auto">
            <h3 className="text-lg font-semibold text-slate-900">No devices registered</h3>
            <p className="text-slate-500 mt-2">Start protecting your assets by registering your first mobile device.</p>
            <Link href="/register-device">
              <Button variant="primary" className="mt-6">Register Device</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {devices.map((device: any) => (
            <DeviceCard 
              key={device.imei} 
              device={device} 
              onAction={device.status === 'Active' ? () => handleOpenTransfer(device) : undefined}
            />
          ))}
        </div>
      )}

      {showModal && selectedDevice && (
        <TransferOwnershipModal 
          device={selectedDevice}
          onClose={() => setShowModal(false)}
          onSuccess={handleTransferSuccess}
        />
      )}
    </div>
  );
}