'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { usePrograms } from '@/hooks/useApi';
import ProgramCard from './ProgramCard';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import { ProgramStatus } from '@/types';

export default function ProgramsPage() {
  const { data: programs, isLoading } = usePrograms();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProgramStatus | 'ALL'>('ALL');

  const filtered = programs?.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  return (
    <div className="min-h-screen bg-hero-gradient pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="section-title mb-3">Our <span className="text-orange">Programs</span></h1>
          <p className="section-subtitle">Choose your cohort and start building your business.</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search programs..."
              className="input-dark pl-9"
            />
          </div>
          <div className="flex gap-2">
            {(['ALL', 'ACTIVE', 'UPCOMING', 'COMPLETED'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 rounded-lg text-sm font-montserrat font-medium transition-all ${statusFilter === s ? 'bg-orange text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
              >
                {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><LoadingSpinner size="lg" text="Loading programs..." /></div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map((program, i) => (
              <motion.div key={program.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} id={program.id}>
                <ProgramCard program={program} featured={i === 0} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-white/30">
            <Filter size={40} className="mx-auto mb-4 text-orange/20" />
            <p className="font-montserrat">No programs match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
