const useItemMap: Record<string, { name: string; href: string }> = {
  'thunder-stone': { name: '천둥의돌', href: '/item/thunder-stone' },
  'ice-stone': { name: '얼음의돌', href: '/item/ice-stone' },
  'moon-stone': { name: '달의돌', href: '/item/moon-stone' },
  'fire-stone': { name: '불의돌', href: '/item/fire-stone' },
  'leaf-stone': { name: '풀의돌', href: '/item/leaf-stone' },
  'sun-stone': { name: '태양의돌', href: '/item/sun-stone' },
  'water-stone': { name: '물의돌', href: '/item/water-stone' },
  'galarica-cuff': { name: '가라두구팔찌', href: '/item/galarica-cuff' },
  'galarica-wreath': {
    name: '가라두구머리장식',
    href: '/item/galarica-wreath',
  },
  'black-augurite': { name: '검은휘석', href: '/item/black-augurite' },
  'shiny-stone': { name: '빛의돌', href: '/item/shiny-stone' },
  'dusk-stone': { name: '어둠의돌', href: '/item/dusk-stone' },
  'peat-block': { name: '피트블록', href: '/item/peat-block' },
  'dawn-stone': { name: '각성의돌', href: '/item/dawn-stone' },
  'chipped-pot': { name: '이빠진포트', href: '/item/chipped-pot' },
  'cracked-pot': { name: '깨진포트', href: '/item/cracked-pot' },
  'metal-alloy': { name: '복합금속', href: '/item/metal-alloy' },
  'scroll-of-darkness': { name: '악의족자', href: '/item/scroll-of-darkness' },
  'scroll-of-waters': { name: '물의족자', href: '/item/scroll-of-waters' },
  'auspicious-armor': { name: '축복받은갑옷', href: '/item/auspicious-armor' },
  'malicious-armor': { name: '저주받은갑옷', href: '/item/malicious-armor' },
  'masterpiece-teacup': { name: '걸작찻잔', href: '/item/masterpiece-teacup' },
  'unremarkable-teacup': {
    name: '범작찻잔',
    href: '/item/unremarkable-teacup',
  },
  'tart-apple': { name: '새콤한사과', href: '/item/tart-apple' },
  'sweet-apple': { name: '달콤한사과', href: '/item/sweet-apple' },
  'syrupy-apple': { name: '꿀맛사과', href: '/item/syrupy-apple' },
};

const tradeItemMap: Record<string, { name: string; href: string }> = {
  'kings-rock': { name: '왕의징표석', href: '/item/kings-rock' },
  'metal-coat': { name: '메탈코트', href: '/item/metal-coat' },
  protector: { name: '프로텍터', href: '/item/protector' },
  'dragon-scale': { name: '용의비늘', href: '/item/dragon-scale' },
  electirizer: { name: '에레키부스터', href: '/item/electirizer' },
  magmarizer: { name: '마그마부스터', href: '/item/magmarizer' },
  'up-grade': { name: '업그레이드', href: '/item/up-grade' },
  'dubious-disc': { name: '괴상한패치', href: '/item/dubious-disc' },
  'prism-scale': { name: '고운비늘', href: '/item/prism-scale' },
  'reaper-cloth': { name: '영계의천', href: '/item/reaper-cloth' },
  'deep-sea-tooth': { name: '심해의이빨', href: '/item/deep-sea-tooth' },
  'deep-sea-scale': { name: '심해의비늘', href: '/item/deep-sea-scale' },
  sachet: { name: '향기주머니', href: '/item/sachet' },
  'whipped-dream': { name: '휘핑팝', href: '/item/whipped-dream' },
};

const heldItemMap: Record<string, { name: string; href: string }> = {
  'razor-fang': { name: '예리한이빨', href: '/item/razor-fang' },
  'razor-claw': { name: '예리한손톱', href: '/item/razor-claw' },
  'oval-stone': { name: '동글동글돌', href: '/item/oval-stone' },
  sweet: { name: '사탕공예', href: '/item/sweet' },
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

export default function getDetailDisplayLink(key: string) {
  if (pokeMap[key]) {
    return pokeMap[key];
  }

  if (locationMap[key]) {
    return { name: locationMap[key] };
  }

  const restMap = {
    ...useItemMap,
    ...tradeItemMap,
    ...heldItemMap,
    ...moveMap,
  };

  if (restMap[key]) {
    return { name: restMap[key].name };
  }

  return null;
}
