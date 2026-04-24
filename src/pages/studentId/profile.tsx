import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { ArrowLeft, Briefcase, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useStudentPublicProfile } from '@/hooks/useStudent';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import { formatCurrency, getInitials } from '@/utils/formatters';

export default function StudentPublicProfile() {
  const router = useRouter();
  const { studentId } = router.query;
  const { data: student, isLoading } = useStudentPublicProfile(studentId as string);

  return (
    <>
      <Head>
        <title>{student ? `${student.firstName} ${student.lastName}` : 'Student Profile'} — Intellorium</title>
      </Head>
      <Navbar />
      <div className="min-h-screen bg-hero-gradient pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-white/40 hover:text-orange transition-colors font-montserrat text-sm mb-6">
            <ArrowLeft size={16} /> Back
          </button>

          {isLoading ? (
            <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
          ) : student ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="card-dark text-center mb-6">
                <div className="w-20 h-20 bg-button-gradient rounded-2xl flex items-center justify-center text-3xl font-black font-poppins text-white mx-auto mb-4 shadow-orange-md">
                  {getInitials(student.firstName, student.lastName)}
                </div>
                <h1 className="text-2xl font-bold font-poppins text-white">{student.firstName} {student.lastName}</h1>
                {student.city && (
                  <p className="text-white/40 text-sm font-inter flex items-center justify-center gap-1 mt-1">
                    <MapPin size={12} /> {student.city}, {student.country}
                  </p>
                )}
              </div>

              {student.businessName && (
                <div className="card-dark mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase size={16} className="text-orange" />
                    <h2 className="text-base font-semibold font-poppins text-white">Business</h2>
                  </div>
                  <h3 className="text-xl font-bold font-poppins text-orange mb-2">{student.businessName}</h3>
                  {student.businessIdea && <p className="text-white/60 text-sm font-inter leading-relaxed">{student.businessIdea}</p>}
                  {student.businessMetrics && (
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="bg-white/3 rounded-lg p-3 text-center">
                        <p className="text-orange font-bold font-poppins">{formatCurrency((student.businessMetrics as { totalRevenue?: number }).totalRevenue || 0)}</p>
                        <p className="text-white/30 text-xs font-montserrat">Total Revenue</p>
                      </div>
                      <div className="bg-white/3 rounded-lg p-3 text-center">
                        <p className="text-orange font-bold font-poppins">{(student.businessMetrics as { totalCustomers?: number }).totalCustomers || 0}</p>
                        <p className="text-white/30 text-xs font-montserrat">Customers</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            <div className="text-center py-20 text-white/40">
              <p className="font-montserrat">Student not found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
