# 이름 표기 언어 전환 사례 조사 (2026-11-12)

대상: 기술·특성·종족값 목록의 이름 표기 언어(한·영·일) 전환과 검색.

자료가 부족하다. "이름 언어 전환"에 대한 포켓몬 사이트 실사용자 불만은 거의 없고, 다른 도메인의 사례 구조가 대부분이다.
확인 방법을 구분한다: `화면` = 브라우저로 직접 확인(342px 폭), `문서` = 공식 문서·변경 기록, `검색` = 검색 결과 요약만.

## 사례: 사이트 언어와 별개로 이름 표기 언어를 고르는 곳

| # | 사이트 | 컨트롤 | 위치 | 저장 | 확인 |
|---|---|---|---|---|---|
| 1 | [Umalytics](https://umalytics.pages.dev/about) (우마무스메 도구) | 3칸 세그먼트 `Auto / 日本語 / EN`. Auto는 사이트 언어를 따른다 | 헤더의 사이트 언어 `日本語 / EN` 옆 톱니 → 설정 대화상자 첫 항목 | 기기 | 화면 + 문서 (v0.37.0) |
| 2 | [AniList](https://anilist.gitbook.io/anilist-apiv2-docs/docs/reference/object/mediatitle) | 제목 언어 `Romaji / English / Native` | 계정 설정(`/settings/media`). 목록 화면에는 없다 | 계정. 비로그인은 로마자 고정 | 문서 |
| 3 | [Limitless TCG 카드 DB](https://limitlesstcg.com/cards) | 라벨 붙은 선택 상자 `Language: English` | 카드 목록의 표시 옵션 묶음 | 미확인 | 화면 |
| 4 | [VocaDB](https://vocadb.net) | 표시 언어 선호 `Original / Romanized / English` | 사용자 설정 | 계정 | 검색 |
| 5 | [MusicBrainz](https://community.metabrainz.org/t/which-language-is-better-for-this-classic-release-title-and-tracklist-artist-name/658690) | 'Title / Name Language' 선호 | 사용자 설정 | 계정 | 검색 |
| 6 | [Simkl](https://reddit.birdcat.cafe/r/Simkl/comments/1jwrrtq/englishromajijapanese_title_language_selection) | 제목 언어 `English / Romaji / Japanese` | 설정 (V2 베타에서 추가, 2025-04) | 계정 | 검색 |

## 사례: 표기 언어와 상관없이 모든 언어 이름으로 검색되는 곳

| # | 사이트 | 동작 | 확인 |
|---|---|---|---|
| 7 | [AniList 검색](https://anilist.co/search/anime?search=attack%20on%20titan) | 영어 "attack on titan"으로 찾으면 로마자 "Shingeki no Kyojin"만 나온다. 어느 이름으로 걸렸는지 안내 없음 | 화면 |
| 8 | [GameTora](https://gametora.com/umamusume/changelog) | 목록 검색이 영·일·한 이름을 가리지 않는다. 초성(ㅋㅌㅅㅂㄹ), 히라가나·가타카나 섞임, 악센트 문자도 찾는다 (2026-07-30) | 문서 |
| 9 | [Bill's Archive](https://billsarchive.com/pokemon-names.html) | 안내 글자 "Search any language or #number…". 언어별 이름을 열로 모두 보여 준다 | 화면 |
| 10 | Umalytics | 예전 영어 이름으로도 찾힌다 (v0.55.1) | 문서 |

검색 언어를 표기 언어로 제한하는 사례는 찾지 못했다.

## 불만 / 아쉬운 점

| # | 내용 (요약) | 대상 | 출처 | 빈도 |
|---|---|---|---|---|
| 1 | 이름 언어가 프랑스어로 잘못 잡혀 "이름을 하나도 모르겠다". 설정을 바꿨다 되돌려야 고쳐짐 | Showdex | [Smogon (2025-11, 2026-02)](https://www.smogon.com/forums/posts/10846777) | 반복 (2명) |
| 2 | 사이트 번역은 있는데 포켓몬·기술·특성 이름은 번역이 없다 | Pokémon Showdown | [Smogon](https://wbf.www.smogon.com/forums/threads/full-translation-of-showdown-pokemon-names-moves-etc.3705288/latest) | 단일 (날짜 미확인) |

## 원하는 점

| # | 내용 | 출처 | 빈도 |
|---|---|---|---|
| 1 | 한국어·중국어 이름 추가 (게임이 공식 지원하는 언어라는 이유) | [PokéBase (2021-02)](https://pokemondb.net/pokebase/meta/75150/add-korean-and-chinese-names-for-pokemon) | 단일 (2표) |
| 2 | 일본어 이름을 더 드러내기 | [PokéBase](https://pokemondb.net/pokebase/meta/74204/pokemon-japanese-names-suggestion?show=74406) | 단일 |

## 관찰

- 표기 언어는 어디서나 **설정**이다. 계정이나 기기에 저장하고 URL에 두는 곳은 없었다.
- 선택지는 3개 안팎이고, 세그먼트(Umalytics)나 선택 상자로 모두 드러낸다. 라벨은 언어 이름(`日本語`, `EN`)이다.
- 검색은 표기 언어와 분리돼 있다. 어느 언어로 쳐도 찾히고 결과는 표기 언어로 나온다.
- 다른 언어 이름으로 걸렸다는 안내를 주는 곳은 없었다 (AniList는 영어로 찾아도 로마자만 보인다).
- 목록 화면에서 한 번에 바꾸는 컨트롤은 드물다 (Limitless만). 나머지는 설정 화면 안.

## poke-mumu 기회

1. 세 언어 동시 검색: 사례 전부가 이렇게 하고, 한글·라틴·가나는 글자가 겹치지 않는다.
2. 목록 화면에서 한 번에 전환: 계정이 없어 설정 화면에 숨길 이유가 없다.
3. 다른 언어로 걸렸을 때의 안내: 사례에 없는 부분.
4. 기본값은 한국어 고정. 브라우저 언어로 추측하지 않는다 (불만 #1).
