import { TypeBadge } from '@/app/entities/type/ui';
import { TypeDefenseGroupsView } from '../../model';
import { cn } from '@/app/shared/lib/cn';
import { Badge } from '@/app/shared/ui/badge';

interface TypeDefenseProps {
  typeDefenseGroups: TypeDefenseGroupsView;
}

export default function TypeDefenseList({
  typeDefenseGroups,
}: TypeDefenseProps) {
  const { weakness, immunity, resistance } = typeDefenseGroups;
  const data = [weakness, resistance, immunity].filter(
    (group) => group.buckets.length > 0,
  );

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 ">
      {data.map((group) => (
        <div
          key={group.category}
          className="flex flex-col gap-6 border rounded-4xl p-6 bg-card"
        >
          <h3 className="text-lg font-medium">{group.categoryLabel}</h3>
          {group.buckets.map(({ bucket, effectiveness, types, title }) => (
            <div key={bucket} className="">
              <div className="flex gap-1.5">
                <h4
                  className={cn(
                    'font-medium',
                    group.category === 'weakness' &&
                      'text-red-700 dark:text-red-400',
                    group.category === 'resistance' &&
                      'text-green-700 dark:text-green-400',
                  )}
                >
                  {title}
                </h4>
                <Badge variant="secondary">x{effectiveness}</Badge>
              </div>

              <div className="flex flex-wrap gap-3 pt-3">
                {types.map((type) => (
                  <TypeBadge key={type.identifier} type={type} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
