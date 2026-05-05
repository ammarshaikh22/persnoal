'use client';

import { EXPERIENCE } from '@/config/constants';
import ScrollRevealWrapper from '../animations/ScrollRevealWrapper';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

export default function ExperienceTimelineSection() {
  return (
    <section className="section-padding bg-card/50 border-y border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollRevealWrapper variant="slideUp" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            My journey through diverse roles and companies
          </p>
        </ScrollRevealWrapper>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          {EXPERIENCE.map((exp, index) => (
            <motion.div key={index} variants={itemVariants} className="mb-8">
              <div className={`flex flex-col md:flex-row gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Timeline dot */}
                <div className="hidden md:block md:flex-1 text-right">
                  <div className="relative inline-block">
                    <div className="w-4 h-4 rounded-full bg-primary absolute -left-6 top-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="md:flex-1">
                  <div className="p-6 rounded-xl bg-background border border-border/50 hover:border-primary/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
                      <span className="text-sm text-primary font-semibold mt-2 md:mt-0">
                        {exp.duration}
                      </span>
                    </div>
                    <div className="text-foreground/60 text-sm mb-3">{exp.company}</div>
                    <p className="text-foreground/70 text-sm mb-4">{exp.description}</p>

                    {/* Achievements */}
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li
                          key={idx}
                          className="text-foreground/60 text-sm flex items-start gap-2"
                        >
                          <span className="text-primary mt-1.5 text-xs">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
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
