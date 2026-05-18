import type { Type } from '@/app/entities/type/model';

// 단일 공격 타입 vs 방어자 상성
interface TypeDefense {
  attackerType: Type;
  effectiveness: number;
}

// 대분류 (게임 도메인 용어)
type DefenseCategory = 'weakness' | 'resistance' | 'immunity';

// 세분류 (effectiveness 값별 bucket)
type EffectivenessBucket = 'x4' | 'x2' | 'x0_5' | 'x0_25' | 'x0';

const CATEGORY_LABEL: Record<DefenseCategory, string> = {
  weakness: '약점',
  resistance: '내성',
  immunity: '무효',
} as const;

// bucket → category 매핑 (불변)
const BUCKET_TO_CATEGORY: Record<EffectivenessBucket, DefenseCategory> = {
  x4: 'weakness',
  x2: 'weakness',
  x0_5: 'resistance',
  x0_25: 'resistance',
  x0: 'immunity',
} as const;

// bucket 표시 순서 (UI 렌더링 시 약 → 강 / 면역 순)
const BUCKET_ORDER: readonly EffectivenessBucket[] = [
  'x4',
  'x2',
  'x0_5',
  'x0_25',
  'x0',
] as const;

// bucket → 실제 effectiveness 숫자
const BUCKET_TO_EFFECTIVENESS: Record<EffectivenessBucket, number> = {
  x4: 4,
  x2: 2,
  x0_5: 0.5,
  x0_25: 0.25,
  x0: 0,
} as const;

const BUCKET_GROUP_TITLE: Record<EffectivenessBucket, string> = {
  x4: '효과가 매우 굉장함',
  x2: '효과가 굉장함',
  x0_5: '효과가 별로',
  x0_25: '효과가 매우 별로',
  x0: '효과 없음',
};

// 한 bucket 안의 타입 묶음
interface BucketGroup {
  bucket: EffectivenessBucket;
  title: string;
  effectiveness: number;
  types: Type[];
}

// 한 category 안의 bucket들 (빈 bucket 제외됨)
interface CategoryGroup {
  category: DefenseCategory;
  buckets: BucketGroup[];
  categoryLabel: string;
}

// 최종 출력 — 비어있는 카테고리는 buckets가 [] 인 채로 유지
// (UI에서 "약점 없음" 표시할 수 있도록)
interface TypeDefenseGroupsView {
  weakness: CategoryGroup;
  resistance: CategoryGroup;
  immunity: CategoryGroup;
}

export {
  type TypeDefenseGroupsView,
  type CategoryGroup,
  type BucketGroup,
  type DefenseCategory,
  type TypeDefense,
  type EffectivenessBucket,
  BUCKET_ORDER,
  BUCKET_TO_EFFECTIVENESS,
  BUCKET_TO_CATEGORY,
  BUCKET_GROUP_TITLE,
  CATEGORY_LABEL,
};
