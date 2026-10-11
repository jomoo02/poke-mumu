// 결과 0개. 필터가 없어 검색어만 안내한다
export default function AbilityEmpty() {
  return (
    <div className="flex flex-col items-start gap-1 py-6">
      <p className="font-medium">조건에 맞는 특성이 없어요</p>
      <p className="text-sm text-muted-foreground">검색어를 바꿔 보세요</p>
    </div>
  );
}
