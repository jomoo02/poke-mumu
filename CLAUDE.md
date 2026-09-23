# poke-mumu

포켓몬 관련 모든 정보를 보여주는 웹
Next.js 16.3 (App Router, Cache Component, Partial Prefetching), Tailwind CSS, Supabase

## 코드 스타일

- TypeScript 'any' 타입 금지
- CSS: Tailwind 유틸리티 클래스 사용, 커스텀 CSS 파일 금지

## 구조

- FSD를 참고한 구조
- `/shared`: 재사용되는 코드들
- `/entites`: 가장 작은 단위
- `/features`: 액션을 구현한 기능
- `/views`: 경로에서 사용할 페이지 ui (보통 1:1), `/pages` 대신 사용

## 중요 사항

- .env, .env.local 파일 절대 커밋하지 마세요
