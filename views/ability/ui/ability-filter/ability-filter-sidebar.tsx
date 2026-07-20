'use client';

import {
  ControlField,
  ControlFieldLabel,
  ControlResetButton,
} from '@/shared/ui/control';
import { FieldGroup } from '@/shared/ui/field';
import { Checkbox } from '@/shared/ui/checkbox';

import useAbilityFilter from './useAbilityFilter';

export function AbilityFilterSideBar() {
  const {
    selectedAppearedGens,
    isChampions,
    isActive,
    toggleAppearedGen,
    toggleChampions,
    resetFilter,
    gens,
  } = useAbilityFilter();

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">필터</div>
        <ControlResetButton disabled={!isActive} onClick={resetFilter} />
      </div>

      <div className="w-full h-px bg-border" />

      <div className="flex flex-col gap-3">
        <div className="text-lg font-semibold">등장</div>
        <FieldGroup className="gap-y-1">
          {gens.map((gen) => (
            <ControlField key={gen}>
              <Checkbox
                checked={selectedAppearedGens.has(gen)}
                id={`gen-${gen}-sidebar`}
                name={`gen-${gen}-sidebar`}
                className="cursor-pointer"
                onCheckedChange={() => toggleAppearedGen(gen)}
              />
              <ControlFieldLabel
                htmlFor={`gen-${gen}-sidebar`}
                className="text-base"
              >
                {gen}세대
              </ControlFieldLabel>
            </ControlField>
          ))}
        </FieldGroup>
      </div>
      <div className="w-full h-px bg-border" />
      <div className="flex flex-col gap-3">
        <div className="text-lg font-semibold">분류</div>
        <FieldGroup>
          <ControlField>
            <Checkbox
              checked={isChampions}
              id={`champions-check`}
              name={`champions-check`}
              className="cursor-pointer"
              onCheckedChange={() => toggleChampions(!isChampions)}
            />
            <ControlFieldLabel
              htmlFor={`champions-check`}
              className="text-base"
            >
              챔피언스
            </ControlFieldLabel>
          </ControlField>
        </FieldGroup>
      </div>
    </div>
  );
}
