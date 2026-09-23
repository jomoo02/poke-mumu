const getPokeSpriteSrc = (sprite: string) => {
  const src = `https://raw.githubusercontent.com/jomoo02/poke_sprites/refs/heads/main/home/${sprite}.png`;

  return src;
};

const getPokeArtworkSrc = (sprite: string) => {
  const src = `https://raw.githubusercontent.com/jomoo02/poke_sprites/refs/heads/main/info/${sprite}.png`;

  return src;
};

export { getPokeSpriteSrc, getPokeArtworkSrc };
