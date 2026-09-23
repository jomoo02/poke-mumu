---
name: ui-conventions
description: 'UI 구현 시 지켜야 할 FSD 배치, URL state, 가상화, 호버 패턴 참고 지식. 3인팀(builder, reviewer, verifier)으로 생성. `UI를 만들어줘` 같은 자연어 요청 시 반드시 사용.'
---

## 컴포넌트 재사용 원칙

- 새 UI를 만들기 전에 shared/ui에 이미 있는 컴포넌트부터 검색한다.
- YAGNI: 재사용 시점이 실제로 오기 전까지 새 공용 컴포넌트를 추출하지 않는다.

## FSD 배치

- 페이지별 로직은 해당 view 슬라이스의 model/ 안에 둔다.
- app/(admin)/admin/ 경로는 FSD 미적용, flat 구조.

## Next.js 렌더링 규칙

- 서버 컴포넌트에서 searchParams를 직접 읽지 않는다 (읽는 순간 라우트 전체가 dynamic이 됨 — ISR 보존 규칙).
- 필터/정렬은 router.replace, 페이지네이션은 router.push. 필터/정렬 변경 시 page 파라미터 자동 삭제.

## 페이지네이션 (리스트가 길 경우)

- 리스트가 길 경우 페이지네이션 패턴

## 호버/포커스 패턴

- 전체 행 호버 배경은 -mx bleed 패턴.
- 임의 :hover 규칙은 [@media(hover:hover)]: 로 감싸서 모바일 sticky-hover 방지.
- 포커스 링 잘림은 padding/negative-margin bleed로 해결 — 과거에 한 번 발생했던 회귀이므로 새 리스트에서도 재확인.
