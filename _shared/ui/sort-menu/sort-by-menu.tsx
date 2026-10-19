'use client';

import { useRef, type ReactElement } from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { ArrowDownIcon, ArrowUpIcon, CheckIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';

import type { SortDirection, SortMatrixOption } from './sort-menu-option';

// 표 머리글과 같은 화살표: 오름차순 ↑, 내림차순 ↓
const DIRECTION_ICON = { asc: ArrowUpIcon, desc: ArrowDownIcon } as const;

interface SortByMenuProps<K extends string> {
  // 기준마다 [첫 방향, 반대 방향] (toSortMatrixOptions)
  options: readonly SortMatrixOption<K>[];
  selectedKey: K;
  direction: SortDirection;
  onSelect: (key: K, direction: SortDirection) => void;
  trigger: ReactElement;
}

// 겉모습은 SelectContent와 같다 (둥근 모서리·그림자·열림 애니메이션)
const POPUP_CLASS = cn(
  'relative isolate z-20 max-h-(--available-height) w-56 origin-(--transform-origin) overflow-y-auto rounded-3xl bg-popover px-2 py-2.5 text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/5 outline-hidden duration-100 dark:ring-foreground/10',
  'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
  'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
);

const GROUP_LABEL_CLASS = 'px-2.5 pt-1 pb-1.5 text-xs text-muted-foreground';

// [이름 ········ ✓] SelectItem과 같은 줄(40px). 기준이 9개인 목록(포켓몬)도 모바일 한 화면에
// 순서 칸까지 들어가게 44px 대신 40px (줄 사이 간격 없이 붙여 실제 누르는 높이는 40px 그대로).
// 포커스(호버·키보드)는 배경과 굵기로, 선택은 오른쪽 표시로 알린다
const ITEM_CLASS = cn(
  'grid h-10 w-full cursor-pointer grid-cols-[1fr_1.25rem] items-center gap-x-2.5 rounded-lg px-2.5 text-sm font-normal text-foreground outline-none select-none',
  'data-highlighted:bg-accent data-highlighted:font-semibold data-highlighted:text-accent-foreground',
);

/**
 * 정렬 메뉴 (Google Drive·Apple 파일 앱 방식). 모바일·데스크탑 모두 같은 메뉴 하나로
 *   정렬 기준   도감번호 / 이름 / 종족값 … (지금 기준 오른쪽에 방향 화살표)
 *   ─────────
 *   순서        ↓ 높은 순 / ↑ 낮은 순   (지금 기준에 맞는 말로 바뀐다)
 * - 다른 기준을 고르면 그 기준의 첫 방향(번호·이름 오름차순, 수치 내림차순)부터
 * - 지금 기준을 다시 고르면 방향만 반대로 (표 머리글을 다시 누르는 것과 같다)
 * - 고르면 닫힌다. 메뉴 radio라 화살표 키는 옮기기만 하고 Enter·Space·클릭으로 고른다
 */
export function SortByMenu<K extends string>({
  options,
  selectedKey,
  direction,
  onSelect,
  trigger,
}: SortByMenuProps<K>) {
  const selected =
    options.find((option) => option.key === selectedKey) ?? options[0];

  const SelectedIcon = DIRECTION_ICON[direction];

  const popupRef = useRef<HTMLDivElement>(null);

  // 고른 정렬. 메뉴가 다 닫힌 뒤(onOpenChangeComplete) 반영한다.
  // 정렬이 바뀌면 목록 전체를 다시 그리므로, 닫힘(100ms)을 먼저 끝내 메뉴가 그 렌더를 기다리며 떠 있지 않게 한다
  const pendingRef = useRef<{ key: K; direction: SortDirection } | null>(null);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      return;
    }

    // 열면 지금 기준에서 시작한다 (셀렉트와 같다). base-ui Menu는 처음 포커스를 정하는 옵션이 없어
    // 열린 뒤(base-ui가 첫 항목에 포커스를 준 다음 프레임) 지금 기준 줄로 옮긴다. 포커스를 따라 강조도 옮겨진다
    requestAnimationFrame(() => {
      popupRef.current
        ?.querySelector<HTMLElement>(
          '[role="menuitemradio"][aria-checked="true"]',
        )
        ?.focus();
    });
  };

  const handleOpenChangeComplete = (open: boolean) => {
    const pending = pendingRef.current;
    if (open || !pending) {
      return;
    }

    pendingRef.current = null;

    if (pending.key !== selected.key || pending.direction !== direction) {
      onSelect(pending.key, pending.direction);
    }
  };

  const flip = (value: SortDirection): SortDirection =>
    value === 'asc' ? 'desc' : 'asc';

  // 기준 줄을 고를 때 (클릭·Enter·Space 모두 click으로 온다. 닫기는 closeOnClick)
  // - 다른 기준: 그 기준의 첫 방향부터
  // - 지금 기준: 방향만 반대로 (표 머리글을 다시 누르는 것과 같다)
  const selectKey = (option: SortMatrixOption<K>) => {
    pendingRef.current = {
      key: option.key,
      direction:
        option.key === selected.key
          ? flip(direction)
          : option.directions[0].direction,
    };
  };

  const selectDirection = (next: SortDirection) => {
    pendingRef.current = { key: selected.key, direction: next };
  };

  return (
    <MenuPrimitive.Root
      onOpenChange={handleOpenChange}
      onOpenChangeComplete={handleOpenChangeComplete}
    >
      <MenuPrimitive.Trigger render={trigger} />
      <MenuPrimitive.Portal>
        <MenuPrimitive.Positioner
          side="bottom"
          align="end"
          sideOffset={4}
          className="isolate z-20"
        >
          <MenuPrimitive.Popup ref={popupRef} className={POPUP_CLASS}>
            {/* 선택은 각 줄의 onClick이 맡고, RadioGroup은 체크 표시·접근성(menuitemradio)만 */}
            <MenuPrimitive.RadioGroup
              value={selected.key}
              className="flex flex-col"
            >
              <MenuPrimitive.GroupLabel className={GROUP_LABEL_CLASS}>
                정렬 기준
              </MenuPrimitive.GroupLabel>
              {options.map((option) => (
                <MenuPrimitive.RadioItem
                  key={option.key}
                  value={option.key}
                  closeOnClick
                  onClick={() => selectKey(option)}
                  className={ITEM_CLASS}
                >
                  <span className="whitespace-nowrap">{option.label}</span>
                  {/* 지금 기준은 체크 대신 방향 화살표 (표 머리글과 같은 표시) */}
                  <MenuPrimitive.RadioItemIndicator className="flex items-center justify-center">
                    <SelectedIcon
                      aria-hidden
                      className="size-4.5"
                      strokeWidth={2.5}
                    />
                  </MenuPrimitive.RadioItemIndicator>
                </MenuPrimitive.RadioItem>
              ))}
            </MenuPrimitive.RadioGroup>

            <MenuPrimitive.Separator className="pointer-events-none -mx-2 my-1.5 h-px bg-border" />

            <MenuPrimitive.RadioGroup
              value={direction}
              className="flex flex-col"
            >
              <MenuPrimitive.GroupLabel className={GROUP_LABEL_CLASS}>
                순서
              </MenuPrimitive.GroupLabel>
              {selected.directions.map((choice) => {
                const Icon = DIRECTION_ICON[choice.direction];

                return (
                  <MenuPrimitive.RadioItem
                    key={choice.direction}
                    value={choice.direction}
                    closeOnClick
                    onClick={() => selectDirection(choice.direction)}
                    // 칸 글자('높은 순')엔 기준이 없어 전체 이름('공격 높은 순')을 접근 이름으로
                    aria-label={choice.sortLabel}
                    className={ITEM_CLASS}
                  >
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      <Icon
                        aria-hidden
                        className="size-4 text-muted-foreground"
                      />
                      {choice.label}
                    </span>
                    <MenuPrimitive.RadioItemIndicator className="flex items-center justify-center">
                      <CheckIcon
                        aria-hidden
                        className="size-4.5"
                        strokeWidth={2.5}
                      />
                    </MenuPrimitive.RadioItemIndicator>
                  </MenuPrimitive.RadioItem>
                );
              })}
            </MenuPrimitive.RadioGroup>
          </MenuPrimitive.Popup>
        </MenuPrimitive.Positioner>
      </MenuPrimitive.Portal>
    </MenuPrimitive.Root>
  );
}
