import { cn } from '@/_shared/lib/cn';

interface MoveStatValueProps {
  value: number | null;
  className?: string;
}

// 위력·명중·PP 공용 표시 (테이블·리스트).
// 값이 없으면(변화 기술의 위력, 반드시 맞는 기술의 명중 등) '-'.
// tabular-nums로 자릿수 폭을 고정해 세로로 끝선이 맞게 한다
export default function MoveStatValue({
  value,
  className,
}: MoveStatValueProps) {
  return <span className={cn('tabular-nums', className)}>{value ?? '-'}</span>;
}
