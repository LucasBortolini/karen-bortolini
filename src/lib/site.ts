import { getEntry } from 'astro:content';

export async function getSiteSettings() {
  const entry = await getEntry('site', 'settings');
  if (!entry) throw new Error('Site settings not found');
  return entry.data;
}

export function whatsappUrl(number: string, message?: string): string {
  const base = `https://wa.me/${number}`;
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/sobre/', label: 'Sobre' },
  { href: '/servicos/', label: 'Serviços' },
  { href: '/portfolio/', label: 'Portfólio' },
  { href: '/producao-academica/', label: 'Produção acadêmica' },
  { href: '/contato/', label: 'Contato' },
] as const;
