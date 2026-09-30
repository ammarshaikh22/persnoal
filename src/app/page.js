import Hero from "@/components/Hero";
import About from "@/components/About";
import Works from "@/components/Works";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Statement from "@/components/Statement";
import Contact from "@/components/Contact";
export default function Page() {
  return (
      <main>
        <Hero />
        <About />
        <Works />
        <Services />
        <Skills />
        <Achievements />
        <Statement />
        <Contact />
      </main>
  );
}
