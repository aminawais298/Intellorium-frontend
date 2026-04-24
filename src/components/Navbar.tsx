'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, User, LayoutDashboard, BookOpen } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-md shadow-lg border-b border-orange/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8">
              <div className="w-8 h-8 bg-button-gradient rounded-lg flex items-center justify-center shadow-orange-sm group-hover:shadow-orange-md transition-shadow">
                <span className="text-white font-bold font-poppins text-sm">IB</span>
              </div>
            </div>
            <div>
              <span className="font-bold font-poppins text-white text-lg leading-none block">Intellorium</span>
              <span className="text-peach/60 text-[10px] font-montserrat leading-none">Business School</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-white/70 hover:text-orange transition-colors font-montserrat text-sm font-medium">Home</Link>
            <Link href="/programs" className="text-white/70 hover:text-orange transition-colors font-montserrat text-sm font-medium">Programs</Link>
            <Link href="/#about" className="text-white/70 hover:text-orange transition-colors font-montserrat text-sm font-medium">About</Link>
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard" className="flex items-center gap-2 text-peach/70 hover:text-orange transition-colors font-montserrat text-sm">
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 text-white/40 hover:text-red-400 transition-colors font-montserrat text-sm">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-white/70 hover:text-white transition-colors font-montserrat text-sm font-medium">Sign In</Link>
                <Link href="/apply" className="btn-primary text-sm px-4 py-2">Apply Now</Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white/70 hover:text-white p-2">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card-gradient border-t border-orange/10"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              <Link href="/" onClick={() => setIsOpen(false)} className="text-white/70 hover:text-orange transition-colors font-montserrat text-sm py-2">Home</Link>
              <Link href="/programs" onClick={() => setIsOpen(false)} className="text-white/70 hover:text-orange transition-colors font-montserrat text-sm py-2">Programs</Link>
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-peach/70 hover:text-orange transition-colors font-montserrat text-sm py-2 flex items-center gap-2">
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <button onClick={handleLogout} className="text-left text-white/40 hover:text-red-400 transition-colors font-montserrat text-sm py-2 flex items-center gap-2">
                    <LogOut size={16} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors font-montserrat text-sm py-2">Sign In</Link>
                  <Link href="/apply" onClick={() => setIsOpen(false)} className="btn-primary text-center text-sm">Apply Now</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
