# poke-mumu

포켓몬 관련 모든 정보를 보여주는 웹
Next.js 16.3 (App Router, Cache Component, Partial Prefetching), Tailwind CSS, Supabase

## 코드 스타일

- TypeScript 'any' 타입 금지
- CSS: Tailwind 유틸리티 클래스 사용, 커스텀 CSS 파일 금지

## 구조

FSD v2.1 기반. 이관 중이며 새 코드는 `_` 레이어에 작성한다.
예전 폴더(`shared/`, `entities/`, `features/`, `views/`, `app/pages/`)는 이관이 끝나면 삭제한다.

- `_app`: 전역 설정, provider
- `_pages`: 라우트별 페이지. 페이지 전용 api·model·ui는 여기에 둔다
- `_features`: 2곳 이상에서 쓰는 사용자 동작
- `_entities`: 2곳 이상에서 쓰는 도메인 모델 (ability, poke, type …)
- `_shared`: 비즈니스 로직 없는 인프라 (ui, lib, api, config)
- `app/`: Next.js 라우트. `_pages`의 페이지를 연결만 한다

### import 규칙

- 아래 레이어만 import한다: `_app` → `_pages` → `_features` → `_entities` → `_shared`
- slice 외부에서는 public API(`index.ts`, `index.server.ts`)로만 import한다
- 같은 레이어의 slice끼리 import하지 않는다
- 엔티티 간 예외는 `@x`로만 허용한다: type → poke, type → move, damage-class → move
  (다른 엔티티의 base 모델에 포함되는 경우). 새 `@x`는 이유를 주석으로 남긴다

### 엔티티

- 명사 자체의 데이터·규칙 → 그 명사의 엔티티 (예: ability, type)
- `poke_X` 관계(poke_ability 등)는 관계만의 속성에 코드 규칙이 있고 2곳 이상에서 쓰일 때
  `_entities/poke/model/poke-x`에 둔다. 한 페이지에서만 쓰면 페이지에 둔다
- 관계 자체의 규칙이 크면 별도 slice로 둔다 (learnset, evolution)
- 외래키만 있는 연결 테이블은 엔티티로 만들지 않는다
- 여러 엔티티를 함께 쓰는 조합은 페이지에서 한다

### 파일

- `index.ts`: 클라이언트에서도 안전한 public API (model, ui)
- `index.server.ts`: `import 'server-only'` + 서버 전용 api (`'use cache'` 조회)
- 테스트가 있는 파일만 폴더로 묶는다: `x/x.ts`, `x/x.test.ts`, `x/index.ts`
- 파일 이름은 도메인 이름으로 짓는다 (`types.ts`, `utils.ts` 대신 `poke-label.ts`)
- 여러 테스트가 함께 쓰는 테스트용 데이터 생성 함수는 `x.fixture.ts`로 짓고 테스트에서만 import한다
  (예: `_pages/move/list/model/move.fixture.ts`)

## 중요 사항

- .env, .env.local 파일 절대 커밋하지 마세요
