import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import localFont from "next/font/local";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import { profile, skills } from "@/data/content";

const displayFont = localFont({
  src: "./fonts/space-grotesk-latin.woff2",
  variable: "--f-d",
  weight: "300 700",
  display: "swap",
});
const bodyFont = localFont({
  src: "./fonts/inter-latin.woff2",
  variable: "--f-b",
  weight: "100 900",
  display: "swap",
});

const publicSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

const description =
  "Muhammad Ammar Shaikh is a full-stack and Jamstack developer in Mirpurkhas, Pakistan, building responsive React and Next.js websites, web applications, API integrations and CMS-backed experiences.";

export const metadata = {
  ...(publicSiteUrl ? { metadataBase: new URL(publicSiteUrl) } : {}),
  title: {
    default: "Muhammad Ammar Shaikh | Full-Stack & Jamstack Developer",
    template: "%s | Muhammad Ammar Shaikh",
  },
  description,
  applicationName: "Muhammad Ammar Shaikh Portfolio",
  creator: profile.name,
  authors: [{ name: profile.name }],
  keywords: [
    "Muhammad Ammar Shaikh",
    "Full-stack developer",
    "Jamstack developer",
    "Next.js developer",
    "React developer",
    "MERN stack",
    "Mirpurkhas Pakistan",
    ...skills,
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "Muhammad Ammar Shaikh Portfolio",
    title: "Muhammad Ammar Shaikh | Full-Stack & Jamstack Developer",
    description,
    ...(publicSiteUrl ? { images: [
      {
        url: "/images/xntric.webp",
        alt: "A project preview from Muhammad Ammar Shaikh's portfolio",
      },
    ] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ammar Shaikh | Full-Stack & Jamstack Developer",
    description,
    ...(publicSiteUrl ? { images: ["/images/xntric.webp"] } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Freelance Jamstack Developer",
  description,
  email: profile.email,
  telephone: profile.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mirpurkhas",
    addressCountry: "PK",
  },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: skills,
};

export default function Layout({ children }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
          }}
        />
        <PageLoader />
        <SmoothScroll>
          <CustomCursor />
          <div className="grain" aria-hidden="true" />
          <div className="vig" aria-hidden="true" />
          <Header />
          {children}
            <Analytics />
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
