import { useState, useMemo } from 'react';
import { filterLabels } from '../lib/utils';

export interface PortfolioItem {
  id: string;
  title: string;
  url: string;
  type: string;
  group?: string;
  thumb?: string | null;
}

interface Props {
  items: PortfolioItem[];
}

const filters = ['all', 'video', 'editorial', 'institutional', 'pdf'] as const;

function getYoutubeThumb(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?]+)/);
  if (match?.[1]) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  return null;
}

export default function PortfolioGrid({ items }: Props) {
  const [active, setActive] = useState<string>('all');

  const enriched = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        thumb: item.thumb ?? getYoutubeThumb(item.url),
      })),
    [items],
  );

  const filtered =
    active === 'all' ? enriched : enriched.filter((item) => item.type === active);

  return (
    <div>
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filtrar portfólio"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={active === filter}
            onClick={() => setActive(filter)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 ${
              active === filter
                ? 'bg-primary text-white'
                : 'bg-white text-secondary ring-1 ring-primary/10 hover:bg-surface'
            }`}
          >
            {filterLabels[filter]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-secondary">Nenhum item nesta categoria.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-primary/5 transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-video overflow-hidden bg-primary/10">
                {item.thumb ? (
                  <img
                    src={item.thumb}
                    alt={`Capa do projeto ${item.title}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-primary/5">
                    <span className="font-display text-lg text-primary/40">
                      {filterLabels[item.type] ?? item.type}
                    </span>
                  </div>
                )}
                <span
                  className={`absolute left-3 top-3 rounded-full px-2 py-0.5 text-xs font-semibold text-white ${
                    item.type === 'video' ? 'bg-recording' : 'bg-gold'
                  }`}
                >
                  {filterLabels[item.type] ?? item.type}
                </span>
              </div>
              <div className="p-4">
                {item.group && (
                  <p className="text-xs font-medium text-gold">{item.group}</p>
                )}
                <h3 className="mt-1 font-display text-base font-semibold text-primary group-hover:text-gold">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-secondary/70">Abrir projeto →</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
