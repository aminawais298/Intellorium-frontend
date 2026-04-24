'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Users, TrendingUp, Award } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-dark/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange/3 rounded-full blur-[100px]" />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#FF6B1A 1px, transparent 1px), linear-gradient(90deg, #FF6B1A 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-orange/10 border border-orange/30 rounded-full px-4 py-1.5 mb-6"
          >
            <div className="w-2 h-2 bg-orange rounded-full animate-pulse" />
            <span className="text-orange text-sm font-montserrat font-medium">Cohort 1 Applications Open — Limited to 60 Spots</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black font-poppins text-white leading-tight mb-6"
          >
            Build Your Business
            <br />
            <span className="text-transparent bg-clip-text bg-button-gradient">in 12 Months.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-peach/70 font-montserrat max-w-2xl mx-auto mb-4"
          >
            Practical MBA Certification. Real Mentors. Real Business.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base text-white/40 font-inter max-w-xl mx-auto mb-10"
          >
            We exist for one reason — to build the next generation of Pakistani entrepreneurs from the ground up. We don&apos;t teach theory. We put students inside real businesses with real problems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link href="/apply" className="btn-primary flex items-center gap-2 text-base px-8 py-4 shadow-orange-md hover:shadow-orange-lg">
              Apply Now <ArrowRight size={18} />
            </Link>
            <Link href="/programs" className="flex items-center gap-2 text-white/60 hover:text-orange transition-colors font-montserrat font-medium">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-orange transition-colors">
                <Play size={14} className="text-orange ml-0.5" />
              </div>
              View Program
            </Link>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {[
              { icon: <Users size={20} />, value: '60', label: 'Students per Cohort' },
              { icon: <TrendingUp size={20} />, value: '12', label: 'Months Program' },
              { icon: <Award size={20} />, value: 'PKR 125K', label: 'Total Investment' },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-4 flex flex-col items-center gap-2">
                <div className="text-orange">{stat.icon}</div>
                <div className="text-2xl font-black font-poppins text-white">{stat.value}</div>
                <div className="text-peach/40 text-xs font-montserrat text-center">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/20 text-xs font-montserrat">Scroll to explore</span>
        <div className="w-5 h-8 border border-white/10 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-orange rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
