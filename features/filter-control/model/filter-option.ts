export interface FilterOption {
  value: string;
  label: string;
  icon?: React.ReactNode; // 옵션 아이콘(예: 타입 아이콘)
}

// 뷰가 주입하는 필터 설정. 하나의 축(type, form, gen 등) = 하나의 FilterConfig.
// 매칭 로직(AND/OR/토큰)은 도메인마다 달라 feature가 갖지 않는다 → 뷰에서 처리.
export interface FilterConfig {
  key: string; // URL param key (예: 'type')
  title: string; // UI 제목 / 트리거 접두
  options: readonly FilterOption[];
  max?: number; // 최대 선택 개수(도달 시 미선택 disabled)
  columns?: 1 | 2 | 3; // 옵션 그리드 열 수
  description?: string; // 모바일 시트 설명
  defaultTriggerLabel?: string; // 미선택 시 트리거 문구(예: '모든 타입')
}
