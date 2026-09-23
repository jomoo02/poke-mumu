'use client';

import { Fragment } from 'react';

import type { Ability } from '@/entities/ability/model';
import { Separator } from '@/shared/ui/separator';

import AbilityIndexBar from './ability-index-bar';
import AbilityIndexSection from './ability-index-section';
import useAbilityListV5 from './useAbilityListV5';

interface AbilityListV5Props {
  abilities: Ability[];
}

/**
 * 초성 색인 사전(Dictionary Index).
 *
 * 가나다순 목록을 첫 글자 초성(ㄱ…ㅎ, 그 외 '#')으로 묶고,
 * 상단 sticky 색인 바의 앵커로 섹션 사이를 점프한다.
 * 색인 점프가 긴 목록 탐색을 대신하므로 페이지네이션 없이 전체를 렌더한다.
 */
export default function AbilityListV5({ abilities }: AbilityListV5Props) {
  const { filteredAbilities, groups, chips, activeKey, selectKey, indexBarRef } =
    useAbilityListV5(abilities);

  return (
    <div className="flex flex-col gap-6">
      <div className="text-sm text-foreground/70">
        <span aria-live="polite">{filteredAbilities.length}개의 특성</span>
      </div>

      {filteredAbilities.length === 0 ? (
        <div className="font-medium text-muted-foreground">
          일치하는 특성이 없습니다
        </div>
      ) : (
        <>
          <AbilityIndexBar
            ref={indexBarRef}
            chips={chips}
            activeKey={activeKey}
            onSelect={selectKey}
          />

          <div className="flex flex-col gap-6">
            {groups.map((group, index) => (
              <Fragment key={group.key}>
                {index > 0 && <Separator />}
                <AbilityIndexSection group={group} />
              </Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
