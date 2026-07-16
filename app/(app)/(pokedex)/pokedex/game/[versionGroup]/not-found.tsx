export default function NotFound() {
  return (
    <div className="py-16 flex flex-col items-center gap-2 text-center">
      <p className="text-2xl font-bold">존재하지 않는 지역이에요</p>
      <p className="text-foreground/70">요청하신 지역 도감을 찾을 수 없어요.</p>
    </div>
  );
}
