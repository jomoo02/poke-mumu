'use client';
import { cn } from '@/app/shared/lib/cn';
import { useState } from 'react';

interface ItemProps {
  subject: string;
  children: React.ReactNode;
  className?: string;
}

function Item({ subject, children, className }: ItemProps) {
  return (
    <div
      className={cn(
        'flex justify-between py-2 last:border-b-0 border-b',
        className,
      )}
    >
      <div className="flex items-center text-muted-foreground font-medium">
        {subject}
      </div>
      <div className=" flex text-pretty  break-keep">{children}</div>
    </div>
  );
}

interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Container({ title, children }: CardProps) {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div className="">
      <h3 className="font-medium">{title}</h3>
      {isVisible && <div className="flex flex-col">{children}</div>}
    </div>
  );
}

const InfoCard = {
  Container,
  Item,
};

export default InfoCard;
