import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export async function getBannerImageAssets(image: ImageMetadata) {
  const [lqip, mobile, tablet, desktop] = await Promise.all([
    getImage({ src: image, width: 32, format: 'webp', quality: 20 }),
    getImage({ src: image, width: 640, format: 'webp', quality: 72 }),
    getImage({ src: image, width: 1024, format: 'webp', quality: 78 }),
    getImage({ src: image, width: 1920, format: 'webp', quality: 82 }),
  ]);

  return {
    lqipSrc: lqip.src,
    preload: {
      href: mobile.src,
      srcset: `${mobile.src} 640w, ${tablet.src} 1024w, ${desktop.src} 1920w`,
    },
  };
}
