import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import ApplyPage from '@/components/Apply/ApplyPage';

export default function Apply() {
  return (
    <>
      <Head>
        <title>Apply Now — Intellorium Business School</title>
        <meta name="description" content="Apply to Intellorium Business School. Complete your 4-step application to join our next cohort." />
      </Head>
      <Navbar />
      <ApplyPage />
    </>
  );
}
