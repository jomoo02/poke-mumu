# 종족값 목록 툴바(검색·이름 언어·필터) VOC 조사 (2026-10-27)

대상: /pokedex/national-base-stats 툴바 배치, 페이지네이션 전환.

자료가 부족하다. 툴바 배치(검색창·필터 위치)에 대한 포켓몬 사이트 실사용자 불만은 찾지 못했다.
페이지네이션·가상 스크롤은 `list-pagination-virtualization.md`(2026-10-19)를 재사용한다.

## 불만 / 아쉬운 점

| # | 내용 (요약) | 대상 사이트 | 출처 | 빈도 |
|---|---|---|---|---|
| 1 | 모바일에서 검색창이 숨겨져 있고 메뉴 탭 영역이 좁았다 (사이트 개편 이유로 운영자가 밝힘) | Pokémon Database | [pokemondb 뉴스 (2018)](https://pokemondb.net/news/234/welcome-to-pokemon-database-version-4) | 단일 (운영자 글) |
| 2 | 세대 필터가 없어 "번호순으로 읽다가 4세대가 나오면 멈추라"는 답을 받음 | Pokémon Database | [PokéBase Q&A](https://pokemondb.net/pokebase/meta/21696/generation-specific-option-for-the-type-coverage-page) | 단일 |

## 원하는 점

| # | 내용 | 출처 | 빈도 |
|---|---|---|---|
| 1 | 타입·종족값 등 여러 조건을 함께 거는 검색 | [Bulbagarden 포럼](https://bulbagarden.net/goto/post?id=6273023) | 단일 |

## 경쟁 사이트 기대치

- pokemondb `/pokedex/all`: 검색창 하나 + 머리글 정렬. 필터 없음, 한 페이지 전체.
- 커뮤니티 PokeAPI 도감: 검색창 바로 아래에 타입·세대 드롭다운 ([예시](https://www.mintlify.com/mueses1/PokeApi/guide/filtering)).

## 포켓몬 외 사례: 필터 툴바 배치 (2026-10-27 추가)

이커머스 UX 연구와 디자인 시스템 가이드. 실사용자 불만이 아니라 연구 결론·가이드라인이다.

| # | 내용 (요약) | 출처 | 빈도 |
|---|---|---|---|
| 1 | 가로 툴바는 필터 종류가 적을 때 맞다. 6~8개를 넘으면 사용자가 헤맸다. 사이드바가 더 흔하다 (가로 툴바는 24%) | [Baymard](https://baymard.com/blog/horizontal-filtering-sorting-design) | 반복 (연구) |
| 2 | 필터가 5개 미만이면 목록 위 가로 툴바, 그 이상이면 왼쪽 사이드바 | [Shopify 스토어 필터 가이드](https://shopify.dev/themes/navigation-search/filtering/storefront-filtering/storefront-filtering-ux) | 가이드 |
| 3 | 필터 카테고리 5개 이하면 단순 필터 바 | [Dynatrace](https://developer.dynatrace.com/design/filtering/) | 가이드 |
| 4 | 빠른 필터는 3개까지 바에 두고, 넘치면 "필터" 버튼 안으로 | [WPP](https://developers.os.wpp.com/docs/design-system/components/selection-and-input/toolbar), [Innovaccer](https://design.innovaccer.com/patterns/tableFilters/usage/) | 가이드 ×2 |
| 5 | 순서는 검색 → 필터 → 정렬·조정. 폭이 모자라면 두 줄로 내린다 | [Tangram](https://tangram.rdstation.com.br/en/docs/patterns/filters/) | 가이드 |
| 6 | 드롭다운 필터 트리거에는 고른 값을 보여 준다 | [Primer](https://primer.style/product/scenario-patterns/filter) | 가이드 |
| 7 | 적용된 필터를 목록 위에서 한눈에 보여 주지 않으면 하나만 놓쳐도 결과를 잘못 이해한다. 개수만 표시하는 것은 피한다 | [Baymard](https://baymard.com/blog/how-to-design-applied-filters) | 반복 (연구) |
| 8 | 필터 바는 표 안이 아닌 표 위의 독립 툴바로. 결과 수를 polite live region으로 알린다 | [Axmed](https://www.mintlify.com/ax-derrick/axmed-design-system/components/filter-bar) | 가이드 |
| 9 | 검색은 아직 안 보이는 것을 찾고, 필터는 보이는 목록을 좁힌다. 둘은 가까이 두되 구분한다 | [Primer 검색 패턴](https://primer.style/product/scenario-patterns/search) | 가이드 |
| 10 | 데스크톱 필터 바는 가로로 늘어놓고 폭이 모자라면 다음 줄로 감싼다 | [SAP Fiori (2016)](https://experience.sap.com/fiori-design-web/v1-26/filter-bar) | 가이드 (오래됨) |
| 11 | 선택한 값마다 칩 + 전체 초기화 | [Visa](https://design.visa.com/patterns/filters) | 가이드 |

요약: 필터 3개(+ 이름 언어)인 이 페이지는 가로 툴바 범위 안이다. 사이드바나 "필터" 버튼으로 묶을 이유가 없다.

## 초기화 버튼 위치: 데스크톱·모바일 실제 사례 (2026-10-27 브라우저 확인)

1280px·375px에서 필터를 하나 켠 뒤 직접 확인했다.

| 사이트 | 데스크톱 | 모바일 |
|---|---|---|
| [오늘의집](https://ohou.se/store/category?category_id=10000000) | 필터 바 아래 '적용 필터 줄'(회색 띠): 칩 왼쪽, `↻ 초기화` 오른쪽 끝. 그 아래 `전체 N개` ↔ 정렬 | 같은 줄 구조, 오른쪽 끝에 `↻` 아이콘만 (글자 없음). 개수·정렬·필터 버튼 줄은 그 위 |
| [무신사](https://www.musinsa.com/category/001) | 필터 바 아래 적용 필터 줄: `● 블랙 ×` 왼쪽, `초기화` 글자 링크 오른쪽 끝 | 데스크톱과 같다 (오른쪽 끝 `초기화`, 밑줄 글자) |
| [Rotten Tomatoes](https://www.rottentomatoes.com/browse/movies_at_home/genres:action) | 필터 칩 줄 아래 별도 줄 왼쪽에 `Reset Filters` 글자 링크 | 같다 (칩 줄은 가로 스크롤, 링크는 그 아래 왼쪽) |
| [shadcn/ui Tasks](https://ui.shadcn.com/examples/tasks) (소스 확인) | `[입력][Status][Priority][Reset ×]` — 필터 묶음 끝, 켜졌을 때만 | 같은 줄 (줄바꿈 없음) |

관찰:
- 데스크톱에서 초기화가 오른쪽 끝인 두 곳(오늘의집·무신사)은 모바일에서도 **같은 줄의 오른쪽 끝**을 지킨다. 모바일에서 위치를 옮긴 사례는 없었다.
- 두 곳 모두 그 줄은 필터가 켜졌을 때만 나타나는 '적용 필터 줄'이다 (가로 스크롤되는 필터 버튼 줄 안이 아니다).
- 모바일 공간이 좁으면 글자를 빼고 아이콘만 둔다 (오늘의집).

## poke-mumu 기회

1. 검색창을 모바일에서도 숨기지 않고 바로 쓰게 둔다 (불만 #1)
2. 세대·타입·모습 필터는 이미 경쟁 사이트보다 앞선다. 배치만 정리하면 된다 (불만 #2, 요청 #1)
3. 페이지네이션 전환 시 기존 기회(돌아올 때 위치, Ctrl+F, 순위 이어 보기)를 잃는 대가가 있다 (`list-pagination-virtualization.md`)
