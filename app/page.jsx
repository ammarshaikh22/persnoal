import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import TechStackSection from '@/components/sections/TechStackSection';
import FeaturedProjectsSection from '@/components/sections/FeaturedProjectsSection';
import ExperienceTimelineSection from '@/components/sections/ExperienceTimelineSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CtaSection from '@/components/sections/CtaSection';

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <StatsSection />
      <SkillsSection />
      <TechStackSection />
      <FeaturedProjectsSection />
      <ExperienceTimelineSection />
      <ServicesSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}
