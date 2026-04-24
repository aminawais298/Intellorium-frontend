'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Save, User, Shield, BookOpen, CreditCard } from 'lucide-react';
import { useStudent, useUpdateStudent } from '@/hooks/useStudent';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import { useToast } from '@/components/Common/Toast';
import { getInitials, formatCurrency, formatDate, getStatusColor } from '@/utils/formatters';
import { Student } from '@/types';

export default function StudentProfile() {
  const { data: student, isLoading } = useStudent();
  const updateStudent = useUpdateStudent();
  const { add: addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'personal' | 'guardian' | 'academic' | 'payments'>('personal');

  const { register, handleSubmit, formState: { isDirty } } = useForm<Partial<Student>>({
    values: student ? {
      firstName: student.firstName,
      lastName: student.lastName,
      phone: student.phone,
      postalAddress: student.postalAddress,
      city: student.city,
      country: student.country,
      businessName: student.businessName,
      businessIdea: student.businessIdea,
      currentOccupation: student.currentOccupation,
    } : {},
  });

  const onSave = handleSubmit(async (data) => {
    try {
      await updateStudent.mutateAsync(data);
      addToast('Profile updated successfully!', 'success');
    } catch {
      addToast('Failed to update profile', 'error');
    }
  });

  if (isLoading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;
  if (!student) return null;

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <User size={16} /> },
    { id: 'guardian', label: 'Guardian', icon: <Shield size={16} /> },
    { id: 'academic', label: 'Academic', icon: <BookOpen size={16} /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard size={16} /> },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Profile header */}
      <div className="card-dark flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="w-16 h-16 bg-button-gradient rounded-2xl flex items-center justify-center text-2xl font-black font-poppins text-white shadow-orange-sm">
          {getInitials(student.firstName, student.lastName)}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold font-poppins text-white">{student.firstName} {student.lastName}</h2>
          <p className="text-white/40 text-sm font-inter">{student.user?.email}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`text-xs px-2 py-0.5 rounded-full border font-montserrat ${getStatusColor(student.applicationStatus)}`}>{student.applicationStatus}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full border font-montserrat ${getStatusColor(student.paymentStatus)}`}>{student.paymentStatus}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/30 font-montserrat">Business</p>
          <p className="text-orange font-semibold font-poppins">{student.businessName || 'Not set'}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/3 rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 flex-1 justify-center py-2 px-3 rounded-lg text-xs font-montserrat font-medium transition-all ${activeTab === tab.id ? 'bg-orange text-white shadow-orange-sm' : 'text-white/40 hover:text-white'}`}
          >
            {tab.icon} <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'personal' && (
        <form onSubmit={onSave} className="card-dark">
          <h3 className="text-base font-semibold font-poppins text-white mb-5">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'First Name', key: 'firstName' as const },
              { label: 'Last Name', key: 'lastName' as const },
              { label: 'Phone', key: 'phone' as const },
              { label: 'City', key: 'city' as const },
              { label: 'Country', key: 'country' as const },
              { label: 'Current Occupation', key: 'currentOccupation' as const },
            ].map((field) => (
              <div key={field.key}>
                <label className="label-dark">{field.label}</label>
                <input {...register(field.key)} className="input-dark" style={{ userSelect: 'text' }} />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="label-dark">Address</label>
              <input {...register('postalAddress')} className="input-dark" style={{ userSelect: 'text' }} />
            </div>
            <div>
              <label className="label-dark">Business Name</label>
              <input {...register('businessName')} className="input-dark" style={{ userSelect: 'text' }} />
            </div>
            <div className="md:col-span-2">
              <label className="label-dark">Business Idea</label>
              <textarea {...register('businessIdea')} rows={4} className="input-dark resize-none" style={{ userSelect: 'text' }} />
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <button type="submit" disabled={!isDirty || updateStudent.isPending} className="btn-primary flex items-center gap-2 text-sm disabled:opacity-50">
              {updateStudent.isPending ? <LoadingSpinner size="sm" /> : <Save size={16} />}
              Save Changes
            </button>
          </div>
        </form>
      )}

      {activeTab === 'guardian' && student.guardian && (
        <div className="card-dark">
          <h3 className="text-base font-semibold font-poppins text-white mb-5">Guardian Information</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Name', value: `${student.guardian.firstName} ${student.guardian.lastName}` },
              { label: 'Relationship', value: student.guardian.relationship },
              { label: 'Phone', value: student.guardian.phone },
              { label: 'Email', value: student.guardian.email || 'Not provided' },
              { label: 'Address', value: student.guardian.address || 'Not provided' },
            ].map((item) => (
              <div key={item.label}>
                <label className="label-dark">{item.label}</label>
                <p className="text-white bg-white/3 rounded-lg px-4 py-3 text-sm font-inter">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'academic' && student.academicInfo && (
        <div className="card-dark">
          <h3 className="text-base font-semibold font-poppins text-white mb-5">Academic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Qualification', value: student.academicInfo.previousQualification },
              { label: 'Institution', value: student.academicInfo.institution },
              { label: 'Field', value: student.academicInfo.field || 'Not specified' },
              { label: 'Graduation Year', value: student.academicInfo.graduationYear?.toString() || 'N/A' },
              { label: 'GPA', value: student.academicInfo.gpa?.toString() || 'N/A' },
            ].map((item) => (
              <div key={item.label}>
                <label className="label-dark">{item.label}</label>
                <p className="text-white bg-white/3 rounded-lg px-4 py-3 text-sm font-inter">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="card-dark">
          <h3 className="text-base font-semibold font-poppins text-white mb-5">Payment History</h3>
          {student.payments && student.payments.length > 0 ? (
            <table className="table-dark">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Method</th>
                </tr>
              </thead>
              <tbody>
                {student.payments.map((p) => (
                  <tr key={p.id}>
                    <td className="text-orange font-semibold">{formatCurrency(p.amount)}</td>
                    <td>{p.paymentType}</td>
                    <td><span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(p.status)}`}>{p.status}</span></td>
                    <td className="text-white/40">{formatDate(p.paymentDate || p.createdAt)}</td>
                    <td>{p.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-white/30 text-sm font-inter text-center py-8">No payment records found.</p>
          )}
        </div>
      )}
    </div>
  );
}
