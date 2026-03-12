# 프로젝트: poke-mumu

App Router, Cache component, Supabase를 사용하는 Next.js 16 포켓몬 정보 웹

## 코드 스타일

- TypeScript 'any' 타입 금지
- CSS: Tailwind 유틸리티 클래스 사용, 커스텀 CSS 파일 금지

## 디자인

- font 크기는 최소 text-sm(14px)

## 아키텍처

- FSD 참고
- `/shared`: 재사용되는 코드들
- `/entites`: 가장 작은 단위
- `/features`: 액션을 구현한 기능
- `/widgets`: 레이아웃
- `/pages`: 경로에서 바로 사용할 ui 페이지

## 타입 정의

export interface Poke {
id?: number;
dexNumber: number;
pokeKey: string;
sprite?: string;
name: string;
form?: string | null;
}

export interface Stats {
hp: number;
attack: number;
defense: number;
specialAttack: number;
specialDefense: number;
speed: number;
total: number;
}

export interface Type {
id?: number;
identifier: string;
name: string;
generation?: number;
damageClassId?: number | null;
}

export interface NationalPokeView extends Poke, Stats {
type1: Type | null;
type2: Type | null;
}

## 중요 사항

- .env, .env.local 파일 절대 커밋하지 마세요
