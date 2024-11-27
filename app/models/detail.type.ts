import type { PokeType } from '../data/poke-type';
import type { DamageClass } from '../data/damage-class';
import type { Version } from '../data/version';

export type Form = {
  name: {
    en: string;
    ko: string;
  };
  id: string;
};

export type Name = {
  en: string;
  ko: string;
};

export type MachineType = 'tm' | 'hm' | 'tr';

export type Move = {
  accuracy: number;
  power: number | null;
  damage_class: DamageClass;
  type: PokeType;
  name: Name;
  level?: number;
  machine?: {
    id: number;
    type: MachineType;
    number: number;
  };
  preIds?: number[];
};

export type MachineMove = Omit<Move, 'machine'> & {
  machine: {
    id: number;
    type: MachineType;
    number: number;
  };
};

export type VersionMove = {
  'level-up': Move[] | [];
  machine: Move[] | [];
  tutor: Move[] | [];
  egg: Move[] | [];
  pre: Move[] | [];
  reminder: Move[] | [];
};

export type GenMoveList = {
  version: Version;
  versionMoves: VersionMove;
}[];

export type Moves = {
  gen: number;
  genMoves: GenMoveList;
}[];

export type Detail = {
  pokeKey: string;
  chainIndex: number;
  forms: Form[];
  speciesName: Name;
  moves: Moves;
};