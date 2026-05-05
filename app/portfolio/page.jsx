'use client';
import ScrollRevealWrapper from '@/components/animations/ScrollRevealWrapper';
import { PROJECTS } from '@/config/constants';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

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

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Web', 'AI'];
  const allProjects = [
    ...PROJECTS,
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? allProjects
      : allProjects.filter((p) =>
          selectedCategory === 'Web'
            ? p.tags.includes('Next.js', 'React')
            : selectedCategory === 'AI'
            ? p.tags.includes('OpenAI')
            : true
        );

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Portfolio</h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              A collection of projects showcasing my expertise in web development, design, and innovation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding bg-card/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollRevealWrapper variant="slideUp" className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Filter Projects</h2>
          </ScrollRevealWrapper>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background border border-border text-foreground hover:border-primary/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="group rounded-xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-300"
                  variants={itemVariants}
                  layout
                >
                  {/* Image Container */}
                  <div className="relative h-48 md:h-56 overflow-hidden bg-secondary">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-foreground/60 text-sm mb-4">{project.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-md bg-secondary/50 text-foreground/70 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Link */}
                    <Link
                      href={project.link}
                      className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors text-sm font-semibold group/link"
                    >
                      View Project
                      <ArrowUpRight
                        className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                        size={16}
                      />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-foreground/60">No projects found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
