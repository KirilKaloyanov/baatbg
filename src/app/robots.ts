import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/*_rsc=*', // Stop Googlebot from "bleeding" your traffic via RSC chunks
        '/_next/',   // Optional: block internal next.js folders
      ],
    },
    // sitemap: 'https://yourdomain.com/sitemap.xml',
  }
}