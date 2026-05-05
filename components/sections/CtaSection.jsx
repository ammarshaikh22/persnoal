'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ScrollRevealWrapper from '../animations/ScrollRevealWrapper';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function CtaSection() {
  return (
    <section className="section-padding bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-y border-border">
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Work Together?
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto"
        >
          I&apos;m always excited to discuss new projects and collaborations. Let&apos;s create something
          amazing together.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-semibold group"
          >
            Start a Project
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300 font-semibold"
          >
            View My Portfolio
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
