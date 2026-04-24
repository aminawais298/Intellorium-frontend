'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { LayoutDashboard, User, TrendingUp, Users, Settings, LogOut, Menu, X, BookOpen } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import StudentDashboard from '@/components/Student/Dashboard';
import StudentProfile from '@/components/Student/StudentProfile';
import BusinessTracker from '@/components/Student/BusinessTracker';
import CohortNetwork from '@/components/Student/CohortNetwork';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

type Tab = 'overview' | 'profile' | 'business' | 'cohort' | 'settings';

const navItems = [
  { id: 'overview' as Tab, label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'profile' as Tab, label: 'My Profile', icon: <User size={18} /> },
  { id: 'business' as Tab, label: 'Business Log', icon: <TrendingUp size={18} /> },
  { id: 'cohort' as Tab, label: 'Cohort Network', icon: <Users size={18} /> },
  { id: 'settings' as Tab, label: 'Settings', icon: <Settings size={18} /> },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (isLoading || !isAuthenticated) return <LoadingSpinner fullPage />;

  return (
    <>
      <Head>
        <title>Dashboard — Intellorium Business School</title>
      </Head>
      <div className="min-h-screen bg-hero-gradient flex">
        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-0 h-screen w-64 bg-card-gradient border-r border-orange/10 flex flex-col z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          {/* Logo */}
          <div className="p-5 border-b border-orange/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-button-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-black font-poppins text-sm">IB</span>
              </div>
              <div>
                <p className="text-white font-semibold font-poppins text-sm leading-none">Intellorium</p>
                <p className="text-white/30 text-[10px] font-montserrat">Business School</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/30 hover:text-white"><X size={18} /></button>
          </div>

          {/* User info */}
          <div className="p-4 border-b border-orange/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-button-gradient rounded-xl flex items-center justify-center text-white font-bold font-poppins text-sm">
                {user?.firstName?.[0] || 'S'}
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-semibold font-poppins truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-white/30 text-[10px] font-inter truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`sidebar-link w-full ${activeTab === item.id ? 'active' : ''}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-orange/10">
            <button onClick={handleLogout} className="sidebar-link w-full text-white/30 hover:text-red-400 hover:bg-red-400/5">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {/* Top bar */}
          <div className="sticky top-0 bg-primary/80 backdrop-blur-md border-b border-orange/10 px-4 sm:px-6 py-4 flex items-center gap-4 z-20">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/50 hover:text-white">
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-white font-bold font-poppins text-lg">{navItems.find((n) => n.id === activeTab)?.label}</h1>
              <p className="text-white/30 text-xs font-inter">Intellorium Business School</p>
            </div>
          </div>

          <div className="p-4 sm:p-6 max-w-6xl mx-auto">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
              {activeTab === 'overview' && <StudentDashboard />}
              {activeTab === 'profile' && <StudentProfile />}
              {activeTab === 'business' && <BusinessTracker />}
              {activeTab === 'cohort' && <CohortNetwork />}
              {activeTab === 'settings' && (
                <div className="card-dark">
                  <h2 className="text-xl font-bold font-poppins text-white mb-6">Account Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/3 rounded-xl">
                      <div>
                        <p className="text-white font-medium font-poppins text-sm">Email Verified</p>
                        <p className="text-white/30 text-xs font-inter">{user?.email}</p>
                      </div>
                      <span className="text-green-400 text-xs bg-green-400/10 border border-green-400/20 px-2 py-1 rounded-full font-montserrat">Verified</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/3 rounded-xl">
                      <div>
                        <p className="text-white font-medium font-poppins text-sm">Account Role</p>
                        <p className="text-white/30 text-xs font-inter">Your access level</p>
                      </div>
                      <span className="text-orange text-xs bg-orange/10 border border-orange/20 px-2 py-1 rounded-full font-montserrat">{user?.role}</span>
                    </div>
                    <button onClick={handleLogout} className="w-full text-red-400 bg-red-400/5 border border-red-400/20 hover:bg-red-400/10 transition-colors rounded-xl p-4 font-montserrat text-sm flex items-center justify-center gap-2">
                      <LogOut size={16} /> Sign Out of Intellorium
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}
