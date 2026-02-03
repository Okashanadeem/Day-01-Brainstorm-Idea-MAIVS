'use client';

import React from 'react';
import { 
  CpuChipIcon, 
  ShieldCheckIcon, 
  ChatBubbleLeftRightIcon, 
  GlobeAltIcon,
  BuildingLibraryIcon,
  FingerPrintIcon,
  SignalIcon
} from '@heroicons/react/24/outline';

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  realWorld: string;
}

const ServiceCard = ({ icon: Icon, title, description, realWorld }: ServiceCardProps) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center space-x-4 mb-4">
      <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-bold text-slate-900">{title}</h3>
    </div>
    <div className="space-y-3">
      <div className="p-3 bg-slate-50 rounded-lg">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">In this Demo</p>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      <div className="p-3 bg-emerald-600 rounded-lg text-white">
        <p className="text-xs font-bold opacity-80 uppercase tracking-wider mb-1">Real-World Implementation</p>
        <p className="text-sm font-medium">{realWorld}</p>
      </div>
    </div>
  </div>
);

export default function RealWorldArchitecture() {
  return (
    <div className="space-y-8 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Real-World Architecture</h1>
        <p className="text-lg text-slate-600 mt-4">
          The Network Backbone: How Telecom Operators enforce national security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ServiceCard 
          icon={BuildingLibraryIcon}
          title="Identity (NADRA)"
          description="Simulated 13-digit CNIC validation."
          realWorld="Direct integration with NADRA Bio-Veri API to link every device to a legally verified biometric identity."
        />
        <ServiceCard 
          icon={ChatBubbleLeftRightIcon}
          title="Communication"
          description="OTPs displayed on-screen for ease of use."
          realWorld="Enterprise SMS Gateways (Twilio/Infobip) to deliver cryptographically secure OTPs to registered SIM cards."
        />
        <ServiceCard 
          icon={CpuChipIcon}
          title="Device Integrity"
          description="Local database of dummy IMEI numbers."
          realWorld="GSMA Check & Manufacturer API (Samsung/Apple) access to verify hardware signatures and prevent IMEI tampering."
        />
        <ServiceCard 
          icon={ShieldCheckIcon}
          title="Law Enforcement"
          description="Simulated FIR generation within the app."
          realWorld="Direct sync with Police FIR Management Systems (PSRMS) to trigger immediate criminal records and search warrants."
        />
        <ServiceCard 
          icon={GlobeAltIcon}
          title="Global Registry"
          description="Local system tracking only."
          realWorld="Central Equipment Identity Register (CEIR) integration for cross-border tracking and international blockage."
        />
        <ServiceCard 
          icon={FingerPrintIcon}
          title="Bio-Authentication"
          description="Basic password and OTP protection."
          realWorld="Mobile Biometric Auth (FaceID/Fingerprint) to authorize high-value ownership transfers directly on the device."
        />
      </div>

      <div className="bg-emerald-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4 text-emerald-200">Carrier-Grade Enforcement</h2>
          <p className="text-emerald-100 leading-relaxed max-w-4xl opacity-90">
            Telecom apps will interface with the Operator&apos;s EIR (Equipment Identity Register). Once a block command is 
            received, the device is blacklisted across the core network (SS7/Diameter nodes), ensuring zero signal 
            availability even with a different SIM card.
          </p>
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
          <SignalIcon className="h-96 w-96" />
        </div>
      </div>
    </div>
  );
}
