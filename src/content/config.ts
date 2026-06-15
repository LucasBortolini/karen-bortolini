import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '**/*.{yaml,yml}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    body: z.string(),
    image: z.string().optional(),
    category: z.enum(['comunicacao', 'ensino']),
    order: z.number(),
  }),
});

const portfolio = defineCollection({
  loader: glob({ base: './src/content/portfolio', pattern: '**/*.{yaml,yml}' }),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    type: z.enum(['video', 'editorial', 'institutional', 'pdf']),
    platform: z.string().optional(),
    featured: z.boolean().default(false),
    group: z.string().optional(),
    image: z.string().optional(),
    order: z.number().default(0),
  }),
});

const academic = defineCollection({
  loader: glob({ base: './src/content/academic', pattern: '**/*.{yaml,yml}' }),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    type: z.enum(['article', 'chapter', 'thesis', 'class']),
    year: z.number().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const education = defineCollection({
  loader: glob({ base: './src/content/education', pattern: '**/*.{yaml,yml}' }),
  schema: z.object({
    title: z.string(),
    institution: z.string(),
    year: z.number(),
    kind: z.enum(['degree', 'course']),
    order: z.number(),
  }),
});

const site = defineCollection({
  loader: glob({ base: './src/content/site', pattern: '**/*.{yaml,yml}' }),
  schema: z.object({
    siteName: z.string(),
    tagline: z.string(),
    footerTagline: z.string(),
    whatsapp: z.string(),
    whatsappDisplay: z.string(),
    email: z.string(),
    instagram: z.string(),
    instagramUrl: z.string().url(),
    linkedin: z.string().url(),
    lattes: z.string().url(),
    heroTitle: z.string(),
    heroSubtitle: z.string(),
    heroParagraphs: z.array(z.string()),
    aboutBio: z.array(z.string()),
    meta: z.object({
      homeTitle: z.string(),
      homeDescription: z.string(),
    }),
  }),
});

export const collections = { services, portfolio, academic, education, site };
