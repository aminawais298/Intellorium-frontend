'use client';
import React from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { ApplicationFormData, PaymentMethodType } from '@/types';
import { Lightbulb } from 'lucide-react';

interface Props {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  watch: UseFormWatch<ApplicationFormData>;
}

const paymentMethods: { value: PaymentMethodType; label: string; desc: string }[] = [
  { value: 'BANK_TRANSFER', label: 'Bank Transfer', desc: 'HBL / Meezan / Any bank' },
  { value: 'JAZZ_CASH', label: 'JazzCash', desc: 'Mobile wallet payment' },
  { value: 'EASY_PAISA', label: 'EasyPaisa', desc: 'Mobile wallet payment' },
  { value: 'CARD', label: 'Debit/Credit Card', desc: 'Visa / Mastercard (coming soon)' },
];

export default function BusinessIdeaForm({ register, errors, watch }: Props) {
  const ideaText = watch('businessIdea') || '';
  const selectedPayment = watch('paymentMethod');

  return (
    <div className="space-y-6">
      <div>
        <label className="label-dark">Business Name *</label>
        <input {...register('businessName')} placeholder="e.g. TechBridge PK, GreenCart Organics..." className="input-dark" />
        {errors.businessName && <p className="text-red-400 text-xs mt-1">{errors.businessName.message}</p>}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="label-dark">Your Business Idea *</label>
          <span className={`text-xs font-inter ${ideaText.length < 100 ? 'text-red-400' : 'text-green-400'}`}>{ideaText.length} chars (min 100)</span>
        </div>
        <div className="relative">
          <textarea
            {...register('businessIdea')}
            rows={6}
            placeholder="Describe your business idea in detail. What problem does it solve? Who is your target customer? How will you make money? What makes it unique in Pakistan?"
            className="input-dark resize-none leading-relaxed"
            style={{ userSelect: 'text' }}
          />
        </div>
        {errors.businessIdea && <p className="text-red-400 text-xs mt-1">{errors.businessIdea.message}</p>}
        <div className="flex items-start gap-2 mt-2 p-3 bg-orange/5 border border-orange/10 rounded-lg">
          <Lightbulb size={14} className="text-orange mt-0.5 shrink-0" />
          <p className="text-peach/50 text-xs font-inter">Tip: The best ideas solve real problems you&apos;ve personally experienced. Be specific about your customer, your solution, and how you&apos;ll generate revenue in Year 1.</p>
        </div>
      </div>

      {/* Payment method */}
      <div>
        <label className="label-dark">Payment Method *</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
          {paymentMethods.map((method) => (
            <label
              key={method.value}
              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${selectedPayment === method.value ? 'border-orange bg-orange/10' : 'border-white/10 bg-white/3 hover:border-orange/40'}`}
            >
              <input type="radio" {...register('paymentMethod')} value={method.value} className="sr-only" />
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedPayment === method.value ? 'border-orange' : 'border-white/20'}`}>
                {selectedPayment === method.value && <div className="w-2 h-2 rounded-full bg-orange" />}
              </div>
              <div>
                <p className="text-white text-sm font-semibold font-poppins">{method.label}</p>
                <p className="text-white/40 text-xs font-inter">{method.desc}</p>
              </div>
            </label>
          ))}
        </div>
        {errors.paymentMethod && <p className="text-red-400 text-xs mt-1">{errors.paymentMethod.message}</p>}
      </div>

      {/* Fee summary */}
      <div className="bg-card-gradient border border-orange/20 rounded-xl p-5">
        <h4 className="font-semibold font-poppins text-white mb-3 flex items-center gap-2">
          Fee Summary
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/50 font-inter">Program Fee</span>
            <span className="text-white font-semibold">PKR 125,000</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50 font-inter">Service Fee (on revenue)</span>
            <span className="text-orange font-semibold">15% of what you earn</span>
          </div>
          <div className="border-t border-white/10 pt-2 flex justify-between">
            <span className="text-white font-semibold font-poppins">Total Upfront</span>
            <span className="text-orange text-lg font-bold font-poppins">PKR 125,000</span>
          </div>
        </div>
        <p className="text-white/30 text-xs font-inter mt-3">* Service fee applies only when you generate revenue. We win when you win.</p>
      </div>
    </div>
  );
}
