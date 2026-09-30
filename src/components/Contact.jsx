"use client";

import { useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { R } from "./About";
import { profile } from "@/data/content";

const types = ["Website", "Web application", "CMS or API integration", "Other"];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setIsSubmitting(true);
    setFeedback("");

    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          subject: form.get("type"),
          message: form.get("message"),
        }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error("Message delivery failed");
      }

      formElement.reset();
      setFeedback("Thanks — your message has been sent. I’ll get back to you soon.");
    } catch {
      setFeedback("Your message couldn’t be sent right now. Please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="sec" aria-labelledby="contact-title">
      <R className="lbl mb-6 text-acc">Contact</R>
      <R>
        <h2 id="contact-title" className="h-display mb-8 text-[clamp(2.6rem,10vw,8.5rem)]">
          Let&apos;s start
          <br />a conversation.
        </h2>
      </R>
      <R>
        <p className="mb-8 max-w-xl text-lg leading-relaxed text-dim">
          Have a website, product or platform in mind? Send a short brief and I&apos;ll get back to you.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mb-14 inline-flex min-h-10 items-center gap-2 text-sm text-white/70 transition-colors hover:text-acc"
        >
          <Mail size={15} aria-hidden="true" /> {profile.email}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </R>

      <form onSubmit={submit} className="grid max-w-4xl gap-x-12 gap-y-8 md:grid-cols-2">
        <label>
          <span className="lbl">Name</span>
          <input required name="name" className="field" autoComplete="name" />
        </label>
        <label>
          <span className="lbl">Email</span>
          <input required type="email" name="email" className="field" autoComplete="email" />
        </label>
        <label className="md:col-span-2">
          <span className="lbl">Project type</span>
          <select name="type" className="field bg-transparent">
            {types.map((type) => (
              <option key={type} className="bg-black">{type}</option>
            ))}
          </select>
        </label>
        <label className="md:col-span-2">
          <span className="lbl">A little about the project</span>
          <textarea required name="message" rows={4} className="field resize-y" />
        </label>
        <div className="flex flex-wrap items-center gap-5 md:col-span-2">
          <MagneticButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Start a project"}
          </MagneticButton>
          {feedback && (
            <span role="status" aria-live="polite" className="max-w-md text-xs leading-relaxed text-acc">
              {feedback}
            </span>
          )}
        </div>
      </form>
      <p className="mt-5 max-w-xl text-xs leading-relaxed text-white/35">
        Your message is sent directly to my inbox when you submit this form.
      </p>
    </section>
  );
}
