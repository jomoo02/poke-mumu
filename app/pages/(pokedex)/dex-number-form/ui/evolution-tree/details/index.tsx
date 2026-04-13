'use client';

import { cn } from '@/app/shared/lib/cn';

import ArrowIcon from './arrow-icon';
import DetailItem from './detail-item';
import { type Detail } from './type';

interface DetailsProps {
  details: Detail[];
  className?: string;
}

export default function Details({ details, className }: DetailsProps) {
  if (!details || details.length === 0) {
    return null;
  }

  return (
    <div className={cn('p-3 flex flex-col gap-3 h-full', className)}>
      <ArrowIcon />
      <div className="flex flex-col items-center justify-center text-foreground  rounded-lg text-md">
        {details.map((detail, i) => (
          <div
            key={detail.display}
            className=" flex flex-col items-center justify-center"
          >
            {i > 0 && <div className="text-center">or</div>}
            <p className="break-keep text-pretty  text-center">
              <DetailItem
                display={detail.display}
                conditions={detail.conditions}
                trigger={detail.trigger}
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
