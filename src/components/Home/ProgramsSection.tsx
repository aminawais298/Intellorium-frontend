'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { usePrograms } from '@/hooks/useApi';
import ProgramCard from '@/components/Programs/ProgramCard';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import Link from 'next/link';

export default function ProgramsSection() {
  const { data: programs, isLoading } = usePrograms();

  return (
    <section className="py-24 bg-primary" id="programs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-orange/10 border border-orange/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-orange text-xs font-montserrat font-medium uppercase tracking-wider">Programs</span>
          </div>
          <h2 className="section-title mb-4">
            Our Flagship
            <span className="text-orange"> Program</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            12 months. 60 students. One mission: build a profitable, scalable business.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-16"><LoadingSpinner size="lg" text="Loading programs..." /></div>
        ) : programs && programs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {programs.slice(0, 2).map((program, i) => (
              <motion.div key={program.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <ProgramCard program={program} featured={i === 0} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-white/40">
            <p className="font-montserrat">No programs available yet. Check back soon.</p>
          </div>
        )}

        {programs && programs.length > 2 && (
          <div className="text-center mt-8">
            <Link href="/programs" className="btn-outline">View All Programs</Link>
          </div>
        )}
      </div>
    </section>
  );
}
