# 모바일 스탯 목록의 정렬 UI: 스포츠 선수 DB 탐색 (2026-10-19)

375px 모바일 화면에서 직접 열어 봤다. 사용자 의견이 아니라 경쟁 사이트의 실제 UI 구조를 관찰한 기록이다.

## 확인한 사이트

### FUT.GG: FC 선수 DB

포켓몬 종족값과 가장 비슷하다. 대표 스탯 6개(PAC SHO PAS DRI DEF PHY)에 세부 능력치가 수십 개다.

- 출처: https://www.fut.gg/players/
- **목록**
  - 2열 카드 그리드다.
  - 카드마다 6스탯을 이름표와 함께 보여 준다 (PAC 위, 숫자 아래).
  - 상단 고정 머리글이 없다.
- **정렬 진입**
  - 화면 오른쪽 아래에 떠 있는 "Filters" 버튼을 누르면 전체 화면 필터 패널이 열린다.
  - 패널 맨 위에 "SORT [기준] ↓" 트리거가 있다.
- **정렬 목록**
  - 검색창("Search for a sort...")과 묶음별 목록으로 구성된다.
  - 묶음: General / GGR Roles / Face Stats / Misc / Attributes / GGR Positions
  - 각 줄은 `[기준 이름] [↑] [↓]`이다. 방향을 줄마다 버튼으로 바로 고르며, 지금 정렬은 해당 화살표만 강조색이다.
- **평가:** 정렬은 3단계(필터 → 정렬 → 선택)다. 정렬보다 필터가 주 동작이라는 설계다.

### FotMob: 축구 리그 스탯

- 출처: https://www.fotmob.com/leagues/47/stats/premier-league
- **개요 화면:** 스탯마다 카드가 하나씩 있고(Top scorer, Assists, Goals + Assists …), 각 카드는 상위 3명만 보여 준다. 카드의 ">"를 누르면 해당 스탯 순위 페이지로 간다.
- **순위 페이지**
  - 맨 위에 스탯 선택기가 있다. 기본 `<select>`이며 선택지는 43개다.
  - 선택기 아래에 시즌·포지션 필터가 있다.
  - 목록은 순위 번호와 선수, 그리고 고른 스탯 하나만 크게 보여 준다.
  - 방향 선택이 없다. 항상 높은 순이다.

### Sofascore: 축구 리그 스탯

- 출처: https://www.sofascore.com/tournament/football/england/premier-league/17
- FotMob과 같은 구조다. 스탯마다 상위 3명 카드와 "See all" 링크가 있다.

## 확인하지 못한 곳

- FUTBIN: Cloudflare 봇 확인 화면이라 열지 않았다.
- 네이버 스포츠: 브라우저 정책상 열 수 없었다.

## 일반 근거

- 선택지가 많으면 화면에 토글을 늘어놓기보다 선택기(시트·피커)가 낫다.
  - 출처: https://www.smashingmagazine.com/2012/04/10/ui-patterns-for-mobile-apps-search-sort-filter/
