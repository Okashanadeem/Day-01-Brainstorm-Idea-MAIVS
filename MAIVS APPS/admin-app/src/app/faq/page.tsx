import React from 'react';
import Link from 'next/link';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            MAIVS Admin & Police FAQ
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Backend integrations for law enforcement and system administration.
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
              Police Systems (FIR Integration)
            </h2>
            <div className="prose prose-slate text-slate-600">
              <p className="mb-4">
                <strong>In this Demo:</strong> FIRs are generated locally within the MAIVS database.
              </p>
              <p>
                <strong>Real World Integration:</strong> This dashboard will connect directly to <strong>Official Police FIR Systems</strong>. 
                When a theft is reported in MAIVS, it will cross-reference or automatically file a preliminary report with law enforcement, 
                ensuring that the theft status is legally recognized.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-800 p-2 rounded-lg mr-3">
                2
              </span>
              National Intelligence (Crime Databases)
            </h2>
            <div className="prose prose-slate text-slate-600">
              <p className="mb-4">
                <strong>In this Demo:</strong> Data is isolated to this application.
              </p>
              <p>
                <strong>Real World Integration:</strong> We will link with <strong>National Crime Databases</strong> to share actionable intelligence. 
                If a device reported stolen in one province appears in another, the system will trigger cross-jurisdictional alerts, 
                aiding in tracking organized criminal networks.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-800 p-2 rounded-lg mr-3">
                3
              </span>
              Cloud Infrastructure
            </h2>
            <div className="prose prose-slate text-slate-600">
              <p className="mb-4">
                <strong>In this Demo:</strong> Hosted on a local/demo environment.
              </p>
              <p>
                <strong>Real World Integration:</strong> For a production rollout, the system will be hosted on professional 
                <strong> Cloud Infrastructure Services</strong> (AWS, Azure, or GCP) to ensure government-grade data security, 
                uptime, and scalability to handle millions of devices.
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
