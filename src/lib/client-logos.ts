export interface ClientLogo {
  src: string;
  alt: string;
}

const logoNames: Record<string, string> = {
  brde: 'BRDE',
  conversion: 'Conversion',
  cwb: 'CWB',
  'editora-inverso': 'Editora Inverso',
  fae: 'FAE',
  fecomercio: 'Fecomércio',
  'fecomercio-sp': 'Fecomércio SP',
  fgvisae: 'FGV Isae',
  'gazeta-do-povo': 'Gazeta do Povo',
  ifpr: 'IFPR',
  kroton: 'Kroton',
  senar: 'SENAR',
  'sesc-pr': 'Sesc PR',
  setcepar: 'Setcepar',
  'sindiloc-pr': 'Sindiloc PR',
  tribuna: 'Tribuna',
  uninter: 'Uninter',
  unianchieta: 'UniAnchieta',
  unidombosco: 'UniDom Bosco',
  utp: 'UTP',
};

const logoOrder = [
  'gazeta-do-povo',
  'tribuna',
  'fecomercio',
  'fecomercio-sp',
  'senar',
  'sesc-pr',
  'ifpr',
  'uninter',
  'unianchieta',
  'unidombosco',
  'kroton',
  'fae',
  'utp',
  'brde',
  'cwb',
  'setcepar',
  'sindiloc-pr',
  'fgvisae',
  'editora-inverso',
  'conversion',
] as const;

function logoAlt(filename: string): string {
  const slug = filename.replace(/\.[^.]+$/, '');
  return logoNames[slug] ?? slug.replace(/-/g, ' ');
}

export function sortClientLogos(files: string[]): ClientLogo[] {
  const orderIndex = new Map(logoOrder.map((slug, index) => [slug, index]));

  return files
    .map((file) => ({
      src: `/logos/${file}`,
      alt: logoAlt(file),
      order: orderIndex.get(file.replace(/\.[^.]+$/, '') as (typeof logoOrder)[number]) ?? 999,
    }))
    .sort((a, b) => a.order - b.order)
    .map(({ src, alt }) => ({ src, alt }));
}
