import React from 'react';
import { IconArrowBigLeftFilled } from '@tabler/icons-react';

interface ArrowLeftIconProps {
  size?: string;
  color?: string;
}

export default function ArrowLeftIcon({
  size = '1rem',
  color = '#334155',
}: ArrowLeftIconProps) {
  return <IconArrowBigLeftFilled size={size} color={color} />;
}
