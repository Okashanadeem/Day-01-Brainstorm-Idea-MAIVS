'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/react/24/solid';
import api from '@/services/api';
import Link from 'next/link';
import { TransferOwnershipModal } from '@/components/modals/TransferOwnershipModal';

export default function VerifyIMEIPage() {
  const [imei, setImei] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (imei.length !== 15) {
      return setError('Please enter a valid 15-digit IMEI.');
    }

    setLoading(true);

    try {
      const shopkeeperCNIC = user?.role === 'shopkeeper' ? user.cnic : 'PUBLIC_SEARCH';
      const response = await api.get(`/devices/verify/${imei}?shopkeeperCNIC=${shopkeeperCNIC}`);
      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Device not found or verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">IMEI Verification Tool</h1>
          <p className="text-lg text-slate-600">
            Check the status of any mobile device before you buy or sell.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 mb-8">
          <form onSubmit={handleVerify} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                label="Enter 15-digit IMEI"
                type="text"
                maxLength={15}
                placeholder="352046097653210"
                value={imei}
                onChange={(e) => setImei(e.target.value)}
                className="text-lg py-3 font-mono"
              />
            </div>
            <div className="md:pt-7">
              <Button type="submit" variant="primary" className="h-12 px-8" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify Status'}
              </Button>
            </div>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-rose-50 text-rose-600 rounded-xl border border-rose-200 flex items-center space-x-3">
              <ExclamationTriangleIcon className="h-6 w-6 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {result && (
            <div className={`mt-8 p-8 rounded-2xl border-2 ${
              result.safeToTransact ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
            }`}>
              <div className="flex flex-col items-center text-center">
                {result.safeToTransact ? (
                  <>
                    <div className="bg-emerald-100 p-4 rounded-full mb-4">
                      <ShieldCheckIcon className="h-16 w-16 text-emerald-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-emerald-900 mb-2">SAFE TO TRANSACT</h2>
                    <p className="text-emerald-700 font-medium">This device is currently marked as ACTIVE.</p>
                    
                    {user?.role === 'shopkeeper' && (
                      <div className="mt-6">
                        <Button 
                          variant="primary" 
                          onClick={() => setShowModal(true)}
                          className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                        >
                          Initiate Purchase
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="bg-rose-100 p-4 rounded-full mb-4 animate-bounce">
                      <ExclamationTriangleIcon className="h-16 w-16 text-rose-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-rose-900 mb-2">STOLEN DEVICE DETECTED</h2>
                    <p className="text-rose-700 font-medium mb-4">DO NOT PURCHASE. This device has been reported stolen.</p>
                    <div className="bg-white p-4 rounded-lg border border-rose-200 w-full max-w-md text-left text-sm space-y-1">
                      <p><strong>Device:</strong> {result.brand} {result.deviceModel}</p>
                      <p><strong>IMEI:</strong> {result.imei}</p>
                      <p className="text-rose-600"><strong>Note:</strong> Police authorities have been notified of this verification attempt.</p>
                    </div>
                  </>
                )}

                <div className="mt-8 pt-8 border-t border-slate-200 w-full flex justify-between items-center text-sm text-slate-500">
                  <span>Checked on: {new Date().toLocaleString()}</span>
                  <Link href="/dashboard" className="text-indigo-600 hover:underline font-medium">
                    Back to Dashboard
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-500 italic px-4">
          <p>• MAIVS verification is only a demo based on dummy registry data.</p>
          <p>• In real life, always check physical condition and original receipts.</p>
        </div>
      </div>

      {showModal && result && (
        <TransferOwnershipModal 
          device={result}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            setResult(null); // Clear result to reset flow
            setImei('');
            alert('Transfer Completed Successfully!');
          }}
        />
      )}
    </div>
  );
}
