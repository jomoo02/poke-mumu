import { cn } from '@/_shared/lib/cn';
import { DamageClassIcon } from '@/_entities/damage-class';
import { TypeIcon } from '@/_entities/type';

import type { MoveFilterGroup, MoveFilterOption } from '../../../model/filter';

// 그룹 이름 (트리거 기본 글자 '모든 타입'·시트 제목)
export const GROUP_TITLE: Record<MoveFilterGroup, string> = {
  type: '타입',
  damageClass: '분류',
};

// 필터 트리거에 이름을 몇 개까지 보일지. 넘으면 '+N'
const TRIGGER_NAME_LIMIT = 2;

/**
 * 필터 트리거 글자: '모든 타입' / '불꽃' / '불꽃, 물' / '불꽃, 물' + '+2' (고른 순서).
 * 접근 이름은 그룹 이름과 고른 값을 모두 ('타입: 불꽃, 물, 풀, 전기')
 */
export const getGroupTrigger = (group: MoveFilterGroup, names: string[]) => {
  const title = GROUP_TITLE[group];
  const shown = names.slice(0, TRIGGER_NAME_LIMIT);

  return {
    text: names.length > 0 ? shown.join(', ') : `모든 ${title}`,
    rest: names.length - shown.length,
    ariaLabel:
      names.length > 0 ? `${title}: ${names.join(', ')}` : `모든 ${title}`,
  };
};

// 필터 트리거 안 글자. 이름이 길면 이름만 말줄임하고 '+N'은 남긴다
export function GroupTriggerText({
  text,
  rest,
}: {
  text: string;
  rest: number;
}) {
  return (
    <span aria-hidden className="flex min-w-0 items-center gap-1.5">
      <span className="truncate">{text}</span>
      {rest > 0 && <span className="shrink-0 tabular-nums">+{rest}</span>}
    </span>
  );
}

// 선택지 한 줄의 내용: [이름 ······ 아이콘]. 고르면 나올 기술이 0개면 흐리게 (누르는 건 막지 않는다)
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
