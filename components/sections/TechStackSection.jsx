'use client';

import { TECH_STACK } from '@/config/constants';
import ScrollRevealWrapper from '../animations/ScrollRevealWrapper';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

const hoverVariants = {
  hover: {
    y: -5,
    boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.2)',
    transition: { duration: 0.3 },
  },
};

export default function TechStackSection() {
  return (
    <section className="section-padding bg-card/50 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollRevealWrapper variant="slideUp" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tech Stack</h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Modern technologies I work with on a daily basis
          </p>
        </ScrollRevealWrapper>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-lg bg-background border border-border/50 hover:border-primary/50 flex flex-col items-center justify-center text-center cursor-pointer"
              variants={itemVariants}
              whileHover="hover"
              variants={{ ...itemVariants, ...hoverVariants }}
            >
              <div className="font-semibold text-foreground mb-2">{tech.name}</div>
              <div className="text-xs text-foreground/50">{tech.category}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
