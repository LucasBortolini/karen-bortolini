export function getYoutubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

export function youtubeThumbnail(url: string): string | null {
  const id = getYoutubeId(url);
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export const portfolioTypeLabels: Record<string, string> = {
  video: 'Vídeo',
  editorial: 'Editorial',
  institutional: 'Institucional',
  pdf: 'PDF',
};

export const academicTypeLabels: Record<string, string> = {
  article: 'Artigo',
  chapter: 'Capítulo',
  thesis: 'Tese',
  class: 'Aula',
};

export const academicGroupLabels: Record<string, string> = {
  article: 'Artigos',
  chapter: 'Capítulos',
  thesis: 'Tese',
  class: 'Aulas',
};

export const filterLabels: Record<string, string> = {
  all: 'Todos',
  video: 'Vídeo',
  editorial: 'Editorial',
  institutional: 'Institucional',
  pdf: 'PDF',
};
