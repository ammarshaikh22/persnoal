'use client';

import { SKILLS } from '@/config/constants';
import ScrollRevealWrapper from '../animations/ScrollRevealWrapper';
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

const progressVariants = {
  hidden: { scaleX: 0 },
  visible: (proficiency) => ({
    scaleX: proficiency / 100,
    transition: { duration: 1, delay: 0.2, ease: 'easeOut' },
  }),
};

export default function SkillsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollRevealWrapper variant="slideUp" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Expertise across frontend, backend, and development tools
          </p>
        </ScrollRevealWrapper>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {SKILLS.map((skillGroup, index) => (
            <motion.div key={index} variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 text-primary">{skillGroup.category}</h3>
              <div className="space-y-6">
                {skillGroup.items.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-foreground font-medium text-sm">{skill.name}</span>
                      <span className="text-primary text-sm font-semibold">{skill.proficiency}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full origin-left"
                        variants={progressVariants}
                        custom={skill.proficiency}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
