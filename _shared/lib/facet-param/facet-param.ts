import { createParser, parseAsArrayOf } from 'nuqs/server';

// 여러 필터(그룹)의 선택을 URL 값 하나에 고른 순서대로 담는다.
// ?filter=type.fire_damageClass.physical_type.grass
// 값 하나라 서버가 쿼리를 키별로 다시 묶어도 순서가 그대로 남는다 (키 여러 개면 키 사이 순서를 잃는다)
interface Facet {
  group: string;
  value: string;
}

// 두 구분자 모두 URLSearchParams·encodeURIComponent·nuqs 어느 쪽도 인코딩하지 않는 문자라
// 어떤 코드가 URL을 다시 써도 모양이 같다 (','는 %2C가 된다).
// 그룹 이름·값에는 '_'를 쓸 수 없다 ('_'는 인코딩으로 피할 수 없어 항목이 잘못 나뉜다.
// 잘못 나뉜 항목은 유효하지 않은 값으로 무시된다). identifier는 케밥 케이스라 해당 없음

// 그룹과 값 사이
const GROUP_SEPARATOR = '.';

// 항목 사이
const ITEM_SEPARATOR = '_';

// 'type.fire' → { group: 'type', value: 'fire' }. 첫 구분자에서 나누고, 한쪽이 비면 버린다
const parseFacet = (raw: string): Facet | null => {
  const index = raw.indexOf(GROUP_SEPARATOR);

  if (index <= 0 || index === raw.length - 1) {
    return null;
  }

  return { group: raw.slice(0, index), value: raw.slice(index + 1) };
};

const formatFacet = ({ group, value }: Facet): string =>
  `${group}${GROUP_SEPARATOR}${value}`;

const isSameFacet = (a: Facet, b: Facet) =>
  a.group === b.group && a.value === b.value;

// 형식이 틀린 항목은 parseAsArrayOf가 빼고, 선택이 없으면 URL에서 키를 지운다
const parseAsFacets = parseAsArrayOf(
  createParser({ parse: parseFacet, serialize: formatFacet, eq: isSameFacet }),
  ITEM_SEPARATOR,
).withDefault([]);

// 있으면 빼고, 없으면 맨 뒤에 붙인다 (고른 순서 유지)
const toggleFacet = (facets: readonly Facet[], facet: Facet): Facet[] =>
  facets.some((item) => isSameFacet(item, facet))
    ? facets.filter((item) => !isSameFacet(item, facet))
    : [...facets, facet];

const removeFacetGroup = (facets: readonly Facet[], group: string): Facet[] =>
  facets.filter((item) => item.group !== group);

export type { Facet };

export {
  parseFacet,
  formatFacet,
  parseAsFacets,
  toggleFacet,
  removeFacetGroup,
};
