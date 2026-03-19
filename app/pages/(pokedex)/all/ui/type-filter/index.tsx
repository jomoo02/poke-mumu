'use client';

import { useState, useRef, useEffect } from 'react';
import { RotateCwIcon, XIcon } from 'lucide-react';
import { Type } from '@/app/entities/type/model';
import { Button } from '@/app/shared/ui/button';
import { cn } from '@/app/shared/lib/cn';

const MAX_SELECTION = 2;

interface TypeFilterProps {
  allTypes: Type[];
  selectedTypes: Type[];
  onChangeSelectType: (types: Type[]) => void;
  count: number;
  totalCount: number;
}

export default function TypeFilter({
  allTypes,
  selectedTypes,
  onChangeSelectType,
  count,
  totalCount,
}: TypeFilterProps) {
  const filteredAllTypes = allTypes.filter(
    ({ identifier }) => identifier !== 'unknown',
  );

  const isMaxed = selectedTypes.length >= MAX_SELECTION;

  const hasSelection = selectedTypes.length > 0;

  const handleClickType = (type: Type) => {
    if (selectedTypes.find((t) => t.identifier === type.identifier)) {
      onChangeSelectType(
        selectedTypes.filter((t) => t.identifier !== type.identifier),
      );
    } else if (selectedTypes.length < MAX_SELECTION) {
      onChangeSelectType([...selectedTypes, type]);
    }
  };

  const handleClickRemoveButton = (type: Type) => {
    onChangeSelectType(
      selectedTypes.filter((t) => t.identifier !== type.identifier),
    );
  };

  return (
    <div className="pb-3">
      <div className="flex gap-2 overflow-auto py-1 mb-2">
        {filteredAllTypes.map((type) => {
          const isSelected = selectedTypes.find(
            (t) => t.identifier === type.identifier,
          );
          const isDisabled = !isSelected && isMaxed;

          return (
            <Button
              key={type.identifier}
              variant="outline"
              size={'lg'}
              disabled={isDisabled}
              onClick={() => handleClickType(type)}
              className={cn(isSelected ? 'bg-muted' : '', 'w-15')}
            >
              {type.name}
            </Button>
          );
        })}
      </div>
      <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-3">
        <div className="flex items-center border py-0.5 px-1.5 rounded-lg">
          <div className="text-sm h-9 inline-flex items-center justify-center px-1.5">
            타입 필터
          </div>
          <div className="h-8 mx-1.5 w-px bg-border"></div>

          {selectedTypes.length > 0 && (
            <div className="flex items-center gap-1.5 px-1.5">
              <Button
                className="h-8 w-8"
                onClick={() => onChangeSelectType([])}
                variant={'outline'}
              >
                <RotateCwIcon className="size-4" />
              </Button>

              {selectedTypes.map((type) => (
                <Button
                  key={type.identifier}
                  variant={'secondary'}
                  onClick={() => handleClickRemoveButton(type)}
                  style={{ backgroundColor: `var(--color-${type.identifier})` }}
                  className="text-white font-semibold"
                >
                  {type.name}
                  <XIcon className="size-3.5" />
                </Button>
              ))}
            </div>
          )}

          {selectedTypes.length === 0 && (
            <div className="text-sm h-8 inline-flex items-center justify-center px-1.5 bg-muted rounded-lg font-medium mx-1.5">
              모든 타입
            </div>
          )}
        </div>
        <span className="text-muted-foreground font-medium text-sm">
          {totalCount !== count
            ? `${count} of ${totalCount} Pokémon`
            : `${totalCount} Pokémon`}
          {/* {count}마리 포켓몬 */}
        </span>
      </div>
    </div>
  );
}
