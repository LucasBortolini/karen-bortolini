import type { ImageMetadata } from 'astro';

import academica from '../assets/banners/academica.jpg';
import contato from '../assets/banners/contato.jpg';
import portifolio from '../assets/banners/portifolio.jpg';
import servicos from '../assets/banners/servicos.jpg';
import sobre from '../assets/banners/sobre.jpg';

export const pageBanners = {
  academica,
  contato,
  portifolio,
  servicos,
  sobre,
} as const satisfies Record<string, ImageMetadata>;

export type PageBannerKey = keyof typeof pageBanners;
