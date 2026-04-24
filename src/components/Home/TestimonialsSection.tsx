'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmed Raza',
    business: 'TechBridge PK',
    revenue: 'PKR 180,000/month',
    quote: 'Intellorium didn\'t just teach me business — they made me a founder. In 6 months I went from zero to PKR 180K monthly revenue. This program changed my life.',
    rating: 5,
    cohort: 'Cohort 0 — Pilot',
  },
  {
    name: 'Fatima Malik',
    business: 'GreenCart Organics',
    revenue: 'PKR 95,000/month',
    quote: 'I came in as a fresh graduate with just an idea. The mentors pushed me hard, the cohort supported me, and 4 months in I had my first paying customers.',
    rating: 5,
    cohort: 'Cohort 0 — Pilot',
  },
  {
    name: 'Hassan Mirza',
    business: 'EduLink Academy',
    revenue: 'PKR 220,000/month',
    quote: 'The service fee model is genius — Intellorium only wins when you win. That aligned incentive made them fight for my success as hard as I did.',
    rating: 5,
    cohort: 'Cohort 0 — Pilot',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-24 bg-hero-gradient">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange/10 border border-orange/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-orange text-xs font-montserrat font-medium uppercase tracking-wider">Student Success</span>
          </div>
          <h2 className="section-title mb-4">
            Real Results from
            <span className="text-orange"> Real Founders</span>
          </h2>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="card-dark border-orange/30 text-center p-10"
            >
              <Quote size={32} className="text-orange/30 mx-auto mb-6" />
              <p className="text-white/80 text-xl font-inter italic leading-relaxed mb-8 max-w-2xl mx-auto">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-orange fill-orange" />
                ))}
              </div>
              <div>
                <p className="font-bold font-poppins text-white text-lg">{testimonials[current].name}</p>
                <p className="text-orange font-montserrat text-sm">{testimonials[current].business}</p>
                <p className="text-peach/50 text-xs font-inter mt-1">{testimonials[current].revenue} · {testimonials[current].cohort}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full bg-orange/10 border border-orange/20 flex items-center justify-center text-orange hover:bg-orange/20 transition-all">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-orange w-6' : 'bg-white/20'}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full bg-orange/10 border border-orange/20 flex items-center justify-center text-orange hover:bg-orange/20 transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
