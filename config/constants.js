export const SITE_NAME = "Ammar Shaikh";
export const SITE_DESCRIPTION =
  "Full Stack Developer & AI Enthusiast building scalable web apps and real-time systems.";
export const NAVIGATION_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/ammarshaikh22",
    icon: "Github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/muhammad-ammar-shaikh-27788228b",
    icon: "Linkedin",
  },
  {
    name: "Email",
    url: "mailto:ammarshaikh50099@gmail.com",
    icon: "Mail",
  },
  {
    name: "Phone",
    url: "tel:+923162324240",
    icon: "Phone",
  },
];


export const STATS = [
  { label: "Projects Built", value: 10, suffix: "+" },
  { label: "Years Experience", value: 3, suffix: "+" },
  { label: "Freelance Clients", value: 8, suffix: "+" },
];

export const SKILLS = [
  {
    category: "Frontend",
    items: [
      { name: "React.js", proficiency: 85 },
      { name: "Next.js", proficiency: 90 },
      { name: "Tailwind CSS", proficiency: 95 },
      { name: "JavaScript (ES6+)", proficiency: 90 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", proficiency: 85 },
      { name: "Express.js", proficiency: 80 },
      { name: "MongoDB", proficiency: 85 },
      { name: "REST APIs", proficiency: 90 },
    ],
  },
  {
    category: "Tools & Others",
    items: [
      { name: "Git & GitHub", proficiency: 95 },
      { name: "Firebase", proficiency: 80 },
      { name: "Socket.IO", proficiency: 75 },
      { name: "AI APIs (OpenAI)", proficiency: 70 },
    ],
  },
];

export const TECH_STACK = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "JavaScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "MongoDB", category: "Database" },
  { name: "OpenAI API", category: "AI" },
];

export const FEATURED_PROJECTS = [
  {
    id: 1,
    title: "Field Ops Management System",
    description:
      "Role-based system for managing field operations, client communication, and technician workflows.",
    image: "/projects/field.png",
    tags: ["Next.js", "MongoDB", "Node.js", "Express"],
    link: "https://fieldfrontend.vercel.app/",
  },
  {
    id: 2,
    title: "Chat Application",
    description:
      "Real-time chat app with WebSocket integration and responses.",
    image: "/projects/chat.png",
    tags: ["Next.js", "Socket.IO","Express", "MongoDB"],
    link: "#",
  },
  {
    id: 3,
    title: "School Management System",
    description:
      "Comprehensive system for managing students, teachers, attendance, and academic records.",
    image: "/projects/school.png",
    tags: ["React", "Node.js", "MongoDB", "Dashboard"],
    link: "#",
  },
];
export const PROJECTS = [
  {
    id: 1,
    title: "Field Ops Management System",
    description:
      "Role-based system for managing field operations, client communication, and technician workflows.",
    image: "/projects/field.png",
    tags: ["Next.js", "MongoDB", "Node.js", "Express"],
    link: "https://fieldfrontend.vercel.app/",
  },
  {
    id: 2,
    title: "Chat Application",
    description:
      "Real-time chat application with WebSocket integration, enabling seamless messaging and instant updates.",
    image: "/projects/chat.png",
    tags: ["Next.js", "Socket.IO", "Express", "MongoDB"],
    link: "#",
  },
  {
    id: 3,
    title: "School Management System",
    description:
      "Comprehensive system for managing students, teachers, attendance, and academic records with a user-friendly dashboard.",
    image: "/projects/school.png",
    tags: ["React", "Node.js", "MongoDB", "Dashboard"],
    link: "#",
  },

  // ✅ Client Work (Safe wording)
  {
    id: 4,
    title: "Corporate Business Platform",
    description:
      "Modern, responsive business website developed for a client, featuring service pages, team section, and optimized user experience.",
    image: "/projects/xntric.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "https://xntric.me",
  },
  {
    id: 5,
    title: "Logistics Service Website",
    description:
      "Professional logistics platform built for a client with service details, contact forms, and performance-focused design.",
    image: "/projects/lps.png",
    tags: ["Next.js", "Tailwind CSS", "Animations"],
    link: "https://lps-me.com",
  },
  {
    id: 6,
    title: "Tech Business Website",
    description:
      "Clean and scalable web platform created for a client, highlighting services, team, and dynamic content integration.",
    image: "/projects/plenum.png",
    tags: ["Next.js", "Tailwind CSS", "Sanity CMS"],
    link: "https://plenum-tech.com",
  },

  // 🤖 AI Project
  {
    id: 7,
    title: "GenAI Handbook",
    description:
      "Interactive platform explaining Generative AI concepts with practical examples and modern UI.",
    image: "/projects/book.png",
    tags: ["Next.js", "Tailwind CSS", "OpenAI"],
    link: "https://as-sdd-hackathon.vercel.app/",
  },

  // 💡 Demo Projects (Portfolio Boost)
  {
    id: 8,
    title: "Gym Fitness Website",
    description:
      "Modern fitness website with membership plans, trainer profiles, and responsive design focused on user engagement.",
    image: "/projects/gym.png",
    tags: ["React", "Tailwind CSS", "UI/UX"],
    link: "#",
  },
  {
    id: 9,
    title: "Food Delivery Landing Page",
    description:
      "Clean and attractive food delivery landing page showcasing menus, offers, and smooth user experience design.",
    image: "/projects/food.png",
    tags: ["Next.js", "Tailwind CSS", "Responsive"],
    link: "#",
  },
];

export const EXPERIENCE = [
   {
    role: "Frontend Developer",
    company: "Projects & Practice",
    duration: "2023 - 2024",
    description:
      "Focused on building responsive and interactive UIs using React, Next.js, and Tailwind CSS.",
    achievements: [
      "Built modern responsive UI systems",
      "Improved UX using animations",
      "Worked on real-world frontend projects",
    ],
  },
  {
    role: "Jamstack Developer",
    company: "Xntric",
    duration: "2024 - 2026",
    description:
      "Worked on Jamstack-based applications focusing on performance, scalability, and modern frontend architecture using Next.js and API integrations.",
    achievements: [
      "Built high-performance Jamstack applications",
      "Integrated APIs and dynamic content systems",
      "Improved UI/UX with modern design practices",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    duration: "2026 - Present",
    description:
      "Developing full-stack applications for clients including dashboards, SaaS tools, and real-time systems.",
    achievements: [
      "Delivered multiple freelance projects",
      "Built scalable full-stack applications",
      "Handled complete project lifecycle independently",
    ],
  },
];

export const SERVICES = [
  {
    icon: "Code2",
    title: "Full Stack Development",
    description:
      "Building complete web applications using Full stack with scalable architecture.",
  },
  {
    icon: "Layout",
    title: "Frontend Development",
    description:
      "Modern, responsive, and animated UI using React, Next.js, and Tailwind.",
  },
  {
    icon: "Database",
    title: "Backend & APIs",
    description:
      "Robust backend systems with Node.js, Express, and MongoDB.",
  },
  {
    icon: "Zap",
    title: "Performance Optimization",
    description:
      "Optimizing speed, SEO, and user experience for better performance.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "Tech Startup",
    content:
      "Alex transformed our application with excellent technical skills and communication.",
    image: "/testimonials/sarah.jpg",
  },
  {
    name: "Michael Chen",
    role: "CEO",
    company: "Digital Agency",
    content:
      "Professional, responsive, and delivered exactly what we needed on time.",
    image: "/testimonials/michael.jpg",
  },
  {
    name: "Emma Davis",
    role: "Designer",
    company: "Creative Studio",
    content:
      "Great developer who understands design principles and creates beautiful experiences.",
    image: "/testimonials/emma.jpg",
  },
];
