const EVOLUTION_MOVE_LIST = {
  rollout: '구르기',
  'ancient-power': '원시의힘',
  mimic: '흉내내기',
  'double-hit': '더블어택',
  'twin-beam': '트윈빔',
  'hyper-drill': '하이퍼드릴',
  'barb-barrage': '독침천발',
  'psyshield-bash': '배리어러시',
  stomp: '짓밟기',
  'dragon-pulse': '용의파동',
  taunt: '도발',
  'dragon-cheer': '드래곤옐',
  'rage-fist': '분노의주먹',
};

export type EvolutionMove = keyof typeof EVOLUTION_MOVE_LIST;

export { EVOLUTION_MOVE_LIST };
