import { createParser } from 'nuqs/server';

import { parsePage } from './pagination';

// nuqs용 page 파서. parsePage와 같은 규칙(없음·문자열·0·음수는 1, 소수는 버림).
// 기본값 1은 URL에 쓰지 않는다. 상한(총 페이지 수) 보정은 paginate가 담당한다
const parseAsPage = createParser({
  parse: parsePage,
  serialize: String,
}).withDefault(1);

export { parseAsPage };
