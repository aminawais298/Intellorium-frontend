'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lightbulb, Users, Percent, TrendingUp, Headphones, Briefcase } from 'lucide-react';

const features = [
  {
    icon: <Lightbulb size={24} />,
    title: 'Practical Skills',
    description: 'No theory. You build a real business from day one. Every lesson is applied directly to your venture.',
  },
  {
    icon: <Users size={24} />,
    title: 'Cohort Network',
    description: '60 entrepreneurs building side by side. Lifetime connections, collaborations, and peer accountability.',
  },
  {
    icon: <Percent size={24} />,
    title: '15% Service Fee',
    description: 'We only win when you win. We take 15% of revenue generated while you\'re in the program. Zero risk.',
  },
  {
    icon: <TrendingUp size={24} />,
    title: 'Business Validation',
    description: 'Intellorium validates your business idea, helps you find your first customers, and tracks your growth.',
  },
  {
    icon: <Headphones size={24} />,
    title: 'Backend Support',
    description: 'Months 7-12 are intensive support: mentors, resources, market trips, and investor introductions.',
  },
  {
    icon: <Briefcase size={24} />,
    title: 'Real Connections',
    description: '5 industrial trips, 5 market analysis tours, 5 interviews, and 5 university visits included.',
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-section-gradient" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-orange/10 border border-orange/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-orange text-xs font-montserrat font-medium uppercase tracking-wider">Why Intellorium</span>
          </div>
          <h2 className="section-title mb-4">
            Everything You Need to
            <span className="text-orange"> Build & Scale</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            We give you the tools, mentors, network, and backing to go from idea to revenue in 12 months.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-dark group cursor-default"
            >
              <div className="w-12 h-12 bg-orange/10 border border-orange/20 rounded-xl flex items-center justify-center text-orange mb-4 group-hover:bg-orange/20 group-hover:border-orange/40 transition-all">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold font-poppins text-white mb-2">{feature.title}</h3>
              <p className="text-white/50 text-sm font-inter leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 card-dark border-orange/30 bg-gradient-to-br from-orange/5 to-transparent"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold font-poppins text-white mb-3">Our Mission</h3>
              <p className="text-white/50 font-inter leading-relaxed">
                We exist for one reason — to build the next generation of Pakistani entrepreneurs from the ground up. At Intellorium Business School, we don&apos;t teach theory. We put students inside real businesses, with real problems, and real capital decisions until they come out the other side as founders, operators, and leaders.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold font-poppins text-white mb-3">Our Vision</h3>
              <p className="text-white/50 font-inter leading-relaxed">
                We envision a Pakistan where talent is never wasted by circumstance. Where a student from any city, any background, can walk into Intellorium with an idea and walk out with a running, funded, scalable business.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
