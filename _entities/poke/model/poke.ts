import type { Type } from '@/_entities/type/@x/poke';

interface PokeForm {
  identifier: string;
  // 정식 명칭 (예: 가라르의 모습, 메가진화)
  nameKo: string;
  // 이름 뒤에 붙이는 표기. 이름에 이미 폼이 들어간 경우(메가 등) null
  shortKo: string | null;
}

interface Poke {
  pokeKey: string;
  nameKo: string;
  dexNumber: number;
  sprite: string;
  form: PokeForm | null;
  type1: Type;
  type2: Type | null;
}

const getPokeHref = (poke: Pick<Poke, 'pokeKey'>) => `/pokedex/${poke.pokeKey}`;

// 렌더링, 상성 조회(id 목록)에서 type2 null 처리를 반복하지 않도록
const getPokeTypes = (poke: Pick<Poke, 'type1' | 'type2'>): Type[] =>
  poke.type2 ? [poke.type1, poke.type2] : [poke.type1];

export type { Poke, PokeForm };

export { getPokeHref, getPokeTypes };
