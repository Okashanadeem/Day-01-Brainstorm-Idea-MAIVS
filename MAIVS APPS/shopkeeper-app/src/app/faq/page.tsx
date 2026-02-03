import React from 'react';
import Link from 'next/link';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            MAIVS Simulation FAQ
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Understanding the real-world technologies behind this demonstration.
          </p>
          <Link href="/dashboard" className="inline-block mt-4 text-indigo-600 hover:text-indigo-500 font-medium">
            &larr; Back to Dashboard
          </Link>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-800 p-2 rounded-lg mr-3">
                1
              </span>
              Identity Verification (NADRA)
            </h2>
            <div className="prose prose-slate text-slate-600">
              <p className="mb-4">
                <strong>In this Demo:</strong> We use simulated CNIC validation. You can enter any 13-digit number.
              </p>
              <p>
                <strong>Real World Integration:</strong> The system will integrate directly with the 
                <strong> National Database & Registration Authority (NADRA)</strong> API. This ensures that every device registered 
                in MAIVS is legally linked to a verified citizen's identity, preventing anonymous ownership of devices.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-800 p-2 rounded-lg mr-3">
                2
              </span>
              Communication (SMS Gateways)
            </h2>
            <div className="prose prose-slate text-slate-600">
              <p className="mb-4">
                <strong>In this Demo:</strong> OTPs are displayed on-screen or in the console.
              </p>
              <p>
                <strong>Real World Integration:</strong> We will utilize enterprise <strong>SMS Gateway Providers</strong> 
                (like Twilio or local telecom APIs) to deliver One-Time Passwords (OTPs) and critical alerts directly to 
                users' registered mobile numbers. This provides a second layer of security for all ownership transfers.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-800 p-2 rounded-lg mr-3">
                3
              </span>
              Device Verification (Manufacturers)
            </h2>
            <div className="prose prose-slate text-slate-600">
              <p className="mb-4">
                <strong>In this Demo:</strong> We use a local database of dummy devices.
              </p>
              <p>
                <strong>Real World Integration:</strong> Strategic partnerships with <strong>Device Manufacturers</strong> 
                (Samsung, Apple, etc.) and global GSMA databases will allow us to verify the authenticity of a device's 
                hardware signature, ensuring that IMEI numbers have not been tampered with.
              </p>
            </div>
          </section>

           <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-800 p-2 rounded-lg mr-3">
                4
              </span>
              Advanced Security (Biometrics)
            </h2>
            <div className="prose prose-slate text-slate-600">
              <p className="mb-4">
                <strong>In this Demo:</strong> Security is handled via passwords and OTPs.
              </p>
              <p>
                <strong>Real World Integration:</strong> Future versions will implement <strong>Biometric Authentication Services</strong> 
                (fingerprint and facial recognition) to authorize high-value transactions and ownership transfers, eliminating 
                the risk of password theft.
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
