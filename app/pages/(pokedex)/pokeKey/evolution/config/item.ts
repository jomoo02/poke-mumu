const ITEM_NAMES_KO: Record<string, string> = {
  'thunder-stone': '천둥의돌',
  'ice-stone': '얼음의돌',
  'moon-stone': '달의돌',
  'fire-stone': '불의돌',
  'leaf-stone': '풀의돌',
  'sun-stone': '태양의돌',
  'water-stone': '물의돌',
  'galarica-cuff': '가라두구팔찌',
  'galarica-wreath': '가라두구머리장식',
  'black-augurite': '검은휘석',
  'shiny-stone': '빛의돌',
  'dusk-stone': '어둠의돌',
  'peat-block': '피트블록',
  'dawn-stone': '각성의돌',
  'chipped-pot': '이빠진포트',
  'cracked-pot': '깨진포트',
  'metal-alloy': '복합금속',
  'scroll-of-darkness': '악의족자',
  'scroll-of-waters': '물의족자',
  'auspicious-armor': '축복받은갑옷',
  'malicious-armor': '저주받은갑옷',
  'masterpiece-teacup': '걸작찻잔',
  'unremarkable-teacup': '범작찻잔',
  'tart-apple': '새콤한사과',
  'sweet-apple': '달콤한사과',
  'syrupy-apple': '꿀맛사과',

  'kings-rock': '왕의징표석',
  'metal-coat': '메탈코트',
  protector: '프로텍터',
  'dragon-scale': '용의비늘',
  electirizer: '에레키부스터',
  magmarizer: '마그마부스터',
  'up-grade': '업그레이드',
  'dubious-disc': '괴상한패치',
  'prism-scale': '고운비늘',
  'reaper-cloth': '영계의천',
  'deep-sea-tooth': '심해의이빨',
  'deep-sea-scale': '심해의비늘',
  sachet: '향기주머니',
  'whipped-dream': '휘핑팝',

  'razor-fang': '예리한이빨',
  'razor-claw': '예리한손톱',
  'oval-stone': '동글동글돌',
  sweet: '사탕공예',
};

const moveMap: Record<string, { name: string; href: string }> = {
  'ancient-power': { name: '원시의힘', href: '/move/ancient-power' },
  'barb-barrage': { name: '독침천발', href: '/move/barb-barrage' },
  'dragon-pulse': { name: '용의파동', href: '/move/dragon-pulse' },
  'dragon-cheer': { name: '드래곤옐', href: '/move/dragon-cheer' },
  'rage-fist': { name: '분노의주먹', href: '/move/rage-fist' },
  'psyshield-bash': { name: '배리어러시', href: '/move/psyshield-bash' },
  'hyper-drill': { name: '하이퍼드릴', href: '/move/hyper-drill' },
  'double-hit': { name: '더블어택', href: '/move/double-hit' },
  'twin-beam': { name: '트윈빔', href: '/move/twin-beam' },
  stomp: { name: '짓밟기', href: '/move/stomp' },
  rollout: { name: '구르기', href: '/move/rollout' },
  mimic: { name: '흉내내기', href: '/move/mimic' },
  taunt: { name: '도발', href: '/move/taunt' },
};

const pokeMap: Record<string, { name: string; href: string }> = {
  shelmet: { name: '쪼마리', href: '/pokedex/616/shelmet' },
  karrablast: { name: '딱정곤', href: '/pokedex/588/karrablast' },
  remoraid: { name: '총어', href: '/pokedex/223/remoraid' },
};

const locationMap: Record<string, string> = {
  'mossy-rock': '이끼 낀 바위',
  'icy-rock': '얼음 바위',
  'magnetic-field': '자기장 영역',
  'mount-lanakila': '라나키라마운틴',
};

export function getItemNameKo(key: string): string {
  return ITEM_NAMES_KO[key] ?? key;
}

// export default function getDetailDisplayLink(key: string) {
//   if (pokeMap[key]) {
//     return pokeMap[key];
//   }

//   if (locationMap[key]) {
//     return { name: locationMap[key] };
//   }

//   const restMap = {
//     ...useItemMap,
//     ...moveMap,
//   };

//   if (restMap[key]) {
//     return { name: restMap[key].name };
//   }

//   return null;
// }
