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

## 결과 수·필터 버튼 위치 (2026-10-30 추가)

대상: 툴바를 `[검색][필터] … [개수]` / `[검색][개수] … [필터]` / `[검색][필터]` + 개수는 표 위 결과 줄 중 무엇으로 둘지.
자료 부족. 포켓몬 사이트 사용자가 결과 수·필터 버튼 좌우 위치를 두고 불평한 글은 찾지 못했다.

| # | 내용 (요약) | 출처 | 빈도 |
|---|---|---|---|
| 1 | 결과 총수를 눈에 띄게, 지금 보이는 목록의 수를 보여 준다 (Baymard #377·#531, 2차 요약이라 원문 위치 권고는 확인 못 함) | [Ferguson 위키 요약](https://fergusonprod.atlassian.net/wiki/x/oQjDC) | 연구 (간접) |
| 2 | 필터 결과 수와 전체 해제를 함께 제공 | [Pleo Telescope](https://telescope.pleo.io/components/filter-results/filter-results.guidelines) | 가이드 |
| 3 | 검색 왼쪽·버튼 오른쪽이 균형이라는 의견과, 습관상 검색은 왼쪽이라는 의견이 섞임. 좌우 표준은 없음 | [Joomla 이슈](https://issues.joomla.org/tracker/joomla-cms/22314) | 단일 (포럼) |
| 4 | 필터 위치가 애매하면 결과 위에 둔다 (좌우는 다루지 않음) | [yellowslice](https://www.yellowslice.in/bed/best-practices-for-designing-search-box-and-filter-design/) | 단일 (블로그) |

실제 사례 (2026-10-30 확인):

| 사이트 | 배치 |
|---|---|
| [PokeTools 고급 검색](https://www.poketools.com/advanced-search) | 한 줄: `[이름][타입][최소 BST][정렬] 1,025 of 1,025 match [RESET]` → 둘째 줄 세대·추가 필터·보기 전환 → 표. 개수가 필터 줄 끝, 초기화 옆 |
| [pokemondb /pokedex/all](https://pokemondb.net/pokedex/all) | `[이름][타입]` → 표. 결과 수 없음 |
| 오늘의집·무신사 (위 10-27 확인) | 필터 바 → 적용 필터 줄 → `전체 N개 ↔ 정렬` 결과 줄 → 목록. 개수는 결과 줄 |

관찰: 포켓몬 도구는 개수를 필터 줄 끝에 두거나(PokeTools) 아예 없다(pokemondb).
이커머스는 개수를 필터와 떨어진 결과 줄(정렬과 한 줄)에 둔다. 필터 버튼을 검색과 떼어 반대쪽 끝에 둔 사례는 찾지 못했다.

## 필터 버튼 위치 ↔ 통합 필터 패널이 열리는 쪽 (2026-10-30 브라우저 확인)

1280px에서 필터 버튼을 눌러 직접 확인했다. Nike는 동의 창이 '모두 동의'뿐이라, 29CM는 통합 필터 버튼을 찾지 못해 뺐다.

| 사이트 | 버튼 위치 | 열리는 곳 | 패널 아래 | 켠 필터 표시 |
|---|---|---|---|---|
| [H&M](https://www2.hm.com/en_us/men/products/view-all.html) | 오른쪽 끝 `FILTER ⇄`. 같은 줄 왼쪽은 `N Products` | **오른쪽** 시트 (항목마다 → 로 들어가는 목록) | `[CLEAR] [VIEW (2565)]` | 칩 없음. 버튼이 `(1) FILTER` |
| [Etsy](https://www.etsy.com/c/home-and-living) | 왼쪽 `All Filters`. 같은 줄 오른쪽은 개수·정렬 | **왼쪽** 시트 | `[Cancel] [Apply]` (바로 반영 아님) | (확인 안 함) |
| [Airbnb](https://www.airbnb.co.kr/s/Seoul/homes) | 왼쪽, 빠른 필터 칩 줄 맨 앞 `필터` | **가운데** 모달 | `[전체 해제] [숙소 N개 이상 보기]` | (확인 안 함) |
| [Zara](https://www.zara.com/us/en/man-trousers-l838.html) | 왼쪽 카테고리 목록 아래 `FILTERS` | **오른쪽** 패널 | `[VIEW RESULTS]` | (확인 안 함) |

관찰:
- 시트는 대체로 버튼이 있는 쪽에서 열린다 (H&M 오른쪽→오른쪽, Etsy 왼쪽→왼쪽). 어긋난 곳은 Zara 하나(왼쪽→오른쪽).
- 오른쪽 끝에 버튼을 둔 H&M은 그 줄 반대쪽(왼쪽)에 결과 수를 두고, 켠 필터는 칩 대신 버튼 숫자로만 보인다.
- 왼쪽에 버튼을 둔 곳(Etsy·Airbnb)은 버튼이 필터 줄·칩 줄의 맨 앞이다. 시트를 왼쪽으로 열거나 가운데 모달로 연다.

## 페이지 안 검색창 위치: 검색 + 필터가 함께 있는 목록 (2026-10-30 브라우저 확인, 1280px)

사이트 전체 검색(헤더)이 아니라 그 목록만 거르는 검색창을 봤다.

| 사이트 | 배치 | 유형 |
|---|---|---|
| [GitHub 조직 저장소](https://github.com/vercel?tab=repositories) | `[Find a repository… (flex-1)] [Type▾] [Language▾] [Sort▾]` 한 줄. 드롭다운이 오른쪽 끝 | 필터 줄 안, 검색이 남는 폭을 채움 |
| [shadcn/ui Tasks](https://ui.shadcn.com/examples/tasks) | `[Filter tasks… (좁은 고정 폭)] [Status] [Priority]` … `[View] [Add Task]` | 필터 줄 안, 검색 고정 폭 + 오른쪽 끝은 보기 도구 |
| [pokemondb /pokedex/all](https://pokemondb.net/pokedex/all) | 표 위 가운데 한 줄 `Name: [입력]  Type: [▾]` | 필터 줄 안 (가운데 정렬) |
| [PokeTools](https://www.poketools.com/advanced-search) (10-30 위 기록) | `[이름][타입][최소 BST][정렬] N of N match [RESET]` | 필터 줄 안, 맨 앞 |
| [Hugging Face Models](https://huggingface.co/models) | 목록 제목 줄: `Models 3,197,692 [Filter by name]` … `[토글] [Sort]`. 필터는 왼쪽 사이드바 | 목록 제목 줄 (제목·개수 바로 뒤, 좁은 폭) |
| [포켓몬코리아 도감](https://pokemonkorea.co.kr/pokedex) | 진한 띠 한 줄: `포켓몬 도감` 제목 왼쪽 + 검색창이 나머지 폭 전체. 아래 `상세검색` 토글, 오른쪽 정렬 | 제목 줄 (검색이 나머지 채움), 필터는 접힘 |
| [pokemon.com 도감](https://www.pokemon.com/us/pokedex) | 제목 아래 띠에 `Name or Number` 큰 입력(왼쪽 절반) + 설명. 아래 `Show Advanced Search`, 오른쪽 정렬 | 검색 혼자 한 줄 (절반 폭), 필터는 접힘 |

관찰:
- **필터가 늘 보이는 목록(데이터 표)은 검색을 필터와 같은 줄 맨 앞에 둔다** (GitHub·shadcn·pokemondb·PokeTools). 오른쪽 끝은 드롭다운·보기 도구·개수 중 하나가 잡는다.
- **검색이 혼자 한 줄이거나 제목 줄에 있는 곳은 필터를 접어 둔다** (pokemon.com·포켓몬코리아 '상세검색'). 검색이 주 기능인 "도감 찾기" 화면이다.
- 제목 줄 검색(HF·포켓몬코리아)은 제목에 바로 붙는다. 제목 왼쪽·검색 오른쪽 끝으로 떨어뜨린 사례는 이번엔 없었다.

## poke-mumu 기회

1. 검색창을 모바일에서도 숨기지 않고 바로 쓰게 둔다 (불만 #1)
2. 세대·타입·모습 필터는 이미 경쟁 사이트보다 앞선다. 배치만 정리하면 된다 (불만 #2, 요청 #1)
3. 페이지네이션 전환 시 기존 기회(돌아올 때 위치, Ctrl+F, 순위 이어 보기)를 잃는 대가가 있다 (`list-pagination-virtualization.md`)
