import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

import { ItemContainer, ItemContent, ItemImg } from './item';

const GAME_SHOTS: {
  srcs: string[];
  className?: string;
  title: string;
  description: string;
}[] = [
  {
    srcs: ['legends_za.webp'],
    // className: 'xl:rotate-3',
    title: 'LEGENDS Z-A',
    description: 'Legends: Z-A',
  },
];

export default function GameLink({ className }: { className?: string }) {
  return (
    <Card
      render={
        <Link
          href={'/pokedex/game'}
          className="focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none "
        />
      }
      className="group"
    >
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-xl font-bold">지역도감</CardTitle>
          <CardDescription className="text-sm">
            게임별 지역도감을 탐색
          </CardDescription>
        </div>

        <div
          className={cn(
            'size-10 rounded-xl shrink-0 flex items-center justify-center transition-colors duration-300',
            'bg-primary/10 dark:bg-primary/70 dark:group-hover:bg-primary dark:text-primary-foreground/70 dark:group-hover:text-primary-foreground group-hover:bg-primary text-primary group-hover:text-primary-foreground',
          )}
        >
          <ArrowUpRightIcon className="size-5" />
        </div>
      </CardHeader>
      <CardContent className="opacity-90 flex-1 h-full justify-center">
        {GAME_SHOTS.map(({ title, srcs, className, description }) => (
          <ItemContainer key={title} className={cn(className)}>
            <ItemImg srcs={srcs} />
            <ItemContent title={title} description={description} />
          </ItemContainer>
        ))}
      </CardContent>
    </Card>
  );
}
