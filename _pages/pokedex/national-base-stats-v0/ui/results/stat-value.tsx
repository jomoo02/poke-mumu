import { cn } from '@/_shared/lib/cn';

interface StatValueProps {
  value: number;
  className?: string;
}

// 종족값·능력치 공용 표시 (테이블·리스트).
// tabular-nums로 자릿수 폭을 고정해 세로로 끝선이 맞게 한다
export default function StatValue({ value, className }: StatValueProps) {
  return <span className={cn('tabular-nums', className)}>{value}</span>;
}
