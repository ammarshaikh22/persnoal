'use client';
import ScrollRevealWrapper from '@/components/animations/ScrollRevealWrapper';
import ServicesSection from '@/components/sections/ServicesSection';
import { SERVICES } from '@/config/constants';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

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

export default function Services() {
  return (
    <main className="w-full">

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Services</h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Comprehensive web development and design services tailored to your needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <ServicesSection />

      {/* Detailed Services Section */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollRevealWrapper variant="slideUp" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Me?</h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Here&apos;s what sets my approach apart
            </p>
          </ScrollRevealWrapper>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                icon: 'Zap',
                title: 'Performance First',
                description:
                  'Every project is optimized for speed and efficiency. Fast load times, smooth interactions, and excellent Core Web Vitals.',
              },
              {
                icon: 'Lock',
                title: 'Security & Best Practices',
                description:
                  'Built with security in mind. I follow industry standards and best practices to keep your application safe.',
              },
              {
                icon: 'Smartphone',
                title: 'Responsive Design',
                description:
                  'Works flawlessly across all devices and screen sizes. Your users get the perfect experience everywhere.',
              },
              {
                icon: 'Palette',
                title: 'Beautiful UI/UX',
                description:
                  'Thoughtfully designed interfaces that are not just beautiful, but intuitive and user-friendly.',
              },
              {
                icon: 'Users',
                title: 'Collaborative Process',
                description:
                  'I work closely with you throughout the project, keeping you updated and incorporating your feedback.',
              },
              {
                icon: 'Code',
                title: 'Clean Code',
                description:
                  'Maintainable, well-documented code that&apos;s easy to understand and scale as your project grows.',
              },
            ].map((service, index) => {
              const Icon = Icons[service.icon];
              return (
                <motion.div
                  key={index}
                  className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300"
                  variants={itemVariants}
                >
                  <div className="mb-4 p-3 rounded-lg bg-primary/10 inline-block">
                    {Icon && <Icon className="text-primary" size={24} />}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-foreground/60 text-sm">{service.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-card/50 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollRevealWrapper variant="slideUp" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Process</h2>
            <p className="text-foreground/60 text-lg">
              How I work to bring your vision to life
            </p>
          </ScrollRevealWrapper>

          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                step: '01',
                title: 'Discovery & Planning',
                description:
                  'I start by understanding your goals, target audience, and requirements. We discuss your vision in detail.',
              },
              {
                step: '02',
                title: 'Design & Prototyping',
                description:
                  'I create wireframes and prototypes to visualize the user experience before any coding begins.',
              },
              {
                step: '03',
                title: 'Development',
                description:
                  'With a solid plan in place, I build your application using best practices and modern technologies.',
              },
              {
                step: '04',
                title: 'Testing & Refinement',
                description:
                  'Thorough testing ensures everything works perfectly. I refine based on feedback and testing results.',
              },
              {
                step: '05',
                title: 'Launch & Support',
                description:
                  'Your project goes live! I provide ongoing support and maintenance to keep everything running smoothly.',
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                className="flex gap-6 items-start p-6 rounded-xl bg-background border border-border/50 hover:border-primary/50 transition-all duration-300"
                variants={itemVariants}
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <span className="text-lg font-bold text-primary">{process.step}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2">{process.title}</h3>
                  <p className="text-foreground/60 text-sm">{process.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </main>
  );
}
