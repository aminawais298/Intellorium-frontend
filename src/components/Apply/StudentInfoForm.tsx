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

export default function StudentInfoForm({ register, errors }: Props) {
  const e = errors.studentInfo || {};
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Field label="First Name *" error={e.firstName?.message}>
        <input {...register('studentInfo.firstName')} placeholder="Muhammad" className="input-dark" />
      </Field>
      <Field label="Last Name *" error={e.lastName?.message}>
        <input {...register('studentInfo.lastName')} placeholder="Ali" className="input-dark" />
      </Field>
      <Field label="Phone *" error={e.phone?.message}>
        <input {...register('studentInfo.phone')} placeholder="0300-1234567" className="input-dark" />
      </Field>
      <Field label="Date of Birth *" error={e.dateOfBirth?.message}>
        <input type="date" {...register('studentInfo.dateOfBirth')} className="input-dark" />
      </Field>
      <Field label="Gender *" error={e.gender?.message}>
        <select {...register('studentInfo.gender')} className="input-dark">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other / Prefer not to say</option>
        </select>
      </Field>
      <Field label="Nationality *" error={e.nationality?.message}>
        <input {...register('studentInfo.nationality')} placeholder="Pakistani" className="input-dark" />
      </Field>
      <Field label="Religion" error={undefined}>
        <input {...register('studentInfo.religion')} placeholder="Optional" className="input-dark" />
      </Field>
      <Field label="CNIC Number" error={undefined}>
        <input {...register('studentInfo.cnicNumber')} placeholder="XXXXX-XXXXXXX-X (optional)" className="input-dark" />
      </Field>
      <Field label="Postal Address *" error={e.postalAddress?.message}>
        <input {...register('studentInfo.postalAddress')} placeholder="House No. 1, Street Name" className="input-dark" />
      </Field>
      <Field label="Street / Area" error={undefined}>
        <input {...register('studentInfo.streetOrArea')} placeholder="Optional" className="input-dark" />
      </Field>
      <Field label="City *" error={e.city?.message}>
        <input {...register('studentInfo.city')} placeholder="Lahore" className="input-dark" />
      </Field>
      <Field label="Country *" error={e.country?.message}>
        <input {...register('studentInfo.country')} placeholder="Pakistan" className="input-dark" defaultValue="Pakistan" />
      </Field>
      <Field label="Current Occupation" error={undefined}>
        <input {...register('studentInfo.currentOccupation')} placeholder="Student / Employed / Freelancer" className="input-dark" />
      </Field>
      <Field label="Years of Experience" error={undefined}>
        <input type="number" min="0" max="30" {...register('studentInfo.experienceYears', { valueAsNumber: true })} placeholder="0" className="input-dark" />
      </Field>
    </div>
  );
}
