'use client';
import ScrollRevealWrapper from '@/components/animations/ScrollRevealWrapper';
import { SOCIAL_LINKS } from '@/config/constants';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
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

const ICON_MAP = {
  Github: Icons.Github,
  Linkedin: Icons.Linkedin,
  Phone: Icons.Phone,
  Mail: Icons.Mail,
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await fetch("/api/send-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setSubmitted(false), 5000);
    } else {
      alert("Email send failed ❌");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong ❌");
  } finally {
    setIsLoading(false);
  }
};

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              I&apos;d love to hear from you. Let&apos;s discuss your project or just say hello!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              </div>

              {/* Contact Details */}
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'ammarshaikh50099@gmail.com',
                  href: 'mailto:ammarshaikh50099@gmail.com',
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  value: '+92 316 232 4240',
                  href: 'tel:+923162324240',
                },
                {
                  icon: MapPin,
                  label: 'Location',
                  value: 'Karachi, Pakistan',
                  href: '#',
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={index}
                    href={item.href}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-card/50 transition-colors"
                    variants={itemVariants}
                  >
                    <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10">
                      <Icon className="text-primary" size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-foreground/60 font-medium">{item.label}</div>
                      <div className="text-lg font-semibold text-foreground">{item.value}</div>
                    </div>
                  </motion.a>
                );
              })}

              {/* Social Links */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-bold mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  {SOCIAL_LINKS.map((link) => {
                    const Icon = ICON_MAP[link.icon];
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-card border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                        title={link.name}
                      >
                        {Icon && <Icon size={20} className="text-foreground hover:text-primary" />}
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="rounded-xl bg-card border border-border/50 p-8"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {submitted && (
                <motion.div
                  className="mb-6 p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-300"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="font-semibold">Thank you! I&apos;ll get back to you soon.</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                    placeholder="Project inquiry"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
