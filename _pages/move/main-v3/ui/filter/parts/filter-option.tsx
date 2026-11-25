import { DamageClassIcon } from '@/_entities/damage-class';
import { TypeIcon } from '@/_entities/type';

import type { MoveFilterGroup, MoveFilterOption } from '../../../model/filter';

// 그룹 이름 (드로어·시트 섹션 제목)
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
