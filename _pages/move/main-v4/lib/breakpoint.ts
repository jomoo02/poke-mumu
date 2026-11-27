// 화면 구간. Tailwind 변형과 같은 이름으로 짓는다: MAX_MD_QUERY ↔ max-md: · MD_QUERY ↔ md:.
// 트리거를 CSS로 한 구간에만 보이게 하고(md:hidden · max-md:hidden), 열린 패널이 그 구간을 벗어나면 닫을 때 쓴다 (useCloseOutsideMedia)
//   md 미만 트리거(className="md:hidden")     → useCloseOutsideMedia(MAX_MD_QUERY, …)
//   md 이상 트리거(className="max-md:hidden") → useCloseOutsideMedia(MD_QUERY, …)
export const MAX_MD_QUERY = '(max-width: 767px)';
export const MD_QUERY = '(min-width: 768px)';
