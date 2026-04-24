'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Users, DollarSign, Clock, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Program } from '@/types';
import { formatCurrency, formatDateShort } from '@/utils/formatters';

interface ProgramCardProps {
  program: Program;
  featured?: boolean;
}

export default function ProgramCard({ program, featured = false }: ProgramCardProps) {
  const [showCurriculum, setShowCurriculum] = useState(false);
  const spotsLeft = program.maxStudents - program.currentStudents;
  const spotsPercentage = (program.currentStudents / program.maxStudents) * 100;

  const statusColors: Record<string, string> = {
    ACTIVE: 'text-green-400 bg-green-400/10 border-green-400/20',
    UPCOMING: 'text-orange bg-orange/10 border-orange/20',
    COMPLETED: 'text-white/40 bg-white/5 border-white/10',
  };

  return (
    <div className={`card-dark relative overflow-hidden ${featured ? 'border-orange/40 shadow-orange-sm' : ''}`}>
      {featured && (
        <div className="absolute top-0 right-0 bg-button-gradient text-white text-xs font-montserrat font-semibold px-3 py-1 rounded-bl-lg">
          Featured
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold font-poppins text-white mb-1">{program.name}</h3>
          <span className={`text-xs font-montserrat font-medium px-2 py-0.5 rounded-full border ${statusColors[program.status]}`}>
            {program.status}
          </span>
        </div>
      </div>

      <p className="text-white/50 text-sm font-inter leading-relaxed mb-5">{program.description}</p>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { icon: <DollarSign size={14} />, label: 'Fee', value: formatCurrency(program.fee) },
          { icon: <Clock size={14} />, label: 'Duration', value: `${program.duration} Months` },
          { icon: <Calendar size={14} />, label: 'Starts', value: formatDateShort(program.startDate) },
          { icon: <Users size={14} />, label: 'Service Fee', value: `${program.serviceFeesPercentage}% of revenue` },
        ].map((item, i) => (
          <div key={i} className="bg-white/3 rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-orange/70 mb-1">
              {item.icon}
              <span className="text-[10px] font-montserrat uppercase tracking-wider text-white/30">{item.label}</span>
            </div>
            <p className="text-white text-sm font-semibold font-poppins">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Spots available */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-white/40 font-montserrat">Spots Filled</span>
          <span className="text-xs text-orange font-montserrat font-medium">{program.currentStudents}/{program.maxStudents}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${spotsPercentage}%` }} />
        </div>
        <p className="text-xs text-peach/40 mt-1">{spotsLeft > 0 ? `${spotsLeft} spots remaining` : 'Program is full'}</p>
      </div>

      {/* Curriculum toggle */}
      {program.curriculum && (
        <div className="mb-5">
          <button
            onClick={() => setShowCurriculum(!showCurriculum)}
            className="flex items-center gap-2 text-sm text-orange/70 hover:text-orange transition-colors font-montserrat w-full"
          >
            {showCurriculum ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {showCurriculum ? 'Hide' : 'View'} Curriculum (12 Months)
          </button>
          {showCurriculum && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 grid grid-cols-2 gap-2"
            >
              {Object.entries(program.curriculum).map(([key, value]) => (
                <div key={key} className="bg-white/3 rounded-lg p-2.5">
                  <p className="text-orange text-xs font-montserrat font-medium">{(value as { title: string }).title}</p>
                  <p className="text-white/30 text-[10px] font-inter mt-0.5">{key.replace('month', 'Month ')}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      )}

      {/* CTA */}
      <div className="flex gap-3">
        <Link href={`/apply?program=${program.id}`} className="btn-primary flex-1 text-center flex items-center justify-center gap-2 text-sm">
          Apply Now <ArrowRight size={14} />
        </Link>
        <Link href={`/programs#${program.id}`} className="btn-outline text-sm px-4">Learn More</Link>
      </div>
    </div>
  );
}
