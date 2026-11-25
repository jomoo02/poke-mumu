// breadcrumb이 없는 모든 경로. 화면 안 이동(soft navigation)에서 맞는 슬롯이 없으면
// 이전 breadcrumb이 남으므로, 여기서 비운다 (default.tsx는 처음 불러올 때만 쓰인다)
export default function CatchAllBreadcrumb() {
  return null;
}
