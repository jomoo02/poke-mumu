import { createClient } from '@supabase/supabase-js';

/**
 * 읽기 전용(검색 등) 클라이언트. publishable/anon 키 사용.
 * public SELECT RLS 정책 범위 내에서만 동작한다.
 */
export function createAnonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      'Supabase 읽기 키 누락: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY 확인 필요',
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
