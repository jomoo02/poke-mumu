import { TypeBadge, TypeIconV3 } from '@/app/entities/type/ui';
import { TypeDefenseGroupsView } from '../../model';
import { cn } from '@/app/shared/lib/cn';
import { Badge } from '@/app/shared/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardGroup,
  CardGroupLabel,
  CardItem,
  CardFooter,
} from '@/app/shared/ui/card';

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
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>방어 상성</CardTitle>
        </CardHeader>
        <CardContent className="">
          {/* <CardContent className="grid sm:grid-cols-2 gap-x-3"> */}
          <CardGroup className="">
            <CardGroupLabel>약점</CardGroupLabel>
            <div className="flex flex-col gap-y-2">
              {weakness.buckets.map(
                ({ bucket, effectiveness, types, title }) => (
                  <div key={bucket} className="grid grid-cols-2 gap-3">
                    {types.map((type) => (
                      <div
                        className="flex items-center gap-3 justify-between py-2 px-3 bg-muted/70 dark:bg-muted rounded-2xl"
                        key={type.identifier}
                      >
                        <div className="flex items-center gap-x-3">
                          <TypeIconV3 type={type} />
                          <div className="text-sm">{type.nameKo}</div>
                        </div>

                        <div className="text-orange-600 dark:text-orange-400 font-medium text-sm">
                          x{effectiveness}
                        </div>
                      </div>
                    ))}
                  </div>
                ),
              )}
            </div>
          </CardGroup>
          <CardGroup className="">
            <CardGroupLabel>내성</CardGroupLabel>
            <div className="flex flex-col gap-y-2">
              {resistance.buckets.map(
                ({ bucket, effectiveness, types, title }) => (
                  <div key={bucket} className="grid grid-cols-2 gap-3">
                    {types.map((type) => (
                      <div
                        className="flex items-center gap-3 justify-between py-2 px-3 bg-muted/70 dark:bg-muted rounded-2xl"
                        key={type.identifier}
                      >
                        <div className="flex items-center gap-x-3">
                          <TypeIconV3 type={type} />
                          <div className="text-sm">{type.nameKo}</div>
                        </div>

                        <div className="text-sky-600 dark:text-sky-400 font-medium text-sm">
                          x{effectiveness}
                        </div>
                      </div>
                    ))}
                  </div>
                ),
              )}
              {immunity.buckets.map(
                ({ bucket, effectiveness, types, title }) => (
                  <div key={bucket} className="grid grid-cols-2 gap-3">
                    {types.map((type) => (
                      <div
                        className="flex items-center gap-3 justify-between py-2 px-3 bg-muted/70 dark:bg-muted rounded-2xl"
                        key={type.identifier}
                      >
                        <div className="flex items-center gap-x-3">
                          <TypeIconV3 type={type} />
                          <div className="text-sm">{type.nameKo}</div>
                        </div>

                        <div className="text-zinc-600 dark:text-zinc-400 font-medium text-sm">
                          x{effectiveness}
                        </div>
                      </div>
                    ))}
                  </div>
                ),
              )}
            </div>
          </CardGroup>
        </CardContent>
      </Card>
    </div>
    // <div className="flex flex-col gap-6 ">
    //   {data.map((group) => (
    //     <div
    //       key={group.category}
    //       className="flex flex-col gap-6 border rounded-4xl p-6 bg-card"
    //     >
    //       <h3 className="text-lg font-medium">{group.categoryLabel}</h3>
    //       {group.buckets.map(({ bucket, effectiveness, types, title }) => (
    //         <div key={bucket} className="">
    //           <div className="flex gap-1.5">
    //             <h4 className={cn('font-medium')}>{title}</h4>
    //             <Badge variant="secondary">x{effectiveness}</Badge>
    //           </div>

    //           <div className="flex flex-wrap gap-3 pt-3">
    //             {types.map((type) => (
    //               <TypeBadge key={type.identifier} type={type} />
    //             ))}
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   ))}
    // </div>
  );
}
