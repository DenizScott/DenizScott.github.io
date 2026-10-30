const urls = import.meta.glob('../assets/**/*.{webp,png}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

function url(path: string): string {
  const found = urls[`../assets/${path}`];
  if (!found) throw new Error(`Missing asset: src/assets/${path}`);
  return found;
}

export interface MediaAsset {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
}

/** 16:9 captures stored at 800 w and 1600 w. */
const shot = (slug: string, name: string): MediaAsset => ({
  src: url(`projects/${slug}/${name}-1600.webp`),
  srcSet: `${url(`projects/${slug}/${name}-800.webp`)} 800w, ${url(`projects/${slug}/${name}-1600.webp`)} 1600w`,
  width: 1600,
  height: 900,
});

const single = (path: string, width: number, height: number): MediaAsset => ({ src: url(path), width, height });
const character = (name: string) => single(`projects/cyber-rebirth/${name}.webp`, 505, 700);
const location = (name: string) => single(`projects/cyber-rebirth/${name}.webp`, 700, 409);

/**
 * Media registry. Project content refers to these ids (see src/data/projects.ts).
 * Add a new image: drop it in src/assets/projects/<slug>/ and register it here with its real pixel size.
 */
export const media: Record<string, MediaAsset> = {
  'underwake/street-night': shot('underwake', 'street-night'),
  'underwake/station-mercer-row': shot('underwake', 'station-mercer-row'),
  'underwake/train-interior': shot('underwake', 'train-interior'),
  'underwake/train-boarding': shot('underwake', 'train-boarding'),
  'underwake/turnstiles': shot('underwake', 'turnstiles'),
  'underwake/office-desk': shot('underwake', 'office-desk'),
  'underwake/office-interaction': shot('underwake', 'office-interaction'),
  'underwake/hands-light': shot('underwake', 'hands-light'),

  'omni/weather-panel': single('projects/omni/weather-panel.webp', 475, 388),

  'cyber-rebirth/back': character('back'),
  'cyber-rebirth/kod-kirici': character('kod-kirici'),
  'cyber-rebirth/rock-yildizi': character('rock-yildizi'),
  'cyber-rebirth/cerrah': character('cerrah'),
  'cyber-rebirth/guvenlik-sefi': character('guvenlik-sefi'),
  'cyber-rebirth/sehir-yoneticisi': character('sehir-yoneticisi'),
  'cyber-rebirth/veri-copcusu': character('veri-copcusu'),
  'cyber-rebirth/neon-ussu': location('neon-ussu'),
  'cyber-rebirth/akim-galerisi': location('akim-galerisi'),
  'cyber-rebirth/yasam-serasi': location('yasam-serasi'),
  'cyber-rebirth/jackpot-pub': location('jackpot-pub'),
  'cyber-rebirth/sunucu-odasi': location('sunucu-odasi'),
};

export function getMedia(id: string): MediaAsset {
  const asset = media[id];
  if (!asset) throw new Error(`Unknown media id "${id}". Register it in src/lib/media.ts`);
  return asset;
}

export const portrait: MediaAsset = single('profile/deniz.webp', 600, 600);
export const omniIcon: MediaAsset = single('projects/omni/icon.png', 512, 512);
