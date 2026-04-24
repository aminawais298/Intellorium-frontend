'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Plus, TrendingUp, Users, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { useBusinessLogs, useCreateBusinessLog } from '@/hooks/useStudent';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import Modal from '@/components/Common/Modal';
import { useToast } from '@/components/Common/Toast';
import { formatCurrency, formatDateShort } from '@/utils/formatters';
import { BusinessLog } from '@/types';

export default function BusinessTracker() {
  const { data: logs, isLoading } = useBusinessLogs();
  const createLog = useCreateBusinessLog();
  const { add: addToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<BusinessLog, 'id' | 'createdAt'>>({
    defaultValues: { month: (logs?.length || 0) + 1, revenue: 0, customers: 0 },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createLog.mutateAsync(data);
      addToast('Business log added!', 'success');
      setShowModal(false);
      reset();
    } catch {
      addToast('Failed to add log', 'error');
    }
  });

  if (isLoading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;

  const totalRevenue = logs?.reduce((s, l) => s + l.revenue, 0) || 0;
  const totalCustomers = logs?.reduce((s, l) => s + l.customers, 0) || 0;
  const latestLog = logs?.[logs.length - 1];

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: <DollarSign size={18} /> },
          { label: 'Total Customers', value: totalCustomers.toString(), icon: <Users size={18} /> },
          { label: 'Months Logged', value: `${logs?.length || 0}/12`, icon: <TrendingUp size={18} /> },
        ].map((s, i) => (
          <div key={i} className="metric-card">
            <div className="text-orange mb-2">{s.icon}</div>
            <div className="metric-value">{s.value}</div>
            <div className="metric-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Add log button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold font-poppins text-white">Monthly Business Logs</h3>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> Add Log
        </button>
      </div>

      {/* Logs list */}
      {logs && logs.length > 0 ? (
        <div className="space-y-3">
          {[...logs].reverse().map((log) => (
            <motion.div key={log.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-dark">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange/10 rounded-lg flex items-center justify-center text-orange font-bold font-poppins text-sm">
                    M{log.month}
                  </div>
                  <div>
                    <p className="text-white font-semibold font-poppins text-sm">Month {log.month}</p>
                    <p className="text-white/30 text-xs font-inter">{formatDateShort(log.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-orange font-bold font-poppins">{formatCurrency(log.revenue)}</p>
                    <p className="text-white/30 text-xs font-inter">{log.customers} customers</p>
                  </div>
                  {expandedLog === log.id ? <ChevronUp size={16} className="text-white/30" /> : <ChevronDown size={16} className="text-white/30" />}
                </div>
              </div>

              {expandedLog === log.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4 border-t border-orange/10 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {log.milestones && <div><p className="text-xs text-orange/70 font-montserrat uppercase mb-1">Milestones</p><p className="text-white/60 text-sm font-inter">{log.milestones}</p></div>}
                  {log.challenges && <div><p className="text-xs text-red-400/70 font-montserrat uppercase mb-1">Challenges</p><p className="text-white/60 text-sm font-inter">{log.challenges}</p></div>}
                  {log.nextSteps && <div><p className="text-xs text-green-400/70 font-montserrat uppercase mb-1">Next Steps</p><p className="text-white/60 text-sm font-inter">{log.nextSteps}</p></div>}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="card-dark text-center py-12">
          <TrendingUp size={40} className="mx-auto text-orange/20 mb-3" />
          <p className="text-white/40 font-montserrat">No business logs yet. Add your first monthly update!</p>
        </div>
      )}

      {/* Add Log Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Monthly Business Log">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="label-dark">Month *</label>
              <select {...register('month', { required: true, valueAsNumber: true })} className="input-dark">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>Month {m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-dark">Revenue (PKR) *</label>
              <input type="number" {...register('revenue', { required: true, valueAsNumber: true })} placeholder="0" className="input-dark" style={{ userSelect: 'text' }} />
            </div>
            <div>
              <label className="label-dark">Customers *</label>
              <input type="number" {...register('customers', { required: true, valueAsNumber: true })} placeholder="0" className="input-dark" style={{ userSelect: 'text' }} />
            </div>
          </div>
          <div>
            <label className="label-dark">Key Milestones</label>
            <textarea {...register('milestones')} rows={2} placeholder="What did you achieve this month?" className="input-dark resize-none" style={{ userSelect: 'text' }} />
          </div>
          <div>
            <label className="label-dark">Challenges Faced</label>
            <textarea {...register('challenges')} rows={2} placeholder="What was hard? What slowed you down?" className="input-dark resize-none" style={{ userSelect: 'text' }} />
          </div>
          <div>
            <label className="label-dark">Next Steps</label>
            <textarea {...register('nextSteps')} rows={2} placeholder="What's your focus for next month?" className="input-dark resize-none" style={{ userSelect: 'text' }} />
          </div>
          <button type="submit" disabled={createLog.isPending} className="btn-primary w-full text-sm">
            {createLog.isPending ? <LoadingSpinner size="sm" /> : 'Add Log'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
