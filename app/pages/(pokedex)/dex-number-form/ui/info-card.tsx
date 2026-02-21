'use client';
import { cn } from '@/app/shared/lib/cn';
import { Table, TableBody, TableCell, TableRow } from '@/app/shared/ui/table';
import { useState } from 'react';

interface ItemProps {
  subject: string;
  children: React.ReactNode;
  className?: string;
}

function Item({ subject, children, className }: ItemProps) {
  return (
    <div className="flex gap-6 px-4 py-2 border-t">
      <div className="w-24 sm:w-36">{subject}</div>
      <div className="flex-1">{children}</div>
    </div>
  );
  // return (
  //   <div className={cn('grid grid-cols-3 py-2', className)}>
  //     <div className="flex items-center  text-muted-foreground font-medium">
  //       {subject}
  //     </div>
  //     <div className=" flex text-pretty col-span-2  break-keep flex-1 mt-1">
  //       {children}
  //     </div>
  //   </div>
  // );
}

interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Container({ title, children }: CardProps) {
  return (
    <div className="">
      <div className="font-medium bg-muted/70 px-4 py-2">{title}</div>
      <div>{children}</div>
    </div>
    // <div className="">
    //   <h3 className="font-medium mb-2">{title}</h3>
    //   <div className="grid">{children}</div>

    // </div>
  );
}

const InfoCard = {
  Container,
  Item,
};

export default InfoCard;
