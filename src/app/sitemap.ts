import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://baat-api--baatbgorg.us-central1.hosted.app'

  // You can even fetch data from Firestore here to generate dynamic paths
  // const members = await getMembers(); 
  // const memberUrls = members.map(m => ({ url: `${baseUrl}/bg/members/${m.id}`, lastModified: new Date() }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/bg/members`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/members`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Spread your dynamic URLs here
    // ...memberUrls 
  ]
}