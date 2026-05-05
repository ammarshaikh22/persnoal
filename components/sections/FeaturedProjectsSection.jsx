'use client';

import { FEATURED_PROJECTS } from '@/config/constants';
import ScrollRevealWrapper from '../animations/ScrollRevealWrapper';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const hoverVariants = {
  hover: {
    y: -10,
    transition: { duration: 0.3 },
  },
};

export default function FeaturedProjectsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollRevealWrapper variant="slideUp" className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
            <Link
              href="/portfolio"
              className="text-primary hover:text-accent transition-colors text-sm font-semibold flex items-center gap-2"
            >
              View All
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <p className="text-foreground/60 text-lg max-w-2xl">
            Showcase of my recent work and innovative solutions
          </p>
        </ScrollRevealWrapper>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {FEATURED_PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              className="group rounded-xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-300"
              variants={itemVariants}
              whileHover="hover"
              variants={{ ...itemVariants, ...hoverVariants }}
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
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
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
                  <ArrowUpRight className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
