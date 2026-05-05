'use client';

import { SERVICES } from '@/config/constants';
import ScrollRevealWrapper from '../animations/ScrollRevealWrapper';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

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

const hoverVariants = {
  hover: {
    y: -5,
    transition: { duration: 0.3 },
  },
};

export default function ServicesSection() {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollRevealWrapper variant="slideUp" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Services</h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            How I can help bring your ideas to life
          </p>
        </ScrollRevealWrapper>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {SERVICES.map((service, index) => {
            const Icon = Icons[service.icon];
            return (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300"
                variants={itemVariants}
                whileHover="hover"
                variants={{ ...itemVariants, ...hoverVariants }}
              >
                <div className="mb-4 p-3 rounded-lg bg-primary/10 inline-block">
                  {Icon && <Icon className="text-primary" size={24} />}
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{service.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
