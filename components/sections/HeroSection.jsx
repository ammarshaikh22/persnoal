'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ParticleBackground from '../3d/ParticleBackground';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <ParticleBackground />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <div className="text-primary text-sm font-semibold mb-4 uppercase tracking-widest">
            Welcome to my portfolio
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Creative Developer & <span className="gradient-text">Digital Problem Solver</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-lg text-foreground/70 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
         I design and develop fast, responsive, and user-focused web applications. From frontend experiences to AI-powered solutions, I turn ideas into real, impactful digital products.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-semibold group"
          >
            View My Work
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300 font-semibold"
          >
            Get In Touch
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center text-foreground/50">
            <span className="text-xs font-semibold mb-2">Scroll to explore</span>
            <svg
              className="w-5 h-5 animate-bounce"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
