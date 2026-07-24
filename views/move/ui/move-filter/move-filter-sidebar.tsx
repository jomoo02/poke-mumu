'use client';

import type { DamageClass } from '@/entities/damage-class/model';
import { DamageClassIcon } from '@/entities/damage-class/ui';
import { TypeIcon } from '@/entities/type/ui';
import type { Type } from '@/entities/type/model';
import {
  ControlField,
  ControlFieldLabel,
  ControlResetButton,
} from '@/shared/ui/control';
import { FieldGroup } from '@/shared/ui/field';
import { Checkbox } from '@/shared/ui/checkbox';

import useMoveFilter from './useMoveFilter';

interface MoveFilterSideBarProps {
  types: Type[];
  damageClasses: DamageClass[];
}

export function MoveFilterSideBar({
  types,
  damageClasses,
}: MoveFilterSideBarProps) {
  const {
    selectedTypes,
    selectedDamageClasses,
    isActive,
    toggleType,
    toggleDamageClass,
    resetFilter,
  } = useMoveFilter();

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">필터</h2>
        <ControlResetButton disabled={!isActive} onClick={resetFilter} />
      </div>

      <div className="w-full h-px bg-border" />

      <div className="flex flex-col gap-3">
        <div className="text-lg font-semibold">타입</div>
        <FieldGroup className="gap-y-1">
          {types.map((type) => (
            <ControlField key={type.identifier}>
              <Checkbox
                checked={selectedTypes.has(type.identifier)}
                id={`type-${type.identifier}-sidebar`}
                name={`type-${type.identifier}-sidebar`}
                className="cursor-pointer"
                onCheckedChange={() => toggleType(type.identifier)}
              />
              <ControlFieldLabel htmlFor={`type-${type.identifier}-sidebar`}>
                <TypeIcon type={type} />
                {type.nameKo}
              </ControlFieldLabel>
            </ControlField>
          ))}
        </FieldGroup>
      </div>

      <div className="w-full h-px bg-border" />

      <div className="flex flex-col gap-3">
        <div className="text-lg font-semibold">분류</div>
        <FieldGroup className="gap-y-1">
          {damageClasses.map((damageClass) => (
            <ControlField key={damageClass.identifier}>
              <Checkbox
                checked={selectedDamageClasses.has(damageClass.identifier)}
                id={`class-${damageClass.identifier}-sidebar`}
                name={`class-${damageClass.identifier}-sidebar`}
                className="cursor-pointer"
                onCheckedChange={() =>
                  toggleDamageClass(damageClass.identifier)
                }
              />
              <ControlFieldLabel
                htmlFor={`class-${damageClass.identifier}-sidebar`}
              >
                <DamageClassIcon damageClass={damageClass} />
                {damageClass.nameKo}
              </ControlFieldLabel>
            </ControlField>
          ))}
        </FieldGroup>
      </div>
    </div>
  );
}
