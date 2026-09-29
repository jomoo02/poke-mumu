import type { Poke } from '../poke';

const SPRITE_BASE_URL =
  'https://raw.githubusercontent.com/jomoo02/poke_sprites/refs/heads/main/home';

const getPokeSpriteSrc = (poke: Pick<Poke, 'sprite'>) =>
  `${SPRITE_BASE_URL}/${poke.sprite}.png`;

const ARTWORK_BASE_URL =
  'https://raw.githubusercontent.com/jomoo02/poke_sprites/refs/heads/main/info';

const getPokeArtworkSrc = (poke: Pick<Poke, 'sprite'>) =>
  `${ARTWORK_BASE_URL}/${poke.sprite}.png`;

export { getPokeArtworkSrc, getPokeSpriteSrc };
