interface SectionPosition {
  id: string;
  // 앵커 이동 시 멈추는 위치를 뺀 뷰포트 기준 top. 앵커로 이동하면 이 값이 0이 된다.
  top: number;
}

interface GetActiveSectionIdOptions {
  // 앵커 이동 직후 위치(0)에서 이 값까지는 해당 섹션에 도달한 것으로 본다
  threshold: number;
  isAtBottom: boolean;
}

// sections는 문서 순서. 판정선을 지난 마지막 섹션이 활성
export function getActiveSectionId(
  sections: SectionPosition[],
  { threshold, isAtBottom }: GetActiveSectionIdOptions,
): string | null {
  if (sections.length === 0) {
    return null;
  }

  // 짧은 마지막 섹션은 판정선까지 올라오지 못하므로 바닥에서는 마지막으로 고정
  if (isAtBottom) {
    return sections[sections.length - 1].id;
  }

  let activeId: string | null = null;

  for (const section of sections) {
    if (section.top > threshold) {
      break;
    }
    activeId = section.id;
  }

  return activeId;
}
