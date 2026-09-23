# UX 리뷰: AbilityListV6 세대 타임라인

검토일: 2026-09-11 / 대상: `views/(ability)/ability/ui/ability-list-v6/*`, `views/(ability)/ability/index.tsx`, `views/(ability)/ability/ui/skeleton.tsx`

## 문제 없음

- gen 쿼리 무효값(`?gen=999`, `all`, `abc`): `useSingleParam` validValues로 '전체' 폴백
- 선택 세대만 0개: 빈 상태 + "전체 보기" 복귀 버튼, 검색어 유지
- 검색 결과 전체 0개: 칩 행 숨김 + v4/v5와 같은 빈 상태 문구
- 포커스 링 잘림: 칩 행 `p-1.5`/`-m-1.5`, 항목 `-mx-3 px-3` bleed. 조상 `overflow-hidden` 없음
- 모바일 sticky-hover: 칩·항목 모두 `[@media(hover:hover)]:` 가드
- sticky `top-13`: 앱 헤더 h-13(52px) 고정, 추가 sticky 바 없음. scroll-padding 72 + scroll-mt-12 48 = 120 ≥ 112

## 문제

| # | 심각도 | 내용 | 조치 |
|---|---|---|---|
| 1 | Medium | 같은 "세대" 필터가 national-v2에서는 다중 선택 드롭다운(`FilterControl`), v6에서는 단일 선택 칩 | **유지** — 타임라인은 구조상 단일 선택이 자연스러움. 통일 여부는 사용자 결정 |
| 2 | Medium | 모바일에서 세대 헤더(`md:sticky`)·칩 행 모두 sticky가 아니라 현재 세대를 알 수 없음 | **수정** — 세대 헤더를 모든 브레이크포인트에서 sticky, 항목 `scroll-mt-12`도 전체 적용 |
| 3 | Medium | 비가상화 전체 렌더(313개) — move 리스트는 가상화 | **유지** — v5도 전체 렌더. 실측 콘솔/렌더 문제 없음 |
| 4 | Low | 첫 섹션 레일 시작점 `mt-7`이 헤더 한 줄 전제 | **수정** — h2에 `whitespace-nowrap` + 전제 주석 |
| 5 | Low | 스켈레톤 섹션 3개 < 실제 7개 (폴드 아래 높이 차) | 유지 — above-the-fold 영향 제한적 |
| 6 | Low | `role="group"` 안에 `<ul>` 목록 시맨틱 중첩 | 유지 |
| 7 | Low | `index.tsx` 미사용 import (`AbilityList`, `AbilityListV3`, `AbilityViewSkeleton`) | 미조치 — v6 이전부터 존재, 사용자 결정 |
| 8 | Low | 프로젝트 전역에 `error.tsx` 없음 | 미조치 — v6 범위 밖 |
