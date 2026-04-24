'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { ApplicationFormData } from '@/types';
import { useSubmitApplication, usePrograms } from '@/hooks/useApi';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/Common/Toast';
import StudentInfoForm from './StudentInfoForm';
import GuardianInfoForm from './GuardianInfoForm';
import AcademicInfoForm from './AcademicInfoForm';
import BusinessIdeaForm from './BusinessIdeaForm';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import Modal from '@/components/Common/Modal';

const STEPS = ['Student Info', 'Guardian Info', 'Academic Info', 'Business Idea & Payment'];
const STORAGE_KEY = 'intellorium-application-draft';

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [successModal, setSuccessModal] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { add: addToast } = useToast();
  const { data: programs } = usePrograms();
  const submitApplication = useSubmitApplication();

  const defaultProgram = programs?.[0]?.id || '';

  const { register, handleSubmit, watch, trigger, formState: { errors }, setValue, getValues } = useForm<ApplicationFormData>({
    defaultValues: {
      programId: defaultProgram,
      studentInfo: { country: 'Pakistan', experienceYears: 0 },
      guardianInfo: {},
      academicInfo: {},
      businessIdea: '',
      businessName: '',
      paymentMethod: 'BANK_TRANSFER',
    },
  });

  // Load draft from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        Object.entries(draft).forEach(([key, val]) => {
          setValue(key as keyof ApplicationFormData, val as ApplicationFormData[keyof ApplicationFormData]);
        });
      } catch { /* ignore */ }
    }
  }, [setValue]);

  // Auto-save draft
  useEffect(() => {
    const sub = watch((val) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    });
    return () => sub.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (!isAuthenticated) {
      addToast('Please sign in or create an account to apply', 'info');
      router.push('/signup');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (programs?.[0] && !getValues('programId')) {
      setValue('programId', programs[0].id);
    }
  }, [programs, setValue, getValues]);

  const stepFields: Record<number, (keyof ApplicationFormData)[]> = {
    0: ['studentInfo'],
    1: ['guardianInfo'],
    2: ['academicInfo'],
    3: ['businessIdea', 'businessName', 'paymentMethod'],
  };

  const handleNext = async () => {
    const valid = await trigger(stepFields[currentStep]);
    if (valid) setCurrentStep((s) => s + 1);
    else addToast('Please fill all required fields correctly', 'error');
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await submitApplication.mutateAsync(data);
      setApplicationId(result.applicationId);
      localStorage.removeItem(STORAGE_KEY);
      setSuccessModal(true);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      addToast(error.response?.data?.message || 'Submission failed. Please try again.', 'error');
    }
  });

  const progressPct = ((currentStep) / STEPS.length) * 100;

  if (!isAuthenticated) return <LoadingSpinner fullPage />;

  return (
    <div className="min-h-screen bg-hero-gradient pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="section-title mb-2">Apply to <span className="text-orange">Intellorium</span></h1>
          <p className="section-subtitle text-base">Complete your application in 4 simple steps</p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((step, i) => (
              <div key={i} className={`flex items-center gap-2 ${i < STEPS.length - 1 ? 'flex-1' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-poppins transition-all shrink-0
                  ${i < currentStep ? 'bg-orange text-white' : i === currentStep ? 'bg-orange text-white shadow-orange-sm' : 'bg-white/10 text-white/30'}`}>
                  {i < currentStep ? <CheckCircle size={14} /> : i + 1}
                </div>
                <span className={`text-xs font-montserrat hidden sm:block ${i === currentStep ? 'text-orange' : i < currentStep ? 'text-white/60' : 'text-white/20'}`}>{step}</span>
                {i < STEPS.length - 1 && <div className="hidden sm:block flex-1 h-px bg-white/10 mx-2" />}
              </div>
            ))}
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <p className="text-white/30 text-xs font-inter mt-1 text-right">Step {currentStep + 1} of {STEPS.length}</p>
        </div>

        {/* Form */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="card-dark"
        >
          <h2 className="text-xl font-bold font-poppins text-white mb-6 pb-4 border-b border-orange/10">
            Step {currentStep + 1}: {STEPS[currentStep]}
          </h2>

          <form onSubmit={onSubmit}>
            {/* Program selector - always visible */}
            {currentStep === 0 && programs && programs.length > 0 && (
              <div className="mb-5">
                <label className="label-dark">Select Program *</label>
                <select {...register('programId')} className="input-dark">
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} — PKR {p.fee.toLocaleString()}</option>
                  ))}
                </select>
              </div>
            )}

            {currentStep === 0 && <StudentInfoForm register={register} errors={errors} />}
            {currentStep === 1 && <GuardianInfoForm register={register} errors={errors} />}
            {currentStep === 2 && <AcademicInfoForm register={register} errors={errors} />}
            {currentStep === 3 && <BusinessIdeaForm register={register} errors={errors} watch={watch} />}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-orange/10">
              <button
                type="button"
                onClick={() => setCurrentStep((s) => s - 1)}
                disabled={currentStep === 0}
                className="flex items-center gap-2 btn-outline text-sm disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} /> Previous
              </button>

              {currentStep < STEPS.length - 1 ? (
                <button type="button" onClick={handleNext} className="btn-primary flex items-center gap-2 text-sm">
                  Next <ChevronRight size={16} />
                </button>
              ) : (
                <button type="submit" disabled={submitApplication.isPending} className="btn-primary flex items-center gap-2 text-sm min-w-[150px] justify-center">
                  {submitApplication.isPending ? <LoadingSpinner size="sm" /> : <>Submit & Pay <ChevronRight size={16} /></>}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>

      {/* Success Modal */}
      <Modal isOpen={successModal} onClose={() => setSuccessModal(false)} title="Application Submitted!">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-400" />
          </div>
          <h3 className="text-xl font-bold font-poppins text-white mb-2">You&apos;re In!</h3>
          <p className="text-white/50 font-inter text-sm mb-2">Application ID: <span className="text-orange font-mono text-xs">{applicationId}</span></p>
          <p className="text-white/60 text-sm font-inter mb-6">Your application has been received. Please complete your payment to confirm your spot. Our team will review and respond within 2-3 business days.</p>
          <div className="flex gap-3">
            <button onClick={() => router.push('/dashboard')} className="btn-primary flex-1 text-sm">Go to Dashboard</button>
            <button onClick={() => setSuccessModal(false)} className="btn-outline flex-1 text-sm">View Details</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
