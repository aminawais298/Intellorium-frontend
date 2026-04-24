'use client';
import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ApplicationFormData } from '@/types';

interface Props {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
}

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <label className="label-dark">{label}</label>
    {children}
    {error && <p className="text-red-400 text-xs mt-1 font-inter">{error}</p>}
  </div>
);

export default function GuardianInfoForm({ register, errors }: Props) {
  const e = errors.guardianInfo || {};
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Field label="Guardian First Name *" error={e.firstName?.message}>
        <input {...register('guardianInfo.firstName')} placeholder="Ahmed" className="input-dark" />
      </Field>
      <Field label="Guardian Last Name *" error={e.lastName?.message}>
        <input {...register('guardianInfo.lastName')} placeholder="Khan" className="input-dark" />
      </Field>
      <Field label="Relationship *" error={e.relationship?.message}>
        <select {...register('guardianInfo.relationship')} className="input-dark">
          <option value="">Select Relationship</option>
          <option value="Father">Father</option>
          <option value="Mother">Mother</option>
          <option value="Brother">Brother</option>
          <option value="Sister">Sister</option>
          <option value="Spouse">Spouse</option>
          <option value="Uncle">Uncle</option>
          <option value="Aunt">Aunt</option>
          <option value="Other">Other</option>
        </select>
      </Field>
      <Field label="Guardian Phone *" error={e.phone?.message}>
        <input {...register('guardianInfo.phone')} placeholder="0300-1234567" className="input-dark" />
      </Field>
      <Field label="Guardian Email" error={e.email?.message}>
        <input type="email" {...register('guardianInfo.email')} placeholder="guardian@example.com (optional)" className="input-dark" />
      </Field>
      <Field label="Guardian Address" error={undefined}>
        <input {...register('guardianInfo.address')} placeholder="Home address (optional)" className="input-dark" />
      </Field>
    </div>
  );
}
