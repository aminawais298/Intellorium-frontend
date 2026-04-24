import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProgramsPage from '@/components/Programs/ProgramsPage';

export default function Programs() {
  return (
    <>
      <Head>
        <title>Programs — Intellorium Business School</title>
        <meta name="description" content="Explore our 12-month Practical MBA program. Build a real business with expert mentors and a cohort of 60 entrepreneurs." />
      </Head>
      <Navbar />
      <ProgramsPage />
      <Footer />
    </>
  );
}
