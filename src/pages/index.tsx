import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/Home/HeroSection';
import FeaturesSection from '@/components/Home/FeaturesSection';
import ProgramsSection from '@/components/Home/ProgramsSection';
import TestimonialsSection from '@/components/Home/TestimonialsSection';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Intellorium Business School — Build Your Business in 12 Months</title>
        <meta name="description" content="First Business School to Provide Practical Experience. 12-month Practical MBA program. Build a real business with 60 peers and expert mentors." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <HeroSection />
        <ProgramsSection />
        <FeaturesSection />
        <TestimonialsSection />

        {/* CTA Section */}
        <section className="py-24 bg-primary" id="about">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="card-dark border-orange/40 bg-gradient-to-br from-orange/8 to-transparent p-12">
              <div className="inline-flex items-center gap-2 bg-orange/10 border border-orange/20 rounded-full px-4 py-1.5 mb-6">
                <div className="w-2 h-2 bg-orange rounded-full animate-pulse" />
                <span className="text-orange text-xs font-montserrat font-medium uppercase tracking-wider">Limited Spots Available</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-poppins text-white mb-4">
                Ready to Change
                <span className="text-orange"> Your Life?</span>
              </h2>
              <p className="text-white/50 font-inter text-lg mb-8 max-w-2xl mx-auto">
                Join 60 of Pakistan&apos;s most ambitious young entrepreneurs. Build something real. Learn from the best. Launch with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/apply" className="btn-primary flex items-center justify-center gap-2 text-base px-10 py-4 shadow-orange-lg">
                  Apply Now <ArrowRight size={18} />
                </Link>
                <Link href="/programs" className="btn-outline text-base px-10 py-4">View Programs</Link>
              </div>
              <p className="text-white/20 text-xs font-inter mt-6">Cohort 1 starts May 2026 · PKR 125,000 · 12 Months</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
