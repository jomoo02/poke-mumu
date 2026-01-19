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
    <div className={cn('p-4', className)}>
      <ArrowIcon />
      <div className="flex flex-col items-center justify-center text-foreground font-medium px-2 py-2 rounded-lg text-sm my-2 lg:my-0 ">
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
