import React from 'react';
import Link from 'next/link';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            MAIVS Telecom Integration FAQ
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Network-level enforcement and tracking protocols.
          </p>
          <Link href="/" className="inline-block mt-4 text-indigo-600 hover:text-indigo-500 font-medium">
            &larr; Back to Dashboard
          </Link>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-800 p-2 rounded-lg mr-3">
                1
              </span>
              Network Blocking (Telecom Integration)
            </h2>
            <div className="prose prose-slate text-slate-600">
              <p className="mb-4">
                <strong>In this Demo:</strong> Blocking is simulated by status flags in our database.
              </p>
              <p>
                <strong>Real World Integration:</strong> Direct <strong>Telecom Operator Integration</strong> is necessary to enable 
                network-level IMEI blocking. When a device is marked 'Stolen' in MAIVS, it will be instantly blacklisted by all 
                cellular carriers, preventing it from accessing any network (voice or data).
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-800 p-2 rounded-lg mr-3">
                2
              </span>
              Global Tracking (CEIR)
            </h2>
            <div className="prose prose-slate text-slate-600">
              <p className="mb-4">
                <strong>In this Demo:</strong> Scope is limited to the local system.
              </p>
              <p>
                <strong>Real World Integration:</strong> Integrating with a <strong>Central Equipment Identity Register (CEIR)</strong> 
                allows for cross-border tracking. This prevents stolen phones from being exported and sold in other countries 
                by sharing blacklist data internationally.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-800 p-2 rounded-lg mr-3">
                3
              </span>
              Status Synchronization (Carrier Collaboration)
            </h2>
            <div className="prose prose-slate text-slate-600">
              <p className="mb-4">
                <strong>In this Demo:</strong> Updates are instant within the app.
              </p>
              <p>
                <strong>Real World Integration:</strong> <strong>Carrier Collaboration</strong> ensures that device status changes 
                (Active vs. Stolen) are synchronized across all networks in real-time. This eliminates latency that thieves 
                often exploit to use stolen phones before bans take effect.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>© 2026 MAIVS Project. Designed for CPO Internship demonstration.</p>
        </div>
      </div>
    </div>
  );
}
