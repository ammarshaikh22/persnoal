'use client';

import { STATS } from '@/config/constants';
import ScrollRevealWrapper from '../animations/ScrollRevealWrapper';
import AnimatedCounter from '../animations/AnimatedCounter';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function StatsSection() {
  return (
    <section className="section-padding bg-card/50 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollRevealWrapper variant="slideUp" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">By The Numbers</h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            A summary of my professional achievements and impact
          </p>
        </ScrollRevealWrapper>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-xl bg-background border border-border/50 hover:border-primary/50 transition-all duration-300"
              variants={itemVariants}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-foreground/70 mt-4 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
