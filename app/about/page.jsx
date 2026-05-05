'use client';
import ScrollRevealWrapper from '@/components/animations/ScrollRevealWrapper';
import ExperienceTimelineSection from '@/components/sections/ExperienceTimelineSection';
import SkillsSection from '@/components/sections/SkillsSection';
import { motion } from 'framer-motion';

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

export default function About() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">About Me</h1>
            </motion.div>
            <motion.p variants={itemVariants} className="text-xl text-foreground/70 max-w-2xl mx-auto">
              A full-stack developer passionate about creating beautiful, functional digital experiences
              that solve real problems and delight users.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="pt-18 bg-background">
        <div className="max-w-4xl mx-auto">
          <ScrollRevealWrapper variant="slideUp">
            <div className="prose prose-invert max-w-none text-center">
              <p className="text-lg text-foreground/70 leading-relaxed mb-6">
               I’m a modern web developer specializing in the MERN stack, with a strong focus on creating high-performance and scalable applications. I’ve built multiple real-world projects ranging from interactive web apps to complete management systems, always keeping user experience at the center.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Currently, I’m diving into the world of AI and automation, aiming to combine intelligent systems with modern web development. I’m driven by curiosity, continuous learning, and the goal of building impactful digital experiences.
              </p>
            </div>
          </ScrollRevealWrapper>
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Experience Section */}
      <ExperienceTimelineSection />

      {/* Interests Section */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollRevealWrapper variant="slideUp" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Interests & Passions</h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Beyond coding, I&apos;m interested in many things that fuel my creativity and innovation
            </p>
          </ScrollRevealWrapper>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                title: 'Open Source',
                description:
                  'Contributing to the developer community and building tools that help others succeed.',
              },
              {
                title: 'UI/UX Design',
                description:
                  'Creating intuitive, beautiful interfaces that provide exceptional user experiences.',
              },
              {
                title: 'Technology Trends',
                description:
                  'Staying updated with emerging technologies and exploring their potential applications.',
              },
            ].map((interest, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300"
                variants={itemVariants}
              >
                <h3 className="text-lg font-bold mb-3 text-primary">{interest.title}</h3>
                <p className="text-foreground/60 text-sm">{interest.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
