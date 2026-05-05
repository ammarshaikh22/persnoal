'use client';

import { TESTIMONIALS } from '@/config/constants';
import ScrollRevealWrapper from '../animations/ScrollRevealWrapper';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { useState } from 'react';

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

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section-padding bg-card/50 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollRevealWrapper variant="slideUp" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Say</h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Testimonials from clients and collaborators
          </p>
        </ScrollRevealWrapper>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl bg-background border border-border/50 hover:border-primary/50 transition-all duration-300 flex flex-col"
              variants={itemVariants}
              whileHover="hover"
              variants={{ ...itemVariants, ...hoverVariants }}
              onClick={() => setActiveIndex(index)}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground/70 text-sm mb-6 flex-1 italic">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-foreground truncate">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-foreground/50">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
