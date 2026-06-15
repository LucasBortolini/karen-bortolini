import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export async function getSocialImage(image: ImageMetadata) {
  return getImage({
    src: image,
    width: 1200,
    height: 630,
    fit: 'cover',
    format: 'jpg',
    quality: 82,
  });
}

export function buildSiteJsonLd(settings: {
  siteName: string;
  tagline: string;
  email: string;
  meta: { homeDescription: string };
  linkedin: string;
  instagramUrl: string;
  lattes: string;
}) {
  const siteUrl = 'https://karenbortolini.com.br';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: settings.siteName,
        description: settings.meta.homeDescription,
        inLanguage: 'pt-BR',
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: settings.siteName,
        jobTitle: settings.tagline,
        email: settings.email,
        url: `${siteUrl}/sobre/`,
        sameAs: [settings.linkedin, settings.instagramUrl, settings.lattes],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}/#service`,
        name: settings.siteName,
        description: settings.meta.homeDescription,
        url: siteUrl,
        areaServed: 'BR',
        availableLanguage: 'Portuguese',
        provider: { '@id': `${siteUrl}/#person` },
      },
    ],
  };
}
