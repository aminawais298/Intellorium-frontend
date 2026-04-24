'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, TrendingUp } from 'lucide-react';
import { useDashboard } from '@/hooks/useDashboard';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import { formatCurrency, getInitials } from '@/utils/formatters';

export default function CohortNetwork() {
  const { data, isLoading } = useDashboard();
  const [search, setSearch] = useState('');

  if (isLoading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;
  if (!data) return null;

  const { cohortNetwork, cohortStats } = data;

  const filtered = cohortNetwork.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.businessName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="metric-card">
          <div className="text-orange"><Users size={18} /></div>
          <div className="metric-value">{cohortStats.totalStudents}</div>
          <div className="metric-label">Cohort Members</div>
        </div>
        <div className="metric-card">
          <div className="text-orange"><TrendingUp size={18} /></div>
          <div className="metric-value">{formatCurrency(cohortStats.averageRevenue)}</div>
          <div className="metric-label">Avg Revenue</div>
        </div>
        <div className="metric-card">
          <div className="text-orange text-lg font-bold font-poppins">#{cohortStats.yourRank}</div>
          <div className="metric-value">&nbsp;</div>
          <div className="metric-label">Your Rank</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or business..."
          className="input-dark pl-9"
          style={{ userSelect: 'text' }}
        />
      </div>

      {/* Network grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="card-dark hover:border-orange/40 cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-button-gradient rounded-xl flex items-center justify-center text-white font-bold font-poppins text-sm shadow-orange-sm">
                {getInitials(member.name.split(' ')[0], member.name.split(' ')[1] || '')}
              </div>
              <div>
                <p className="text-white font-semibold font-poppins text-sm group-hover:text-orange transition-colors">{member.name}</p>
                <p className="text-white/30 text-xs font-inter">{member.businessName}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-orange text-sm font-bold font-poppins">{formatCurrency(member.revenue)}</p>
                <p className="text-white/20 text-[10px] font-inter">revenue</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-white/30">
          <Users size={40} className="mx-auto text-orange/20 mb-3" />
          <p className="font-montserrat">No cohort members match your search.</p>
        </div>
      )}
    </div>
  );
}
