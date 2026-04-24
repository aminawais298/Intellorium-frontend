'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/Common/Toast';
import { loginSchema, LoginForm } from '@/utils/validators';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const { add: addToast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { redirectUrl } = await login(data.email, data.password);
      addToast('Welcome back!', 'success');
      router.push(redirectUrl || '/dashboard');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      addToast(error.response?.data?.message || 'Invalid email or password', 'error');
    }
  });

  return (
    <>
      <Head>
        <title>Sign In — Intellorium Business School</title>
      </Head>
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-dark/5 rounded-full blur-3xl" />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-button-gradient rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-orange-md">
              <span className="text-white font-black font-poppins text-xl">IB</span>
            </div>
            <h1 className="text-2xl font-bold font-poppins text-white">Welcome Back</h1>
            <p className="text-white/40 text-sm font-inter mt-1">Sign in to your Intellorium account</p>
          </div>

          <div className="card-dark border-orange/20">
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="label-dark">Email Address</label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="you@example.com"
                  className="input-dark"
                  style={{ userSelect: 'text' }}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="label-dark">Password</label>
                <div className="relative">
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Your password"
                    className="input-dark pr-10"
                    style={{ userSelect: 'text' }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-orange/30 accent-orange" />
                  <span className="text-white/40 text-xs font-inter">Remember me</span>
                </label>
                <button type="button" className="text-orange/70 hover:text-orange text-xs font-montserrat">Forgot password?</button>
              </div>

              <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2 py-3.5">
                {isLoading ? <LoadingSpinner size="sm" /> : <><LogIn size={16} /> Sign In</>}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/40 text-sm font-inter">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-orange hover:text-orange-light transition-colors font-medium">Sign up</Link>
              </p>
            </div>
          </div>

          <p className="text-center text-white/20 text-xs font-inter mt-4">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="hover:text-orange transition-colors">Terms</Link> &{' '}
            <Link href="/privacy" className="hover:text-orange transition-colors">Privacy Policy</Link>
          </p>
        </motion.div>
      </div>
    </>
  );
}
