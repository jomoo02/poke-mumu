interface ResultCountProps {
  count: number;
}

// 결과 수 알림 (화면엔 안 보임). 검색어·필터가 바뀌면 스크린리더가 읽는다.
// 화면의 수는 검색창 안내('기술 400개 중 검색')와 필터 시트('N개 보기')에 있다
export default function ResultCount({ count }: ResultCountProps) {
  return (
    <p aria-live="polite" className="sr-only">
      {`결과 ${count.toLocaleString('ko-KR')}개`}
    </p>
  );
}
