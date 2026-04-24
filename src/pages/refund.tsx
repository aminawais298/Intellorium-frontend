import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Refund() {
  return (
    <>
      <Head><title>Refund Policy — Intellorium Business School</title></Head>
      <Navbar />
      <div className="min-h-screen bg-hero-gradient pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title mb-4">Refund <span className="text-orange">Policy</span></h1>
          <div className="card-dark space-y-6 text-white/60 font-inter text-sm leading-relaxed">
            <div className="bg-orange/10 border border-orange/20 rounded-xl p-4 text-orange">
              <strong>5-Day Money-Back Guarantee</strong> — If you are funded and feel this program is not right for you, you may request a full refund within 5 days of payment.
            </div>
            <section>
              <h2 className="text-white font-semibold font-poppins text-base mb-2">Refund Eligibility</h2>
              <p>Refunds are available within 5 days of payment confirmation. After this period, fees are non-refundable. The decision to become an entrepreneur is the most real, strong, long-lasting, free decision you can make — so decide first, then apply.</p>
            </section>
            <section>
              <h2 className="text-white font-semibold font-poppins text-base mb-2">How to Request a Refund</h2>
              <p>Email refunds@intellorium.com with your application ID and reason. Refunds are processed within 5-7 business days to your original payment method.</p>
            </section>
            <section>
              <h2 className="text-white font-semibold font-poppins text-base mb-2">Service Fee Refunds</h2>
              <p>The 15% service fee on revenue generated is non-refundable as it represents payment for value already delivered through the program.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
