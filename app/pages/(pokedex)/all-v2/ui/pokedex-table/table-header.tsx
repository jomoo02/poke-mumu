import { getStatLabels } from '@/app/entities/stats/model';
import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';
import { ArrowDownIcon, ArrowDownUpIcon } from 'lucide-react';
import { RefObject } from 'react';

interface TableHeaderProps {
  ref: RefObject<HTMLDivElement | null>;
}

export default function TableHeader({ ref }: TableHeaderProps) {
  // const statsLabels = getStatLabels();

  const statsLabels = [
    '총합',
    'HP',
    '공격',
    '방어',
    '특수공격',
    '특수방어',
    '스피드',
  ];

  return (
    <div ref={ref} className="sticky overflow-hidden top-28 z-10">
      <div className="flex w-max lg:w-full px-4 xl:px-16 relative h-11">
        <div className="w-20 min-w-20 md:w-26 md:min-w-26 sticky left-0 bg-card border-b" />

        <div className="w-26 min-w-26  md:w-34 md:min-w-34 px-2 bg-card border-b h-full flex items-center">
          <Button variant={'ghost'} size={'lg'}>
            도감번호
            <ArrowDownUpIcon className="size-4 text-m" />
          </Button>
        </div>
        {/* <div> */}
        <div className="min-w-34 md:min-w-44 lg:min-w-52 w-full px-2  bg-card border-b h-full flex items-center">
          <Button variant={'ghost'} size={'lg'}>
            이름
            <ArrowDownUpIcon className="size-4 text-m" />
          </Button>
        </div>
        {/* <div className="text-sm inline-flex items-center justify-center font-medium"> */}
        <div className="px-4 w-25 min-w-25 xl:w-32 xl:min-w-32 2xl:w-44 2xl:min-w-44 text-sm font-medium justify-center  bg-card border-b h-full flex items-center">
          타입
        </div>
        {statsLabels.map((label) => (
          <div
            key={label}
            className={cn(
              'px-2',
              label.length > 2 ? 'w-30 min-w-30' : 'w-26 min-w-26  ',
              '2xl:w-48 2xl:min-w-48',
              ' bg-card border-b h-full flex justify-end items-center',
            )}
          >
            <Button variant={'ghost'} size={'lg'}>
              {label}
              <ArrowDownUpIcon className="size-4 text-m" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
