import 'server-only';
import { createClient } from '@supabase/supabase-js';

/**
 * 쓰기 전용 클라이언트. service_role 키로 RLS를 우회한다.
 * `server-only`로 클라이언트 번들 유입을 차단한다.
 *
 * ⚠️ 동작하려면 .env.local 에 SUPABASE_SERVICE_ROLE_KEY 를 추가해야 한다.
 * (대상 테이블 RLS에는 public SELECT 정책만 있어 anon 키로는 쓰기가 거부된다.)
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      'service_role 키 누락: .env.local 에 SUPABASE_SERVICE_ROLE_KEY 를 추가하세요.',
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
