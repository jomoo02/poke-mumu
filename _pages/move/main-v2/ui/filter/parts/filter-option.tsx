import { cn } from '@/_shared/lib/cn';
import { DamageClassIcon } from '@/_entities/damage-class';
import { TypeIcon } from '@/_entities/type';

import type { MoveFilterGroup, MoveFilterOption } from '../../../model/filter';

// 그룹 이름 (시트 섹션 제목)
export const GROUP_TITLE: Record<MoveFilterGroup, string> = {
  type: '타입',
  damageClass: '분류',
};

// 선택지 아이콘 (타입 또는 분류. 기본 28px, 칩은 className으로 줄인다). 없으면 null
export function OptionIcon({
  option,
  className,
}: {
  option: MoveFilterOption;
  className?: string;
}) {
  if (option.type) {
    return <TypeIcon type={option.type} decorative className={className} />;
  }

  if (option.damageClass) {
    return (
      <DamageClassIcon
        damageClass={option.damageClass}
        decorative
        className={className}
      />
    );
  }

  return null;
}

/**
 * (체크박스 줄용) 선택지 한 줄의 내용: [이름 ······ 아이콘]. 아이콘은 타입 또는 분류.
 * empty: 고르면 나올 기술이 없으면 흐리게 (고를 수는 있다)
 */
export function OptionContent({
  option,
  empty,
}: {
  option: MoveFilterOption;
  empty: boolean;
}) {
  return (
    <span
      className={cn(
        'flex min-w-0 flex-1 items-center gap-x-3.5',
        empty && 'opacity-50',
      )}
    >
      <span className="min-w-0 flex-1 truncate">{option.label}</span>
      <span className="flex shrink-0">
        {option.type && <TypeIcon type={option.type} decorative />}
        {option.damageClass && (
          <DamageClassIcon damageClass={option.damageClass} decorative />
        )}
      </span>
    </span>
  );
}
