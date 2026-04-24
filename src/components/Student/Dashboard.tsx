'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Users, Target, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useDashboard } from '@/hooks/useDashboard';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import { formatCurrency } from '@/utils/formatters';
import Link from 'next/link';

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card-gradient border border-orange/20 rounded-lg p-3 shadow-lg">
        <p className="text-white/60 text-xs mb-1 font-montserrat">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-sm font-poppins" style={{ color: p.name === 'revenue' ? '#FF6B1A' : '#FFD4A8' }}>
            {p.name === 'revenue' ? formatCurrency(p.value) : `${p.value} customers`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function StudentDashboard() {
  const { data, isLoading } = useDashboard();

  if (isLoading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" text="Loading your dashboard..." /></div>;
  if (!data) return <div className="text-center py-20 text-white/40"><p>No dashboard data available.</p></div>;

  const { overview, businessMetrics, cohortStats, cohortNetwork, businessLogChart } = data;

  const metricCards = [
    { label: 'Total Revenue', value: formatCurrency(businessMetrics.totalRevenue), icon: <DollarSign size={20} />, trend: businessMetrics.monthlyGrowth, sub: 'All time' },
    { label: 'Total Customers', value: businessMetrics.totalCustomers.toString(), icon: <Users size={20} />, trend: 8, sub: 'Served' },
    { label: 'Monthly Growth', value: `${businessMetrics.monthlyGrowth > 0 ? '+' : ''}${businessMetrics.monthlyGrowth}%`, icon: <TrendingUp size={20} />, trend: businessMetrics.monthlyGrowth, sub: 'vs last month' },
    { label: 'Target Achievement', value: `${businessMetrics.targetAchievement}%`, icon: <Target size={20} />, trend: businessMetrics.targetAchievement - 60, sub: `Goal: ${formatCurrency(businessMetrics.targetRevenue)}` },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card-dark border-orange/30 bg-gradient-to-br from-orange/5 to-transparent">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-poppins text-white">Welcome back, <span className="text-orange">{overview.studentName.split(' ')[0]}</span>! 👋</h2>
            <p className="text-white/50 font-inter text-sm mt-1">{overview.enrolledProgram}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-white/30 font-montserrat">Program Progress</p>
              <p className="text-2xl font-black font-poppins text-orange">{overview.progressPercentage}%</p>
              <p className="text-xs text-white/40 font-inter">Month {overview.monthsCompleted} of 12</p>
            </div>
            <div className="w-16 h-16 relative">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="none" stroke="#1C0D00" strokeWidth="4" />
                <circle cx="32" cy="32" r="28" fill="none" stroke="#FF6B1A" strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - overview.progressPercentage / 100)}`}
                  strokeLinecap="round" className="transition-all duration-1000" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${overview.progressPercentage}%` }} />
          </div>
        </div>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="metric-card">
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 bg-orange/10 rounded-lg flex items-center justify-center text-orange">{card.icon}</div>
              <div className={`flex items-center gap-0.5 text-xs font-montserrat ${card.trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {card.trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {Math.abs(card.trend)}%
              </div>
            </div>
            <div className="metric-value mt-2">{card.value}</div>
            <div className="metric-label">{card.label}</div>
            <div className="text-[10px] text-white/20 font-inter">{card.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      {businessLogChart.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card-dark">
          <h3 className="text-lg font-semibold font-poppins text-white mb-6">Business Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={businessLogChart} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="month" tick={{ fill: '#ffffff30', fontSize: 11, fontFamily: 'Montserrat' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#ffffff30', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#ffffff50' }} />
              <Line type="monotone" dataKey="revenue" stroke="#FF6B1A" strokeWidth={2.5} dot={{ fill: '#FF6B1A', r: 4 }} activeDot={{ r: 6 }} name="revenue" />
              <Line type="monotone" dataKey="customers" stroke="#FFD4A8" strokeWidth={2} dot={{ fill: '#FFD4A8', r: 3 }} name="customers" yAxisId={0} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Cohort Stats + Network */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card-dark">
          <h3 className="text-base font-semibold font-poppins text-white mb-4">Cohort Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-white/40 text-sm font-inter">Total Students</span>
              <span className="text-white font-semibold font-poppins">{cohortStats.totalStudents}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-white/40 text-sm font-inter">Avg Revenue</span>
              <span className="text-white font-semibold font-poppins">{formatCurrency(cohortStats.averageRevenue)}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-white/40 text-sm font-inter">Your Rank</span>
              <span className="text-orange font-bold font-poppins text-xl">#{cohortStats.yourRank}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 card-dark">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold font-poppins text-white">Cohort Network</h3>
            <Link href="#cohort" className="text-orange text-xs font-montserrat hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {cohortNetwork.slice(0, 6).map((member, i) => (
              <div key={member.id} className="bg-white/3 rounded-lg p-3 hover:bg-orange/5 transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-orange/20 rounded-full flex items-center justify-center mb-2 text-orange text-xs font-bold font-poppins">
                  {member.name.charAt(0)}
                </div>
                <p className="text-white text-xs font-semibold font-poppins truncate">{member.name}</p>
                <p className="text-white/30 text-[10px] font-inter truncate">{member.businessName}</p>
                <p className="text-orange text-[10px] font-montserrat mt-1">{formatCurrency(member.revenue)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
