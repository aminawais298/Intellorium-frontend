'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/Common/Toast';
import { registerSchema, RegisterForm } from '@/utils/validators';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuth();
  const { add: addToast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await registerUser({ email: data.email, password: data.password, firstName: data.firstName, lastName: data.lastName, phone: data.phone });
      addToast('Account created! Let\'s apply to Intellorium.', 'success');
      router.push('/apply');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      addToast(error.response?.data?.message || 'Registration failed. Please try again.', 'error');
    }
  });

  return (
    <>
      <Head>
        <title>Create Account — Intellorium Business School</title>
      </Head>
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4 py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-orange/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-orange-dark/5 rounded-full blur-3xl" />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-button-gradient rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-orange-md">
              <span className="text-white font-black font-poppins text-xl">IB</span>
            </div>
            <h1 className="text-2xl font-bold font-poppins text-white">Create Your Account</h1>
            <p className="text-white/40 text-sm font-inter mt-1">Join Intellorium Business School</p>
          </div>

          <div className="card-dark border-orange/20">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-dark">First Name *</label>
                  <input {...register('firstName')} placeholder="Muhammad" className="input-dark" style={{ userSelect: 'text' }} />
                  {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="label-dark">Last Name *</label>
                  <input {...register('lastName')} placeholder="Ali" className="input-dark" style={{ userSelect: 'text' }} />
                  {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
                </div>
              </div>
              <div>
                <label className="label-dark">Email Address *</label>
                <input {...register('email')} type="email" placeholder="you@example.com" className="input-dark" style={{ userSelect: 'text' }} />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="label-dark">Phone Number *</label>
                <input {...register('phone')} placeholder="0300-1234567" className="input-dark" style={{ userSelect: 'text' }} />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="label-dark">Password *</label>
                <div className="relative">
                  <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Minimum 8 characters" className="input-dark pr-10" style={{ userSelect: 'text' }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
              </div>
              <div>
                <label className="label-dark">Confirm Password *</label>
                <div className="relative">
                  <input {...register('confirmPassword')} type={showConfirm ? 'text' : 'password'} placeholder="Repeat password" className="input-dark pr-10" style={{ userSelect: 'text' }} />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" {...register('acceptTerms')} className="mt-0.5 w-4 h-4 accent-orange shrink-0" />
                <span className="text-white/40 text-xs font-inter leading-relaxed">
                  I agree to the{' '}
                  <Link href="/terms" className="text-orange hover:underline">Terms & Conditions</Link> and{' '}
                  <Link href="/privacy" className="text-orange hover:underline">Privacy Policy</Link>
                </span>
              </label>
              {errors.acceptTerms && <p className="text-red-400 text-xs">{errors.acceptTerms.message}</p>}

              <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2 py-3.5">
                {isLoading ? <LoadingSpinner size="sm" /> : <><UserPlus size={16} /> Create Account</>}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/40 text-sm font-inter">
                Already have an account?{' '}
                <Link href="/login" className="text-orange hover:text-orange-light transition-colors font-medium">Sign in</Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
