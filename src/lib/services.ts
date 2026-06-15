import type { CollectionEntry } from 'astro:content';

type ServiceEntry = CollectionEntry<'services'>;

export interface ServiceGroup {
  title: string;
  services: ReturnType<typeof toServiceItem>[];
}

export function toServiceItem(entry: ServiceEntry) {
  return {
    id: entry.id,
    title: entry.data.title,
    description: entry.data.description,
    body: entry.data.body,
    image: entry.data.image,
    category: entry.data.category,
  };
}

export function buildServiceGroups(
  entries: ServiceEntry[],
  options?: { limitPerCategory?: number },
): ServiceGroup[] {
  const comunicacao = entries
    .filter((s) => s.data.category === 'comunicacao')
    .sort((a, b) => a.data.order - b.data.order);

  const ensino = entries
    .filter((s) => s.data.category === 'ensino')
    .sort((a, b) => a.data.order - b.data.order);

  const limit = options?.limitPerCategory;

  return [
    {
      title: 'Comunicação estratégica e audiovisual',
      services: (limit ? comunicacao.slice(0, limit) : comunicacao).map(toServiceItem),
    },
    {
      title: 'Ensino e produção educacional',
      services: (limit ? ensino.slice(0, limit) : ensino).map(toServiceItem),
    },
  ];
}
