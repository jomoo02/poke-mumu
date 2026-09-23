import { Fragment } from 'react';

import { splitHighlightSegments } from './highlight';

interface HighlightedTextProps {
  text: string;
  /** 비어 있으면 원문을 그대로 렌더한다 */
  query: string;
}

/** 검색어 일치 구간을 <mark>로 감싼 텍스트 */
export default function HighlightedText({ text, query }: HighlightedTextProps) {
  const segments = splitHighlightSegments(text, query);

  return (
    <>
      {segments.map((segment, index) =>
        segment.highlighted ? (
          <mark
            key={index}
            className="rounded-sm bg-primary/15 text-foreground box-decoration-clone"
          >
            {segment.text}
          </mark>
        ) : (
          <Fragment key={index}>{segment.text}</Fragment>
        ),
      )}
    </>
  );
}
