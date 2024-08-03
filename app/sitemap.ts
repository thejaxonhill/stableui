import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
const siteUrl = process.env.SITE_URL!;
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
        url: siteUrl + '/login',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    {
      url: siteUrl + '/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    
  ]
}