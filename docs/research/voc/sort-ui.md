# 목록 정렬 UI VOC 조사 (2026-10-19)

대상: 전국도감 종족값(/pokedex/national-base-stats), 기술 목록(/move)의 정렬 UI.
결과: 포켓몬 사이트의 정렬 UI를 직접 다룬 사용자 글은 적다 (자료 부족). 레딧과 국내 커뮤니티 글은 검색에 거의 잡히지 않았다.

## 불만 / 아쉬운 점

| # | 내용 (요약) | 대상 사이트 | 출처 | 빈도 |
|---|---|---|---|---|
| 1 | 능력치 열 정렬이 높은 순으로만 됨. 트릭룸용으로 가장 느린 포켓몬을 찾으려면 끝까지 스크롤해야 함. 같은 열을 다시 누르면 반대로 바뀌는 방식(위키식)을 요청. 2022-12에 "두 번째 클릭은 낮은 순"으로 반영됨 | Pokémon Showdown 팀빌더 | [Smogon (2020-02, 반영 2022-12)](https://www.smogon.com/forums/threads/add-the-ability-to-sort-by-stat-in-the-teambuilder-from-lowest-to-highest.3660328/) | 단일 (후속 댓글 1건 동의) |
| 2 | 정렬 가능한 표가 모바일에서는 동작하지 않고, 일반 정적 표로 보임 | Bulbapedia | [Help:Tables](https://bulbapedia.bulbagarden.net/wiki/Help:Tables) (검색 요약만, 본문은 403으로 확인 못 함) | 단일 (공식 도움말) |
| 3 | 포켓몬 줄이 이미 넓어, 열(사용률 %)을 더 넣기 부담스러움 | Pokémon Showdown 팀빌더 | [Smogon (2026-06)](https://www.smogon.com/forums/threads/sort-teambuilder-by-usage-stats.3783319/) | 단일 |
| 4 | 폰에서 잘 되는 한국어 도감이 없어 직접 만듦. 작은 화면에서 가로 스크롤 없이 보이도록 함 | 국내 도감 사이트 전반 | [디시 닌텐도 마이너 갤 (2020-11)](https://gall.dcinside.com/mgallery/board/view/?id=game_nintendo&no=608760) | 단일 (제작자 글) |

## 원하는 점 (요청 사항)

| # | 내용 | 출처 | 빈도 |
|---|---|---|---|
| 1 | 능력치 낮은 순 정렬 (트릭룸: 느린 포켓몬 찾기) | 불만 #1과 같음 | 단일 |
| 2 | 도감 순서와 이름순 말고 종족값과 각 능력치로도 정렬 | [pokeductor issue #51](https://github.com/Huseynteymurzade28/pokeductor/issues/51) | 단일 (오픈소스) |

## 경쟁 사이트가 잘하는 점 (유지해야 할 기대치)

- **머리글 정렬:** 열 머리글을 눌러 정렬하고, 다시 누르면 방향이 바뀜.
  - [Pokémon Database](https://pokemondb.net/pokedex/all) (데스크탑 기준)
  - Showdown 팀빌더
  - [포켓몬 위키 종족값 목록](https://pokemon.fandom.com/ko/wiki/%EC%A2%85%EC%A1%B1%EA%B0%92_%EB%AA%A9%EB%A1%9D) (표 위 버튼으로 능력치별 오름·내림차순)
- **세 번째 클릭으로 기본 순서 복귀 (참고 사례, 사용자 의견 아님):** 오름차순 → 내림차순 → 기본 순서
  - [elite-redux-tools PR #4](https://github.com/nghiatt90/elite-redux-tools/pull/4)
- **수치 하한 검색:** "능력치 ≥ 값" 조건으로 찾기 (정렬을 대신하는 방식)
  - [Marriland](https://marriland.com/pokedex/search/)

## poke-mumu 기회

1. **모바일에서도 능력치 정렬이 되게:** Bulbapedia는 모바일에서 정렬이 안 됨 (불만 #2)
2. **방향 바꾸기를 한 번에:** 낮은 순이 실제 수요임, 특히 스피드 (불만 #1)
3. **모바일에서 가로 스크롤 없이 (불만 #4):** 열을 더 늘리지 않음 (불만 #3)
