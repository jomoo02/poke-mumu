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
    <div className={cn('flex py-2', className)}>
      <div className="flex items-center min-w-32 w-32">{subject}</div>
      <div className=" flex text-pretty  break-keep flex-1">{children}</div>
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
      <h3 className="font-medium mb-2">{title}</h3>
      {isVisible && <div className="flex flex-col">{children}</div>}
    </div>
  );
}

const InfoCard = {
  Container,
  Item,
};

export default InfoCard;
