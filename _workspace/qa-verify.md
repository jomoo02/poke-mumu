# QA 검증: AbilityListV6 세대 타임라인 (/ability)

검증일: 2026-09-11

## 1. 정적 검증

| 항목 | 결과 | 비고 |
|---|---|---|
| `pnpm tsc --noEmit` | 변경 파일 **통과** / 전체 exit 1 | 에러 2건 모두 무관 파일: `app/(app)/_move/version/[identifier]/page.tsx` (TS2344, TS2345) |
| `pnpm lint` | **실행 불가 (환경 문제, 기존)** | ESLint 10.6.0과 eslint-plugin-react 7.37.5 비호환(`contextOrFilename.getFilename is not a function`) |
| 대체 lint (react 플러그인 제외 임시 설정) | v6 폴더·`skeleton.tsx` 0건 / `index.tsx` 3건 | 아래 F2 |
| `pnpm build` | **생략** | dev 서버 실행 중, `_move` 타입 에러로 어차피 실패 |

## 2. 시각 검증

claude-in-chrome MCP를 쓸 수 없어, 실행 중인 dev 서버(localhost:3000)에 headless Chrome(CDP)으로 데스크톱 1280px / 모바일 390px 스크린샷·스크롤·클릭·콘솔 수집.

## 3. 통과

- 기본 렌더: 313개, 3~9세대 섹션 7개, 칩 8개. 노드 중심이 레일과 정확히 정렬
- `?gen=5`: 41개, 5세대 섹션 1개, 5세대 칩만 pressed
- `?search=맹화`: 1개. 4~9세대 칩 점선 비활성, sr-only "4세대, 결과 없음"
- `?search=zzzz`: "0개의 특성" + "일치하는 특성이 없습니다", 칩 행 숨김
- `?gen=abc` / `?gen=10` / `?gen=05`: 전체 313개로 폴백
- 칩 클릭: `?page=2`에서 5세대 → `?gen=5`(page 삭제). 같은 칩 재클릭 무변화. 전체 → `?` 없는 `/ability`
- `?search=맹화&gen=5`에서 "전체 보기" → gen만 삭제, 검색어 유지
- 키보드 Shift+Tab 반복: 포커스 항목 top(120) > sticky 헤더 bottom(112), 가려지지 않음
- 콘솔 error/warning/hydration 경고 0건

## 4. 실패 → 조치

- F1. **모바일 가로 넘침 (scrollWidth 715)** — 칩 버튼에 `relative`가 없어 sr-only(absolute)가 칩 행 overflow를 벗어남. ScrollToTopButton이 화면 밖으로 밀림.
  - **수정됨**: `generation-filter.tsx` CHIP_BASE에 `relative` 추가. 재측정 scrollWidth 390, 버튼 x 325~371 화면 안.
- F2. **미사용 import 3건** `views/(ability)/ability/index.tsx` (`AbilityList`, `AbilityViewSkeleton`, `AbilityListV3`)
  - **미조치**: v6 이전부터 있던 import. 사용자 결정 필요.

## 5. 주의 → 조치

- W1. 모바일 `?gen=9` 진입 시 선택 칩이 칩 행 스크롤 밖 — **수정됨**: 선택 칩을 가운데로 끌어오는 effect 추가(scrollLeft만 조정). 재측정 scrollLeft 414, 9세대 칩 보임.
- W2. sticky 헤더 배경 80% + blur로 뒤 항목 글자가 흐릿하게 비침 — v5 색인 바와 같은 스타일이라 유지.
- 범위 밖: `app/(app)/(ability)/ability/page.tsx`의 미사용 import `AbilityPageView`.
- 미확인: 실제 iOS Safari / Android 기기.

## 6. 수정 후 재측정 (UX 리뷰 반영 포함)

| 항목 | 모바일 390 | 데스크톱 1280 |
|---|---|---|
| scrollWidth | 390 | 1280 |
| 세대 헤더 sticky (top / bottom) | 52 / 108 | 52 / 112 |
| 헤더 white-space | nowrap | nowrap |
| ScrollToTopButton 화면 안 | O | O |
| 칩 행 scrollbar-width | none | none |
