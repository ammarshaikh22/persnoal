import { services } from "@/data/content";
import { R } from "./About";

export default function Services() {
  return (
    <section id="services" className="sec" aria-labelledby="services-title">
      <R className="lbl mb-6 text-acc">What I can help build</R>
      <R>
        <h2 id="services-title" className="h-display mb-12 text-[clamp(3rem,10vw,8rem)] sm:mb-16">
          Services
        </h2>
      </R>
      <ol>
        {services.map(([title, description, stack], index) => (
          <li key={title}>
            <R>
              <article className="group relative grid items-start gap-4 border-t border-white/10 py-7 transition-colors duration-500 hover:bg-gradient-to-r hover:from-acc/[.035] hover:to-transparent sm:py-9 md:grid-cols-12 md:items-baseline md:gap-5">
                <span className="font-display text-xl text-white/25 transition-colors duration-500 group-hover:text-acc md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight md:col-span-5 lg:text-4xl">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-dim md:col-span-4">
                  {description}
                </p>
                <span className="lbl text-[9px] text-white/45 md:col-span-2">
                  {stack}
                </span>
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-0 bg-acc transition-all duration-700 group-hover:w-full" />
              </article>
            </R>
          </li>
        ))}
      </ol>
    </section>
  );
}
