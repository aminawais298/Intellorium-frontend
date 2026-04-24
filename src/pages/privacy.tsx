import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Privacy() {
  return (
    <>
      <Head><title>Privacy Policy — Intellorium Business School</title></Head>
      <Navbar />
      <div className="min-h-screen bg-hero-gradient pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title mb-4">Privacy <span className="text-orange">Policy</span></h1>
          <div className="card-dark space-y-6 text-white/60 font-inter text-sm leading-relaxed">
            <section>
              <h2 className="text-white font-semibold font-poppins text-base mb-2">Data We Collect</h2>
              <p>We collect personal information including name, email, phone, address, educational background, and business information as part of the application and enrollment process. We also collect business performance data (revenue, customers) through our tracking platform.</p>
            </section>
            <section>
              <h2 className="text-white font-semibold font-poppins text-base mb-2">How We Use Your Data</h2>
              <p>Your data is used to process applications, deliver program content, track business progress, facilitate cohort networking, and improve our services. We do not sell your personal data to third parties.</p>
            </section>
            <section>
              <h2 className="text-white font-semibold font-poppins text-base mb-2">Data Security</h2>
              <p>We implement industry-standard security measures including password hashing (bcrypt), JWT authentication, HTTPS encryption, and regular security audits to protect your information.</p>
            </section>
            <section>
              <h2 className="text-white font-semibold font-poppins text-base mb-2">Your Rights</h2>
              <p>You have the right to access, update, or delete your personal data at any time through your dashboard or by contacting us at privacy@intellorium.com. Data deletion requests will be processed within 30 days.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
