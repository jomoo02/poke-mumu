import type { Poke } from '../poke';

// 폼 약칭이 있으면 "이름 (약칭)" — 예: 나옹 (가라르)
const getPokeName = (
  poke: Pick<Poke, 'nameKo' | 'form'>,
  { withForm = true }: { withForm?: boolean } = {},
) =>
  withForm && poke.form?.shortKo
    ? `${poke.nameKo} (${poke.form.shortKo})`
    : poke.nameKo;

const formatDexNumber = (dexNumber: number, length = 4) =>
  `No.${String(dexNumber).padStart(length, '0')}`;

export { getPokeName, formatDexNumber };
