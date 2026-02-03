'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import api from '@/services/api';

interface TransferOwnershipModalProps {
  device: any;
  onClose: () => void;
  onSuccess: () => void;
}

export const TransferOwnershipModal: React.FC<TransferOwnershipModalProps> = ({ device, onClose, onSuccess }) => {
  const [step, setStep] = useState(1); // 1: Enter Buyer CNIC, 2: Enter OTP
  const [buyerCNIC, setBuyerCNIC] = useState('');
  const [otp, setOtp] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [simulatedOTP, setSimulatedOTP] = useState('');

  const handleInitiate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (buyerCNIC.length !== 13) {
      return setError('Buyer CNIC must be 13 digits.');
    }

    setLoading(true);
    try {
      const response = await api.post('/resale/initiate', {
        imei: device.imei,
        buyerCNIC
      });
      setTransactionId(response.data.transactionId);
      setSimulatedOTP(response.data.simulatedOTP);
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to initiate transfer.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/resale/verify-otp', {
        transactionId,
        otp
      });
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Transfer Ownership</h2>
        <p className="text-slate-500 mb-6">
          IMEI: <span className="font-mono font-medium text-slate-700">{device.imei}</span>
        </p>

        {error && (
          <div className="mb-6 p-3 bg-rose-50 text-rose-600 rounded-lg text-sm border border-rose-200">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleInitiate} className="space-y-4">
            <Input
              label="Enter Buyer CNIC"
              type="text"
              maxLength={13}
              placeholder="4210112345678"
              value={buyerCNIC}
              onChange={(e) => setBuyerCNIC(e.target.value)}
              required
            />
            <div className="flex space-x-3 pt-2">
              <Button type="button" variant="secondary" fullWidth onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="primary" fullWidth disabled={loading}>
                {loading ? 'Initiating...' : 'Next Step'}
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 mb-4">
              <p className="text-sm text-indigo-700 font-medium">
                [DEMO MODE] OTP sent to registered owner.
              </p>
              <p className="text-xl font-mono font-bold text-indigo-900 mt-1">
                {simulatedOTP}
              </p>
              <p className="text-xs text-rose-600 mt-2 pt-2 border-t border-indigo-200">
                (Demo: Use <b>911911</b> to simulate Panic/Duress)
              </p>
            </div>
            
            <Input
              label="Enter 6-digit OTP"
              type="text"
              maxLength={6}
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            
            <div className="flex space-x-3 pt-2">
              <Button type="button" variant="secondary" fullWidth onClick={() => setStep(1)}>Back</Button>
              <Button type="submit" variant="primary" fullWidth disabled={loading}>
                {loading ? 'Verifying...' : 'Complete Transfer'}
              </Button>
            </div>
            
            <div className="mt-4 text-[10px] text-slate-400 text-center space-y-1">
               <p>* OTPs will be delivered via an <span className="font-semibold" title="e.g. Twilio or local telecom SMS gateway">SMS Gateway Service?</span> in production.</p>
               <p>* Future updates may require <span className="font-semibold" title="Fingerprint or Face ID for secure transfers">Biometric Verification?</span>.</p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
