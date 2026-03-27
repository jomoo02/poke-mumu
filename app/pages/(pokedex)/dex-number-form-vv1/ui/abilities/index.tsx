import { Fragment } from 'react/jsx-runtime';
import { AbilitiyView } from '../../model';
import Ability from './ability';
import SectionTitle from '../section-title';
import { Card, CardHeader } from '../card';
import { cn } from '@/app/shared/lib/cn';

interface AbilitiesProps {
  abilities: AbilitiyView[];
}

export default function Abilities({ abilities }: AbilitiesProps) {
  const normal = abilities.filter((a) => !a.isHidden);
  const hidden = abilities.filter((a) => a.isHidden);

  return (
    <div className="">
      {abilities.map((ability) => (
        <Ability key={ability.name} ability={ability} />
      ))}
    </div>
    // <div className="">
    //   <h3 className="text-xl font-semibold mt-2">일반 특성</h3>
    //   <ul
    //     className={cn(
    //       ' mt-4 pl-3',
    //       '[&>li]:before:text-muted-foreground [&>li]:pl-3 [&>li]:before:content-["-"] list-none [&>li]:before:self-center [&>li]:before:absolute [&>li]:relative [&>li]:before:-ml-5.5',
    //     )}
    //   >
    //     {normal.map((ability) => (
    //       <Ability key={ability.name} ability={ability} />
    //     ))}
    //   </ul>

    //   <h3 className="text-xl font-semibold mt-8">숨겨진 특성</h3>
    //   <ul
    //     className={cn(
    //       ' mt-4 pl-3',
    //       '[&>li]:before:text-muted-foreground [&>li]:pl-3 [&>li]:before:content-["-"] list-none [&>li]:before:self-center [&>li]:before:absolute [&>li]:relative [&>li]:before:-ml-5.5',
    //     )}
    //   >
    //     {hidden.length > 0 ? (
    //       <>
    //         {hidden.map((ability) => (
    //           <Ability key={ability.name} ability={ability} />
    //         ))}
    //       </>
    //     ) : (
    //       <li className="font-semibold text-muted-foreground">없음</li>
    //     )}
    //   </ul>
    // </div>
  );
}
