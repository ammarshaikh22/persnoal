const publicSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(publicSiteUrl
      ? { sitemap: new URL("/sitemap.xml", publicSiteUrl).toString() }
      : {}),
  };
}
