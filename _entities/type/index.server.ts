// 서버 전용 공개 API: 클라이언트 번들에 들어오면 빌드 에러
import 'server-only';

export { getAllType } from './api/type';
export { getDefenseEffectiveness } from './api/type-effectiveness';
