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

export default function AcademicInfoForm({ register, errors }: Props) {
  const e = errors.academicInfo || {};
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="md:col-span-2">
        <Field label="Previous Qualification *" error={e.previousQualification?.message}>
          <select {...register('academicInfo.previousQualification')} className="input-dark">
            <option value="">Select your highest qualification</option>
            <option value="Matric">Matric (Grade 10)</option>
            <option value="FSc">FSc / FA (Grade 12)</option>
            <option value="Bachelor">Bachelor&apos;s Degree (BS/BA/BCom)</option>
            <option value="Master">Master&apos;s Degree (MS/MBA)</option>
            <option value="PhD">PhD</option>
            <option value="Diploma">Diploma / Certificate</option>
            <option value="Other">Other</option>
          </select>
        </Field>
      </div>
      <Field label="Institution Name *" error={e.institution?.message}>
        <input {...register('academicInfo.institution')} placeholder="University / School name" className="input-dark" />
      </Field>
      <Field label="Field of Study" error={undefined}>
        <input {...register('academicInfo.field')} placeholder="Computer Science, Business, etc." className="input-dark" />
      </Field>
      <Field label="Graduation Year" error={e.graduationYear?.message}>
        <input type="number" min="1990" max="2030" {...register('academicInfo.graduationYear', { valueAsNumber: true })} placeholder="2024" className="input-dark" />
      </Field>
      <Field label="GPA / Percentage" error={e.gpa?.message}>
        <input type="number" step="0.1" min="0" max="4" {...register('academicInfo.gpa', { valueAsNumber: true })} placeholder="3.2 (or leave blank)" className="input-dark" />
      </Field>
    </div>
  );
}
